import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import RatingStars from '../../components/RatingStars'
import { BadgeCheck, CircleCheckBig, Package, Shield, ShoppingCart, Truck, Zap } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingScreen from '../../components/LoadingScreen'
import axios from 'axios'
import type { Feature, Product, ProductWithCart } from '../../types/Types'
import GetProducts from '../GetProducts'
import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../lib/formatCurrency'
import { useUser } from '../../context/UserContext'
const ProductPage = () => {
    const {id}=useParams<{id:string}>()
    const productId = Number(id)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const [loading,setLoading] = useState<boolean>(true );
    const [currentProduct,setCurrentProduct] = useState<ProductWithCart|null>(null)
    const [productCategory,setProductCategory] = useState<number|undefined>(undefined);
    const [selectedImageIndex,setSelectedImageIndex] = useState<number>(0);

    // useUser, useCart context
    const { user } = useUser();
    const {cartId, addToCart, removeFromCart, setCheckoutProducts} = useCart()

    // Recommedatation Products
    const [products, setProducts] = useState<ProductWithCart[]>([])
    const [error, setError] = useState<string | null>(null)
    
    // Pagination
    const [page,setPage] = useState<number>(1);
    const [limit,setLimit] = useState<number>(24);
    const [hasMore,setHasMore] = useState<boolean>(true);
    const [infiniteLoading,setInfiniteLoading] = useState<boolean>(false);
    

    async function getProductDetails(){
        interface ProductDetailRespone{
            message : string
            product : ProductWithCart | null
        }
        try{
            setLoading(true)
            const payload = { currentUserId:user.id,productId : productId}
            const response = await axios.get<ProductDetailRespone>(`${BACKEND_URL}/api/productdetails`,{
                params : payload,
                withCredentials : true
            })
            if(response.status===200){
                setCurrentProduct(response.data.product)
                setProductCategory(response.data.product?.categoryId)
                if (response.data.product?.categoryId) {
                    setPage(1)
                    setHasMore(true)
                    await getProductRecommendation(response.data.product.categoryId,1)
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
        finally{
            setLoading(false);
        }

    } 

    async function getProductRecommendation(categoryProduct:number,pageNum:number){
        type ProductsRecommendType = {
            message : string
            products : ProductWithCart[],
            currentPage : number,
            totalPages : number
        }
        try{
            console.log("Started to fetch")
            setInfiniteLoading(true)
            const payload = {
                productId : productId,
                productCategory : categoryProduct,
                pageStr:pageNum,
                limitStr:limit
            }
            const response = await axios.get<ProductsRecommendType>(`${BACKEND_URL}/api/recommendproducts`,{
                params:payload,
                withCredentials:true
            })

            if(response.status===200){
                console.log(response.data)
                if(pageNum===1){
                    setProducts(response.data.products)
                }
                else{
                    const newProducts= response.data.products
                    setProducts((prev)=>[...prev,...newProducts])
                    setHasMore(pageNum<response.data.totalPages)
                }
            }


        }
        catch(error){
            setError("Error While Getting recommended products");
            console.log(error)
        }
        finally{
            setInfiniteLoading(false)
        }
    }

    useEffect(()=>{
        getProductDetails()
    },[id])

    useEffect(()=>{
        const handleScroll = () =>{
            if(!hasMore || infiniteLoading) return;

            const scrollTop = window.scrollY;
            const windowSize = window.innerHeight;
            const websiteHeight = document.documentElement.scrollHeight;
            
            if(((scrollTop+windowSize)/websiteHeight)>0.8){
                setPage(prev=>{
                    const nextPage = prev+1;
                    if(productCategory){
                        getProductRecommendation(productCategory,nextPage)
                    }
                    return nextPage
                })
            }
        }

        window.addEventListener("scroll",handleScroll)
        return () => window.removeEventListener("scroll",handleScroll)
    },[productCategory, hasMore, infiniteLoading])

    const toggleCart = () =>{
        if(!currentProduct) return ;
        if(currentProduct.isInCart){
            setCurrentProduct(prev=>prev?{...prev,isInCart:false}:prev)
            
            removeFromCart(
                { cartId: cartId ?? 0, productId: currentProduct.id },
                {
                    onError:() =>{
                    setCurrentProduct(prev=>prev?{...prev,isInCart:true}:prev)
                    console.log("Rolled back as occur occured");
                    }
                });
        }
        else{
            setCurrentProduct(prev=>prev?{...prev,isInCart:true}:prev)
            addToCart(
                { cartId:cartId??0, productId:currentProduct.id},
                {
                    onError: ()=>{
                        setCurrentProduct(prev=>prev?{...prev,isInCart:false}:prev)
                        console.log("Rolled back as occur occured");
                    }
                }
            )
        }

    }


    if(loading){
        return <LoadingScreen/>
    }

  return (
    <div className='bg-gray-50'>
        <Navbar seller={user.role==="SELLER"}/>

        {/* Show Now Top Bar - Only in Middle Screen */}
        {/* <div className='hidden w-full md:flex items-center justify-center gap-4 py-2'>
            <img src={currentProduct?.images[0]} alt="" className='w-12 h-12 object-cover ' />
            <div className='flex-col max-w-sm'>
                <p className='truncate'>{currentProduct?.description}</p>
                <RatingStars rating={currentProduct?.avgRating??0}/>
            </div>
            <h1>${currentProduct?.discountedPrice}</h1>
            <button className='px-3 py-2 text-white font-medium bg-yellow-400 rounded-lg hover:cursor-pointer hover:scale-95'
                onClick={()=>navigate('/checkout', { state: { products:[currentProduct] } })}
                >Buy Now</button>

        </div> */}


        {/* Product Description */}
        <div className='w-full p-4 md:p-8'>
            <div className='flex flex-col md:flex-row w-full items-center justify-center md:items-start'>
                {/* Image Section */}
                <div className='bg-white p-2 rounded-lg shadow-md border border-gray-200 md:sticky md:top-0 w-full md:w-[50%] flex flex-col items-center justify-center mx-2 my-3  overflow-hidden '>
                    {/* Main Image */}
                    <div className='mt-2 w-96 h-75  flex items-center justify-center overflow-hidden rounded-lg'>
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
                    <div className='mt-2 flex items-center w-full gap-4 px-2'>
                        <button className='text-sm md:text-md text-white font-semibold bg-blue-500 flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg hover:scale-105 active:scale-100 hover:cursor-pointer transition-all duration-200'
                            onClick={()=>toggleCart()}>
                            <ShoppingCart/>
                            <span>{currentProduct?.isInCart?"Already In Cart":"Add To Cart"}</span>
                        </button>
                        <button className='text-sm md:text-md text-white font-semibold bg-orange-500 flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg hover:scale-105 active:scale-100 hover:cursor-pointer transition-all duration-200'
                        onClick={()=>{
                            if(currentProduct){
                                setCheckoutProducts([currentProduct]);
                                navigate('/checkout',{state: {products: [currentProduct]}})
                                // navigate('/test',{state: {products: [currentProduct]}})
                            }
                        }}>
                            <Zap/>
                            <span>Buy Now</span>
                        </button>
                    </div>

                </div>

                {/* Description Section */}
                <div className='flex flex-col items-center justify-center gap-3 w-full md:w-[50%] mx-2 my-3 md:mr-5 '>
                    {/* Product Name */}
                    <div className='text-2xl lg:text-3xl font-bold text-foreground self-center md:self-start'>
                        {currentProduct?.name}
                    </div>
                    {/* Product Description */}
                    <div className='text-muted-foreground'>
                        {currentProduct?.description}
                    </div>

                    {/* Price Details */}
                    <div className='border border-gray-300 bg-[#E4F5EA] p-4 rounded-lg w-full flex flex-col gap-1 items-start justify-start space-y-2'>
                        <p className='text-green-600 text-md font-medium flex items-center gap-2'><CircleCheckBig size={20}/>Special Price</p>
                        <div className='flex items-end gap-2'>
                            <p className='text-xl font-bold'>{formatCurrency(currentProduct?.discountedPrice??0)}</p>
                            <p className='text-md font-medium text-zinc-500 line-through'>{formatCurrency(currentProduct?.actualPrice??0)}</p>
                            {(currentProduct?.discountPercentage ?? 0) > 0 &&(
                                <p className='text-green-600 text-md font-medium'>{currentProduct?.discountPercentage}% off</p>
                            )}

                        </div>
                        <p className='text-muted-foreground text-sm'>+ ₹99 Protect Promise Fee <span className='text-blue-500 font-medium underline hover:cursor-pointer'>Learn More</span></p>
                        <p className='text-red-500 text-sm font-medium'>⚡ Hurry, Only 2 left!</p>

                    </div>
                    
                    {((currentProduct?.avgRating ?? 0) > 0 || (currentProduct?.numRating ?? 0) > 0) && (
                        <div className='self-start flex gap-4'>
                            <RatingStars rating={currentProduct?.avgRating??0}/> 
                            <p>{currentProduct?.numRating} Ratings</p>
                        </div>)}

                    {/* Badges */}
                    <div className='grid grid-cols-3 gap-3 '>
                        <div className='bg-white border border-gray-300 hover:border-blue-500 rounded-lg p-4 text-center transition-colors duration-300'>
                            <Shield className='w-6 h-6 text-blue-500 mb-2 mx-auto'/>
                            <p className='text-xs font-medium'>100% Authentic</p>
                        </div>
                        <div className='bg-white border border-gray-300 hover:border-blue-500 rounded-lg p-4 text-center transition-colors duration-300'>
                            <Truck className='w-6 h-6 text-blue-500 mb-2 mx-auto'/>
                            <p className='text-xs font-medium'>Fast Delivery</p>
                        </div>
                        <div className='bg-white border border-gray-300 hover:border-blue-500 rounded-lg p-4 text-center transition-colors duration-300'>
                            <Package className='w-6 h-6 text-blue-500 mb-2 mx-auto'/>
                            <p className='text-xs font-medium'>Easy Returns</p>
                        </div>

                    </div>


                    {/* New Features Card */}
                    <div className='bg-white border border-gray-300 rounded-xl p-6 w-full'>
                        <h2 className='text-lg font-bold mb-4'>Product Details</h2>
                        <div className='space-y-3'>
                            {currentProduct?.features && currentProduct.features.map((feature:Feature,index:number)=>(
                                <div key={index} className='flex py-2 border-b border-gray-300 last:border-0 gap-2'>
                                    <span className='text-muted-foreground font-medium w-1/3 '>
                                        {feature.label}
                                    </span>
                                    <span className='text-gray-800 flex-1 font-medium'>
                                        {feature.value}
                                    </span>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Authentic Product */}
                    <div className='w-full border border-gray-200 rounded-md text-blue-700 text-sm bg-blue-100/50 p-4 flex items-center justify-center space-x-1 text-md font-semibold text-center'>
                        <BadgeCheck size={20}/>
                        <span>Safe and Secure Payments • Easy Returns • 100% Authentic Products</span>
                    </div>



                </div>
            </div>


        </div>

        <GetProducts products={products}/>
        {/* <Products/> */}
        {infiniteLoading &&(
            <div> Loading...</div>
        )}
        {!hasMore && (
            <div>No more data to load</div>
        )}


        

    </div>
  )
}

export default ProductPage