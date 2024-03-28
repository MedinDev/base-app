import React, {useState} from 'react';
import HousePaginator from "./HousePaginator";
import HouseCard from "../house/HouseCard";

const HouseSearchResult = ({results, onClearSearch}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const resultsPerPage = 3
    const totalResults = results.length
    const totalPages = Math.ceil(totalResults / resultsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultsPerPage
    const endIndex = startIndex + resultsPerPage
    const paginatedResults = results.slice(startIndex, endIndex)

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className="text-center mt-5">Search Results</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedResults.map((house) => (
                            <HouseCard key={house.id} house={house}/>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        {totalResults > resultsPerPage && (
                            <HousePaginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                        <button onClick={onClearSearch}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">Clear
                            Search
                        </button>
                    </div>
                </>
            ) : (
                <p></p>
            )}
        </>

    );
};

export default HouseSearchResult;