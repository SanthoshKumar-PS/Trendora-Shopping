import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { Button } from "../components/ui/button";
import { formatCurrency } from "../lib/formatCurrency";
import { FileDown, Home, MessagesSquare, User } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";
import axios from "axios";
import type { Order } from "../types/Types";
import type { GetOrderDetailsType } from "../types/ResponseTypes";
import { formatOrderDate } from "../lib/dateFormatter";
import { formatStatus } from "../lib/formatStatus";
import { formatAddress } from "../lib/formatAddress";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./pdf/PdfDocument";
import { Buffer } from "buffer";
window.Buffer = Buffer;



const OrderPage = () => {
    const {id} = useParams<{id:string}>();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    console.log("orderId: ",id);
    const {user} = useUser();
    const [order,setOrder] = useState<Order | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    const getOrderDetails = async () => {
        try{
            setIsLoading(true);
            const response = await axios.get<GetOrderDetailsType>(`${BACKEND_URL}/user/order/${id}`,{withCredentials:true});
            console.log(response.data);
            if(response.status===200){
                setOrder(response.data.order);
            }
            else{
                console.log("Handle Error")
            }
            setIsLoading(false)

        }
        catch(error){
            console.log("Error occured while fetching order details");
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getOrderDetails();
    },[])


    if(isLoading){
        return <LoadingScreen/>
    }
  return (
  <div className="bg-gray-50">
    <Navbar seller={user.role==='SELLER'} />
    
    <div className="max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-4">
        <div className="flex gap-5 flex-col md:flex-row justify-start items-center md:items-start">
            {/* Left Portion */}
            <div className="w-full flex flex-col gap-3 mg:gap-4 shadow-xl">
                {/* First Card Section - With Products */}
                <div className="w-full bg-white flex flex-col shadow-sm rounded-xs overflow-hidden ">
                    {order?.orderDetails.map((orderDetail,index)=>
                    // Each Product
                    <div key={index} className="flex w-full justify-between items-center p-3 md:p-4 border-b border-zinc-200">
                        <div className="flex flex-col justify-center items-start gap-1">
                            <Button className="text-xs md:text-sm  bg-zinc-200/50 text-zinc-500 font-medium hover:bg-zinc-300 rounded-md px-3 py-1">RATE</Button>
                            <h1 className="text-md md:text-lg font-medium">{orderDetail.product.name}</h1>
                            <p className="text-zinc-400 text-sm md:text-md">Ordered on: {formatOrderDate(order.createdAt)}</p>
                            <p className="text-zinc-600 text-sm md:text-md">Total Pcs: {orderDetail.quantity}</p>
                            <p className="text-zinc-600 text-sm md:text-md">Price Per Item: {formatCurrency(orderDetail.discountedPrice)}</p>
                            <p className="font-medium text-md md:text-lg mb-4">{formatCurrency(orderDetail.totalPrice)}</p>
                        </div>
                        <img src={`${orderDetail.product.images[0]}`} alt="Camera Image" className="w-24 h-24 md:w-30 md:h-30 lg:w-34 lg:h-34 object-cover" />
                    </div>
                    )}

                    <div className="py-4 flex justify-center items-center gap-2 hover:bg-blue-200 hover:cursor-pointer">
                        <MessagesSquare size={20} className=""/>
                        <p className="font-medium text-md">Contact us</p>
                    </div>
                </div>


            </div>

            {/* Right Portion */}
            {/* Delivery Details and Price Details */}
            <div className="flex flex-col justify-start items-center gap-3 md:gap-4 shadow-xl">
                {/* Delivery Details */}
                <div className="w-full bg-white flex flex-col shadow-sm rounded-xs overflow-hidden p-2 md:p-4 gap-2">
                    <p className="font-medium">Delivery Address</p>
                    {/* Address and Name Card */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden p-3 flex flex-col justify-center items-start gap-3">
                        <div className="flex items-center justify-start gap-1">
                            <Home size={16} className="text-gray-800"/>
                            <p className="text-gray-800 font-medium text-sm ">{formatStatus(order?.address?.type??"Home")}</p>
                            <p className="truncate max-w-64 text-sm">
                            {formatAddress({
                                line1: order?.address?.line1 || "",
                                line2: order?.address?.line2 || "",
                                city: order?.address?.city || "",
                                state: order?.address?.state || "",
                                pincode: order?.address?.pincode || "",
                            })}
                            </p>

                        </div>
                        <div className="w-full border-b border-gray-300"></div>
                        <div className="flex items-center justify-start gap-1">
                            <User size={16} className="text-gray-800"/>
                            <p className="text-gray-800 font-medium max-w-46 truncate text-sm">{order?.user?.name}</p>
                            <p className="truncate max-w-64 text-sm">{order?.address?.phone}</p>
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
                            <p className="text-sm line-through">{formatCurrency(order?.totalActualAmount??0)}</p>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <p className="text-sm">Extra Discount</p>
                            <p className="text-green-600 text-sm">{formatCurrency((order?.totalActualAmount??0)-(order?.totalAmount??0))}</p>
                        </div>
                        <div className="w-full border-b border-dashed border-gray-500"></div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <p className="text-sm">Total Amount</p>
                            <p className="font-medium text-sm">{formatCurrency(order?.totalAmount??0)}</p>
                        </div>

                        {/* Download Invoice */}
                        <button className="self-center flex items-center justify-center gap-2 py-5 px-4 bg-white rounded-md border border-gray-300 hover:bg-blue-200 hover:cursor-pointer">
                        <PDFDownloadLink
                            document={<PdfDocument order={order!} />}
                            fileName={`Invoice-${order?.orderNo}.pdf`}
                        >
                            {({ loading }) => (
                            <div className="flex items-center gap-2">
                                <FileDown size={20} />
                                <p className="font-medium">
                                {loading ? "Preparing Invoice..." : "Download Invoice"}
                                </p>
                            </div>
                            )}
                        </PDFDownloadLink>
                        </button>



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

export default OrderPage