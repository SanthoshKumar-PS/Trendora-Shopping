import axios from "axios";
import type { Product } from "../types/Types"
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";


//API Calls
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  

type FetchCartProductsType = {
    message:string;
    cartProducts : Product[]

}

const fetchCartProducts = async ():Promise<Product[]> =>{
    const res = await axios.get<FetchCartProductsType>(`${BACKEND_URL}/user/getCartProducts`,{withCredentials:true})
    return res.data.cartProducts
}

// Actual Card Context Starts here 
type CartContextType = {
    cartProducts : Product[];
    addToCart:(p:Product)=>void;
    removeFromCart : (id:number)=>void
    clearCart : ()=>void;
}
const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children}:{children: React.ReactNode}) =>{
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    const {data: newCartProducts, refetch, isFetching } = useQuery<Product[]>({
        queryKey: ["newProducts"],
        queryFn: fetchCartProducts,
        enabled: false
    })
    
    useEffect(()=>{
        if(newCartProducts){
            setCartProducts(newCartProducts)
        }

    },[newCartProducts])

    const addToCart = (p:Product)=> setCartProducts(prev=>(prev.some(x=> x.id===p.id)?prev:[...prev,p]));

    const removeFromCart = (id: number) => 
        setCartProducts(prev=>prev.filter(x => x.id !==id))

    const clearCart = () => setCartProducts([])

    const value = useMemo(()=>({
        cartProducts, addToCart, removeFromCart, clearCart
    }),[cartProducts]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () =>{
    const cart = useContext(CartContext);
    if(!cart) throw new Error("useCart must be used with CartProvider")
        return cart

}