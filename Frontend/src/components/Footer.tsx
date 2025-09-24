import { Copyright } from "lucide-react"

const Footer = () => {
    const exclusive=[
        {id:1, heading:'Subscribe',visitPage:''},
        {id:2, heading:'10% Off your first order',visitPage:''},
        {id:3, heading:'View higher discount Products',visitPage:''}        
    ]
    const support=[
        {id:1, heading:'111 Church Street,Bangalore - 635147',visitPage:''},
        {id:2, heading:'trendora@gmail.com',visitPage:''},
        {id:3, heading:'+91-9597889162',visitPage:''}        
    ]
    const account=[
        {id:1, heading:'My Account',visitPage:''},
        {id:2, heading:'Login/Register',visitPage:''},
        {id:3, heading:'Cart',visitPage:''},        
        {id:4, heading:'Wishlist',visitPage:''},       
        {id:5, heading:'Shop',visitPage:''}
    ]
    const quicklist=[
        {id:1, heading:'Privacy Policy',visitPage:''},
        {id:2, heading:'Terms Of Use',visitPage:''},
        {id:3, heading:'FAQ',visitPage:''},        
        {id:4, heading:'Contact',visitPage:''}        
    ]
    
    
  return (
    <div className="w-full bg-black">
        <div className="w-full px-4 md:px-16 py-6 md:py-10 grid grid-cols-2 md:grid:cols-3 lg:grid-cols-4 gap-4 md:gap-16 place-content-center">
            <div className="flex flex-col gap-3">
                <h1 className="text-md font-semibold text-white">Exclusive</h1>
                <div className="text-sm max-w-[200px] ">
                    {exclusive.map(item=>(
                        <div key={item.id} className="text-sm mb-2 text-white">{item.heading}</div>
                    ))}
                </div>
            </div>
            
            <div className="flex flex-col gap-3">
                <h1 className="text-md font-semibold text-white">Support</h1>
                <div className="text-sm max-w-[200px] ">
                    {support.map(item=>(
                        <div key={item.id} className="text-sm mb-2 text-white">{item.heading}</div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-md font-semibold text-white">Account</h1>
                <div className="text-sm max-w-[200px] ">
                    {account.map(item=>(
                        <div key={item.id} className="text-sm mb-2 text-white">{item.heading}</div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-md font-semibold text-white">Quick Link</h1>
                <div className="text-sm max-w-[200px] ">
                    {quicklist.map(item=>(
                        <div key={item.id} className="text-sm mb-2 text-white">{item.heading}</div>
                    ))}
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center gap-2 pb-4 text-zinc-400">
            <Copyright size={20}/> Copyright 2024. All right reserved
        </div>
    </div>

  )
}

export default Footer