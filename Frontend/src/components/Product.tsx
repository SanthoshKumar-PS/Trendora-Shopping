import { useNavigate } from "react-router-dom";
import type { ProductWithCart } from "../types/Types";
import { Pencil, ShoppingCart, SquareCheckBig, Star } from "lucide-react";
import { formatCurrency } from "../lib/formatCurrency";
import { useCart } from "../context/CartContext";

type ProductProps =
  | {
      product: ProductWithCart;
      seller: true;
      updateOptimistic?: never; // not allowed when seller = true
    }
  | {
      product: ProductWithCart;
      seller?: false | undefined;
      updateOptimistic: (product: ProductWithCart, result: boolean) => void;
    };
const ProductComponent = ({
  product,
  updateOptimistic,
  seller = false,
}: ProductProps) => {
  const navigate = useNavigate();
  const { cartId, addToCart, removeFromCart } = useCart();

  return (
    <div
      onClick={() => navigate(`/product/${product?.id}`)}
      className="relative group flex flex-col gap-2  items-start justify-start mx-1 border border-gray-200 rounded-md overflow-hidden bg-white"
    >
      {/* Image */}
      <div className="bg-gray-200/30 h-40 w-40 md:h-60 md:w-60 lg:h-70 lg:w-70 overflow-hidden">
        <img
          src={product?.images[0]}
          alt="Product Image"
          className="object-contain w-full h-full group-hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* Name Price Ratings */}
      <div className="w-full p-2 md:px-4 space-y-2 sm:text-sm md:text-md ">
        <div className="flex justify-between items-center ">
          <p className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
            Category
          </p>
          <div className="flex items-center space-x-1">
            <Star size={16} fill="#2563EB" stroke="#2563EB" />
            <span className="text-sm text-gray-800 font-medium">
              {product?.avgRating ? product?.avgRating : 3.2}
            </span>
          </div>
        </div>
        <p className="font-bold text-md text-gray-900/90">{product?.name}</p>
        <p className=" text-blue-600  font-bold">
          {formatCurrency(product?.discountedPrice ?? 0)}{" "}
          <span className="ml-2 line-through text-xs text-gray-700">
            {formatCurrency(product?.actualPrice ?? 0)}
          </span>
        </p>

        {/* Add and Added To Cart Button - For User Only */}
        {!seller && (
          <button className="hidden md:flex w-full py-2 rounded-lg bg-blue-600 text-white font-medium justify-center items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            {product?.isInCart ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart({
                    cartId: cartId ?? 0,
                    productId: product.id,
                  });
                  updateOptimistic?.(product!, false);
                }}
                className="w-full flex justify-center items-center gap-2 "
              >
                <SquareCheckBig size={16} />
                <span>Added To Cart</span>
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    cartId: cartId ?? 0,
                    productId: product?.id ?? 0,
                  });
                  updateOptimistic?.(product!, true);
                }}
                className="w-full flex justify-center items-center gap-2"
              >
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </div>
            )}
          </button>
        )}

        {/* Edit Product - For Sellers To make changes in Product */}
        {seller && (
          <button
            className="hidden md:flex w-full py-2 rounded-lg bg-blue-600 text-white font-medium justify-center items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/updateproduct/${product.id}`);
            }}
          >
            <div className="w-full flex justify-center items-center gap-2 ">
              <Pencil size={16} />
              <span>Edit Product</span>
            </div>
          </button>
        )}
      </div>

      {/* Absolute Discount and Icons */}
      <p className="absolute top-4 left-4 px-2 py-1 bg-blue-600 text-white font-medium text-xs rounded-full">
        {"-"}
        {product?.discountPercentage}%
      </p>

      <div className="absolute top-4 right-4 flex flex-col gap-2 ">
        <div className="opacity-0 group-hover:opacity-100 bg-white text-heading p-2 rounded-full hover:scale-115 transiton-all ease-in-out duration-300">
          {seller ? (
            <Pencil
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/updateproduct/${product.id}`);
              }}
            />
          ) : product?.isInCart ? (
            <SquareCheckBig
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart({
                  cartId: cartId ?? 0,
                  productId: product.id,
                });
                updateOptimistic?.(product!, false);
              }}
            />
          ) : (
            <ShoppingCart
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  cartId: cartId ?? 0,
                  productId: product?.id ?? 0,
                });
                updateOptimistic?.(product!, true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
