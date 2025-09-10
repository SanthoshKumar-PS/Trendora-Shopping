import { ListPlus, LocateFixed } from "lucide-react";
import axios from "axios";
import { useState } from "react";
type ShowAddAddressProps = {
    showAddAddress:boolean ;
    setShowAddAddress: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddAddress = ({showAddAddress,setShowAddAddress}:ShowAddAddressProps) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  
    const inputStyle = "w-full appearance-none outline-none border border-gray-300 rounded-xs px-2 py-1 focus:border-1 focus:border-gray-400 focus:shadow text-md bg-white"
const [name, setName] = useState<string>("");
const [phone, setPhone] = useState<string>("");
const [line1, setLine1] = useState<string>("");
const [line2, setLine2] = useState<string>("");
const [city, setCity] = useState<string>("");
const [state, setState] = useState<string>("");
const [pincode, setPincode] = useState<string>("");
const [type, setType] = useState<string>("");

    const handleAddAddress = async (e:React.FormEvent) =>{
        e.preventDefault();
        try{
            type AddAddressRespone ={

            }
            const payload = {name:name,phone:phone,line1:line1,line2:line2,city:city,state:state,pincode:pincode,type:type};
            const response = await axios.post(`${BACKEND_URL}/user/addAddress`,payload,{withCredentials:true})

            if (response.status === 201) {
                console.log("Address added successfully:", response.data);
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



  return (
    <div className="mx-auto max-w-sm md:max-w-md lg:min-w-full rounded-sm bg-blue-100 p-3 lg:p-4 flex justify-start items-start gap-2">
      <ListPlus size={22} className="mt-0.5 text-blue-600" />
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <p className="text-blue-600 text-md font-medium">ADD A NEW ADDRESS</p>
        <button className="bg-blue-600 rounded-sm px-4 py-2 text-white font-medium flex items-center gap-2">
          <LocateFixed size={20} />
          <p>Enter your location</p>
        </button>

        <form onSubmit={handleAddAddress} className="w-full flex flex-col items-center gap-4">
          <div className="w-full flex justify-between gap-2 h-11">
            <input
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              required
              className={inputStyle}
              placeholder="Name"
            />
            <input
              type="text"
              value={phone}
              onChange={(e)=>{
                const value = e.target.value;
                const phoneNumber = value.slice(0,10)
                setPhone(phoneNumber)}
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
              value={line1}
              onChange={(e)=>{setLine1(e.target.value)}}
              required
              className={inputStyle}
              placeholder="Line 1"
            />
            <input
              type="text"
              inputMode="numeric"
              value={line2}
              onChange={(e)=>{setLine2(e.target.value)}}
              className={inputStyle}
              placeholder="Line 2*"
            />
          </div>
          <div className="w-full flex justify-between gap-2 h-11">
            <input
              type="text"
              value={city}
              onChange={(e)=>{setCity(e.target.value)}}
              required
              className={inputStyle}
              placeholder="City"
            />
            <input
              type="text"
              value={state}
              onChange={(e)=>{setState(e.target.value)}}
              required
              inputMode="numeric"
              className={inputStyle}
              placeholder="State"
            />
          </div>
          <div className="w-full flex justify-between gap-2 h-11">
            <input
              type="text"
              inputMode="numeric"
              value={pincode}
              onChange={(e)=>{setPincode(e.target.value)}}
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
                <input type="radio" name="addressType" value="Home" checked={type === "Home"} onChange={(e)=>setType(e.target.value)} required />
                Home
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="addressType" value="Work" checked={type === "Work"} onChange={(e)=>setType(e.target.value)} required />
                Work (Delivery between 10 AM - 5 PM)
              </label>
            </div>
          </div>

          <div className="w-full flex justify-start items-center gap-3">
            <button type="submit" className="text-sm md:text-md text-white font-semibold bg-orange-500  px-6 md:px-8 py-3 rounded-xs hover:scale-95 hover:cursor-pointer">
                SAVE AND DELIVER HERE
            </button>
            <p className="tet-sm md:text-md text-blue-600 bg-transparent hover:cursor-pointer font-medium px-2 py-2"
                onClick={()=>{setShowAddAddress(false)}}>CANCEL</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
