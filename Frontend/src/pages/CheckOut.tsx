import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Fingerprint,
  LaptopMinimal,
  Smile,
  Star,
  Truck,
} from "lucide-react";
import { Input } from "../components/ui/input";
import AddressForm from "../components/AddressForm";
import Addresses from "./CheckOut/Addresses";
import OrderSummary from "./CheckOut/OrderSummary";
import { useLocation, useNavigate } from "react-router-dom";
import handleLoginOrSignup from "./CheckOut/ApiLoginSignup";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import type {
  Address,
  CheckoutProduct,
  OrderStatus,
  PaymentMethod,
  Product,
  ProductWithCart,
} from "../types/Types";
import { handleLogout } from "../Api/Logout";
import { formatCurrency } from "../lib/formatCurrency";
import axios, { isAxiosError } from "axios";
import OrderStatusDialog from "../components/OrderStatusDialog";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { checkoutProducts, setCheckoutProducts } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<CheckoutProduct[]>(
    []
  );
  console.log("checkoutProducts: ", checkoutProducts);

  const [dialogopen, setDialogOpen] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("CONFIRMED");
  const [apiMessage, setApiMessage] = useState<string | undefined>(undefined);
  const [orderSuccessNo, setOrderSuccessNo] = useState<number | null>(null);

  const updateSelectedProducts = (products: Product[]) => {
    const initialData: CheckoutProduct[] = products.map((p) => ({
      product: p,
      quantity: 1,
      totalActualPrice: p.actualPrice,
      totalDiscountedPrice: p.discountedPrice,
    }));
    setSelectedProducts(initialData);
    console.log("Selected products : ", initialData);
  };

  useEffect(() => {
    if (location.state?.products) {
      setCheckoutProducts(location.state.products);
      localStorage.setItem(
        "checkoutProducts",
        JSON.stringify(location.state.products)
      );
      updateSelectedProducts(location.state.products);
    } else {
      console.log("This is from local Storage");
      const stored = localStorage.getItem("checkoutProducts");
      const parsed: ProductWithCart[] =
        stored && stored !== "undefined" ? JSON.parse(stored) : [];
      setCheckoutProducts(parsed);
      updateSelectedProducts(parsed);
    }
  }, [location.state?.products]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [checkOutActive, seCheckOutActive] = useState<number>(1); //1-Login 2-Address 3-Order Summary 4-payment
  const [activeTab, setActiveTab] = useState<number>(0);

  // 1: Login or Signup
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [changeLogin, setChangeLogin] = useState<boolean>(false);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.loggedIn) {
      try {
        await handleLogout({ BACKEND_URL, setUser, clearPreviousToken: false });
        console.log("Logged out successfully");
      } catch (err) {
        console.warn("Logout failed before login, continuing...", err);
      }
    }
    setLoginError(null);
    try {
      const data = await handleLoginOrSignup({
        email: email ?? "",
        password: password ?? "",
      });
      setUser({
        loggedIn: true,
        email: data.email,
        name: data.name ?? "",
        role: data.role,
        image: data.image ?? "",
        phone: data.phone ?? "",
        cartId: data.cartId,
      });
      localStorage.setItem(
        "UserInfo",
        JSON.stringify({
          loggedIn: true,
          email: data.email,
          name: data.name,
          role: data.role,
          image: data.image,
          phone: data.phone,
          cartId: data.cartId,
        })
      );
      console.log("Login Success for ", data.email);
      setChangeLogin(false);
    } catch (error: any) {
      setLoginError(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  // 2. Address Required fields
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState<boolean>(false);

  //3. Order Summary
  const calculateGrandTotals = (selectedProducts: CheckoutProduct[]) => {
    return selectedProducts.reduce(
      (totals, item) => {
        totals.grandTotalActualPrice +=
          item.product.actualPrice * item.quantity;
        totals.grandTotalDiscountedPrice +=
          item.product.discountedPrice * item.quantity;
        return totals;
      },
      { grandTotalActualPrice: 0, grandTotalDiscountedPrice: 0 }
    );
  };
  const { grandTotalActualPrice, grandTotalDiscountedPrice } =
    calculateGrandTotals(selectedProducts);

  const handlePlaceOrder = async () => {
    try {
      const payload = {
        deliveryAddressId: selectedAddressId,
        grandTotalDiscountedPrice: grandTotalDiscountedPrice,
        grandTotalActualPrice: grandTotalActualPrice,
        products: selectedProducts,
      };
      type PlaceOrderProps = {
        message: string;
        orderNo?: number;
      };

      const response = await axios.post<PlaceOrderProps>(
        `${BACKEND_URL}/user/placeOrder`,
        payload,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Order placed successfully");
        console.log("Response : ", response.data);
        setOrderSuccessNo(response.data.orderNo ?? 0);
        setOrderStatus("CONFIRMED");
        setDialogOpen(true);
        console.log("Api Message: ", response.data.message);
        setApiMessage(response.data.message);
      } else {
        console.log("Error occured while placing order");
      }
    } catch (error: any) {
      console.log("Error occured while placing order");
      console.log(error);
      setOrderStatus("ERROR");
      setDialogOpen(true);
      if (axios.isAxiosError(error) && error.response) {
        setApiMessage(error.response.data.message || "Something went wrong");
      } else {
        setApiMessage("Internal Error. Please try again.");
      }
    }
  };

  //4. Payment Details
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>("UPI"); //must set to null at beginning
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + " / " + value.slice(2);
    }
    setCardExpiry(value);
  };
  const handleCardCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    setCardCVV(value);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar seller={user.role === "SELLER"} />

      <div className="max-w-4xl mx-auto my-6 ">
        <div className="flex flex-col justify-start items-start w-full space-y-6 ">
          {/* Success for First pair of container - Login Or Signup */}
          <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white rounded-lg overflow-hidden shadow-lg ">
            {/* Blue Login Signup */}
            <div
              className={`px-4 py-2 w-full flex justify-start items-center gap-2 ${
                user.loggedIn && !changeLogin
                  ? "bg-white text-zinc-700"
                  : "bg-blue-600  text-white"
              } `}
            >
              <Fingerprint size={18} />
              <p className="font-medium flex items-center gap-2">
                {user.loggedIn && !changeLogin ? "LOGIN" : "LOGIN OR SIGNUP"}{" "}
                <span>
                  {user.loggedIn && (
                    <Check size={18} className="text-blue-600" />
                  )}
                </span>
              </p>
            </div>
            {/* Email/Mobile Number */}
            <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center ">
              {/* Login Signup - when login false*/}
              {(!user.loggedIn || changeLogin) && (
                <div className="max-w-sm my-3 mx-3 md:mx-5 flex flex-col gap-3">
                  <form onSubmit={handleFormSubmit}>
                    <Input
                      required
                      value={email ?? ""}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email Number"
                      className="w-full border-0 border-b border-gray-400 rounded-none 
                                    focus:outline-none focus-visible:outline-none 
                                    focus:ring-0 focus-visible:ring-0 
                                    focus:border-blue-500 shadow-none"
                    />
                    <Input
                      type="password"
                      required
                      value={password ?? ""}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                      className="w-full border-0 border-b border-gray-400 rounded-none 
                                    focus:outline-none focus-visible:outline-none 
                                    focus:ring-0 focus-visible:ring-0 
                                    focus:border-blue-500 shadow-none"
                    />
                    <p className="text-sm text-zinc-400 font-mono">
                      By continuing, you agree to Trendora's{" "}
                      <span className="text-blue-600">Terms Of Use </span>and{" "}
                      <span className="text-blue-600">Privacy Policy</span>
                    </p>
                    {loginError && <p className="text-red-500">{loginError}</p>}
                    <button
                      type="submit"
                      className="text-sm md:text-md text-white font-semibold bg-orange-500     flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer"
                    >
                      CONTINUE
                    </button>
                  </form>
                </div>
              )}

              {/* Advantages of our secure login - when login false */}
              {(!user.loggedIn || changeLogin) && (
                <div className="my-3 flex flex-col gap-3 justify-center items-start ">
                  <p className="text-gray-500 font-medium">
                    Advantages of our secure login
                  </p>
                  <div className="flex items-center justify-start gap-2 text-blue-600">
                    <Truck size={18} />
                    <p className="text-sm text-black ">
                      Easily Track Orders, Hassle free Returns
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-2 text-blue-600">
                    <Bell size={18} />
                    <p className="text-sm text-black ">
                      Get Relevant Alerts and Recommendation
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-2 text-blue-600">
                    <Star size={18} />
                    <p className="text-sm text-black ">
                      Wishlist, Reviews, Ratings and more.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Trendora customer - Login done */}
            {user.loggedIn && !changeLogin && (
              <div className="self-center">
                <span className="font-bold text-gray-700 text-sm  ">
                  Trendora customer -{" "}
                </span>
                <span className="font-medium text-gray-800 text-sm ">
                  {user.email}
                </span>
              </div>
            )}

            {/* Change */}
            {(user.loggedIn || !changeLogin) && (
              <button
                className="self-center w-max px-3 py-1 text-sm font-medium text-blue-600 border border-gray-300     rounded-xs my-2 hover:cursor-pointer hover:scale-95"
                onClick={() => setChangeLogin((prev) => !prev)}
              >
                {changeLogin ? `Continue with ${user.email}` : "CHANGE"}
              </button>
            )}
          </div>

          {/* Second pair of container - Delivery Address */}
          <Addresses
            selectedAddressId={selectedAddressId}
            setSelectedAddressId={setSelectedAddressId}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            addresses={addresses}
            setAddresses={setAddresses}
            addressLoading={addressLoading}
            setAddressLoading={setAddressLoading}
            showAddAddress={showAddressForm}
            setShowAddAddress={setShowAddressForm}
          />

          {/* Add New Address */}
          {showAddressForm && (
            <AddressForm
              showAddressForm={showAddressForm}
              setShowAddressForm={setShowAddressForm}
              setAddresses={setAddresses}
              setSelectedAddress={setSelectedAddress}
              initialData={selectedAddress || undefined}
              mode={selectedAddress ? "update" : "create"}
              setAddressLoading={setAddressLoading}
            />
          )}

          {/* Third pair of container - Order Summary */}
          {/* <OrderSummary products={checkoutProducts}/> */}
          <OrderSummary
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />

          {/* Fourth pair of container - Payment Page */}
          <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white shadow-lg">
            {/* Payment Header */}
            <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
              <CreditCard size={18} />
              <p className="font-medium text-white ">PAYMENT</p>
            </div>

            {/* Order Amount details */}

            {/* Payment Details */}
            <div className="flex flex-col justify-center items-center p-3 md:p-5 gap-3 md:gap-5">
              {/* Order Table */}
              <table className="w-full bg-blue-100/40 rounded-lg p-4 max-w-sm self-center">
                <tbody className="divide-y-0">
                  <tr className="flex justify-between py-2 p-4 font-medium">
                    <td>Total Items</td>
                    <td>{selectedProducts.length}</td>
                  </tr>

                  <tr className="flex justify-between py-2 p-4 font-medium">
                    <td>Total Price</td>
                    <td>{formatCurrency(grandTotalActualPrice)}</td>
                  </tr>

                  <tr className="flex justify-between py-2 p-4 font-medium">
                    <td>Total Savings</td>
                    <td>
                      -{" "}
                      {formatCurrency(
                        grandTotalActualPrice - grandTotalDiscountedPrice
                      )}
                    </td>
                  </tr>

                  <tr className="flex justify-between py-2 p-4 border-b  border-dashed border-gray-500 font-medium">
                    <td>Delivery Fee</td>
                    <td className="flex justify-end items-end gap-2">
                      <span className="line-through text-sm">
                        {formatCurrency(40)}
                      </span>
                      <span>Free</span>
                    </td>
                  </tr>

                  <tr className="flex justify-between py-2 p-4 text-blue-700 font-semibold">
                    <td>Total Amount</td>
                    <td className="flex gap-2 justify-start items-end">
                      <span className="line-through text-sm">
                        {formatCurrency(grandTotalActualPrice)}
                      </span>
                      <span>{formatCurrency(grandTotalDiscountedPrice)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Total Amount */}
              <div className="w-full flex justify-between items-center bg-blue-100/80 p-2 md:p-3 rounded-md">
                <p className="text-blue-600 text-md">Total Payable Amount</p>
                <p className="text-blue-600 text-lg font-medium">
                  {formatCurrency(grandTotalDiscountedPrice)}
                </p>
              </div>

              {/* Cashback */}
              <div className="w-full flex flex-col justify-start items-start gap-1 bg-green-200/70 p-2 md:p-3 rounded-md">
                <p className="text-green-600/80 font-medium">5% Cashback</p>
                <p className="text-green-600/80 text-sm">
                  Claim now with payment offers
                </p>
              </div>

              {/* Selected Payment Methods */}
              <div className="w-full flex flex-col justify-start items-start gap-1 bg-blue-200 p-2 md:p-3 rounded-md">
                <p className="text-purple-600/80 font-medium">
                  Payment is not set up yet
                </p>
                <p className="text-purple-600/80 text-sm">
                  You can go ahead and place your order
                </p>
              </div>

              {/* Border Bottom */}
              <div className="w-full border-b-1 text-zinc-500"></div>

              {/* Payment Options */}
              <div className="flex flex-col w-full justify-start items-center">
                <div
                  className="w-full flex justify-between items-center"
                  onClick={() => setActiveTab((prev) => (prev === 1 ? 0 : 1))}
                >
                  <div className="flex justify-start items-center gap-2">
                    <LaptopMinimal size={18} />
                    <p className="flex flex-col">
                      <span className="font-medium text-md ">UPI</span>
                      {activeTab !== 1 && (
                        <span className="text-sm text-zinc-400">
                          Pay by any UPI app
                        </span>
                      )}
                    </p>
                  </div>
                  {activeTab === 1 ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                {activeTab === 1 && (
                  <div className="border-1 border-zinc-300 bg-zinc-100 flex flex-col gap-3 justify-center items-center w-full m-4 px-4 py-4 rounded-sm ">
                    <div className="w-full flex gap-4 justify-between items-center h-9">
                      <input
                        type="text"
                        className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-gray-400 focus:shadow text-md h-9"
                        placeholder="Enter your UPI ID"
                      />

                      <button className="h-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md hover:scale-95 hover:cursor-pointer">
                        Verify
                      </button>
                    </div>
                    <button
                      className="w-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md  hover:cursor-pointer"
                      onClick={() => {
                        setSelectedPaymentMethod("UPI");
                        setActiveTab(0);
                      }}
                    >
                      Pay {formatCurrency(grandTotalDiscountedPrice)}
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full border-b-1 text-zinc-500"></div>

              {/* Credit Debit Options */}
              <div className="flex flex-col w-full justify-start items-center">
                <div
                  className="w-full flex justify-between items-center"
                  onClick={() => setActiveTab((prev) => (prev === 2 ? 0 : 2))}
                >
                  <div className="flex justify-start items-center gap-2">
                    <CreditCard size={18} />
                    <p className="flex flex-col">
                      <span className="font-medium text-md ">
                        Credit / Debit / ATM Card
                      </span>
                      {activeTab !== 2 && (
                        <span className="text-sm text-zinc-400">
                          Add and secure cards as per RBI guidelines
                        </span>
                      )}
                      {activeTab !== 2 && (
                        <span className="text-sm text-green-500">
                          Get upto 5% cashback - 2 offers available
                        </span>
                      )}
                      {activeTab === 2 && (
                        <span className="text-sm text-gray-500">
                          <span className="font-medium">Note:</span> Please
                          ensure your card canbe used for online transactions.{" "}
                          <span className="text-blue-600 font-medium">
                            Learn More
                          </span>
                        </span>
                      )}
                    </p>
                  </div>
                  {activeTab === 2 ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                {activeTab === 2 && (
                  <div className="border-1 border-zinc-300 bg-zinc-100 flex flex-col gap-10 justify-center items-start w-full m-4 px-4 py-4 rounded-sm ">
                    {/* Card Number */}
                    <div className="flex flex-col gap-2 ">
                      <p className="text-md ">Card Number</p>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    </div>

                    {/* Valid thru and CVV */}
                    <div className="w-full flex gap-4 justify-between items-center h-9">
                      {/* Valid Thru */}
                      <div className="flex flex-col gap-2 w-full">
                        <p>Valid Thru</p>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={cardExpiry}
                          onChange={handleCardExpiryChange}
                          className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                          placeholder="MM / YY"
                        />
                      </div>

                      {/* CVV */}
                      <div className="flex flex-col gap-2 w-full">
                        <p>CVV</p>
                        <input
                          type="password"
                          inputMode="numeric"
                          value={cardCVV}
                          onChange={handleCardCVVChange}
                          className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                          placeholder="CVV"
                        />
                      </div>
                    </div>
                    <button
                      className="w-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md  hover:cursor-pointer"
                      onClick={() => {
                        setSelectedPaymentMethod("Card");
                        setActiveTab(0);
                      }}
                    >
                      Pay {formatCurrency(grandTotalDiscountedPrice)}
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full border-b-1 text-zinc-500"></div>

              {/* Cash On Delivery */}
              <div className="flex flex-col w-full justify-start items-center">
                <div
                  className="w-full flex justify-between items-center"
                  onClick={() => setActiveTab((prev) => (prev === 3 ? 0 : 3))}
                >
                  <div className="flex justify-start items-center gap-2">
                    <CreditCard size={18} />
                    <p className="flex flex-col">
                      <span className="font-medium text-md ">
                        Cash On Delivery
                      </span>
                      {activeTab !== 3 && (
                        <span className="text-sm text-zinc-400">
                          Pay after you recieved the product.
                        </span>
                      )}
                    </p>
                  </div>
                  {activeTab === 3 ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                {activeTab === 3 && (
                  <div className="border-1 border-zinc-300 bg-zinc-100 flex flex-col gap-10 justify-center items-start w-full m-4 px-4 py-4 rounded-sm ">
                    <p className="text-sm text-zinc-500 font-medium">
                      42,225 people used online payment options in the last
                      hour. Pay online now for safe and contactless delivery.
                    </p>

                    <button
                      className="w-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md  hover:cursor-pointer"
                      onClick={() => {
                        setSelectedPaymentMethod("COD");
                        setActiveTab(0);
                      }}
                    >
                      Pay on Delivery
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full border-b-1 text-zinc-500"></div>
            </div>
          </div>

          {/* To be deleted */}
          <button
            disabled={
              !selectedAddressId || !selectedProducts.length || !user.loggedIn
            }
            onClick={() => {
              console.log("Selected Products: ", selectedProducts);
              console.log("Selected Address Id: ", selectedAddressId);
              console.log("Selected payment method: ", selectedPaymentMethod);
              console.log(
                "Grand Total without discount: ",
                grandTotalActualPrice
              );
              console.log(
                "Grand Total with discount: ",
                grandTotalDiscountedPrice
              );
              handlePlaceOrder();
            }}
            className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 px-20 py-3 text-white font-medium rounded-sm self-center"
          >
            Place Order
          </button>
        </div>
      </div>
      {/* Fifth pair Emoji and message */}
      <div className="mb-4 mx-auto flex flex-col items-center justify-center">
        <p className="text-zinc-600 font-medium text-md">
          Happy Shopping Happy Customers!
        </p>
        <Smile size={30} className="text-zinc-600" />
      </div>

      {/* Order Status Dialog Box */}
      <OrderStatusDialog
        open={dialogopen}
        onClose={() => {
          setDialogOpen(false);
          setApiMessage(undefined);
          if (orderStatus === "CONFIRMED") navigate(`/order/${orderSuccessNo}`);
        }}
        status={orderStatus}
        message={apiMessage}
      />
    </div>
  );
};

export default CheckOut;
