import {  Plus } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import type { Product } from "../../types/Types";
import ProductComponent from "../../components/Product";

const SellerProducts = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const getSellerProducts = async () => {
    interface ViewProductResponse {
      message: string;
      products?: Product[];
    }
    try {
      setLoading(true);
      const response = await axios.get<ViewProductResponse>(
        `${BACKEND_URL}/seller/viewproducts`,
        { withCredentials: true }
      );
      setProducts(response.data.products || []);
      console.log(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellerProducts();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-gray-50 space-y-6">
      <Navbar seller={true} />

      <div className="mx-2 w-full max-w-6xl md:mx-auto bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 px-2 py-4 rounded-lg shadow-md  animate-fadeIn">
        <div className="text-center md:text-left">
          <h3 className="text-md md:text-lg font-bold tracking-wide">
            Got new products to share?
          </h3>
          <p className="text-sm md:text-base text-blue-100 mt-1 max-w-xs md:max-w-md">
            Showcase your latest items and attract more buyers today.
          </p>
        </div>

        <button
          onClick={() => navigate("/addproduct")}
          className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <span>Add Product</span>
          <Plus size={18} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto ">
        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mx-4 md:mx-auto max-w-7xl justify-items-center">
          {products.map((product, i) => (
            <ProductComponent key={i} product={product} seller={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
