import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Types";
import ProductComponent from "../components/Product";

const GetProducts = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
        {products.map((product, i) => (
          <ProductComponent key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default GetProducts;
