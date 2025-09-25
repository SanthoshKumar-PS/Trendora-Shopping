import AddProduct from "./pages/seller/AddProduct"
import  Home  from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/seller/Dashboard"
import Orders from "./pages/Orders"
import SignUp from "./pages/SignUp"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import CheckOut from "./pages/CheckOut"
import { CartProvider } from "./context/CartContext"  
import Cart from "./pages/Cart"
import SellerProducts from "./pages/seller/SellerProducts"
import Products from "./pages/Products"
import ProductPage from "./pages/seller/Product"
import { UserProvider } from "./context/UserContext"
import Pdf from "./pages/pdf/Pdf"
import Order from "./pages/Order"

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}> 
      <CartProvider>
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/checkout" element={<CheckOut/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/order/:id" element={<Order/>}/>
            <Route path="/pdf/:id" element={<Pdf/>}/>

            {/* Seller */}
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/sellerproducts" element={<SellerProducts/>}/>
            <Route path="/addproduct" element={<AddProduct/>}/>
            <Route path="/product/:id" element={<ProductPage/>}/>            
          </Routes>

        
        </BrowserRouter>
      </UserProvider>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
