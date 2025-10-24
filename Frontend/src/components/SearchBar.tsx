import { Search, X } from "lucide-react";

const SearchBar = ({
  searchParams,
  setSearchParams,
}: {
  searchParams: string;
  setSearchParams: (value: string) => void;
}) => {
  return (
    <div className="mx-2 relative">
      <input
        type="text"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        placeholder="Search Products... "
        className="px-4 py-2 w-full outline-none rounded-2xl shadow-md bg-white/70 border border-blue-100 focus:border-blue-600/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
      />
      <span className="absolute right-2 top-0 bottom-0 text-gray-700/80 flex items-center">
        {searchParams ? (
          <X size={18} className="hover:cursor-pointer" onClick={() => setSearchParams("")} />
        ) : (
          <Search size={18} className="" />
        )}
      </span>
    </div>
  );
};

export default SearchBar;
