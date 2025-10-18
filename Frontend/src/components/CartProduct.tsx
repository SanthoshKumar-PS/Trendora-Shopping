import { Trash } from "lucide-react";
import { formatCurrency } from "../lib/formatCurrency";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"
import type { Product } from "../types/Types";
import { useCart } from "../context/CartContext";

type CartProductProps = {
    product: Product;
    mapIndex: number;
}

const CartProduct = ({product,mapIndex}:CartProductProps) => {
    const navigate = useNavigate();
    const {removeFromCart,cartId} = useCart();
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        delay: 0.1 * mapIndex,
        type: "spring",
        stiffness: 80,
        damping: 12,
      }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="border border-gray-300 rounded-lg p-2 md:p-4 "
    >
      <div className="w-full flex justify-start items-stretch gap-4">
        {/* Image */}
        <div className="bg-gray-200/50 rounded-lg overflow-hidden border border-gray-300/50 ">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-20 object-cover"
          />
        </div>

        {/* Product Content */}
        <div className="flex flex-1 justify-between items-center ">
          <div className="h-20 flex-col justify-between">
            <p className="w-max bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
              Category
            </p>
            <h2 className="font-medium text-black/90 ">{product.name}</h2>
            <h2 className="font-medium text-blue-600 ">
              {formatCurrency(product.discountedPrice)}
            </h2>
          </div>
          <div
            className="text-red-500 hover:scale-105 transition-all duration-300 p-2"
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart({
                cartId: cartId ?? 0,
                productId: product.id,
              });
            }}
          >
            <Trash size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartProduct;
