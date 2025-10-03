import { ChevronDown, CircleAlert, Delete, DeleteIcon, Eye, Heart, Pencil, Plus, SquarePlus, Trash, X } from "lucide-react"
import Navbar from "../../components/Navbar"
import { useNavigate, useParams } from "react-router-dom"
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
import { use, useEffect, useState } from "react"
import type { Category } from "../../types/Types";
import LoadingScreen from "../../components/LoadingScreen";
import type { AddProductResponse, CategoriesResponse, FetchProductDetailsType } from "../../types/ResponseTypes";
const AddProduct = () => {
  const h1Style="text-md font-serif font-medium "
  const navigate=useNavigate();
  const {id} = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);


  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading,setLoading] = useState<boolean>(false);
  const [images,setImages]=useState<File[]>([])
  const [urls,setUrls]=useState<string[]>([]);
  
  const [categories ,setCategories]=useState<Category[]>([])
  const [selectedCategoryName,setSelectedCategoryName]=useState<string>('Select')
  const [selectedCategoryId,setSelectedCategoryId]=useState<number|null>(null)
  
  const [productName,setProductName]=useState<string|null>(null)
  const [productDescription,setProductDescription] = useState<string|null>(null)
  const [discountedPrice,setDiscountedPrice]=useState<number|null>(null)
  const [actualPrice,setActualPrice] = useState<number|null>(null)
  const [error,setError] = useState<string|null>(null)

  const [featureInputs,setFeatureInputs] = useState([{label:"",value:""}]);

  const fetchProductDetails = async (productId: string) => {
    try {
      console.log("Fetching existing product detial to edit: ",id)
      setLoading(true);
      const res = await axios.get<FetchProductDetailsType>(`${BACKEND_URL}/seller/product/${productId}`,{withCredentials:true});
      const product = res.data.product;
      console.log(res.data.product)

      setProductName(product.name);
      setProductDescription(product.description??"");
      setDiscountedPrice(product.discountedPrice);
      setActualPrice(product.actualPrice);
      setSelectedCategoryId(product.categoryId);
      setSelectedCategoryName(product.category?.name ?? "Select");
      setFeatureInputs((product.features || []).map(f => ({
        label: f.label,
        value: String(f.value)   
      })));
      setUrls(product.images || []); // If images are saved as URLs
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };
  const updateProductDetails = async () =>{
    try{
      setLoading(true);
      const cleanedFeatures = featureInputs.filter(
        (f) => f.label.trim() !== "" && f.value.trim() !== ""
      )
      const payload={     
        categoryId: selectedCategoryId,
        productId: id,
        productName: productName,
        productDescription : productDescription,
        productFeatures : cleanedFeatures,
        discountedPrice : discountedPrice,
        actualPrice : actualPrice,
      }
      const response = await axios.patch<{message:string}>(`${BACKEND_URL}/seller/updateProduct`,payload,{withCredentials:true})
      if(response.status===200){
        console.log(response.data.message)
      }
    }
    catch(error){
      console.log("Error occured while adding product");
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }


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
    if(selectedCategoryName==='Select' && !productName && !productDescription && !discountedPrice && !actualPrice){
      setError("Enter all fields to add product");
      return
    }

    if(selectedCategoryName==='Select'){
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
    setLoading(true)
    
    const formData = new FormData();
    images.forEach((img)=> formData.append('images',img));
    const userName = localStorage.getItem('username')
    const formattedName = userName?.replace(/\s+/g, "").toLowerCase();
    const formattedProductName = productName?.replace(/\s+/g, "").toLowerCase();
    formData.append("sellerName",formattedName??"");
    formData.append("productName",formattedProductName??"");


    try {
      const res = await axios.post<AddProductResponse>(`${BACKEND_URL}/seller/uploadProductImages`,formData,
        {
          headers: { "Content-Type" : "multipart/form-data"},

        }
      )
      
      const data=res.data 
      setUrls(data.urls);
      console.log(data.urls)
      console.log("Images uploaded successfully!");
      AddProductDetails(data.urls)
    } catch (err) {
      console.log(err);
      alert("Upload failed. Please try again.");
    }
  };

  const AddProductDetails = async (imagesUrls : string[]) =>{
    try{
      setLoading(true);
      const cleanedFeatures = featureInputs.filter(
        (f) => f.label.trim() !== "" && f.value.trim() !== ""
      )
      const payload={     
        categoryId: selectedCategoryId,
        productName: productName,
        productDescription : productDescription,
        productFeatures : cleanedFeatures,
        discountedPrice : discountedPrice,
        actualPrice : actualPrice,
        imageUrls : imagesUrls
      }
      const response = await axios.post<{message:string}>(`${BACKEND_URL}/seller/addProduct`,payload,{withCredentials:true})
      if(response.status===201){
        console.log(response.data.message)
      }


    }
    catch(error){
      console.log("Error occured while adding product");
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  const handleFeatureChange = (index: number, field: "label" | "value", value: string) => {
    setFeatureInputs((prev) =>
      prev.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      )
    )
  }

  const handleAddFeature = () =>{
    setFeatureInputs([...featureInputs,{label:"",value:""}])
  }

  const handleDeleteFeature = (index:number) => {
    setFeatureInputs(featureInputs.filter((_,i)=>i!=index))
  }


    const getCategories = async () =>{
      setLoading(true)
      try{
        const response = await axios.get<CategoriesResponse>(`${BACKEND_URL}/api/categories`)
        setCategories(response.data.categories??[])
      }
      catch(error){
        console.log("Error while fetching categories");
      }
      finally{
        setLoading(false)
      }
    }

  useEffect(()=>{
    if(id){
      setIsEditMode(true);
      fetchProductDetails(id);
    }

  },[id])
  useEffect(()=>{
    getCategories();
  },[])

  if(loading)
    {
      return(
        <LoadingScreen/>
      )
    }

  return (
    <div>
        <Navbar seller={true}/>
        <div className="w-full border-b border-zinc-300"></div>


        <div className="mx-auto mt-6 flex flex-col justify-start items-start gap-4 max-w-[75%] md:max-w-[50%]">
          {/* Select Category */}
            <h1 className={h1Style}>Select Category *</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className='px-3 py-2 w-full border-1 rounded-md flex justify-between items-center gap-2'>
                {selectedCategoryName} <span><ChevronDown size={20} /></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map(category=>(
                  <DropdownMenuItem key={category.id} 
                    onClick={()=>{
                      setSelectedCategoryName(category.name)
                      setSelectedCategoryId(category.id)
                    }}>{category.name}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          {/* Product Name */}
            <h1 className={h1Style}>Product Name</h1>
            <Input type="text" placeholder="Enter Product Name" value={productName??""} onChange={(e)=>{setProductName(e.target.value)}}/>

          {/* Product Description */}
            <h1 className={h1Style}>Product Description</h1>
            <Textarea  placeholder="Enter Product Description" value={productDescription??""} onChange={(e)=>{setProductDescription(e.target.value)}} className=" h-20"/>

          {/* Product Features */}
             <h1 className={h1Style}>Product Features</h1>
             <div className="flex flex-col w-full">
                {featureInputs.map((feature,index)=>(
                  <div key={index} className="flex items-center gap-3 ">
                    <Input  className='text-xs'  placeholder="Eg.Processor" value={feature.label} 
                        onChange={(e) => handleFeatureChange(index, "label", e.target.value)}/>
                    <Textarea className='text-xs h-10' placeholder="Eg. 16GB RAM" value={feature.value}
                        onChange={(e) => handleFeatureChange(index, "value", e.target.value)}/>
                    <Trash onClick={()=>handleDeleteFeature(index)} className="text-red-500 hover:scale-110" size={46}/>
                  </div>
                ))}
             </div>




            {/* Dummy Div For cols-2*/}
            <div className="hidden md:col-span-1 md:flex"></div>
            {/* Add Feature Button */}
            <div className="col-span-1 md:col-span-1 flex justify-center items-center w-full">
              <div onClick={handleAddFeature} className="flex justify-center items-center gap-1 bg-blue-500 px-3 py-2 text-white rounded-sm hover:scale-95">
                <p className="text-sm">Add Feature </p><Plus size={18}/> 
              </div>
            </div>


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
            {!isEditMode && images.map((file, index) => (
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
            {isEditMode && urls.map((url, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={url}
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

          {isEditMode && (
            <div className="w-full  text-center text-sm font-medium text-zinc-500">*Change image feature is not implemented yet.</div>
          )}

          {error &&(
            <div className='col-span-1 md:col-span-2 my-3 font-sans font-medium text-red-500 text-sm flex justify-center gap-2 items-center'>
              <span><CircleAlert size={20}/></span>
              {error}
            </div>
          )}


          {/* Upload Button  */}
          <div className="col-span-1 md:col-span-2 flex justify-center items-center w-full">
            <button onClick={isEditMode?updateProductDetails:validateAndUpload} className="text-center mb-10 text-md font-serif bg-zinc-400 text-zinc-800 px-3 py-2 rounded-md hover:cursor-pointer hover:scale-95">
              {isEditMode?"Update Product":"Add Product"}
            </button>

          </div>



          
        </div>

    </div>
  )
}

export default AddProduct