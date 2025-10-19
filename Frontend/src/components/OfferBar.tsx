import { useNavigate } from "react-router-dom";
// gray gradient colors from-[#C4CCCE] to-[#E6E9EB]
const OfferBar = () => {
  const navigate = useNavigate();
  return (
    <div className="hidden md:flex w-full bg-gradient-to-br from-blue-400 to-blue-200 items-center justify-center py-2 text-sm text-white text-center font-bold">
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%
      <span
        className="border-b border-white ml-2 hover:cursor-pointer"
        onClick={() => navigate("/products")}
      >
        Shop Now
      </span>
    </div>
  );
};

export default OfferBar;
