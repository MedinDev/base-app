import React from 'react';

const HousePaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1)
    return (
        <nav aria-label="Page navigation" className="py-4">
            <ul className="flex list-none gap-2 justify-center">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}
                        className={`first:ml-0 last:mr-0 ${currentPage === pageNumber ? "bg-blue-500" : "bg-white"} rounded-md shadow`}>
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            className={`block px-4 py-2 text-sm ${currentPage === pageNumber ? "text-white" : "text-gray-700 hover:bg-gray-100"} transition-colors duration-150 rounded-md`}
                            aria-current={currentPage === pageNumber ? "page" : undefined}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>


    );
};

export default HousePaginator;