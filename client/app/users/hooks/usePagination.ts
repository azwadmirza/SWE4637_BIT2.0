import { useState, useEffect } from "react";

const usePagination = (itemsPerPage:number, initialItems:any[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(initialItems);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    if (items) {
      const totalPages = Math.max(1, Math.ceil((items?.length || 1) / itemsPerPage));
      setTotalPages(totalPages);
    } else {
      setTotalPages(1);
    }
  }, [items, itemsPerPage]);

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };
  const getCurrentItems = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items?.slice(startIndex, endIndex) ?? [];
};


  return { currentPage, setCurrentPage, items, setItems, totalPages, paginate, getCurrentItems, handlePageChange };
};

export default usePagination;
