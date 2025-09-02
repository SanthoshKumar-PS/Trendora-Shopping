import { useState } from "react"
import Navbar from "../components/Navbar"
import { Bell, Fingerprint, Star, Truck } from "lucide-react"
import { Input } from "../components/ui/input"

const CheckOut = () => {
    const activeTab = useState<number>(1)
  return (
    <div className="bg-zinc-100 min-h-screen">
        <Navbar/>
        <div className="w-full border-b border-zinc-300"></div>

        <div className="max-w-4xl mx-auto mt-6 ">
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
                



            </div>
        </div>

    </div>
  )
}

export default CheckOut