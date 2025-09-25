import { useEffect, useState } from "react"
import type { Order } from "../../types/Types";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { GetOrderDetailsType } from "../../types/ResponseTypes";
import { formatPdfDate } from "../../lib/dateFormatter";
import { formatCurrency } from "../../lib/formatCurrency";
import { convertNumberToWordsIndian } from "../../lib/convertNumberToWord";


const Pdf = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const {id} = useParams<{id:string}>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [order,setOrder] = useState<Order|null>(null);

    const getPdfDetails = async () => {
        try{
            setIsLoading(true);
            const response =await axios.get<GetOrderDetailsType>(`${BACKEND_URL}/user/getPdfOrder/${id}`,{withCredentials:true});
            if(response.status===200){
                console.log("Pdf Response :",response.data)
                setOrder(response.data.order)
            }
            else{
                console.log("Handle Error")
            }
            setIsLoading(false);
        }
        catch(error){
            console.log("Error ocured while generating PDF");
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getPdfDetails();
    },[])
  return (
    <div className='flex flex-col p-4 gap-4'>
        {/* Headers */}
        <div className="w-full flex flex-col justify-center items-center gap-1">
            <img src="/App/LogoWithName.png" alt="Logo" className="h-16 object-cover" />
            <h1 className="text-zinc-800 font-medium text-lg">Tax Invoice/Bill Of Supply</h1> 
            <h1 className="text-zinc-700 font-normal text-md">(Original for Recipient)</h1> 
        </div>

        {/* Addresses */}
        <div className="flex justify-between items-start">
            <div>
                <h1 className="font-medium text-zinc-800 text-md">Sold By:</h1>
                <p>Trendora Enterprises</p>
                <p>16th Main Rd, Lakshmi Layout, BTM Layout</p>
                <p>Bengaluru, Karnataka</p>
                <p>India - 560076</p>
                <p>Contact - 9597889163</p>
            </div>
            <div className="flex flex-col items-end">
                <h1 className="font-medium text-zinc-800 text-md">Shipping Address:</h1>
                <p className="">{order?.address?.name}</p>
                <p>{order?.address?.line1}, {order?.address?.line2}</p>
                <p>{order?.address?.city}, {order?.address?.state}</p>
                <p>India - {order?.address?.pincode}</p>
                <p>Contact - {order?.address?.phone}</p>
            </div>
           
        </div>

        {/* PAN GSTIN */}
        <div className="flex flex-col justify-center items-start">
            <p className=" text-md text-zinc-800">
                <span className="font-medium">PAN No: </span>
                <span>RAF12 TAH75 PLA25</span>
            </p>
            <p className=" text-md text-zinc-800">
                <span className="font-medium">GSTIN No: </span>
                <span>27ABCDE36AZHK8</span>
            </p>
        </div>

        {/* Order Details */}
        <div>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Order No: </span>
                <span>{order?.orderNo}</span>
            </p>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Order Date: </span>
                <span>{formatPdfDate(order?.createdAt)}</span>
            </p>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Total Amount: </span>
                <span>{order?.totalAmount != null ? formatCurrency(order.totalAmount) : "Not provided"}</span>
            </p>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Mode of Payment: </span>
                <span>{order?.paymentMethod}</span>
            </p>
        </div>

        {/* Order Table */}
        <div className="">
            <table className="w-full border border-gray-400 border-collapse ">
                <thead className="bg-gray-300">
                    <tr className="text-center ">
                        <th className="border border-gray-400 px-2 py-2 font-medium text-md ">
                            ID
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Product Name
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Description
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Unit Price
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Qty
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Total Amount
                        </th>
                    </tr>                    
                </thead>
                <tbody className="">
                    {order?.orderDetails.map((orderDetail,index)=>(
                    <tr key={index} className="text-center">
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            {index+1}
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            {orderDetail.product.name}  
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            {orderDetail.product.description} 
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            {formatCurrency(orderDetail.discountedPrice)}
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            {orderDetail.quantity}
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            {orderDetail.totalPrice}
                        </td>
                    </tr>
                    ))}
                </tbody>
                <tfoot>
                <tr className="font-semibold">
                    <td className="border border-gray-400 px-2 py-2 text-right" colSpan={5}>
                    Total Amount
                    </td>
                    <td className="border border-gray-400 px-2 py-2 text-center text-blue-600">
                        {order?.totalAmount != null ? formatCurrency(order.totalAmount) : "Not provided"}                    
                    </td>
                </tr>
                <tr className="font-semibold">
                    <td className="border border-gray-400 px-2 py-2 text-right" colSpan={6}>
                    Total Amount in Words : <span className="text-blue-600">{convertNumberToWordsIndian(order?.totalAmount??0)}</span>
                    </td>
                    {/* <td className="border border-gray-400 px-2 py-2 text-center text-blue-600" colSpan={3}>
                    One Lakh Thirty Six Thousands Only
                    </td> */}
                </tr>
                </tfoot>
                
            </table>
        </div>

        {/* Terms and Condition */}
        <div>
            <p className="font-semibold text-gray-800">Terms & Conditions:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>All orders are processed subject to availability and confirmation of payment.</li>
                <li>Products once sold are non-refundable and can only be exchanged if damaged or defective upon delivery.</li>
            </ul>
        </div>

        {/* Authorized Signature */}
        <div className="w-full flex justify-end">
            <img src="/App/Signature.png" alt="Authorized Signature" className="h-15"/>
        </div>
    </div>
  )
}

export default Pdf