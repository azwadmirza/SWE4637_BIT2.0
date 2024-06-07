import React, { useEffect, useState } from 'react';

interface IPagination{
    totalPages:number;
    currentPage:number;
    onPageChange:(pageNumber: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }:IPagination) => {
    const [pageNumbers, setPageNumbers] = useState<any[]>([])

    useEffect(() => {
        const updatedPageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            updatedPageNumbers.push(i);
        }
        setPageNumbers(updatedPageNumbers);
    }, [totalPages]);    

    return (
        <div className='w-full m-8'>
            <ul className="flex items-center justify-center">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400 bg-yellow-400 p-0 text-sm text-bitBrown transition duration-150 ease-in-out hover:bg-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Previous"
                    >
                        <span className="text-sm">&lt;</span>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`mx-1 font-medium text-md flex h-9 w-9 items-center justify-center  p-0  shadow-xl transition duration-150 ease-in-out ${Number(currentPage) === Number(number) ? "text-bitBrown bg-yellow-400 rounded-full" : "hover:bg-white rounded-full bg-bitBrown border border-yellow-400 text-yellow-400 hover:text-bitBrown"}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400 bg-yellow-400 p-0 text-sm text-bitBrown transition duration-150 ease-in-out hover:bg-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Next"
                    >
                        <span className="text-sm">&gt;</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
