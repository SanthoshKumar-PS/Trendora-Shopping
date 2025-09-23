import { CircleAlert, CircleMinus, CirclePlus, ListOrdered } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../lib/formatCurrency";
import type { CheckoutProduct, ProductWithCart } from "../../types/Types";
import { useNavigate } from "react-router-dom";

type OrderSummaryProps = {
  selectedProducts: CheckoutProduct[],
  setSelectedProducts: React.Dispatch<React.SetStateAction<CheckoutProduct[]>> 
}


const OrderSummary = ({selectedProducts,setSelectedProducts}:OrderSummaryProps) => {
  const increaseQuantity = (productId:number,quantity:number) =>{
    setSelectedProducts(prev=>
        prev.map(p=> productId===p.product.id?{
          ...p,
          quantity:p.quantity+quantity,
          totalActualPrice:p.product.actualPrice*(p.quantity+quantity),
          totalDiscountedPrice: p.product.discountedPrice*(p.quantity+quantity) 
        } : p)
    )
  }
  const decreaseQuantity = (productId:number,quantity:number) =>{
    setSelectedProducts(prev=>
        prev.map(p=> productId===p.product.id?{
          ...p,
          quantity:p.quantity-quantity,
          totalActualPrice:p.product.actualPrice*(p.quantity-quantity),
          totalDiscountedPrice: p.product.discountedPrice*(p.quantity-quantity)
        } : p) 
    )
  }

  const removeProduct = (productId:number)=>{
    setSelectedProducts(prev=> 
        prev.filter(p=>p.product.id!==productId)
    )
  }
  console.log(selectedProducts) 
  const navigate = useNavigate()
  return (
    <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white">
      {/* Order Summary Header */}
      <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
        <ListOrdered size={20} />
        <p className="font-medium text-white ">ORDER SUMMARY</p>
      </div>

      {/* For No Products */}
      {selectedProducts.length===0 && <div className="flex flex-col justify-center items-center gap-2 mb-2">
        <p className="text-center mt-4  font-medium text-gray-800">No products in checkout</p>
        <p className="text-center font-medium text-gray-800">Add Products to checkout</p>
        <button className="text-center font-medium text-white bg-blue-500 px-3 py-2 rounded-sm w-max self-center"
          onClick={()=>navigate('/home')}>Add Products</button>
      </div>}


      {/* Order Details */}
      {selectedProducts.map((selectedProduct,index)=>(
      <div>
      {/* Main Card Content */}
      <div key={index} className="flex justify-center items-center p-3 md:p-5 gap-5 md:gap-5 lg:gap-10">
        {/* Image and Count */}
        <div className="flex flex-col gap-2 justify-center items-center h-50">
          <img
            // src="/Products/Camera.png"
            src={selectedProduct.product.images[0]}
            alt=""
            className="w-24 h-24 md:w-30 md:h-30 lg:w-40 lg:h-40 object-cover "
          />
          <div className="flex gap-2 items-center">
            <button
              disabled={selectedProduct.quantity <= 1}
              onClick={() => decreaseQuantity(selectedProduct.product.id, 1)}
              className={`p-1 rounded ${
                selectedProduct.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <CircleMinus className={`${selectedProduct.quantity <= 1?"text-zinc-400":"text-zinc-700"} w-4 h-4 md:w-5 md:h-5`} />
            </button>
            <div className="py-0.2 w-10 md:w-14 text-center bg-transparent border-1  border-zinc-300 shadow-sm rounded-xs font-medium">
              {selectedProduct.quantity}
            </div>
            <CirclePlus  className="w-4 h-4 md:w-5 md:h-5"
               onClick={()=>increaseQuantity(selectedProduct.product.id,1)}/>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 min-w-0 justify-between items-start gap-2">
          <p className="text-zinc-950 font-normal line-clamp-2 text-sm md:text-lg w-full overflow-hidden">
            {selectedProduct.product.description}
          </p>
          <p className="text-zinc-500 text-sm sm:text-sm md:text-md">Seller: {selectedProduct.product.name}</p>
          <p className="flex gap-2 items-end">
            <span className="text-sm md:text-md text-zinc-500 font-medium line-through">
              {formatCurrency(selectedProduct.totalActualPrice)}
            </span>
            <span className="text-sm sm:text-base font-medium">
              {formatCurrency(selectedProduct.totalDiscountedPrice)}
            </span>
          </p>
          <span className="flex items-center gap-1 text-xs sm:text-sm font-medium text-green-700">
            <span>Offer valid till today</span> <CircleAlert size="16" />
          </span>
          <button className="text-sm  md:text-md font-medium hover:cursor-pointer">
            REMOVE
          </button>
        </div>
        
        <div className="hidden lg:block self-start">
          Delivery in 2-3 business days
        </div>
      </div>
      <div className="border-b border-gray-300 w-full"></div>
      </div>

      ))}

    </div>
  );
};

export default OrderSummary;
