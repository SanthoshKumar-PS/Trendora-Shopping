import React from 'react'
import Navbar from '../components/Navbar'
import { useUser } from '../context/UserContext'
import Footer from '../components/Footer';

const Profile = () => {
    const {user} = useUser();
    return (
    <div className="bg-gray-100">
        <Navbar seller={user.role==='SELLER'}/>
        <div className="w-full border-b border-zinc-300"></div>
        
        <div className="max-w-5xl mx-auto px-2 md:px-4 py-2 md:py-4">
            <div className='flex justify-start items-start '>

            </div>

        </div>

        {/* Fotter */}
        <Footer/>
    </div>

  )
}

export default Profile