import Navbar from '../components/Navbar'
import Endbar from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios, {AxiosError } from "axios"
import { useState } from 'react'
import { CircleAlert } from 'lucide-react'
import { useCart } from '../context/CartContext'


const SignUp = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  
  const navigate=useNavigate()
  const {cartId, setCartId} = useCart()

  const [name,setName]=useState<string|null>(null)
  const [email,setEmail]=useState<string|null>(null)
  const [password,setPassword]=useState<string|null>(null)
  const [role,setRole]=useState<'USER'|'ADMIN'|'SELLER'>('USER')
  const [error,setError]=useState<string|null>(null)

  async function validateAndRegister(e:React.FormEvent){
    e.preventDefault();

    if(!name && !email && !password){
      setError("All Fields must not be empty")
      return
    }

    if((name??"").length<3){
      setError("Name must have atleast 3 letters");
      return
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email??"")){
      setError("Please enter a valid email address");
      return
    }

    if((password??"").length<6){
      setError("Password must be at least 6 characters long");
      return
    }
    registerUser()
  }

  async function registerUser() {
    try{
      const payload={
        name:name,
        email:email,
        password:password,
        role:role
      }
      const response = await axios.post(`${BACKEND_URL}/user/register`,payload , {withCredentials:true})

      if(response.status===201){
        const data=response.data as any
        console.log(data)
        console.log("User has been registered")
        setCartId(data.cartId)
        if(data.role ==='USER'){
          navigate('/home')
        }
        if(data.role ==='SELLER'){
          navigate('/dashboard')
        }
      }

    }
    catch(error){
      const err=error as AxiosError;

      if(err.response.status===409){
        console.log("User email already exists");
        setError(err.response.data.message);
      }
      else if (err.response.status===500){
        console.log("Internal Server Error");
        setError(err.response.data.message)
      }
      else{
        console.log("Unexpected Error while registering");
        setError("Unexpected error occurred");
      }
      }
    }



  return (
  <div className="bg-bgColor min-h-screen w-full flex flex-col relative">
    <Navbar seller={false}/>
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

        <form onSubmit={validateAndRegister} className="w-full flex flex-col items-center gap-4">          
          <input type="text" required placeholder="Name" value={name??''} onChange={(e)=>setName(e.target.value)} className="outline-none bg-bg-grey px-4 py-2 rounded-md w-[60%] focus:border-1 focus:border-zinc-400 focus:shadow-md font-serif"/>
          <input type="text" required placeholder="Email " value={email??''} onChange={(e)=>setEmail(e.target.value)} className="outline-none bg-bg-grey px-4 py-2 rounded-md w-[60%] focus:border-1 focus:border-zinc-400 focus:shadow-md font-serif"/>
          <input type="text" required placeholder="Password" value={password??''} onChange={(e)=>setPassword(e.target.value)} className="outline-none bg-bg-grey px-4 py-2 rounded-md w-[60%] focus:border-1 focus:border-zinc-400 focus:shadow-md font-serif"/>
          {error &&(
            <div className='font-sans font-medium text-red-500 text-sm flex gap-2 items-center'>
              <span><CircleAlert size={20}/></span>
              {error}
            </div>
          )}

          <button type='submit' className="bg-red w-[60%] py-2 rounded-md text-white font-medium font-serif hover:cursor-pointer hover:scale-105 duration-300 transition-all">
            Create Account
          </button>
        </form>

        {/* SignUp With google */}
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