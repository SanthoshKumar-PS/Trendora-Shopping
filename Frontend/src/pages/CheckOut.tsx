import { useState } from "react"
import Navbar from "../components/Navbar"
import { Badge, BadgeCheck, Bell, ChevronDown, ChevronUp, CircleAlert, CircleMinus, CirclePlus, CreditCard, Fingerprint, LaptopMinimal, ListOrdered, MapPinned, Star, Truck } from "lucide-react"
import { Input } from "../components/ui/input"

const CheckOut = () => {
    const [activeTab,setActiveTab] = useState<number>(1)
    const [cardNumber, setCardNumber] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove all non-digits
        value = value.replace(/\D/g, "");

        // Limit to 16 digits
        value = value.slice(0, 16);

        // Insert a space every 4 digits
        value = value.replace(/(.{4})/g, "$1 ").trim();

        setCardNumber(value);
    };
  return (
    <div className="bg-zinc-100 min-h-screen">
        <Navbar/>
        <div className="w-full border-b border-zinc-300"></div>

        <div className="max-w-4xl mx-auto my-6 ">
            <div className="flex flex-col justify-start items-start w-full space-y-6 ">

                {/* One pair of container - Login Or Signup */}
                <div className="mx-2 max-w-sm md:max-w-full flex flex-col w-full bg-white">
                    {/* Blue Login Signup */}
                    <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
                        <Fingerprint size={20} />
                        <p className="font-medium text-white ">LOGIN OR SIGNUP</p>
                    </div>
                    {/* Email/Mobile Number */}
                    <div className="max-w-sm my-3 mx-3 md:mx-5 flex flex-col gap-3">
                        <Input placeholder="Enter Email/Mobile Number"
                            className="w-full border-0 border-b border-gray-400 rounded-none 
                            focus:outline-none focus-visible:outline-none 
                            focus:ring-0 focus-visible:ring-0 
                            focus:border-blue-500 shadow-none" />
                        <p className="text-sm text-zinc-400 font-mono">By continuing, you agree to Trendora's <span className="text-blue-600">Terms Of Use </span>and <span className="text-blue-600">Privacy Policy</span></p>
                        <button className="text-sm md:text-md text-white font-semibold bg-orange-500     flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">CONTINUE</button>        
                    </div>
                </div>

                {/* One pair of container - Login Or Signup */}
                <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white">
                    {/* Blue Login Signup */}
                    <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
                        <Fingerprint size={20} />
                        <p className="font-medium text-white ">LOGIN OR SIGNUP</p>
                    </div>
                    {/* Email/Mobile Number */}
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center ">
                        {/* Login Signup */}
                        <div className="max-w-sm my-3 mx-3 md:mx-5 flex flex-col gap-3">
                            <Input placeholder="Enter Email/Mobile Number"
                                className="w-full border-0 border-b border-gray-400 rounded-none 
                                focus:outline-none focus-visible:outline-none 
                                focus:ring-0 focus-visible:ring-0 
                                focus:border-blue-500 shadow-none" />
                            <p className="text-sm text-zinc-400 font-mono">By continuing, you agree to Trendora's <span className="text-blue-600">Terms Of Use </span>and <span className="text-blue-600">Privacy Policy</span></p>
                            <button className="text-sm md:text-md text-white font-semibold bg-orange-500     flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">CONTINUE</button> 
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
                <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white">
                    {/* Delivery Address Header */}
                    <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
                        <MapPinned size={20} />
                        <p className="font-medium text-white ">DELIVERY ADDRESS</p>
                    </div>

                    {/* Main body */}
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center ">
                        <div className="mx-3 md:mx-5 my-3 md:my-5 w-full flex justify-between items-start ">
                            <div className="flex gap-2 items-start justify-start">
                                {/* Selection Badge */}
                                <div className="mt-1 ml-1">
                                    <BadgeCheck size={18} color="#2563EB" className=""/>
                                </div>
                                {/* Actual Address Line by Line */}
                                <div className="flex flex-col gap-2 justify-start items-start">
                                    {/* Line 1 */}
                                    <div className="flex gap-2 items-center">
                                        <p className="font-medium">Dr. Selvaranai</p>
                                        <p className="bg-zinc-200 p-1 text-zinc-600 text-xs font-medium">HOME</p>
                                        <p className="font-medium">9597889163</p>

                                    </div>
                                    
                                    {/* Line 2 */}
                                    <div className="flex flex-col">
                                        <p className="max-w-md">12/10, SRS illam near Masweltech Company, Amman Nagar, Dinnur, Hosur</p>
                                        <p className="font-medium">635109</p>
                                    </div>

                                    {/* Deliver Here Button */}
                                    <button className="text-sm md:text-md text-white font-semibold bg-orange-500 flex-1 flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">DELIVER HERE</button>

                                </div>
                            </div>

                            {/* Edit */}
                            <div className="text-blue-600 font-medium cursor-pointer text-sm md:text-md mx-1">
                                EDIT
                            </div>

                        </div>       
                    </div>

                    {/* Main body */}
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center ">
                        <div className="mx-3 md:mx-5 my-3 md:my-5 w-full flex justify-between items-start ">
                            <div className="flex gap-2 items-start justify-start">
                                {/* Selection Badge */}
                                <div className="mt-1 ml-1">
                                    <BadgeCheck size={18} color="#2563EB" className=""/>
                                </div>
                                {/* Actual Address Line by Line */}
                                <div className="flex flex-col gap-2 justify-start items-start">
                                    {/* Line 1 */}
                                    <div className="flex gap-2 items-center">
                                        <p className="font-medium">Dr. Selvaranai</p>
                                        <p className="bg-zinc-200 p-1 text-zinc-600 text-xs font-medium">HOME</p>
                                        <p className="font-medium">9597889163</p>

                                    </div>
                                    
                                    {/* Line 2 */}
                                    <div className="flex flex-col">
                                        <p className="max-w-md">12/10, SRS illam near Masweltech Company, Amman Nagar, Dinnur, Hosur</p>
                                        <p className="font-medium">635109</p>
                                    </div>

                                    {/* Deliver Here Button */}
                                    <button className="text-sm md:text-md text-white font-semibold bg-orange-500 flex-1 flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">DELIVER HERE</button>

                                </div>
                            </div>

                            {/* Edit */}
                            <div className="text-blue-600 font-medium cursor-pointer text-sm md:text-md mx-1">
                                EDIT
                            </div>

                        </div>       
                    </div>


                </div>

                {/* Third pair of container - Order Summary */}
                <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white">
                    {/* Order Summary Header */}
                    <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
                        <ListOrdered size={20} />
                        <p className="font-medium text-white ">ORDER SUMMARY</p>
                    </div>

                    {/* Order Details */}
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start p-3 md:p-5 gap-5 md:gap-10"> 
                        {/* Image and Count */}
                        <div className="flex flex-col gap-2 justify-center items-center h-50">
                            <img src="/Products/Camera.png" alt="" className="w-40 h-40 object-cover " />
                            <div className="flex gap-2 items-center">
                                <CircleMinus size={20} className="text-zinc-400"/>
                                <div className="py-0.5 w-14 text-center bg-transparent border-1 border-zinc-400 rounded-xs font-medium">
                                    1
                                </div>
                                <CirclePlus size={20} className=""/>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col max-w-sm justify-between items-start lg:h-50">
                            <p className="text-zinc-950 font-normal truncate max-w-xs md:max-w-sm">The Lenovo IdeaPad 3 is a reliable and lightweight laptop perfect for work, study, and entertainment. It offers a Full HD display, decent processing power, and a comfortable keyboard for daily tasks. </p>
                            <p className="text-zinc-500 text-sm">Seller: SRS Enterprises</p>
                            <p className="flex gap-2 items-end">
                                <span className="text-sm text-zinc-500 font-medium">$5000</span> 
                                <span className="text-md font-medium">$3500</span>
                            </p>
                            <span className="flex items-center gap-1 text-sm font-medium text-green-700"><span>Offer valid till today</span> <CircleAlert size="18"/></span>
                            <button className="font-medium text-md hover:cursor-pointer">REMOVE</button>
                        </div>

                        <div className="hidden lg:block self-start">
                            Delivery in 2-3 business days
                        </div>

                    </div>

                </div>


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
                                        <input type="text" className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                                        placeholder="XXXX XXXX XXXX XXXX" />
                                    </div>

                                    {/* Valid thru and CVV */}
                                    <div className="w-full flex gap-4 justify-between items-center h-9">
                                        {/* Valid Thru */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <p>Valid Thru</p>
                                            <input type="number" className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                                            placeholder="MM / YY" />
                                        </div>


                                        <div className="flex flex-col gap-2 w-full">
                                            <p>Card Number</p>
                                            <input type="text" className="w-full appearance-none outline-none border border-gray-300 rounded-md px-2 py-1 focus:border-1 focus:border-blue-400 focus:shadow text-md h-9"
                                            placeholder="XXXX XXXX XXXX XXXX" />
                                        </div>
                                      
                                    </div>
                                    <button className="w-full text-sm md:text-md text-white font-semibold bg-blue-600     flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-md  hover:cursor-pointer">
                                        Pay $10000
                                    </button>

                                </div>
                            )}
                        </div>                  



                    </div>

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