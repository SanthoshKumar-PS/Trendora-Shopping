import AddProduct from "./pages/seller/AddProduct"
import  Home  from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/seller/Dashboard"
import Orders from "./pages/seller/Orders"
import Products from "./pages/seller/Products"
import SignUp from "./pages/SignUp"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Product from "./pages/seller/Product"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        {/* Seller */}
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>

    
    </BrowserRouter>
  )
}

export default App
