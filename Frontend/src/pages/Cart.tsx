import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OfferBar from "../components/OfferBar";
import { useCart } from "../context/CartContext";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { formatCurrency } from "../lib/formatCurrency";
import CartProduct from "../components/CartProduct";
import { AnimatePresence } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    cartProducts,
    refetchCart,
    setCheckoutProducts,
  } = useCart();

  useEffect(() => {
    refetchCart();

    const handleFocus = () => {
      refetchCart();
      console.log("Refetched on window focus");
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetchCart]);

  return (
    <div className="bg-gray-50">
      <OfferBar />
      <Navbar seller={user.role === "SELLER"} />

      <div className="max-w-5xl mx-auto mt-6 p-4">
        <h1 className="text-2xl font-bold  ">Shopping Cart</h1>

        {/* Products and checkout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2 space-y-4 ">
            <AnimatePresence>
              {cartProducts.map((product, i) => (
                <CartProduct key={i} product={product} mapIndex={i}/>

              ))}
            </AnimatePresence>
          </div>

          {/* Order Overview */}
          <div className="h-max border border-gray-300 p-4 rounded-lg space-y-4 ">
            <h2 className="text-lg font-medium">Order Overview</h2>
            <div className="w-full border-t border-gray-300"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700/70 font-medium">Subtotal</p>
              <p className="font-medium opacity-90">{formatCurrency(50000)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700/70 font-medium">Savings</p>
              <p className="font-medium opacity-90">{formatCurrency(5000)}</p>
            </div>
            <div className="w-full border-t border-gray-300"></div>
            <div className="flex items-center justify-between font-bold opacity-90">
              <p>Total</p>
              <p>{formatCurrency(45000)}</p>
            </div>

            <button
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium flex justify-center items-center gap-2 text-sm hover:opacity-80 transition-opacity duration-300 ease-in-out"
              onClick={() => {
                setCheckoutProducts(cartProducts);
                navigate("/checkout", { state: { products: cartProducts } });
              }}
            >
              <span>Checkout</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="w-full py-2 rounded-lg border-1 border-gray-300 text-gray-800/80 font-medium flex justify-center items-center gap-2 text-sm hover:bg-gray-200/50 transition-opacity duration-300 ease-in-out"
              onClick={() => {
                navigate("/products");
              }}
            >
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
