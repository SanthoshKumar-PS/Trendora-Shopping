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
    <div className="flex gap-2">
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
    </div>
  );
};

export default Pagination;