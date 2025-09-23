import axios from "axios";
import type { Product, ProductWithCart } from "../types/Types"
import { createContext, useContext, useEffect, useMemo, useState} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


//API Calls
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  

type FetchProductsCartType = {
    message : string;
    cartId:number;
    cartProducts : ProductWithCart[]
}

const fetchProductsFromCart = async ():Promise<Product[]> =>{
    console.log("Fetching cart for user again ")
    const res = await axios.get<FetchProductsCartType>(`${BACKEND_URL}/user/getCartProducts`,{withCredentials:true})
    console.log("Fetch Products from Cart")
    console.log(res.data)
    return res.data.cartProducts
}

type AddProductToCartType = {
    message : string;
    cartId: number;
    products : Product[];
}
const addProductToCart = async ({cartId,productId}:{cartId:number,productId:number}):Promise<Product[]> => {
    const res = await axios.post<AddProductToCartType>(`${BACKEND_URL}/user/addProductToCart`,{cartId, productId},{withCredentials:true})
    console.log(res.data.message)
    return res.data.products
}

type DeleteProductFromCart = {
    message: string;
    products:Product[]
}
const deleteProductFromCart = async ({cartId,productId}:{cartId:number,productId:number}):Promise<Product[]> => {
    const res = await axios.delete<DeleteProductFromCart>(`${BACKEND_URL}/user/deleteCartProduct`,{
        data:{cartId, productId} as { cartId: number; productId: number },
        withCredentials:true
    } as any)
    return res.data.products
}

type ClearCartType = {
    message: string;
    products:Product[]
}

const clearCartAPI = async ({cartId}:{cartId: number}) => {
  const res = await axios.delete<ClearCartType>(`${BACKEND_URL}/user/clearCart`,{ data: { cartId }, withCredentials: true } as any);
  return res.data.products;
};


// Actual Card Context Starts here 
type CartContextType = {
    cartId:number|null;
    setCartId:React.Dispatch<React.SetStateAction<number | null>>;
    cartProducts : Product[];
    addToCart:(variables: { cartId: number; productId: number }, options?: any) => void;
    removeFromCart :(variables: { cartId: number; productId: number }, options?: any) => void;
    clearCart : (cartId:number)=>void;
    refetchCart : ()=>void;
    isCartFetching:boolean;
    checkoutProducts:Product[]
    setCheckoutProducts:(products: Product[]) => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children}:{children: React.ReactNode}) =>{
    const queryClient = useQueryClient();
    
    const [cartId, setCartId] = useState<number|null>(null);
    const [checkoutProducts,_setCheckoutProducts] = useState<ProductWithCart[]>(()=>{
        const saved = localStorage.getItem('checkoutProducts');
        return saved && saved !== "undefined" ? JSON.parse(saved) : []
    });
    const setCheckoutProducts = (products: ProductWithCart[]) => {
        _setCheckoutProducts(products);
        localStorage.setItem("checkoutProducts", JSON.stringify(products));
    }

    const {data: cartProducts=[], refetch, isFetching } = useQuery<Product[]>({
        queryKey: ["cart",cartId],
        queryFn: fetchProductsFromCart,
        enabled: !!cartId,
        // enabled: false,
        refetchOnWindowFocus:true,
        refetchOnMount: "always",
        staleTime: 0,
    })
    

    const addMutation = useMutation({
        mutationFn: addProductToCart,
        onSuccess: (data)=>{
            queryClient.setQueryData(["cart",cartId],data)
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProductFromCart,
        onMutate: (variables) => {
            console.log("Mutation starts")
            queryClient.cancelQueries({ queryKey: ["cart", variables.cartId] });

            const previousCart = queryClient.getQueryData<Product[]>(["cart", variables.cartId]);
            console.log("Previous cart ",previousCart)

            queryClient.setQueryData<Product[]>(["cart", variables.cartId], old =>
            old?.filter(product => product.id !== variables.productId) ?? []
            );
            console.log("After filter: ",queryClient.getQueryData<Product[]>(["cart",variables.cartId]))

            return { previousCart };
        },
        onError: (_err, variables, context) => {
            if (context?.previousCart) {
            queryClient.setQueryData(["cart", variables.cartId], context.previousCart);
            }
        },
        onSettled: (data, _error, variables) => {
            queryClient.invalidateQueries({ queryKey: ["cart", variables.cartId] });
        }
    });


    const clearCartMutation = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: (data) => {
        queryClient.setQueryData(["cart",cartId], data); 
    },
    });

    const addToCart = (variables: { cartId: number; productId: number },options?:any) =>{
                    addMutation.mutate(variables,options);
    console.log("Adding Product : ",variables.productId)
}


    const removeFromCart = (variables:{cartId: number, productId: number},options?:any) =>{
            const { cartId, productId } = variables;
            deleteMutation.mutate({cartId,productId},options);
            console.log("Removing Product : ",variables.productId)
    }

    const clearCart = (cartId: number) => {
            clearCartMutation.mutate({cartId});
    };



    const value = useMemo(()=>({
        cartId, setCartId, cartProducts, addToCart, removeFromCart, clearCart, refetchCart: refetch, isCartFetching: isFetching,
        checkoutProducts,setCheckoutProducts
    }),[cartProducts]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () =>{
    const cart = useContext(CartContext);
    if(!cart) throw new Error("useCart must be used with CartProvider")
        return cart
}
