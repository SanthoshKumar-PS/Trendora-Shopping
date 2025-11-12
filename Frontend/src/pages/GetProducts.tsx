import { useNavigate } from "react-router-dom";
import type { Product, ProductWithCart } from "../types/Types";
import ProductComponent from "../components/Product";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const GetProducts = ({ products }: { products: Product[] }) => {
  const [allproducts, setAllProducts] = useState<ProductWithCart[]>(products);
  const {user} = useUser();
  const {cartId, addToCart} = useCart();
  const updateOptimistic=(product:ProductWithCart, result:boolean) => {
    console.log("Updating product optimistically.")
    addToCart({
      cartId: cartId ?? 0,
      productId: product?.id ?? 0,
    });
    setAllProducts(prevProducts=>prevProducts.map(prod=>prod.id===product.id?{...prod,isInCart:result}:prod))
  }
  return (
    <div>
      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
        {allproducts.map((product, i) => (
          <div key={`${i}-${product.id}`}>
            {user.role === "SELLER" ? (
              <ProductComponent key={`${i}-${product.id}`} product={product} seller={true} />
            ) : (
              <ProductComponent
                key={`${i}-${product.id}`}
                product={product}
                updateOptimistic={updateOptimistic}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetProducts;
