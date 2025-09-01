import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import RatingStars from '../../components/RatingStars'
import { BadgeCheck, ShoppingCart, Zap } from 'lucide-react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../components/LoadingScreen'
import axios from 'axios'
import type { Feature, ProductType } from '../../types'
import GetProducts from '../GetProducts'
const Product = () => {
    const {id}=useParams<{id:string}>()
    const productId = Number(id)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [loading,setLoading] = useState<boolean>(true );
    const [currentProduct,setCurrentProduct] = useState<ProductType|null>(null)
    const [productCategory,setProductCategory] = useState<number|undefined>(undefined);
    const [selectedImageIndex,setSelectedImageIndex] = useState<number>(0);

    // Recommedatation Products
    const [products, setProducts] = useState<ProductType[]>([])
    const [error, setError] = useState<string | null>(null)
    

    async function getProductDetails(){
        interface ProductDetailRespone{
            message : string
            product : ProductType | null
        }
        try{
            setLoading(true)
            const payload = { productId : productId}
            const response = await axios.get<ProductDetailRespone>(`${BACKEND_URL}/api/productdetails`,{
                params : payload,
                withCredentials : true
            })
            if(response.status===200){
                // console.log(response.data)
                setCurrentProduct(response.data.product)
                setProductCategory(response.data.product?.categoryId)
                if (response.data.product?.categoryId) {
                    await getProductRecommendation(response.data.product.categoryId)
                }

            }
            else{
                setError("Error while calling the selected product")
                console.log("Error occured in Product.tsx while getting details")
            }

        }
        catch(error){
            setError("Error while calling the selected product")
            console.log(error);
        }

    } 

    async function getProductRecommendation(categoryProduct:number){
        type ProductsRecommendType = {
            message : string
            products : ProductType[]
        }
        try{
            // console.log("Payload : ",categoryProduct)
            const payload = {
                productId : productId,
                productCategory : categoryProduct
            }
            const response = await axios.get<ProductsRecommendType>(`${BACKEND_URL}/api/recommendproducts`,{
                params:payload,
                withCredentials:true
            })

            if(response.status===200){
                console.log(response.data)
                setProducts(response.data.products)
            }


        }
        catch(error){
            setError("Error While Getting recommended products");
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getProductDetails()
    },[id])


    if(loading){
        return <LoadingScreen/>
    }

  return (
    <div>
        <Navbar seller={true}/>
        <div className="w-full border-b border-zinc-300"></div>

        {/* Show Now Top Bar - Only in Middle Screen */}
        <div className='hidden w-full bg-zinc-50 md:flex items-center justify-center gap-4 py-2'>
            <img src={currentProduct?.images[0]} alt="" className='w-12 h-12 object-cover ' />
            <div className='flex-col max-w-sm'>
                <p className='truncate'>{currentProduct?.description}</p>
                <RatingStars rating={currentProduct?.avgRating??0}/>
            </div>
            <h1>${currentProduct?.discountedPrice}</h1>
            <button className='px-3 py-2 text-white font-medium bg-yellow-400 rounded-lg hover:cursor-pointer hover:scale-95'>Buy Now</button>

        </div>


        {/* Product Description */}
        <div className='w-full p-4 md:p-8'>
            <div className='flex flex-col md:flex-row w-full items-center justify-center md:items-start'>
                {/* Image Section */}
                <div className='md:sticky md:top-0 w-full md:w-[50%] flex flex-col items-center justify-center mx-2 my-3  overflow-hidden '>
                    {/* Main Image */}
                    <div className='mt-2 w-96 h-75  flex items-center justify-center overflow-hidden rounded-md'>
                        <img src={currentProduct?.images[selectedImageIndex]} alt="" className=' object-cover' />
                    </div>
                    {/* Sub Images */}
                    <div className='flex gap-2 mx-2 my-2'>
                        {Array.from({length:5}).map((_,index)=>(
                            <div key={index} onClick={()=>{setSelectedImageIndex(index)}} 
                            className={` max-h-20 max-w-20 flex items-center justify-center bg-zinc-100 rounded-sm overflow-hidden hover:cursor-pointer ${selectedImageIndex===index?"border-2 border-blue-500":""}`}>
                                <img src={currentProduct?.images[index]} alt="" className='object-cover'/>
                            </div>
                        ))}

                    </div>
                    {/* Add to cart & Buy Now */}
                    <div className='mt-2 flex items-center w-full gap-4 '>
                        <button className='text-sm md:text-md text-white font-semibold bg-yellow-500 flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer'>
                            <ShoppingCart/>
                            <span>Add To Cart</span>
                        </button>
                        <button className='text-sm md:text-md text-white font-semibold bg-orange-500 flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xs hover:scale-95 hover:cursor-pointer'>
                            <Zap/>
                            <span>Buy Now</span>
                        </button>
                    </div>

                </div>

                {/* Description Section */}
                <div className='flex flex-col items-center justify-center gap-3 w-full md:w-[50%] mx-2 my-3 md:mr-5 '>
                    {/* Product Description */}
                    <div className='text-md font-medium'>
                        {currentProduct?.description}
                    </div>

                    {/* Price Details */}
                    <div className='w-full flex flex-col gap-1 items-start justify-start'>
                        <p className='text-green-600 text-md font-medium'>Special Price</p>
                        <div className='flex items-end gap-2'>
                            <p className='text-lg font-medium'>${currentProduct?.discountedPrice}</p>
                            <p className='text-md font-medium text-zinc-500 line-through'>${currentProduct?.actualPrice}</p>
                            {(currentProduct?.discountPercentage ?? 0) > 0 &&(
                                <p className='text-green-600 text-md font-medium'>{currentProduct?.discountPercentage}% off</p>
                            )}

                        </div>
                        <p>+ ₹99 Protect Promise Fee <span className='text-blue-500 font-medium underline hover:cursor-pointer'>Learn More</span></p>
                        <p className='text-red-500 text-sm font-medium'>Hurry, Only 2 left!</p>

                    </div>
                    
                    <div className='self-start flex gap-4'>
                        <RatingStars rating={currentProduct?.avgRating??0}/> 
                        <p>{currentProduct?.numRating} Ratings</p>
                    </div>



                    {/* Bottom Border */}
                    <div className='w-full border-b-1 border-zinc-400'></div>

                    {/* Features Table */}
                    <table className='self-start'>
                        <tbody className='table-auto border-collapse border-spacing-x-4 border-spacing-y-4 '>
                            {currentProduct?.features && currentProduct.features.map((feature:Feature,index:number)=>(
                                <tr key={index} className=''>
                                    <td className='align-top pr-1 p-1 text-sm font-medium'>{feature.label}</td>
                                    <td className='align-top p-1 text-sm'>:</td>
                                    <td className='pl-1 p-1 text-sm'>{feature.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Authentic Product */}
                    <div className='flex items-center justify-center space-x-1 text-md font-semibold  text-blue-500'>
                        <BadgeCheck size={20}/>
                        <span className='hidden lg:block text-center'>Safe and Secure Payments - Easy returns - 100% Authentic products.</span>
                        <span className='lg:hidden text-center'>Safe and Secure Payments</span>
                    </div>



                </div>
            </div>


        </div>

        <GetProducts products={products}/>
        {/* <Products/> */}


        

    </div>
  )
}

export default Product