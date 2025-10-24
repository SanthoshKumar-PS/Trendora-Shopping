import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import type { ProductWithCart } from "../types/Types";
import {
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import ProductComponent from "../components/Product";

const Products = ({ showNavbar = true }: { showNavbar?: boolean }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState<ProductWithCart[]>([]);
  const { user } = useUser();
  const queryClient = useQueryClient();

  interface ViewProductResponse {
    message: string;
    products?: ProductWithCart[];
    nextPage: number | null;
  }
  const getUserProducts = async ({ pageParam = 1 }) => {
    const response = await axios.get<ViewProductResponse>(
      `${BACKEND_URL}/user/getHomeProducts`,
      {
        withCredentials: true,
        params: { pageStr: pageParam, limitStr: 12 },
      }
    );
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: getUserProducts,
      getNextPageParam: (lastPage, allPage) =>
        lastPage.nextPage ? allPage.length + 1 : undefined,
      initialPageParam: 1,
    });

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

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

  useEffect(() => {
    const handleScroll = () => {
      if (!hasNextPage || isFetchingNextPage) return;

      const scrollTop = window.scrollY;
      const windowSize = window.innerHeight;
      const websiteHeight = document.documentElement.scrollHeight;

      if ((scrollTop + windowSize) / websiteHeight > 0.7) {
        console.log("Fetching next set of values");
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-gray-50">
      {showNavbar && <Navbar seller={user.role === "SELLER"} showSearchBar={true} />}

      <div className="max-w-7xl mx-auto mt-6 ">
        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
          {allProducts &&
            allProducts.map((product, i) => (
            <ProductComponent key={i} product={product!} updateOptimistic={updateOptimistic}/>

            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
