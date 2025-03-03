/* eslint-disable prefer-const */
import React from "react";
import { PaginationInterface } from "@/interfaces/PaginationInterface";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationInterface) {

    const MAX_PAGES_VISIBLE = 5;

    const getPageNumbers = () => {
      const pages = [];
      const half = Math.floor(MAX_PAGES_VISIBLE / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + MAX_PAGES_VISIBLE - 1);
      if (end - start + 1 < MAX_PAGES_VISIBLE) {
        start = Math.max(1, end - MAX_PAGES_VISIBLE + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

  return (
    <div className="flex justify-center items-center my-8 space-x-2">
      <button
        onClick={() => onPageChange(1)}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        aria-label="First Page"
      >
        First
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-600"
        aria-label="Previous"
      >
        Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-300"
          } rounded-lg transition-colors`}
          arial-label={`{Page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-600"
        aria-label="Next"
      >
        Next
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        aria-label="Last Page"
      >
        Last
      </button>
    </div>
  );
}
