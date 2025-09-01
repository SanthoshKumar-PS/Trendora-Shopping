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
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [loading, setLoading] = useState<boolean>(true)
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null)
  const [productCategory, setProductCategory] = useState<number | undefined>(undefined)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)

  // Recommendations
  const [products, setProducts] = useState<ProductType[]>([])
  const [error, setError] = useState<string | null>(null)

  // Pagination for infinite scroll
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(20)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [infiniteLoading, setInfiniteLoading] = useState<boolean>(false)

  async function getProductDetails() {
            interface ProductDetailRespone{
                message : string
                product : ProductType | null
            }
    try {
      setLoading(true)
      const response = await axios.get<ProductDetailRespone>(`${BACKEND_URL}/api/productdetails`, {
        params: { productId },
        withCredentials: true,
      })

      if (response.status === 200) {
        setCurrentProduct(response.data.product)
        setProductCategory(response.data.product?.categoryId)
        if (response.data.product?.categoryId) {
          // reset recommendations
          setProducts([])
          setPage(1)
          setHasMore(true)
          await getProductRecommendation(response.data.product.categoryId, 1)
        }
      }
    } catch (error) {
      setError('Error while calling the selected product')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function getProductRecommendation(categoryId: number, pageNum: number) {
    try {
      setInfiniteLoading(true)
      const response = await axios.get(`${BACKEND_URL}/api/recommendproducts`, {
        params: { productId, productCategory: categoryId, page: pageNum, limit },
        withCredentials: true,
      })

      if (response.status === 200) {
        const newProducts = response.data.products
        setProducts((prev) => [...prev, ...newProducts])
        setHasMore(pageNum < response.data.totalPages)
      }
    } catch (error) {
      setError('Error while getting recommended products')
      console.log(error)
    } finally {
      setInfiniteLoading(false)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [id])

  // Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || infiniteLoading) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const scrolledRatio = (scrollTop + windowHeight) / docHeight

      if (scrolledRatio >= 0.9) {
        setPage((prev) => {
          const nextPage = prev + 1
          if (productCategory) {
            getProductRecommendation(productCategory, nextPage)
          }
          return nextPage
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [productCategory, hasMore, infiniteLoading])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div>
      <Navbar seller={true} />
      <div className="w-full border-b border-zinc-300"></div>

      {/* Product Description Section ... (your existing code) */}

      {/* Recommendations */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>
        <GetProducts products={products} />
        {infiniteLoading && <p className="text-center mt-4">Loading more...</p>}
        {!hasMore && <p className="text-center mt-4 text-gray-500">No more products 🚀</p>}
      </div>
    </div>
  )
}

export default Product
