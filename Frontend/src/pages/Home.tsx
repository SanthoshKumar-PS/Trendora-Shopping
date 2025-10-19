import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import OfferBar from "../components/OfferBar";
import { useUser } from "../context/UserContext";
import Products from "./Products";

const Home = () => {
  const categoryOptions = [
    {
      id: 1,
      name: "Woman's Fashion",
    },
    {
      id: 2,
      name: "Men's Fashion",
    },
    {
      id: 3,
      name: "Electronics",
    },
    {
      id: 4,
      name: "Home & Lifestyle",
    },
    {
      id: 5,
      name: "Sports & Outdoor",
    },
    {
      id: 6,
      name: "Health & Beauty",
    },
  ];

  const { user } = useUser();
  console.log("user details", user);

  return (
    <div className="bg-gray-50">
      <OfferBar />
      <Navbar seller={user.role === "SELLER"} />

      {/* Category and Banner */}
      <div className="w-full ">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
          <div className="flex gap-8 items-stretch">
            {/* Category */}
            <div className="hidden lg:block w-[280px] flex-shrink-0">
              <div className="hidden lg:flex flex-col bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                <ul className="space-y-2">
                  {categoryOptions.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between py-3 px-4 rounded-medium cursor-pointer transition-all duration-200 hover:bg-gray-100 rounded-md group"
                    >
                      <span className="text-gray-600 font-medium text-sm group-hover:text-blue-500 transition-colors">
                        {item.name}
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Iphone banner */}
            <div className="flex items-center flex-1 animate-scale-in">
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                <img
                  src="/App/iphoneOffer.png"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* We need to add hot deals here like offer  
      <div className="container mx-auto px-4 md:px-8 lg:px-12  py-12"></div> 
      */}

      <Products showNavbar={false} />
    </div>
  );
};

export default Home;
