import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import type { ProductWithCart } from "../types/Types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import ProductComponent from "../components/Product";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const Products = ({ showNavbar = true }: { showNavbar?: boolean }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState<ProductWithCart[]>([]);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useState<string>("");

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
  const filteredProducts = allProducts.filter((product) => {
    const value = searchParams.toLowerCase();
    return (
      product?.name.toLowerCase().includes(value) ||
      product?.discountedPrice.toString().toLowerCase().includes(value) ||
      product?.actualPrice.toString().toLowerCase().includes(value) ||
      product?.description?.toLowerCase().includes(value)
    );
  });

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

      if ((scrollTop + windowSize) / websiteHeight > 0.65) {
        console.log("Fetching next set of products");
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
    <div className="bg-gray-50 space-y-2 md:space-y-6">
      {showNavbar && (
        <Navbar
          seller={user.role === "SELLER"}
          showSearchBar={true}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}

      <div className="md:hidden">
        <SearchBar searchParams={searchParams} setSearchParams={setSearchParams}/>
      </div>

      <div className="max-w-7xl mx-auto my-6 ">
        {/* Products */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 mt-6 mx-4 md:mx-auto max-w-7xl justify-items-center">
          {filteredProducts.length ? (
            filteredProducts.map((product, i) => (
              <ProductComponent
                key={i}
                product={product!}
                updateOptimistic={updateOptimistic}
              />
            ))
          ) : (
            <div className=" col-span-full flex justify-center text-center py-4">
              No products found
            </div>
          )}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Products;
