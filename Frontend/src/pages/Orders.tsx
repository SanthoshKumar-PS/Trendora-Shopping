import { ChevronRight, MoveDown, MoveUp, Search, X } from "lucide-react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { formatCurrency } from "../lib/formatCurrency";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { statusMap, type Order } from "../types/Types";
import LoadingScreen from "../components/LoadingScreen";
import type { UserOrderResponse } from "../types/ResponseTypes";
import { formatOrderDate } from "../lib/dateFormatter";
import { formatStatus } from "../lib/formatStatus";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination/Pagination";
import { useDebounce } from "../components/DebounceSearch";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../components/ui/select"
const Orders = () => {
  const { user, setUser } = useUser();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState<UserOrderResponse[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [searchParams, setSearchParams] = useState<string>("");
  const debounceValue = useDebounce(searchParams,500);
  const [totalOrdersCount,setTotalOrdersCount] = useState<number>(0);
  const [pageNo,setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit,setLimit] = useState<number>(5);


  const getAllUserOrder = async () => {
    try {
      type UserOrderResponseType = {
        message: string;
        orders: UserOrderResponse[];
        totalOrdersCount:number;
        totalPages:number;
      };
      setIsLoading(true);
      const response = await axios.get<UserOrderResponseType>(
        `${BACKEND_URL}/user/getAllOrders`,
        {
          withCredentials: true,
          params:{
            pageNo,
            limit,
            search:debounceValue
          }
        },
      );
      if (response.status === 200) {
        console.log(response.data);
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
        setTotalOrdersCount(response.data.totalOrdersCount);
      }
    } catch (error) {
      console.log("Error occured while fetching orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUserOrder();
  }, [pageNo,limit,debounceValue]);


  return (
    <div className="bg-gray-50 ">
      <Navbar seller={user.role === "SELLER"} />
      
      <div className="max-w-5xl mx-auto px-2 md:px-4 space-y-4 my-2 md:my-4">
        {/* Search Bar */}
        <div className="w-full flex justify-start items-center gap-3 my-4">
          <div className="flex-1 relative">
            <span className="absolute top-0 bottom-0 left-0 ml-3 flex items-center text-gray-700/80">
              <Search size={18} />
            </span>
            <input
            type="text"
            onChange={(e) => {
              setSearchParams(e.target.value);
              setPageNo(1)
            }}
            value={searchParams}
            className="pl-10 outline-none w-full bg-white border border-gray-300 rounded-sm px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-800 transition duration-200"
            placeholder="Search your orders here"
          />
          {searchParams && (<span className="absolute top-0 bottom-0 right-0 mr-3 flex items-center text-gray-700/80 ">
            <button onClick={(e)=>setSearchParams("")} className="p-1 hover:bg-gray-300/40 rounded-full transition-colors duration-300 ease-in-out">
              <X size={18}/>
            </button>
          </span>)}
            <span className="absolute top-0 bottom-0 left-0 ml-3 flex items-center">
              <Search size={18} className=""/>
            </span>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white font-medium rounded-sm px-3 py-2 hover:scale-105 hover:bg-blue-700 transition duration-300 hover:cursor-pointer">
            <Search size={20} />
            <span>Search Orders</span>
          </button>
        </div>

        {/* Order Cards */}
        {isLoading?(
          <LoadingScreen height="my-40 md:my-40"/>
        ):(
        <div className=" flex flex-col gap-2 md:gap-3">

          {orders.length ? (
            orders.map((order, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/order/${order.orderNo}`);
                }}
                className="bg-white border border-gray-300 rounded-sm p-2 md:p-4 flex justify-between items-center md:justify-start md:items-start gap-2 md:gap-4 shadow-sm shadow-zinc-300 hover:cursor-pointer"
              >
                <img
                  src={order.orderDetails[0].product.images[0]}
                  alt="Camera Image"
                  className="w-24 h-24 md:w-30 md:h-30 lg:w-34 lg:h-34 object-cover"
                />

                {/* Product Content */}
                <div className="flex gap-2 flex-col justify-center items-start md:flex-row md:w-full md:justify-between">
                  {/* Product Description */}
                  <div className="flex flex-col justify-start items-start gap-3  max-w-sm">
                    <p className="font-medium">{order.orderNo}</p>
                    <p className="text-gray-500 hidden text-sm md:max-w-xs md:overflow-hidden md:[display:-webkit-box] md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:2]">
                      Total Products : {order._count.orderDetails.toString()}
                    </p>
                    <p className="text-gray-600 hidden text-sm md:max-w-xs md:overflow-hidden md:[display:-webkit-box] md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:2]">
                      Deliver To: {order.address.name}, {order.address.city}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  {/* Status and Status Message */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-start items-center gap-2 text-xs md:text-sm font-medium">
                      <div
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                          statusMap[order.status].style
                        }`}
                      />
                      <p>
                        {formatStatus(order.status)} on{" "}
                        {formatOrderDate(order.orderDate)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {statusMap[order.status].message}
                    </p>
                  </div>
                </div>

                <button className="md:hidden">
                  <ChevronRight />
                </button>
              </div>
            ))
          ) : (
            <div className="my-30 flex flex-col justify-center items-center gap-4 font-medium text-md text-gray-600">
              No orders found
            </div>
          )}
        </div>
        )}

        {/* Pagination and Rows Count */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:items-center md:px-10">

          {/* Page Numbers */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <Pagination
              currentPage={pageNo}
                totalPages={totalPages}
                onChange={(p) => setPageNo(p)}
            />
          </div>

          {/* No Of Rows */}
          <div className="w-full md:w-auto flex justify-center items-center md:justify-end gap-3">
            <span className="font-medium">Results: {Math.min((pageNo-1)*limit+1,totalOrdersCount)} - {Math.min(totalOrdersCount,pageNo*limit)} of {totalOrdersCount}</span>
            <select
                className="border border-gray-300 rounded-md shadow-md px-1 py-1 bg-gray-100"
                value={limit}
                onChange={(e) => {
                setLimit(Number(e.target.value));
                setPageNo(1)
                }}
            >
                {[2, 5, 10, 20, 30, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                {pageSize}
                </option>
                ))}
            </select>
          </div>
        </div>

      </div>

      {/* Footer*/}
      <Footer />
    </div>
  );
};

export default Orders;
