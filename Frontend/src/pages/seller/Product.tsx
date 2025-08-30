import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import RatingStars from '../../components/RatingStars'
import { BadgeCheck, ShoppingCart, Zap } from 'lucide-react'
import Products from './Products'

const Product = () => {
    const features=[{"label": "Processor", "value": "Intel Core i5-1135G7"}, {"label": "RAM", "value": "8GB DDR4"}, {"label": "Storage", "value": "512GB SSD"}, {"label": "Display", "value": "15.6\" Full HD IPS"}, {"label": "Graphics", "value": "Intel Iris Xe Graphics"}, {"label": "Operating System", "value": "Windows 11 Home"}, {"label": "Battery Life", "value": "Up to 7 hours"}, {"label": "Weight", "value": "1.65 kg"}, {"label": "Connectivity", "value": "Wi-Fi 6, Bluetooth 5.0"}, {"label": "Ports", "value": "USB-C, USB-A, HDMI, SD card reader"}]
    const [selectedImageIndex,setSelectedImageIndex] = useState<number>(0);


  return (
    <div>
        <Navbar seller={true}/>
        <div className="w-full border-b border-zinc-300"></div>

        {/* Show Now Top Bar */}
        <div className='hidden w-full bg-zinc-50 md:flex items-center justify-center gap-4 py-2'>
            <img src="/Products/Camera.png" alt="" className='w-12 h-12 object-cover ' />
            <div className='flex-col max-w-sm'>
                <p className='truncate'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam, totam!</p>
                <RatingStars rating={4.0}/>
            </div>
            <h1>$21.00</h1>
            <button className='px-3 py-2 text-white font-medium bg-yellow-400 rounded-lg hover:cursor-pointer hover:scale-95'>Buy Now</button>

        </div>


        {/* Product Description */}
        <div className='w-full p-4 md:p-8'>
            <div className='flex flex-col md:flex-row w-full items-center justify-center md:items-start'>
                {/* Image Section */}
                <div className='md:sticky md:top-0 w-full md:w-[50%] flex flex-col items-center justify-center mx-2 my-3  overflow-hidden '>
                    {/* Main Image */}
                    <div className=' mt-2 '>
                        <img src="/Products/Camera.png" alt="" className='object-cover' />
                    </div>
                    {/* Sub Images */}
                    <div className='flex gap-2 mx-2 my-2'>
                        {Array.from({length:5}).map((_,index)=>(
                            <div key={index} onClick={()=>{setSelectedImageIndex(index)}} 
                            className={`min-h-16 min-w-16 flex ietms-center justify-center bg-zinc-100 rounded-sm overflow-hidden hover:cursor-pointer ${selectedImageIndex===index?"border-2 border-blue-500":""}`}>
                                <img src="/Products/Camera.png" alt="" className='object-cover'/>
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
                        Canon EOS R50 Mirrorless Camera RF - S 18 - 45 mm f/4.5 - 6.3 IS STM and RF - S 55 - 210 mm f/5 - 7.1 IS STM  (Black)
                    </div>

                    {/* Price Details */}
                    <div className='w-full flex flex-col gap-1 items-start justify-start'>
                        <p className='text-green-600 text-md font-medium'>Special Price</p>
                        <div className='flex items-end gap-2'>
                            <p className='text-lg font-medium'>$52000</p>
                            <p className='text-md font-medium text-zinc-500 line-through'>$54200</p>
                            <p className='text-green-600 text-md font-medium'>13% off</p>
                        </div>
                        <p>+ ₹99 Protect Promise Fee <span className='text-blue-500 font-medium underline hover:cursor-pointer'>Learn More</span></p>
                        <p className='text-red-500 text-sm font-medium'>Hurry, Only 2 left!</p>

                    </div>
                    
                    <div className='self-start flex gap-4'>
                        <RatingStars rating={4}/> 
                        <p>256 Ratings</p>
                    </div>



                    {/* Bottom Border */}
                    <div className='w-full border-b-1 border-zinc-400'></div>

                    {/* Features Table */}
                    <table className='self-start'>
                        <tbody className='table-auto border-collapse border-spacing-x-4 border-spacing-y-4 '>
                            {features.map((feature,index)=>(
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

        <Products/>


        

    </div>
  )
}

export default Product