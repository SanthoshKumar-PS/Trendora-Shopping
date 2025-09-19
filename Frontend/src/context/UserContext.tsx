import { createContext, useContext, useMemo, useState } from "react";

type User = {
    loggedIn : boolean;
    email: string;
    name:string;
    role: "ADMIN"|"USER" | "SELLER"
    image?: string;
    phone?:string;
    cartId? : number
}
type UserContextType = {
    user: User;
    setUser : React.Dispatch<React.SetStateAction<User>>
}

const UserContext = createContext<UserContextType|undefined>(undefined)

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState<User>(()=>{
        const stored = localStorage.getItem('UserInfo')
        return stored
            ? JSON.parse(stored)
            : {
                loggedIn: false,
                email: "",
                name: "",
                role:"USER",
                image: "",
                phone: "",
                cartId: undefined
            }

    });
    const value = useMemo(()=>({user,setUser}),[user,setUser])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const user = useContext(UserContext);
    if(!user) throw new Error("useUser must be used with UserProvider")
        return user;
}