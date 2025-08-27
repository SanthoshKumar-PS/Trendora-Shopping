import Navbar from "../../components/Navbar"
import RecentOrders from "../../components/Seller/RecentOrders"
import { SellerProductSales } from "../../components/Seller/SellerProductSales"

const Dashboard = () => {

  return (
    <div>
        <Navbar seller={true}/>
        <div className="w-full border-b border-zinc-300"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            <SellerProductSales/>
            <RecentOrders/>
            <SellerProductSales/>
            <SellerProductSales/>
            <SellerProductSales/>
            <SellerProductSales/>
        </div>

    </div>
  )
}

export default Dashboard