import { ChevronDown, ChevronRight, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { OrderStatus } from "../../types/Types";
import { camelCase } from "./camelCase";

export type SORT = 'asc'|'desc'
export type FilterState = {
  sort: SORT | null;
  status:OrderStatus | null;
}
type SelectFilterProps = {
  filters: FilterState,
  setFilters : React.Dispatch<React.SetStateAction<FilterState>>
}
const SelectFilters = ({filters, setFilters}:SelectFilterProps) => {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  
  const updateSort = (value : 'asc'|'desc'|null) =>{
    setFilters(prev=>({
      ...prev,
      sort:prev.sort===value?null:value
    }))
    setOpen(false);
    setSubMenuOpen(false); 
  }

  const updateStatus = (value:OrderStatus|null) => {
    setFilters(prev=>({
      ...prev,
      status:prev.status===value?null:value
    }))
    setOpen(false);
    setSubMenuOpen(false);  
  }

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options = [
    { type: "sort", label: "Sort Price Asc", value: "asc" },
    { type: "sort", label: "Sort Price Desc", value: "desc" },
    {
      type: "submenu",
      label: "Status",
      submenu: ['CONFIRMED', 'PROCESSING' ,'PROCESSED', 'SHIPPED','DELIVERED', 'CANCELLED'],
    },
  ];

  useEffect(()=>{
    function handleClickOutside(event:MouseEvent){
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        setOpen(false);
        setSubMenuOpen(false);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>document.removeEventListener("mousedown",handleClickOutside)
  },[])


  return (
    <div className="flex items-center justify-between">
      <div ref={dropdownRef} className="relative w-30 max-w-40">
        <button
          className="w-30 max-w-40 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium flex justify-between items-center"
          onClick={() => setOpen((prev) => !prev)}
        >
          Filters
          <ChevronDown size={20} />
        </button>

        {open && (
          <div className="absolute min-w-40 max-w-40 p-1 bg-white border border-gray-300 z-10 mt-1 rounded-sm space-y-1 shadow">
            {options.map((opt, index) => {
              if (opt.type === "sort") {
                const active = filters.sort===opt.value
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center px-3 py-2 text-sm ${active?"hover:bg-blue-200/70":"hover:bg-gray-100/70"} ${active?"bg-blue-200/70":""} rounded-sm cursor-pointer`}
                    onClick={() => updateSort(opt.value as SORT)}
                    onMouseEnter={()=>setSubMenuOpen(false)}
                  >
                    <span>{opt.label}</span>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="relative px-2 py-1 text-sm hover:bg-gray-200/50 rounded-sm flex justify-between items-center cursor-pointer"
                  onMouseEnter={()=>{setSubMenuOpen(true)}}
                >
                  {opt.label}
                  <ChevronRight size={18} />

                  {subMenuOpen && (
                    <div
                      className={`w-30 max-w-40 absolute top-0 w-36 p-1 bg-white border border-gray-300 rounded-sm shadow space-y-1
                       left-full ml-2`}
                    >
                      {opt.submenu?.map((status, i) => {
                      const active = filters.status===status  
                      return (
                        <div
                          key={i}
                          className={`flex justify-between items-center px-2 py-1 text-sm ${active?"hover:bg-blue-200/70":"hover:bg-gray-100/70"} ${active?"bg-blue-200/70":""} rounded-sm cursor-pointer`}
                          onClick={() => updateStatus(status as OrderStatus)}
                        >
                          <span className="capitalize">{status}</span>

                        </div>
                      )})}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Filters */}
      {(filters.sort || filters.status) && (
        <div className="flex items-center gap-3">
          {filters.sort && (
            <div className="w-max flex items-center gap-1 bg-gray-200/70 px-2 py-1 rounded-md text-xs font-medium">
              <span>{filters.sort==='asc'?"Price - Low to High":"Price - High to Low"}</span>
              <button
                onClick={()=>{updateSort(null)}}
                className="text-gray-600 hover:text-red-600 p-1"
              >
                <X size={14}/>
              </button>
            </div>
          )}

          {filters.status && (
            <div className="w-max flex items-center gap-1 bg-gray-200/70 px-2 py-1 rounded-md text-xs font-medium">
              <span>Status: {camelCase(filters.status)}</span>
              <button
                onClick={()=>{updateStatus(null)}}
                className="text-gray-600 hover:text-red-600 p-1"
              >
                <X size={14}/>
              </button>
            </div>
          )}
            <div className="w-max hidden md:flex items-center gap-1 bg-red-500/50 px-2 py-1 rounded-md text-xs font-medium">
              <span>{camelCase("rEMOVE")}</span>
              <button
                onClick={()=>{updateStatus(null); updateSort(null);}}
                className="text-gray-600 hover:text-red-600 p-1"
              >
                <X size={14}/>
              </button>
            </div>


        </div>
      )}

      
    </div>
  );
};

export default SelectFilters;
