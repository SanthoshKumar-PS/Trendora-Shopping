import Navbar from '../components/Navbar'
import Endbar from '../components/Endbar'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const navigate=useNavigate()
  return (
  <div className="bg-bgColor min-h-screen w-full flex flex-col relative">
    <Navbar/>
    {/* Border Bottom Below Navbar */}
    <div className="border-b-1 border-b-zinc-400"></div>
    
    {/* Login Page */}
    <div className="mt-10 flex flex-col md:flex-row w-full mb-4">
      <img src="/SideImage.png" alt="Side Image" className="w-full mb-4 md:mb-0 md:w-[50%] object-contain"/>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="w-[60%] flex flex-col justify-center items-center md:justify-start md:items-start">
            <h1 className="text-2xl text-heading font-medium font-serif  ">Create an account</h1>
            <p className="text-sm text-heading font-medium font-serif">Enter your details below</p>
        </div>

        <input type="text" placeholder="Name" className="outline-none bg-bg-grey px-4 py-2 rounded-md w-[60%] focus:border-1 focus:border-zinc-400 focus:shadow-md font-serif"/>
        <input type="text" placeholder="Email or Phone Number" className="outline-none bg-bg-grey px-4 py-2 rounded-md w-[60%] focus:border-1 focus:border-zinc-400 focus:shadow-md font-serif"/>
        <input type="text" placeholder="Password" className="outline-none bg-bg-grey px-4 py-2 rounded-md w-[60%] focus:border-1 focus:border-zinc-400 focus:shadow-md font-serif"/>

        <button className="bg-red w-[60%] py-2 rounded-md text-white font-medium font-serif hover:cursor-pointer hover:scale-105 duration-300 transition-all">Create Account</button>
        <button className="flex justify-center items-center gap-2 bg-white border-1 border-zinc-400 w-[60%] py-2 rounded-md text-heading hover:cursor-pointer hover:scale-105 duration-300 transition-all"><img src="/Icon-Google.png" alt="" className="h-5 w-5 object-contain"/>Sign Up With Google</button>
            <p onClick={()=>navigate('/login')} className="text-sm">Already have an account? <span className="relative group text-md font-medium">
                Log in 
                <span className="absolute left-1/2 -bottom-1 block h-[1.5px] w-0 bg-heading transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span></p>
      </div>
    </div>

    <Endbar/>


  </div>
  )
}

export default SignUp