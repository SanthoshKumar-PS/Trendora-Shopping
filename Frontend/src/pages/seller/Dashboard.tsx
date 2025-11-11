import axios from "axios"
import Navbar from "../../components/Navbar"
import RecentOrders from "../../components/SellerDashboard/RecentOrders"
import { SellerProductSales } from "../../components/SellerDashboard/SellerProductSales"
import { useEffect, useState } from "react"
import LoadingScreen from "../../components/LoadingScreen"
import type { GetLastWeekSalesType, GetLatestTransactionsType, TransactionType } from "../../types/ResponseTypes"
import {  SalesLineChart } from "../../components/SellerDashboard/SalesLineChart"
import { ChartBarDefault } from "../../components/SellerDashboard/BarChart"
import { useUser } from "../../context/UserContext"

const Dashboard = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading,setIsLoading] = useState<boolean>(true);
  const [lastWeekSalesReport, setLastWeekSalesReport] = useState<GetLastWeekSalesType|null>(null);
  const [latestTransactions, setLatestTransactions] = useState<TransactionType[]>([]);

  const {user} = useUser();
  console.log("User details, ",user)

  const getSalesandTransactions = async () =>{
    try{
      setIsLoading(true);
      const [weeklySalesRes, transactionsRes] = await Promise.all([
        axios.get<GetLastWeekSalesType>(`${BACKEND_URL}/seller/getLastWeekSales`, { withCredentials: true }),
        axios.get<GetLatestTransactionsType>(`${BACKEND_URL}/seller/getRecentTransactions`, { withCredentials: true })
      ]);

      if(weeklySalesRes.status === 200){
        setLastWeekSalesReport(weeklySalesRes.data);
      }

      if(transactionsRes.status === 200){
        setLatestTransactions(transactionsRes.data.transactions);
      }
      setIsLoading(false);

    }
    catch(error){
      console.error("Error fetching dashboard data:", error);
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getSalesandTransactions();
  },[])

  if(isLoading){
    return <LoadingScreen/>
  }


  return (
    <div>
        <Navbar seller={true}/>

        <div className="bg-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            <SellerProductSales lastWeekSalesReport={lastWeekSalesReport} setLastWeekSalesReport={setLastWeekSalesReport}/>
            <RecentOrders latestTransactions={latestTransactions} setLatestTransactions={setLatestTransactions}/>
            <SellerProductSales lastWeekSalesReport={lastWeekSalesReport} setLastWeekSalesReport={setLastWeekSalesReport}/>
            <SalesLineChart/>
            <ChartBarDefault/>
        </div>

    </div>
  )
}

export default Dashboard