import { Search, Heart, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { handleLogout } from "../Api/Logout";
import {motion} from "framer-motion"
type NavbarProps = {
  loggedin?: boolean;
  seller?: boolean;
};

const Navbar = ({ loggedin, seller = false }: NavbarProps) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const userSidebarOptions = [
    {
      id: 1,
      name: "Home",
      destination: "/home",
    },
    {
      id: 2,
      name: "Orders",
      destination: "/orders",
    },
    {
      id: 3,
      name: "Cart",
      destination: "/cart",
    },
    {
      id: 4,
      name: "Products",
      destination: "/products",
    },
  ];
  const sellerSidebarOptions = [
    {
      id: 1,
      name: "Dashboard",
      destination: "/dashboard",
    },
    {
      id: 2,
      name: "Orders",
      destination: "/orders",
    },
    {
      id: 3,
      name: "Products",
      destination: "/sellerproducts",
    },
    {
      id: 4,
      name: "Add Product",
      destination: "/addproduct",
    },
  ];

  const sidebarOptions = seller ? sellerSidebarOptions : userSidebarOptions;
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <motion.div className="p-1 md:p-2 "
    initial={{y:-100}}
    animate={{y:0}}
    >
      <div className="px-1 md:px-2 border border-zinc-300 rounded-md flex w-full max-w-6xl bg-white mx-auto items-center justify-between ">
        <h1 className=" font-bold text-xl text-heading font-serif hover:cursor-pointer p-2">
          Trendora
        </h1>
        {/* Navbar Options */}
        <div className="hidden text-md font-medium text-heading md:flex items-center justify-center gap-6">
          {sidebarOptions.map((item) => (
            <p
              key={item.id}
              className="relative group hover:cursor-pointer"
              onClick={() => navigate(item.destination)}
            >
              {item.name}
              <span className="absolute left-1/2 -bottom-1 block h-[1.5px] w-0 bg-heading transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </p>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 p-2">
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search Products... "
              className="px-4 py-2 min-w-[200px] lg:min-w-[300px] outline-none rounded-md shadow-md bg-white/70 border border-gray-300 focus:border-gray-600 focus:ring-1 focus:ring-gray-500 transition duration-200"
            />
            <Search size={24} className="absolute right-2 top-2 text-heading" />
          </div>
          <ShoppingCart
            size={24}
            onClick={() => navigate("/cart")}
            className="text-heading hover:scale-105"
          />
          <LogOut
            size={24}
            onClick={() => handleLogout({ BACKEND_URL, setUser, navigate })}
            className="text-heading hover:scale-105"
          />

          {/* Navbar Small Screen */}
          <div
            className="md:hidden ml-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          <div>
            <div
              className={`absolute z-10 top-0 left-0 h-full w-[60%] bg-gray-100 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } flex flex-col items-center justify-start`}
            >
              <h1 className="mt-10 font-bold text-xl text-heading font-serif hover:cursor-pointer p-2">
                Trendora
              </h1>
              <div className="mt-5 w-full flex flex-col">
                {sidebarOptions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(item.destination)}
                    className="font-medium w-full text-center p-2 border-b border-zinc-400"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
