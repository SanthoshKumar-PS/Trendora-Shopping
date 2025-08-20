import { Search,Heart, ShoppingCart,Menu,X  } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [sidebarOpen,setSidebarOpen]=useState<boolean>(false)
  return (
    <div className="flex w-full max-w-6xl bg-grey-400 mx-auto my-2 items-center justify-between ">
        <h1 className=" font-bold text-xl text-heading font-serif hover:cursor-pointer p-2">Trendora</h1>
        <div className="hidden text-md font-medium text-heading md:flex items-center justify-center gap-6">
            <p className="relative group">
                Home
                <span className="absolute left-1/2 -bottom-1 block h-[1.5px] w-0 bg-heading transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </p>
            <p className="relative group">
                Contact
                <span className="absolute left-1/2 -bottom-1 block h-[1.5px] w-0 bg-heading transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </p>
            <p className="relative group">
                About
                <span className="absolute left-1/2 -bottom-1 block h-[1.5px] w-0 bg-heading transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </p>
            <p className="relative  group">
                Sign Up
                <span className="absolute left-1/2 -bottom-1 block h-[1.5px] w-0 bg-heading transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </p>
        </div>

        <div className="flex items-center justify-center gap-3 p-2">
            <div className='relative'>
                <input type="text" placeholder="Search Products... " className="outline-none rounded-md shadow-md bg-bg-grey px-4 py-2 min-w-[200px] lg:min-w-[300px]" />
                <Search size={24} className='absolute right-2 top-2 text-heading'/>
            </div>
            <Heart size={24} className='text-heading hover:scale-105 '/>
            <ShoppingCart size={24} className='text-heading hover:scale-105'/>
            <div className='md:hidden mx-2' onClick={()=>setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={24}/>:<Menu size={24}/>}                
            </div>
            <div>
            <div className={`absolute top-0 left-0 h-full w-[60%] bg-bg-grey transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col items-center justify-start`}>
                        <h1 className="mt-10 font-bold text-xl text-heading font-serif hover:cursor-pointer p-2">Trendora</h1>
                        <div className='mt-5 w-full flex flex-col'>
                            <div className='font-medium w-full text-center p-2 border-b border-zinc-400'>Home</div>
                            <div className='font-medium w-full text-center p-2 border-b border-zinc-400'>Contact</div>
                            <div className='font-medium w-full text-center p-2 border-b border-zinc-400'>About</div>
                            <div className='font-medium w-full text-center p-2 border-b border-zinc-400'>Sign Up</div>
            </div>
            </div>

            </div>

        </div>





    </div>
  )
}

export default Navbar