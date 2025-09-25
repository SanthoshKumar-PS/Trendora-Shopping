import { ChevronRight, Search } from "lucide-react"
import Navbar from "../components/Navbar"
import { useUser } from "../context/UserContext"
import { formatCurrency } from "../lib/formatCurrency"
import Footer from "../components/Footer"
import axios from "axios"
import { useEffect, useState } from "react"
import { statusMap, type Order } from "../types/Types"
import LoadingScreen from "../components/LoadingScreen"
import type { UserOrderResponse } from "../types/ResponseTypes"
import { formatOrderDate } from "../lib/dateFormatter"
import { formatStatus } from "../lib/formatStatus"
import { useNavigate } from "react-router-dom"

const Orders = () => {
  const {user,setUser} = useUser();
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [orders,setOrders] = useState<UserOrderResponse[]>([]);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState<boolean>(true);

  const getAllUserOrder = async () => {
    try{
      type UserOrderResponseType = {
        message:string;
        orders: UserOrderResponse[]
      }
      setIsLoading(true);
      const response =await axios.get<UserOrderResponseType>(`${BACKEND_URL}/user/getAllOrders`,{withCredentials:true});
      if(response.status===200){
        console.log(response.data)
        setOrders(response.data.orders)
      } 

    }
    catch(error){
      console.log("Error occured while fetching orders");
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getAllUserOrder();
  },[])

  if(isLoading){
    return <LoadingScreen/>
  }

  return (
  <div >
    <Navbar seller={user.role==='SELLER'}/>
    <div className="w-full border-b border-zinc-300"></div>
    
    <div className="max-w-5xl mx-auto px-2 md:px-4">
      {/* Search Bar */}
      <div className="w-full flex justify-start items-center gap-3 my-4">
        <input className="outline-none flex-1 bg-white border border-gray-300 rounded-sm px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-800 transition duration-200"
          placeholder="Search your orders here"/>
          <button className="flex items-center gap-2 bg-blue-600 text-white font-medium rounded-sm px-3 py-2 hover:scale-105 hover:bg-blue-700 transition duration-300 hover:cursor-pointer">
            <Search size={20}/><span>Search Orders</span>
          </button>
      </div>

      {/* Order Cards */}
      <div className="my-4 flex flex-col gap-2 md:gap-3">

        {orders.length===0 && (
          <div className="my-30 flex flex-col justify-center items-center gap-4 font-medium text-md text-gray-600">
            No orders found
          </div>
        )}

        {orders.map((order,index)=>(
      <div key={index} onClick={()=>{navigate(`/order/${order.orderNo}`)}} className="bg-white border border-gray-300 rounded-sm p-2 md:p-4 flex justify-between items-center md:justify-start md:items-start gap-2 md:gap-4 shadow-sm shadow-zinc-300 hover:cursor-pointer">
        <img src="/Products/Camera.png" alt="Camera Image" className="w-24 h-24 md:w-30 md:h-30 lg:w-34 lg:h-34 object-cover" />

        {/* Product Content */}
        <div className="flex gap-2 flex-col justify-center items-start md:flex-row md:w-full md:justify-between">
          {/* Product Description */}
          <div className="flex flex-col justify-start items-start gap-3  max-w-sm">
            <p className="font-medium">{order.orderNo}</p>
            {/* <p className="text-gray-500 hidden text-sm md:max-w-xs md:overflow-hidden md:[display:-webkit-box] md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:2]">The HP Pavilion is a stylish and versatile laptop designed for both productivity and entertainment. With powerful performance, vibrant display options, and immersive audio, its well-suited for students, professionals, and everyday multitasking.</p> */}
            <p className="text-gray-500 hidden text-sm md:max-w-xs md:overflow-hidden md:[display:-webkit-box] md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:2]">Total Products : {order._count.orderDetails.toString()}</p>
            <p className="text-gray-600 hidden text-sm md:max-w-xs md:overflow-hidden md:[display:-webkit-box] md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:2]">Deliver To: {order.address.name}, {order.address.city}</p>
          </div>
          <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
          {/* Status and Status Message */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center gap-2 text-xs md:text-sm font-medium">
              <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${statusMap[order.status].style}`}/>
              <p>{formatStatus(order.status)} on {formatOrderDate(order.orderDate)}</p>
            </div>
            <p className="text-xs text-gray-500">{statusMap[order.status].message}</p>
          </div>

        </div>

        <button className="md:hidden"><ChevronRight/></button>



      </div>
        ))}
      </div>


    </div>
    
    {/* Footer*/}
    <Footer/>

  </div>
  )
}

export default Orders