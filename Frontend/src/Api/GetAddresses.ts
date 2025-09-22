import axios from "axios"
import type { Address } from "../types/Types";

export type GetAllAddressesType = {
    message:string;
    addresses: Address[]
}

type GetAllAddressesProp ={
    setAddresses:React.Dispatch<React.SetStateAction<Address[]>>
}

export const getAllAddresses =async ({setAddresses}:GetAllAddressesProp) =>{
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;      
        try{
            const response = await axios.get<GetAllAddressesType>(`${BACKEND_URL}/user/getAllAddresses`,{withCredentials:true})
            if(response.status===200){
                console.log("All address of user : ",response.data)
                setAddresses(response.data.addresses)
            }

        }
        catch(error){
            console.log("Error occured while getting all user address");
            console.log(error)
        }
    }
