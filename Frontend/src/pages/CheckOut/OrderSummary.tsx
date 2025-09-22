import { CircleAlert, CircleMinus, CirclePlus, ListOrdered } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../lib/formatCurrency";
import type { ProductWithCart } from "../../types/Types";

const OrderSummary = ({products=[]}:{products:ProductWithCart[]}) => {
  console.log(products) 
  return (
    <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white">
      {/* Order Summary Header */}
      <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
        <ListOrdered size={20} />
        <p className="font-medium text-white ">ORDER SUMMARY</p>
      </div>

      {/* Order Details */}
      {products.map((product,index)=>(
      <div key={index} className="flex flex-col lg:flex-row justify-center items-center lg:items-start p-3 md:p-5 gap-5 md:gap-5 lg:gap-10">
        {/* Image and Count */}
        <div className="flex flex-col gap-2 justify-center items-center h-50">
          <img
            // src="/Products/Camera.png"
            src={product.images[0]}
            alt=""
            className="w-40 h-40 object-cover "
          />
          <div className="flex gap-2 items-center">
            <CircleMinus size={20} className="text-zinc-400" />
            <div className="py-0.5 w-14 text-center bg-transparent border-1  border-zinc-300 shadow-sm rounded-xs font-medium">
              1
            </div>
            <CirclePlus size={20} className="" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col max-w-sm justify-between items-start lg:h-50">
          <p className="text-zinc-950 font-normal truncate max-w-xs md:max-w-sm">
            {product.description}
          </p>
          <p className="text-zinc-500 text-sm">Seller: SRS Enterprises</p>
          <p className="flex gap-2 items-end">
            <span className="text-sm text-zinc-500 font-medium">{formatCurrency(product.actualPrice)}</span>
            <span className="text-md font-medium">{formatCurrency(product.discountedPrice)}</span>
          </p>
          <span className="flex items-center gap-1 text-sm font-medium text-green-700">
            <span>Offer valid till today</span> <CircleAlert size="18" />
          </span>
          <button className="font-medium text-md hover:cursor-pointer">
            REMOVE
          </button>
        </div>

        <div className="hidden lg:block self-start">
          Delivery in 2-3 business days
        </div>
      </div>
      ))}

    </div>
  );
};

export default OrderSummary;
