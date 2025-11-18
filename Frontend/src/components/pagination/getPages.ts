export function getPaginationPages(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];

  const add = (p: number | string) => pages.push(p);

  add(1);

  if (currentPage > 3) add("...");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    add(i);
  }

  if (currentPage < totalPages - 2) add("...");

  if (totalPages > 1) add(totalPages);

  return pages;
}
