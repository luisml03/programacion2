// components/generalComponents/pagination.tsx

import { Pagination } from "flowbite-react";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationComponentProps) {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
