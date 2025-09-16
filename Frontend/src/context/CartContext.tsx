import axios from "axios";
import type { Product } from "../types/Types"
import { createContext, useContext, useMemo, useState} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


//API Calls
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  

type FetchProductsCartType = {
    message : string;
    cartId:number;
    cartProducts : Product[]
}

const fetchProductsFromCart = async ():Promise<Product[]> =>{
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
    addToCart:(cartId:number,productId:number)=>void;
    removeFromCart :(cartId:number, productId:number)=>void
    clearCart : (cartId:number)=>void;
    refetchCart : ()=>void;
    isCartFetching:boolean;
}
const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children}:{children: React.ReactNode}) =>{
    const queryClient = useQueryClient();
    
    const [cartId, setCartId] = useState<number|null>(null);
    // const [cartProducts, setCartProducts] = useState<Product[]>([]);

    const {data: cartProducts=[], refetch, isFetching } = useQuery<Product[]>({
        queryKey: ["cart",cartId],
        queryFn: fetchProductsFromCart,
        enabled: !!cartId,
        // enabled: false,
        refetchOnWindowFocus:true
    })
    

    const addMutation = useMutation({
        mutationFn: addProductToCart,
        onSuccess: (data)=>{
            queryClient.setQueryData(["cart"],data)
        }
    });

    const deleteMutation = useMutation({
        mutationFn:deleteProductFromCart,
        onSuccess:(data)=>{
            queryClient.setQueryData(["cart"],data);
        }
    })

    const clearCartMutation = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: (data) => {
        queryClient.setQueryData(["cart"], data); 
    },
    });

    // const addToCart = (p:Product)=> setCartProducts(prev=>(prev.some(x=> x.id===p.id)?prev:[...prev,p]));
    const addToCart = (cartId: number, productId: number) =>{
                    addMutation.mutate({ cartId, productId });
    console.log("Adding Product : ",productId)
}


    //const removeFromCart = (id: number) =>setCartProducts(prev=>prev.filter(x => x.id !==id))
    const removeFromCart = (cartId: number, productId: number) =>
            deleteMutation.mutate({ cartId, productId });

    // const clearCart = () => setCartProducts([])
    const clearCart = (cartId: number) => {
            clearCartMutation.mutate({cartId});
    };



    const value = useMemo(()=>({
        cartId, setCartId, cartProducts, addToCart, removeFromCart, clearCart, refetchCart: refetch, isCartFetching: isFetching
    }),[cartProducts]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () =>{
    const cart = useContext(CartContext);
    if(!cart) throw new Error("useCart must be used with CartProvider")
        return cart
}
