export interface PaginationInterface {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}