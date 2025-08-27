import { Eye, Heart, Pencil } from "lucide-react"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"

const Products = () => {
  const navigate=useNavigate()
  return (
    <div>
        <Navbar seller={true}/>
        <div className="w-full border-b border-zinc-300"></div>

        <div className="max-w-7xl mx-auto mt-6">
          {/* Heading */}
          <div className="flex items-center justify-between px-3 gap-6 mx-6">
            <h1 className="text-xl text-heading font-medium font-serif  ">All Products</h1>
            <button className="bg-zinc-800 px-3 py-2 rounded-md text-white font-serif hover:cursor-pointer hover:scale-105"
              onClick={()=>navigate("/addproduct")}>
              Add Product
            </button>
          </div>

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
              {Array.from({ length: 10 }).map((_, i) =>(
              <div className="relative flex flex-col gap-2  items-start justify-start mx-1 ">
                  <div key={i} className="bg-[#F5F5F5] h-50 w-50 md:h-60 md:w-60  rounded-md overflow-hidden">
                      <img src="/Products/Camera.png" alt="Product Image" className="object-cover w-full h-full hover:scale-95" />
                  </div>
                  <div className="p-2 sm:text-sm md:text-md ">
                      <p className="font-semibold font-serif">Sony DSLR Camera</p>
                      <p className=" text-red font-medium">$120 <span className="line-through text-gray-700">$120</span></p>
                      <p className=" text-yellow-500 font-medium">4.8/5.0</p>
                  </div>


                  {/* Absolute Discount and Icons */}
                  <p className="absolute top-4 left-4 px-2 py-1 bg-red text-white font-light text-xs rounded-sm">-40%</p>
                  <div className="absolute top-4 right-4 flex flex-col gap-2 ">
                      <div className="bg-white text-heading p-2 rounded-full hover:scale-115">
                          <Pencil size={18}/>
                          
                      </div>
                      <div className="bg-white text-heading p-2 rounded-full hover:scale-105">
                          <Eye size={18}/>
                      </div>
                  </div>

              </div>
                  ))}
          </div>




        </div>

    </div>
  )
}

export default Products