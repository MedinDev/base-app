import React from 'react';

const HousePaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1)
    return (
        <nav className="py-4">
            <ul className="flex">
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                    >

                        <button onClick={() => onPageChange(pageNumber)} className="material-icons text-sm">
                            {pageNumber}
                        </button>


                    </li>
                ))}
            </ul>
        </nav>

    );
};

export default HousePaginator;