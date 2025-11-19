import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPaginationPages } from "./getPages";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="flex gap-2 items-center">

      <button
        onClick={() => onChange(1)}
        disabled={currentPage === 1}
        className={`px-1 py-1 rounded bg-gray-200 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {pages.map((p, i) => (
        <button
          key={i}
          disabled={p === "..."}
          onClick={() => typeof p === "number" && onChange(p)}
          className={`px-3 py-1 rounded 
            ${p === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}
            ${p === "..." ? "cursor-default" : "cursor-pointer"}
          `}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-1 py-1 rounded bg-gray-200 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

    </div>
  );
};

export default Pagination;