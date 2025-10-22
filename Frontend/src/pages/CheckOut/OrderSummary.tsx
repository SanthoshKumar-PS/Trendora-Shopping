import {
  CircleAlert,
  CircleMinus,
  CirclePlus,
  ListOrdered,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../lib/formatCurrency";
import type { CheckoutProduct, ProductWithCart } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type OrderSummaryProps = {
  selectedProducts: CheckoutProduct[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<CheckoutProduct[]>>;
};

const OrderSummary = ({
  selectedProducts,
  setSelectedProducts,
}: OrderSummaryProps) => {
  const increaseQuantity = (productId: number, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        productId === p.product.id
          ? {
              ...p,
              quantity: p.quantity + quantity,
              totalActualPrice: p.product.actualPrice * (p.quantity + quantity),
              totalDiscountedPrice:
                p.product.discountedPrice * (p.quantity + quantity),
            }
          : p
      )
    );
  };
  const decreaseQuantity = (productId: number, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        productId === p.product.id
          ? {
              ...p,
              quantity: p.quantity - quantity,
              totalActualPrice: p.product.actualPrice * (p.quantity - quantity),
              totalDiscountedPrice:
                p.product.discountedPrice * (p.quantity - quantity),
            }
          : p
      )
    );
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.product.id !== productId)
    );
  };
  console.log("Selected Products at Order Summary: ", selectedProducts);
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-gray-50">
      {/* Order Summary Header */}
      <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
        <ListOrdered size={20} />
        <p className="font-medium text-white ">ORDER SUMMARY</p>
      </div>

      {/* For No Products */}
      {selectedProducts.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-2 mb-2">
          <p className="text-center mt-4  font-medium text-gray-800/70">
            No products in checkout
          </p>
          <motion.button
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
            className="text-center font-medium text-white bg-blue-500 px-3 py-2 rounded-sm w-max self-center hover:cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Add Products
          </motion.button>
        </div>
      )}

      {/* Order Details */}
      <div className="mt-2 space-y-4 ">
        <AnimatePresence>
          {selectedProducts.map((selectedProduct, index) => (
            <motion.div
              key={selectedProduct.product.id}
              initial={{ scale: 0, opacity: 0, x: -100 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Main Card Content */}
              <div className="border border-gray-300 bg-gray-50/50 rounded-lg flex justify-center items-center p-3 md:p-5 gap-5 md:gap-5 lg:gap-10">
                {/* Image and Count */}
                <div className="flex flex-col gap-2 justify-center items-center h-50">
                  <img
                    // src="/Products/Camera.png"
                    src={selectedProduct.product.images[0]}
                    alt=""
                    className="bg-gray-300/30 rounded-lg overflow-hidden w-24 h-24 md:w-30 md:h-30 lg:w-40 lg:h-40 object-cover "
                  />
                  <div className="flex gap-2 items-center">
                    <button
                      disabled={selectedProduct.quantity <= 1}
                      onClick={() =>
                        decreaseQuantity(selectedProduct.product.id, 1)
                      }
                      className={`p-1 border border-gray-300 rounded-md ${
                        selectedProduct.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Minus
                        size={18}
                        className={`${
                          selectedProduct.quantity <= 1
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                      />
                    </button>
                    <div className="py-0.2 w-10 md:w-10 text-center bg-transparent  font-medium">
                      {selectedProduct.quantity}
                    </div>
                    <button
                      className="p-1 border border-gray-300 rounded-md"
                      onClick={() =>
                        increaseQuantity(selectedProduct.product.id, 1)
                      }
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-1 min-w-0 justify-between items-start gap-2">
                  <p className="text-zinc-950 font-normal line-clamp-2 text-sm md:text-lg w-full overflow-hidden max-w-sm">
                    {selectedProduct.product.description}
                  </p>
                  <p className="text-zinc-500 text-sm sm:text-sm md:text-md">
                    Seller: {selectedProduct.product.name}
                  </p>
                  <p className="flex gap-2 items-end">
                    <span className="text-sm md:text-md text-zinc-500 font-medium line-through">
                      {formatCurrency(selectedProduct.totalActualPrice)}
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {formatCurrency(selectedProduct.totalDiscountedPrice)}
                    </span>
                  </p>
                  <span className="flex items-center gap-1 text-xs sm:text-sm font-medium text-green-700">
                    <span>Offer valid till today</span>{" "}
                    <CircleAlert size="16" />
                  </span>
                  <button
                    className="lg:hidden bg-red-500 px-2 py-1 rounded-full text-white text-xs md:text-sm font-medium hover:cursor-pointer"
                    onClick={() => removeProduct(selectedProduct.product.id)}
                  >
                    REMOVE
                  </button>
                </div>

                <div className="hidden lg:block self-center">
                  <button
                    className="bg-red-500 px-2 py-1 rounded-full text-white text-xs md:text-sm font-medium hover:cursor-pointer"
                    onClick={() => removeProduct(selectedProduct.product.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderSummary;
