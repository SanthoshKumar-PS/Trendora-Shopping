import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { Badge, BadgeCheck, Bell, ChevronDown, ChevronUp, CreditCard, Fingerprint, LaptopMinimal, Smile, Star, Truck } from "lucide-react"
import { Input } from "../components/ui/input"
import AddAddress from "../components/AddAddress"
import Addresses from "./CheckOut/Addresses"
import OrderSummary from "./CheckOut/OrderSummary"
import { useLocation } from "react-router-dom"

const CheckOut = () => {
    const {state} = useLocation();
    console.log(state) 
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  

    const [checkOutActive,seCheckOutActive] = useState<number>(1); //1-Login 2-Address 3-Order Summary 4-payment
    const [activeTab,setActiveTab] = useState<number>(0)

    const [selectedAddressId, setSelectedAddressId] = useState<number|null>(null)    
    const [showAddAddress, setShowAddAddress] = useState<boolean>(false);




    //Payment Details
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 16);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        setCardNumber(formattedValue);
    };
    const handleCardExpiryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 4);
        if (value.length > 2) {
        value = value.slice(0, 2) + " / " + value.slice(2);
        }
        setCardExpiry(value);
    };
    const handleCardCVVChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 4);
        setCardCVV(value);
    };



  return (
    <div className="bg-zinc-100 min-h-screen">
        <Navbar/>
        <div className="w-full border-b border-zinc-300"></div>

        <div className="max-w-4xl mx-auto my-6 ">
            <div className="flex flex-col justify-start items-start w-full space-y-6 ">

                {/* First pair of container - Login Or Signup */}
                <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white rounded-xs overflow-hidden">
                    {/* Blue Login Signup */}
                    <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600  text-white">
                        <Fingerprint size={20} />
                        <p className="font-medium text-white ">LOGIN OR SIGNUP</p>
                    </div>
                    {/* Email/Mobile Number */}
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center ">
                        {/* Login Signup */}
                        <div className="max-w-sm my-3 mx-3 md:mx-5 flex flex-col gap-3">
                            <form onSubmit={(e:React.FormEvent)=>{e.preventDefault(); handleLoginOrSignup()}}>
                                <Input required placeholder="Enter Email/Mobile Number"
                                    className="w-full border-0 border-b border-gray-400 rounded-none 
                                    focus:outline-none focus-visible:outline-none 
                                    focus:ring-0 focus-visible:ring-0 
                                    focus:border-blue-500 shadow-none" />
                                <Input type="password" required placeholder="Enter Your Password"
                                    className="w-full border-0 border-b border-gray-400 rounded-none 
                                    focus:outline-none focus-visible:outline-none 
                                    focus:ring-0 focus-visible:ring-0 
                                    focus:border-blue-500 shadow-none" />
                                <p className="text-sm text-zinc-400 font-mono">By continuing, you agree to Trendora's <span className="text-blue-600">Terms Of Use </span>and <span className="text-blue-600">Privacy Policy</span></p>
                                <button type="submit" className="text-sm md:text-md text-white font-semibold bg-orange-500     flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">CONTINUE</button> 
                            </form>

                        </div>
                        {/* Advantages ofour secure login */}
                        <div className="my-3 flex flex-col gap-3 justify-center items-start ">
                            <p className="text-gray-500 font-medium">Advantages of our secure login</p>
                            <div className="flex items-center justify-start gap-2 text-blue-600">
                                <Truck size={20}/>
                                <p className="text-sm text-black ">Easily Track Orders, Hassle free Returns</p>
                            </div>
                            <div className="flex items-center justify-start gap-2 text-blue-600">
                                <Bell size={20}/>
                                <p className="text-sm text-black ">Get Relevant Alerts and Recommendation</p>
                            </div>
                            <div className="flex items-center justify-start gap-2 text-blue-600">
                                <Star size={20}/>
                                <p className="text-sm text-black ">Wishlist, Reviews, Ratings and more.</p>
                            </div>
                        </div>
       
                    </div>
                </div>

                {/* Second pair of container - Delivery Address */}
                <Addresses 
                    selectedAddressId={selectedAddressId} 
                    setSelectedAddressId={setSelectedAddressId} 
                    showAddAddress={showAddAddress}
                    setShowAddAddress={setShowAddAddress}
                />


                {/* Add New Address */}
                {showAddAddress && (
                    <AddAddress 
                        showAddAddress={showAddAddress}
                        setShowAddAddress={setShowAddAddress}/>
                )}


                {/* Third pair of container - Order Summary */}
                <OrderSummary/>



                {/* Fourth pair of container - Payment Page */}
                <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white">
                    {/* Payment Header */}
                    <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
                        <CreditCard size={20} />
                        <p className="font-medium text-white ">PAYMENT</p>
                    </div>

                    {/* Payment Details */}
                    <div className="flex flex-col justify-center items-center p-3 md:p-5 gap-3 md:gap-5"> 
                        {/* Total Amount */}
                        <div className="w-full flex justify-between items-center bg-blue-100 p-2 md:p-3 rounded-md">
                            <p className="text-blue-600 text-md">Total Amount</p>
                            <p className="text-blue-600 text-lg font-medium">$10,000</p>
                        </div>

                        {/* Cashback */}
                        <div className="w-full flex flex-col justify-start items-start gap-1 bg-green-200 p-2 md:p-3 rounded-md">
                            <p className="text-green-600 font-medium">5% Cashback</p>
                            <p className="text-green-600 text-sm">Claim now with payment offers</p>
                        </div>

                        <div className="w-full border-b-1 text-zinc-500"></div>

                        {/* Payment Options */}
                        <div className="flex flex-col w-full justify-start items-center">
                            <div className="w-full flex justify-between items-center"
                                onClick={()=>setActiveTab(prev => (prev===1?0:1))}>
                                <div className="flex justify-start items-center gap-2">
                                    <LaptopMinimal size={18}/>
                                    <p className="flex flex-col">
                                        <span className="font-medium text-md ">UPI</span>
                                        {activeTab!==1&&(
                                            <span className="text-sm text-zinc-400">Pay by any UPI app</span>
                                        )}
                                    </p>
                                </div>
                                {activeTab===1?
                                    <ChevronUp size={18} />:
                                    <ChevronDown size={18} />}
                            </div>
                            {activeTab===1 && (
                                <div className="border-1 border-zinc-300 bg-zinc-100 flex flex-col gap-3 justify-center items-center w-full m-4 px-4 py-4 rounded-sm ">
                                    <div className="w-full flex gap-4 justify-between items-center h-9">
                                        <input type="text" className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-gray-400 focus:shadow text-md h-9"
                                        placeholder="Enter your UPI ID"/>
                                        
                                        <button className="h-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md hover:scale-95 hover:cursor-pointer">
                                            Verify
                                        </button>
                                    </div>
                                    <button className="w-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md  hover:cursor-pointer">
                                        Pay $10000
                                    </button>

                                </div>
                            )}
                        </div>                  

                        <div className="w-full border-b-1 text-zinc-500"></div>

                        {/* Credit Debit Options */}
                        <div className="flex flex-col w-full justify-start items-center">
                            <div className="w-full flex justify-between items-center"
                                onClick={()=>setActiveTab(prev => (prev===2?0:2))}>
                                <div className="flex justify-start items-center gap-2">
                                    <CreditCard size={18}/>
                                    <p className="flex flex-col">
                                        <span className="font-medium text-md ">Credit / Debit / ATM Card</span>
                                        {activeTab!==2 &&(
                                            <span className="text-sm text-zinc-400">Add and secure cards as per RBI guidelines</span>
                                        )}
                                        {activeTab!==2 &&(
                                            <span className="text-sm text-green-500">Get upto 5% cashback - 2 offers available</span>
                                        )}
                                        {activeTab===2 &&(
                                            <span className="text-sm text-gray-500"><span className="font-medium">Note:</span> Please ensure your card canbe used for online transactions. <span className="text-blue-600 font-medium">Learn More</span></span>
                                        )}
                                    </p>
                                </div>
                                {activeTab===2?
                                    <ChevronUp size={18} />:
                                    <ChevronDown size={18} />}
                            </div>
                            {activeTab===2 && (
                                <div className="border-1 border-zinc-300 bg-zinc-100 flex flex-col gap-10 justify-center items-start w-full m-4 px-4 py-4 rounded-sm ">
                                    {/* Card Number */}
                                    <div className="flex flex-col gap-2 ">
                                        <p className="text-md ">Card Number</p>
                                        <input type="text" inputMode="numeric" value={cardNumber} onChange={handleCardNumberChange}
                                            className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                                            placeholder="XXXX XXXX XXXX XXXX" />
                                    </div>

                                    {/* Valid thru and CVV */}
                                    <div className="w-full flex gap-4 justify-between items-center h-9">
                                        {/* Valid Thru */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <p>Valid Thru</p>
                                            <input type="text" inputMode="numeric" value={cardExpiry} onChange={handleCardExpiryChange}
                                                className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                                                placeholder="MM / YY" />
                                        </div>

                                        {/* CVV */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <p>CVV</p>
                                            <input type="password" inputMode="numeric" value={cardCVV} onChange={handleCardCVVChange}
                                            className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                                            placeholder="CVV" />
                                        </div>
                                      
                                    </div>
                                    <button className="w-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md  hover:cursor-pointer">
                                        Pay $10000
                                    </button>

                                </div>
                            )}
                        </div>                  


                        <div className="w-full border-b-1 text-zinc-500"></div>

                        {/* Cash On Delivery */}
                        <div className="flex flex-col w-full justify-start items-center">
                            <div className="w-full flex justify-between items-center"
                                onClick={()=>setActiveTab(prev => (prev===3?0:3))}>
                                <div className="flex justify-start items-center gap-2">
                                    <CreditCard size={18}/>
                                    <p className="flex flex-col">
                                        <span className="font-medium text-md ">Cash On Delivery</span>
                                        {activeTab!==3 &&(
                                            <span className="text-sm text-zinc-400">Pay after you recieved the product.</span>
                                        )}
                                    </p>
                                </div>
                                {activeTab===3?
                                    <ChevronUp size={18} />:
                                    <ChevronDown size={18} />}
                            </div>
                            {activeTab===3 && (
                                <div className="border-1 border-zinc-300 bg-zinc-100 flex flex-col gap-10 justify-center items-start w-full m-4 px-4 py-4 rounded-sm ">
                                    <p className="text-sm text-zinc-500 font-medium">42,225 people used online payment options in the last hour. Pay online now for safe and contactless delivery.</p>

                                    <button className="w-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md  hover:cursor-pointer">
                                        Place Order
                                    </button>

                                </div>
                            )}
                        </div>                  

                        <div className="w-full border-b-1 text-zinc-500"></div>

                    </div>

                </div>

                {/* Fifth pair Emoji and message */}
                <div className="mx-auto flex flex-col items-center justify-center">
                    <p className="text-zinc-600 font-medium text-md">35 Crore Happy Customers and Counting!</p>
                    <Smile size={30} className="text-zinc-600"/>


                </div>





                {/* To Be Deleted */}
                <div className="h-10 bg-red-200 w-full">

                </div>
                



            </div>
        </div>

    </div>
  )
}

export default CheckOut