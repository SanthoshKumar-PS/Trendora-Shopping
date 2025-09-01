import { Eye,  Pencil } from "lucide-react"
import type { ProductType } from "../types"
import { useNavigate } from "react-router-dom"
import RatingStars from "../components/RatingStars"


const GetProducts = ({products}:{products:ProductType[]}) => {
    const navigate = useNavigate()
 

  return (
    <div>

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
              {products.map((product, i) =>(
              <div key={i} onClick={()=>navigate(`/product/${product.id}`)} className="relative group flex flex-col gap-2  items-start justify-start mx-1 ">
                  <div key={i} className="bg-[#F5F5F5] h-50 w-50 md:h-60 md:w-60  rounded-md overflow-hidden">
                      <img src={product.images[0]} alt="Product Image" className="object-contain w-full h-full group-hover:scale-95" />
                  </div>
                  <div className="p-2 sm:text-sm md:text-md ">
                      <p className="font-semibold font-serif">{product.name}</p>
                      <p className=" text-red font-medium">${product.discountedPrice} <span className="line-through text-gray-700">${product.actualPrice}</span></p>
                      {product.avgRating!==0.0?
                        (
                          <div>
                            <p className=" text-yellow-500 font-medium">{product.avgRating}/5.0</p>
                            <RatingStars rating={product.avgRating}/>
                          </div>

                        ):(
                        <p className=" text-yellow-300 font-medium">No Ratings</p>
                        )}

                  </div>


                  {/* Absolute Discount and Icons */}
                  <p className="absolute top-4 left-4 px-2 py-1 bg-red text-white font-light text-xs rounded-sm">-{product.discountPercentage}%</p>
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

  )
}

export default GetProducts