import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {motion} from "framer-motion";
const PageNotFound = () => {
  return (
   <div className="bg-zinc-100 min-h-screen">
        <Navbar/>
        <div className="w-full border-b border-zinc-300"></div>
        <motion.div 
          initial={{opacity:0,scale:0,y:-100}}
          animate={{opacity:1,scale:1,y:0}}
          transition={{duration:0.6,ease:"easeInOut",type:"spring",stiffness:50,damping:10}}
        className="flex flex-col justify-center items-center gap-2 md:gap-6 my-4 md:my-12">
          <p className="text-4xl md:text-7xl font-medium ">Oops!</p>
          <p className="text-xl font-medium ">404 - Not Found</p>
          <p className="max-w-sm text-center font-medium ">The page you are looking for might have removed or its name changed or it is temporarily unavailable.</p>

        </motion.div>

        <Footer/>
  </div>
  )
}

export default PageNotFound