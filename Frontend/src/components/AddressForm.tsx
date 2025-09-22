import { ListPlus, LocateFixed } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import type { Address } from "../types/Types";
import { getAllAddresses } from "../Api/GetAddresses";

type AddressType = {
  id? : number;
  name : string;
  phone:string,
  line1:string,
  line2?:string,
  city:string,
  state:string,
  pincode:string,
  type:string
}
type AddressFormProps = {
    showAddressForm:boolean ;
    setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
    setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
    setSelectedAddress : React.Dispatch<React.SetStateAction<Address|null>>;
    initialData? : Address | AddressType;
    mode: 'create' | 'update'
}
const AddressForm = ({showAddressForm,setShowAddressForm, setAddresses, setSelectedAddress, initialData,mode='update'}:AddressFormProps) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  
    const inputStyle = "w-full appearance-none outline-none border border-gray-300 rounded-xs px-2 py-1 focus:border-1 focus:border-gray-400 focus:shadow text-md bg-white";
    const normalizeAddress = (addr: Address | AddressType): AddressType => ({
      id: addr.id,
      name: addr.name,
      phone: (addr as Address).phone ?? (addr as AddressType).phone ?? "",
      line1: addr.line1,
      line2: (addr as Address).line2 ?? (addr as AddressType).line2 ?? "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      type: (addr as Address).type ?? (addr as AddressType).type ?? "Home",
    });
  const [formData, setFormData] = useState<AddressType>(
    initialData ? normalizeAddress(initialData) : {
      name: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    }
  );
     

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name,value} = e.target;
      setFormData(prev=>({...prev,[name]:value}))
    }


    const handleAddAddress = async (e:React.FormEvent) =>{
        e.preventDefault();
        try{
            type AddAddressRespone ={
              message:string;
              address: Address | null
            }
            // const payload = {name:name,phone:phone,line1:line1,line2:line2,city:city,state:state,pincode:pincode,type:type};
            const response = await axios.post<AddAddressRespone>(`${BACKEND_URL}/user/addAddress`,formData,{withCredentials:true})

            if (response.status === 201) {
                console.log("Address added successfully:", response.data);
                setSelectedAddress(response.data.address)
                setShowAddressForm(false)
            } 
            else {
                console.warn("Unexpected response status:", response.status, response.data);
            }

        }
        catch(error){
            console.log("Error occured while add new address");
            console.log(error)
        }

    }
    const handleUpdateAddress = async (e:React.FormEvent) =>{
        e.preventDefault();
        try{
            type UpdateAddressRespone ={
              message:string;
              address:Address|null
            }
            const response = await axios.patch<UpdateAddressRespone>(`${BACKEND_URL}/user/updateAddress`,formData,{withCredentials:true})

            if (response.status === 200) {
                console.log("Address updated successfully:", response.data);
                setSelectedAddress(response.data.address)
                setShowAddressForm(false)
                await getAllAddresses({setAddresses})
            } 
            else {
                console.warn("Unexpected response status:", response.status, response.data);
            }

        }
        catch(error){
            console.log("Error occured while updating new address");
            console.log(error)
        }

    }


  return (
    <div className="mx-auto max-w-sm md:max-w-md lg:min-w-full rounded-sm bg-blue-100 p-3 lg:p-4 flex justify-start items-start gap-2">
      <ListPlus size={22} className="mt-0.5 text-blue-600" />
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <p className="text-blue-600 text-md font-medium">ADD A NEW ADDRESS</p>
        <button className="bg-blue-600 rounded-sm px-4 py-2 text-white font-medium flex items-center gap-2">
          <LocateFixed size={20} />
          <p>Enter your location</p>
        </button>

        <form onSubmit={mode==='create'?handleAddAddress:handleUpdateAddress} className="w-full flex flex-col items-center gap-4">
          <div className="w-full flex justify-between gap-2 h-11">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputStyle}
              placeholder="Name"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e)=>{
                const value = e.target.value;
                const phoneNumber = value.slice(0,10)
                setFormData(prev => ({ ...prev, phone: phoneNumber }));
              }
            }
              required
              inputMode="numeric"
              className={inputStyle}
              placeholder="10-digit mobile number"
            />
          </div>
          <div className="w-full flex justify-between gap-2 h-11">
            <input
              type="text"
              name="line1"
              value={formData.line1}
              onChange={handleChange}
              required
              className={inputStyle}
              placeholder="Line 1"
            />
            <input
              type="text"
              inputMode="numeric"
              name="line2"
              value={formData.line2}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Line 2*"
            />
          </div>
          <div className="w-full flex justify-between gap-2 h-11">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={inputStyle}
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              inputMode="numeric"
              className={inputStyle}
              placeholder="State"
            />
          </div>
          <div className="w-full flex justify-between gap-2 h-11">
            <input
              type="text"
              name="pincode"
              inputMode="numeric"
              value={formData.pincode}
              onChange={handleChange}
              required
              className={inputStyle}
              placeholder="Pincode"
            />
            <input
              type="text"
              className={inputStyle}
              placeholder="Landmark*"
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start">
            <p className="text-gray-600">Address Type</p>
            <div className="flex justify-start items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="type" value="Home" checked={formData.type === "Home"} onChange={handleChange} required />
                Home
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="type" value="Work" checked={formData.type === "Work"} onChange={handleChange} required />
                Work (Delivery between 10 AM - 5 PM)
              </label>
            </div>
          </div>

          <div className="w-full flex justify-start items-center gap-3">
            <button type="submit" className="text-sm md:text-md text-white font-semibold bg-orange-500  px-6 md:px-8 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">
                SAVE AND DELIVER HERE
            </button>
            <p className="tet-sm md:text-md text-blue-600 bg-transparent hover:cursor-pointer font-medium px-2 py-2"
                onClick={()=>{setShowAddressForm(false)}}>CANCEL</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
