import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type UserLog = {
    loggedIn : boolean;
    email: string;
    name:string;
    role: "ADMIN"|"USER" | "SELLER"
    image?: string;
    phone?:string;
    cartId? : number
}
type UserContextType = {
    user: UserLog;
    setUser : React.Dispatch<React.SetStateAction<UserLog>>
}

const UserContext = createContext<UserContextType|undefined>(undefined)

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState<UserLog>(()=>{
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

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "UserInfo") {
        if (event.newValue) {
            console.log ("event.newValue: ",event.newValue);            
            console.log ("event.oldValue: ",event.oldValue);            
          setUser(JSON.parse(event.newValue));
        } else {
          // If UserInfo is removed (logout)
          setUser({
            loggedIn: false,
            email: "",
            name: "",
            role: "USER",
            image: "",
            phone: "",
            cartId: undefined,
          });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
    const value = useMemo(()=>({user,setUser}),[user,setUser])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const user = useContext(UserContext);
    if(!user) throw new Error("useUser must be used with UserProvider")
        return user;
}