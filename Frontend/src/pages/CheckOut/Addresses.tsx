import { BadgeCheck, MapPinned, Plus } from "lucide-react";
import type React from "react";
import type { Address } from "../../types/Types";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getAllAddresses } from "../../Api/GetAddresses";

type AddressesProps = {
  selectedAddressId: number | null;
  setSelectedAddressId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedAddress : Address |null,
  setSelectedAddress : React.Dispatch<React.SetStateAction<Address|null>>;
  addresses : Address[];
  setAddresses : React.Dispatch<React.SetStateAction<Address[]>>;
  showAddAddress : boolean;
  setShowAddAddress : React.Dispatch<React.SetStateAction<boolean>>;
};

const Addresses = ({
  selectedAddressId,
  setSelectedAddressId,
  selectedAddress,
  setSelectedAddress,
  addresses,
  setAddresses,
  showAddAddress,
  setShowAddAddress
}: AddressesProps) => {

    const {user} = useUser()
    

    useEffect(()=>{
        if(user.loggedIn){
          getAllAddresses({setAddresses})
        }
        else{
          setAddresses([])
        }
        console.log(localStorage.getItem("UserInfo"))
    },[user.loggedIn,user.email])


  return (
    <div className="mx-auto max-w-sm md:max-w-md lg:max-w-full flex flex-col w-full bg-white">
      {/* Delivery Address Header */}
      <div className="px-4 py-2 w-full flex justify-start items-center gap-2 bg-blue-600 rounded-t-sm text-white">
        <MapPinned size={20} />
        <p className="font-medium text-white ">DELIVERY ADDRESS</p>
      </div>

      {selectedAddressId !== null && selectedAddress !== null && (
        <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center ">
          <div className="mx-3 md:mx-5 my-3 md:my-5 w-full flex justify-between items-start ">
            <div className="flex gap-2 items-start justify-start">
              {/* Selection Badge */}
              <div className="mt-1 ml-1">
                <BadgeCheck size={18} color="#2563EB" className="" />
              </div>
              {/* Actual Address Line by Line */}
              <div className="flex flex-col gap-2 justify-start items-start">
                {/* Line 1 */}
                <div className="flex gap-2 items-center">
                  <p className="font-medium">{selectedAddress.name}</p>
                  <p className="bg-zinc-200 p-1 text-zinc-600 text-xs font-medium">
                    {selectedAddress.type}
                  </p>
                  <p className="font-medium">{selectedAddress.phone}</p>
                </div>

                {/* Line 2 */}
                <div className="flex flex-col">
                  <p className="max-w-md">
                    {selectedAddress.line1}, {selectedAddress.line2},{" "}
                    {selectedAddress.city}
                  </p>
                  <p className="font-medium">
                    {selectedAddress.state} - {selectedAddress.pincode}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit */}
            <div
              onClick={() => {
                setSelectedAddressId(null);
                setSelectedAddress(null);
              }}
              className="text-blue-600 font-medium cursor-pointer text-sm md:text-md mx-1"
            >
              CHANGE
            </div>
          </div>
        </div>
      )}

      {addresses.length === 0 && (
        <div className="mx-auto mt-4 mb-2 font-medium text-md text-blue-600">No Address Present. Please Add Your Address</div>
      )}

      {addresses &&
        addresses.length > 0 &&
        selectedAddressId === null &&
        addresses.map((address, i) => (
          <div key={i} className="w-full flex flex-col">
            {/* Address Content */}
            <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center ">
              <div className="mx-3 md:mx-5 my-3 md:my-5 w-full flex justify-between items-start ">
                <div className="flex gap-2 items-start justify-start">
                  {/* Selection Badge */}
                  <div className="mt-1 ml-1">
                    <BadgeCheck size={18} color="#2563EB" className="" />
                  </div>
                  {/* Actual Address Line by Line */}
                  <div className="flex flex-col gap-2 justify-start items-start">
                    {/* Line 1 */}
                    <div className="flex gap-2 items-center">
                      <p className="font-medium">{address.name}</p>
                      <p className="bg-zinc-200 p-1 text-zinc-600 text-xs font-medium">
                        {address.type}
                      </p>
                      <p className="font-medium">{address.phone}</p>
                    </div>

                    {/* Line 2 */}
                    <div className="flex flex-col">
                      <p className="max-w-md">
                        {address.line1}, {address.line2}, {address.city}
                      </p>
                      <p className="font-medium">
                        {address.state} - {address.pincode}
                      </p>
                    </div>

                    {/* Deliver Here Button */}
                    <button
                      onClick={() => {
                        setSelectedAddressId(address.id);
                        setSelectedAddress(address);
                      }}
                      className="text-sm md:text-md text-white font-semibold bg-orange-500 flex-1 flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xs hover:scale-95 hover:cursor-pointer"
                    >
                      DELIVER HERE
                    </button>
                  </div>
                </div>

                {/* Edit */}
                <div className="text-blue-600 font-medium cursor-pointer text-sm md:text-md mx-1"
                  onClick={() => {
                    setShowAddAddress(true); 
                    setSelectedAddressId(address.id);
                    setSelectedAddress(address); 
                  }}>
                  EDIT
                </div>
              </div>
            </div>

            <div className="w-full border-b-1 text-zinc-500"></div>
          </div>
        ))}

      {/* Add Address Trigger */}
      {selectedAddressId === null && !showAddAddress && (
        <div
          className="flex flex-col lg:flex-row justify-center lg:justify-around items-center hover:cursor-pointer"
          onClick={() => setShowAddAddress((prev) => !prev)}
        >
          <div className="mx-3 md:mx-5 my-3 md:my-5 w-full flex justify-between items-start">
            <div className="flex gap-2 items-start justify-start text-blue-600 font-medium">
              {/* Selection Badge */}
              <div className="mt-1 ml-1">
                <Plus size={19} color="#2563EB" className="" />
              </div>
              {/* Actual Address Line by Line */}
              <p>Add a new Address</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
