import { ChevronDown, CircleAlert, Eye, Heart, Pencil, X } from "lucide-react"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { useState } from "react"
const AddProduct = () => {
  const h1Style="text-md font-serif font-medium  md:text-end md:max-w-[80%]"
  const navigate=useNavigate()
  const categories=[
    {id:1,value:"Mens Wear"},
    {id:2,value:"Womans Wear"},
    {id:3,value:"Children Wear"},
    {id:4,value:"Mobile"},
    {id:5,value:"Laptop"},
    {id:6,value:"Accessories"},
  ]
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [images,setImages]=useState<File[]>([])
  const [urls,setUrls]=useState<string[]>([]);
  const [selectedCategory,setSelectedCategory]=useState<string>('Select')
  const [productName,setProductName]=useState<string|null>(null)
  const [productDescription,setProductDescription] = useState<string|null>(null)
  const [discountedPrice,setDiscountedPrice]=useState<number|null>(null)
  const [actualPrice,setActualPrice] = useState<number|null>(null)
  const [error,setError] = useState<string|null>(null)

  function handleOnChange(e : React.ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;
    
    const seletectedFiles=Array.from(e.target.files);
    if(seletectedFiles.length+images.length >5){
      setError('You can select upto 5 images only');
      return
    }
    setImages((prev)=>[...prev, ...seletectedFiles])

  }
  
  function removeImage (index: number) {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateAndUpload= ()=>{
    if(selectedCategory==='Select' && !productName && !productDescription && !discountedPrice && !actualPrice){
      setError("Enter all fields to add product");
      return
    }

    if(selectedCategory==='Select'){
      setError("Select Category according to your product")
      return
    }
    if(!productName){
      setError("Enter Your Product Name")
      return
    }
    if(!productDescription){
      setError("Enter your product description")
      return
    }
    if(!discountedPrice){
      setError("Enter discounted price of your product")
      return
    }
    if(!actualPrice){
      setError("Enter actual price of your product")
      return
    }
    if(images.length===0){
      setError("Please upload at least one image of your product")
      return
    }
    handleUploadImages()
  }

  const handleUploadImages = async () => {
    
    const formData = new FormData();
    images.forEach((img)=> formData.append('images',img));
    formData.append("sellerName","santhosh");
    // formData.append("productName",productName??"");
    formData.append("productName","testing");


    try {
      const res = await axios.post(`${BACKEND_URL}/seller/uploadProductImages`,formData,
        {
          headers: { "Content-Type" : "multipart/form-data"},

        }
      )

      const data:any=res.data 
      setUrls(data.urls);
      console.log(data.urls)
      alert("Images uploaded successfully!");
    } catch (err) {
      console.log(err);
      alert("Upload failed. Please try again.");
    }
  };
  return (
    <div>
        <Navbar seller={true}/>
        <div className="w-full border-b border-zinc-300"></div>


        <div className=" mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-4 max-w-[75%] md:max-w-[50%]">
          {/* Select Category */}
            <h1 className={h1Style}>Select Category *</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className='px-3 py-2  border-1 rounded-md flex justify-between items-center gap-2'>
                {selectedCategory} <span><ChevronDown size={20} /></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map(category=>(
                  <DropdownMenuItem key={category.id} onClick={()=>setSelectedCategory(category.value)}>{category.value}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          {/* Product Name */}
            <h1 className={h1Style}>Product Name</h1>
            <Input type="text" placeholder="Enter Product Name" value={productName??""} onChange={(e)=>{setProductName(e.target.value)}}/>

          {/* Product Description */}
            <h1 className={h1Style}>Product Description</h1>
            <Textarea  placeholder="Enter Product Description" value={productDescription??""} onChange={(e)=>{setProductDescription(e.target.value)}} className=" h-20"/>

          {/* Discounted Price */}
            <h1 className={h1Style}>Discounted Price</h1>
            <Input type="number" step="1" min={0} placeholder="Enter Price To Be Sold" value={discountedPrice??""} 
             onChange={(e)=>{
                const value=e.target.value
                
                if (value === "") {
                  setDiscountedPrice(null);
                } else {
                  const parsed = Number(value);
                  const rounded = Math.round(parsed * 100) / 100;
                  setDiscountedPrice(rounded);
                }     
              }} />

          {/* Actual Price */}
            <h1 className={h1Style}>Actual Price without discount</h1>
            <Input type="number" step="1" min={0} placeholder="Price of the Product" value={actualPrice??""} 
             onChange={(e)=>{
                const value=e.target.value
                
                if (value === "") {
                  setActualPrice(null);
                } else {
                  const parsed = Number(value);
                  const rounded = Math.round(parsed * 100) / 100;
                  setActualPrice(rounded);
                }     
              }} />

          {/* Upload Image */}
            <h1 className={h1Style}>Upload Image</h1>
            <Input  type="file" accept="image/*" multiple  className="border rounded-md"
              onChange={handleOnChange} />
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-3 mx-auto justify-center items-center gap-6">
            {images.map((file, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-32 h-32 object-cover rounded-lg shadow"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-1 rounded-full"
                >
                  <X size={16}/>
                </button>
              </div>
            ))}
          </div>

          {error &&(
            <div className='col-span-1 md:col-span-2 my-3 font-sans font-medium text-red-500 text-sm flex justify-center gap-2 items-center'>
              <span><CircleAlert size={20}/></span>
              {error}
            </div>
          )}

          {message &&(
            <div className='col-span-1 md:col-span-2 my-3 font-sans font-medium text-green-500 text-sm flex justify-center gap-2 items-center'>
              <span><CircleAlert size={20}/></span>
              {message}
            </div>
          )}

          {/* Upload Button  */}
          <div className="col-span-1 md:col-span-2 flex justify-center items-center">
            <button onClick={()=>validateAndUpload()} className="text-center mb-10 text-md font-serif bg-zinc-400 text-zinc-800 px-3 py-2 rounded-md hover:cursor-pointer hover:scale-95">
              Add Product
            </button>

          </div>



          
        </div>

    </div>
  )
}

export default AddProduct