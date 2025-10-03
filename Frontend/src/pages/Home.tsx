import { ChevronRight, CircleArrowLeft, CircleArrowRight, Eye, Heart } from "lucide-react"
import Navbar from "../components/Navbar"
import OfferBar from "../components/OfferBar"
import { useCart } from "../context/CartContext"
import { useUser } from "../context/UserContext"
import Products from "./Products"

const Home = () => {
    const categoryOptions=[
        {
            id:1,
            name:"Woman's Fashion"
        },
        {
            id:2,
            name:"Men's Fashion"
        },
        {
            id:3,
            name:"Electronics"
        },
        {
            id:4,
            name:"Home & Lifestyle"
        },
        {
            id:5,
            name:"Medicine"
        },
        {
            id:6,
            name:"Sports & Outdoor"
        },
        {
            id:7,
            name:"Health & Beauty"
        },
    ]

    const {user} = useUser()
    console.log("user details", user)

  return (
    <div>
        <OfferBar/>
        <Navbar seller={user.role==="SELLER"}/>
        <div className="w-full border-b border-zinc-300"></div>
        
        {/* Options and Offer Image */}
        <div className="w-full h-full flex items-stretch justify-start">
            <div className="hidden lg:flex max-w-[30%] min-w-[350px] min-h-full items-center justify-center">
                <ul className="space-y-4" >
                    {
                        categoryOptions.map(item=>(
                        <li key={item.id} className="flex gap-4 justify-between items-center font-serif font-medium hover:cursor-pointer">
                            {item.name} <span><ChevronRight size={20}/></span>
                            </li>
                      ))
                    }

                </ul>
               
            </div>
            <div className="w-full mx-4 md:mx-16 lg:mx-0 lg:mr-20 mt-5">
                <img src="/iphoneOffer.png" alt="Iphone Offer Image" className="hover:cursor-pointer object-cover w-full" />
            </div>


        </div>

        {/* Today's */}
        <div className="w-full flex justify-between items-center  mt-10 ">
            <div className="w-full pl-4 pr-4 md:pl-12 md:pr-12 flex flex-col gap-4 justify-start items-center">
                <div className="w-full flex gap-4 justify-start items-center">
                    <div className="w-3 h-6 rounded-sm bg-red">
                    </div>
                    <p className="text-sm font-bold font-sans text-red">Today's</p>
                </div>
                <div className="w-full">
                    <p className="text-lg font-medium text-heading tracking-wide">Flash Sales Until 12 PM</p>
                </div>
            </div>

            <div className="hidden mr-12 md:flex justify-center items-center">
                <div className="flex gap-4">
                    <CircleArrowLeft className="text-red"/>
                    <CircleArrowRight className="text-red"/>
                </div>
            </div>
        </div>

        <Products showNavbar={false}/>


        {/* Sample Products - Fake */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
            {Array.from({ length: 10 }).map((_, i) =>(
            <div key={i} className="relative flex flex-col gap-2  items-start justify-start mx-1">
                <div key={i} className="bg-[#F5F5F5] h-50 w-50 md:h-60 md:w-60  rounded-md overflow-hidden">
                    <img src="/Products/Camera.png" alt="Product Image" className="object-cover w-full h-full" />
                </div>
                <div className="p-2 sm:text-sm md:text-md ">
                    <p className="font-semibold font-serif">Sony DSLR Camera</p>
                    <p className=" text-red font-medium">$120 <span className="line-through text-gray-700">$120</span></p>
                    <p className=" text-yellow-500 font-medium">4.8/5.0</p>
                </div>

                <p className="absolute top-4 left-4 px-2 py-1 bg-red text-white font-light text-xs rounded-sm">-40%</p>
                <div className="absolute top-4 right-4 flex flex-col gap-2 ">
                    <div className="bg-white text-heading p-2 rounded-full hover:scale-115">
                        <Heart size={18}/>
                        <Heart size={18} fill="red" stroke="red"/>
                    </div>
                    <div className="bg-white text-heading p-2 rounded-full hover:scale-105">
                        <Eye size={18}/>
                    </div>
                </div>

            </div>
                ))}
        </div> */}






    </div>
  )
}

export default Home