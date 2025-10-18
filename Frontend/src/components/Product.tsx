import React from "react";
import { useNavigate } from "react-router-dom";
import type { ProductWithCart } from "../types/Types";
import { ShoppingCart, SquareCheckBig, Star } from "lucide-react";
import { formatCurrency } from "../lib/formatCurrency";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useQueryClient } from "@tanstack/react-query";

type ProductProps = {
  product: ProductWithCart;
};
const Product = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const { cartId, addToCart, removeFromCart, refetchCart } = useCart();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const updateOptimistic = (product: ProductWithCart, result: boolean) => {
    return queryClient.setQueryData(["products"], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          products: page.products.map((p: any) =>
            p.id === product?.id ? { ...p, isInCart: result } : p
          ),
        })),
      };
    });
  };
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

        {/* Add To Cart Button */}
        <button className="hidden md:flex w-full py-2 rounded-lg bg-blue-600 text-white font-medium justify-center items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          {product?.isInCart ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart({
                  cartId: cartId ?? 0,
                  productId: product.id,
                });
                updateOptimistic(product!, false);
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
                updateOptimistic(product!, true);
              }}
              className="w-full flex justify-center items-center gap-2"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </div>
          )}
        </button>
      </div>

      {/* Absolute Discount and Icons */}
      <p className="absolute top-4 left-4 px-2 py-1 bg-blue-600 text-white font-medium text-xs rounded-full">
        {"-"}
        {product?.discountPercentage}%
      </p>

      <div className="absolute top-4 right-4 flex flex-col gap-2 ">
        <div className="opacity-0 group-hover:opacity-100 bg-white text-heading p-2 rounded-full hover:scale-115 transiton-all ease-in-out duration-300">
          {product?.isInCart ? (
            <SquareCheckBig
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart({
                  cartId: cartId ?? 0,
                  productId: product.id,
                });
                updateOptimistic(product!, false);
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
                updateOptimistic(product!, true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
