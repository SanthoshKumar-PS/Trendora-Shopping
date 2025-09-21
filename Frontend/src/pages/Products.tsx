import { Eye, Pencil, ShoppingCart, SquareCheckBig } from "lucide-react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import RatingStars from "../components/RatingStars"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
import { useCart } from "../context/CartContext"
import type { ProductWithCart } from "../types/Types"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useUser } from "../context/UserContext"


const Products = ({showNavbar=true}:{showNavbar?:boolean}) => {
  const navigate=useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [products,setProducts] = useState<ProductWithCart[]>([])  
//   const {cartId, setCartId, cartProducts, addToCart, removeFromCart, clearCart, refetchCart, isCartFetching} = useCart();
  const {cartId, addToCart, removeFromCart, refetchCart} = useCart();
  const {user} = useUser()
  const queryClient = useQueryClient();

  

  interface ViewProductResponse {
    message : string
    products? : ProductWithCart[];
    nextPage : number | null;
  }
  const getUserProducts = async ({pageParam=1}) => {
      const response = await axios.get<ViewProductResponse>(`${BACKEND_URL}/user/getHomeProducts`,
        {
          withCredentials: true,
          params: { pageStr: pageParam, limitStr: 12 },
        }
      );
      return response.data;
    }

  const {data, fetchNextPage,hasNextPage,isFetchingNextPage,isLoading} = useInfiniteQuery({
    queryKey:["products"],
    queryFn:getUserProducts,
    getNextPageParam:(lastPage,allPage)=>
      lastPage.nextPage?allPage.length+1:undefined,
    initialPageParam:1
  })

  
  const allProducts = data?.pages.flatMap(page=>page.products)??[]

  const updateOptimistic = (product:ProductWithCart, result:boolean) =>{
      return queryClient.setQueryData(["products"], (oldData: any) => {
    if (!oldData) return oldData;
    return {
      ...oldData,
      pages: oldData.pages.map((page: any) => ({
        ...page,
        products: page.products.map((p: any) =>
          p.id === product?.id ? { ...p, isInCart: result } : p
        ),
      })),
    };
  });
  }

  useEffect(()=>{
        const handleScroll = () =>{
            if(!hasNextPage  || isFetchingNextPage) return;

            const scrollTop = window.scrollY;
            const windowSize = window.innerHeight;
            const websiteHeight = document.documentElement.scrollHeight;
            
            if(((scrollTop+windowSize)/websiteHeight)>0.7){
              console.log("Fetching next set of values")
              fetchNextPage()
              
            }
        }

        window.addEventListener("scroll",handleScroll)
        return () => window.removeEventListener("scroll",handleScroll)
    },[hasNextPage,isFetchingNextPage,fetchNextPage])



  if(isLoading){
    return <LoadingScreen/>
  }


  return (
    <div>
      { showNavbar && (
        <Navbar seller={user.role==='SELLER'}/>
      )}

      {showNavbar && (
        <div className="w-full border-b border-zinc-300"></div>
      )}


        <div className="max-w-7xl mx-auto mt-6">
          {/* Heading */}
          {/* <div className="flex items-center justify-between px-3 gap-6 mx-6">
            <h1 className="text-xl text-heading font-medium font-serif  ">All Products</h1>
            <button className="bg-zinc-800 px-3 py-2 rounded-md text-white font-serif hover:cursor-pointer hover:scale-105"
              onClick={()=>navigate("/addproduct")}>
              Add Product
            </button>
          </div> */}

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
              {allProducts && allProducts.map((product, i) =>(
              <div key={i} onClick={()=>navigate(`/product/${product?.id}`)} className="relative group flex flex-col gap-2  items-start justify-start mx-1 ">
                  <div key={i} className="bg-[#F5F5F5] h-50 w-50 md:h-60 md:w-60  rounded-md overflow-hidden">
                      <img src={product?.images[0]} alt="Product Image" className="object-contain w-full h-full group-hover:scale-95" />
                  </div>
                  <div className="p-2 sm:text-sm md:text-md ">
                      <p className="font-semibold font-serif">{product?.name}</p>
                      <p className=" text-red font-medium">${product?.discountedPrice} <span className="line-through text-gray-700">${product?.actualPrice}</span></p>
                      {product?.avgRating!==0.0?
                        (
                          <div>
                            <p className=" text-yellow-500 font-medium">{product?.avgRating}/5.0</p>
                            <RatingStars rating={product?.avgRating??0}/>
                          </div>

                        ):(
                        <p className=" text-yellow-300 font-medium">No Ratings</p>
                        )}

                  </div>

                  {/* <div className="hidden group-hover:flex gap-2 w-full items-center  ">
                    <button className="text-sm md:text-md text-white font-semibold bg-yellow-500 flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">Add To Cart</button>
                    <button className="text-sm md:text-md text-white font-semibold bg-orange-500 flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">Buy Now</button>

                  </div> */}

                  {/* Absolute Discount and Icons */}
                  <p className="absolute top-4 left-4 px-2 py-1 bg-red text-white font-light text-xs rounded-sm">-{product?.discountPercentage}%</p>
                  <div className="absolute top-4 right-4 flex flex-col gap-2 ">
                      <div className="bg-white text-heading p-2 rounded-full hover:scale-115">
                        {product?.isInCart?(
                          <SquareCheckBig size={18} 
                            onClick={(e)=>{
                              e.stopPropagation();
                              removeFromCart({cartId: cartId??0,productId: product.id})
                              updateOptimistic(product!,false)

                            }}/>
                        ):(
                          <ShoppingCart size={18} 
                            onClick={(e)=>{
                              e.stopPropagation();
                              addToCart({cartId:cartId??0,productId:product?.id??0})
                              updateOptimistic(product!,true)


                            }}/>
                        )}
                          
                          
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