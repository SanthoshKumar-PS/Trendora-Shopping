import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import OfferBar from "../components/OfferBar"
import { useCart } from "../context/CartContext"
import RatingStars from "../components/RatingStars"
import { Eye, Pencil } from "lucide-react"

const Cart = () => {
    const navigate=useNavigate()
    const {cartId, setCartId, cartProducts, addToCart, removeFromCart, clearCart, refetchCart, isCartFetching} = useCart();
    console.log({cartId, setCartId, cartProducts, addToCart, removeFromCart, clearCart, refetchCart, isCartFetching})

    //To Be Deleted
 const products = [
  {
    id: 6,
    name: "Lenovo IdeaPad 3",
    description:
      "The Lenovo IdeaPad 3 is a reliable and lightweight laptop perfect for work, study, and entertainment. It offers a Full HD display, decent processing power, and a comfortable keyboard for daily tasks.",
    categoryId: 3,
    stockId: 1,
    discountPercentage: 0,
    actualPrice: 55200,
    discountedPrice: 48500,
    avgRating: 3.8,
    numRating: 0,
    features: [
      { label: "Processor", value: "Intel Core i5-1135G7" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: '15.6" Full HD IPS' },
      { label: "Graphics", value: "Intel Iris Xe Graphics" },
      { label: "Operating System", value: "Windows 11 Home" },
      { label: "Battery Life", value: "Up to 7 hours" },
      { label: "Weight", value: "1.65 kg" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.0" },
      { label: "Ports", value: "USB-C, USB-A, HDMI, SD card reader" },
    ],
    images: [
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571291/Trendora/srs/hps/ncqr5pm0lphc6rsw6zxr.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571292/Trendora/srs/hps/gkr10raltnd6qdgrjakj.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571292/Trendora/srs/hps/nhbkfg5f1oamvhyoa5gk.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571293/Trendora/srs/hps/gmovqaww4yhmanv6obyu.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571292/Trendora/srs/hps/lahepfy2tqsfyhzblimd.png",
    ],
    createdAt: "2025-08-28T18:42:49.677Z",
    updatedAt: "2025-08-28T18:42:49.677Z",
  },
  {
    id: 6,
    name: "Lenovo IdeaPad 3",
    description:
      "The Lenovo IdeaPad 3 is a reliable and lightweight laptop perfect for work, study, and entertainment. It offers a Full HD display, decent processing power, and a comfortable keyboard for daily tasks.",
    categoryId: 3,
    stockId: 1,
    discountPercentage: 0,
    actualPrice: 55200,
    discountedPrice: 48500,
    avgRating: 3.8,
    numRating: 0,
    features: [
      { label: "Processor", value: "Intel Core i5-1135G7" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: '15.6" Full HD IPS' },
      { label: "Graphics", value: "Intel Iris Xe Graphics" },
      { label: "Operating System", value: "Windows 11 Home" },
      { label: "Battery Life", value: "Up to 7 hours" },
      { label: "Weight", value: "1.65 kg" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.0" },
      { label: "Ports", value: "USB-C, USB-A, HDMI, SD card reader" },
    ],
    images: [
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571291/Trendora/srs/hps/ncqr5pm0lphc6rsw6zxr.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571292/Trendora/srs/hps/gkr10raltnd6qdgrjakj.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571292/Trendora/srs/hps/nhbkfg5f1oamvhyoa5gk.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571293/Trendora/srs/hps/gmovqaww4yhmanv6obyu.png",
      "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756571292/Trendora/srs/hps/lahepfy2tqsfyhzblimd.png",
    ],
    createdAt: "2025-08-28T18:42:49.677Z",
    updatedAt: "2025-08-28T18:42:49.677Z",
  },
  
];

return (
    <div>
        <OfferBar/>
        <Navbar/>
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
    </div>
  )

}

export default Cart