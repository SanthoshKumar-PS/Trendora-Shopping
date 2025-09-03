import AddProduct from "./pages/seller/AddProduct"
import  Home  from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/seller/Dashboard"
import Orders from "./pages/seller/Orders"
import Products from "./pages/seller/Products"
import SignUp from "./pages/SignUp"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Product from "./pages/seller/Product"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import CheckOut from "./pages/CheckOut"

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckOut/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>

          {/* Seller */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/product/:id" element={<Product/>}/>
        </Routes>

      
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
