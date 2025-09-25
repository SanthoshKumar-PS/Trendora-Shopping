import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { Button } from "../components/ui/button";
import { formatCurrency } from "../lib/formatCurrency";
import { FileDown, Home, MessageSquare, MessagesSquare, User } from "lucide-react";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";

const Order = () => {
    const {id} = useParams<{id:string}>();
    console.log("orderId: ",id);
    const {user} = useUser();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate()




    if(isLoading){
        return <LoadingScreen/>
    }
  return (
  <div className="bg-gray-100">
    <Navbar seller={user.role==='SELLER'}/>
    <div className="w-full border-b border-zinc-300"></div>
    
    <div className="max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-4">
        <div className="flex gap-5 flex-col md:flex-row justify-start items-center md:items-start">
            {/* Left Portion */}
            <div className="w-full flex flex-col gap-3 mg:gap-4">
                {/* First Card Section - With Products */}
                <div className="w-full bg-white flex flex-col shadow-sm rounded-xs overflow-hidden ">
                    {Array.from({length:1}).map((_,index)=>
                    // Each Product
                    <div key={index} className="flex w-full justify-between items-center p-3 md:p-4 border-b border-zinc-200">
                        <div className="flex flex-col justify-center items-start gap-2">
                            <Button className="text-xs md:text-sm  bg-zinc-100 text-zinc-500 font-medium hover:bg-zinc-200 rounded-xs">RATE</Button>
                            <h1 className="text-md md:text-lg font-medium">Iphone 13 pro max (126GB)</h1>
                            <p className="text-zinc-400 text-sm md:text-md">Ordered on: 12th April 2024</p>
                            <p className="font-medium text-md md:text-lg mb-4">{formatCurrency(1000)}</p>
                        </div>
                        <img src="/Products/Camera.png" alt="Camera Image" className="w-24 h-24 md:w-30 md:h-30 lg:w-34 lg:h-34 object-cover" />
                    </div>
                    )}

                    <div className="py-4 flex justify-center items-center gap-2 hover:bg-blue-200 hover:cursor-pointer">
                        <MessagesSquare size={20} className=""/>
                        <p className="font-medium text-md">Contact us</p>
                    </div>
                </div>

                {/* Recent issue section - Now empty */}
                <div className="w-full bg-white flex flex-col shadow-sm rounded-xs overflow-hidden ">
                    {/* This is myissue */}
                </div>
            </div>

            {/* Right Portion */}
            {/* Delivery Details and Price Details */}
            <div className="flex flex-col justify-start items-center gap-3 md:gap-4">
                {/* Delivery Details */}
                <div className="w-full bg-white flex flex-col shadow-sm rounded-xs overflow-hidden p-2 md:p-4 gap-2">
                    <p className="font-medium">Delivery Address</p>
                    {/* Address and Name Card */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden p-3 flex flex-col justify-center items-start gap-3">
                        <div className="flex items-center justify-start gap-1">
                            <Home size={16} className="text-gray-800"/>
                            <p className="text-gray-800 font-medium text-sm ">Home</p>
                            <p className="truncate max-w-64 text-sm ">No.15, JRD Hill View, Kovaipudur, Coimbatore</p>
                        </div>
                        <div className="w-full border-b border-gray-300"></div>
                        <div className="flex items-center justify-start gap-1">
                            <User size={16} className="text-gray-800"/>
                            <p className="text-gray-800 font-medium max-w-46 truncate text-sm">Santhosh Kumar Periyanahalii sa</p>
                            <p className="truncate max-w-64 text-sm">9597889163</p>
                        </div>

                    </div>
                </div>

                {/* Price Details */}
                <div className="w-full bg-white flex flex-col shadow-sm rounded-xs overflow-hidden p-2 md:p-4 gap-2">
                    <p className="font-medium">Price Details</p>
                    {/* Address and Name Card */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden p-3 flex flex-col justify-center items-start gap-3">
                        <div className="w-full flex justify-between items-center gap-2">
                            <p className="text-sm">Selling price</p>
                            <p className="text-sm line-through">{formatCurrency(4000)}</p>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <p className="text-sm">Extra Discount</p>
                            <p className="text-green-600 text-sm">{formatCurrency(-700)}</p>
                        </div>
                        <div className="w-full border-b border-dashed border-gray-500"></div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <p className="text-sm">Total Amount</p>
                            <p className="font-medium text-sm">{formatCurrency(32000)}</p>
                        </div>

                        {/* Download Invoice */}
                        <div className="self-center flex items-center justify-center gap-2 py-5 px-4 bg-white rounded-md border border-gray-300 hover:bg-blue-200 hover:cursor-pointer"
                            onClick={()=>{navigate('/pdf')}}>
                            <FileDown size={20}/>
                            <p className="font-medium">Download Invoice</p>
                        </div>

                    </div>
                </div>



            </div>

        </div>

        <div className="flex gap-5 flex-col md:flex-row justify-start items-start">
            <div className="flex w-full justify-between items-center">
                

            </div>

        </div>
    </div>

    {/* Footer */}
    <Footer/>
    </div>
  )
}

export default Order