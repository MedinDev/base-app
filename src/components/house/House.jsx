import React, {useEffect, useState} from 'react';
import {getAllHouses} from "../utils/ApiFunctions";
import HouseCard from "./HouseCard";
import HousePaginator from "../common/HousePaginator";
import HouseFilter from "../common/HouseFilter";

const House = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [housesPerPage] = useState(6)
    const [filteredData, setFilteredData] = useState([{id: ""}])

    useEffect(() => {
        setIsLoading(true)
        getAllHouses()
            .then((data) => {
                setData(data)
                setFilteredData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [])
    if (isLoading) {
        return <div>Loading houses.....</div>
    }
    if (error) {
        return <div className="text-second-500">Error : {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / housesPerPage)

    const renderHouses = () => {
        const startIndex = (currentPage - 1) * housesPerPage
        const endIndex = startIndex + housesPerPage
        return filteredData
            .slice(startIndex, endIndex)
            .map((house) => <HouseCard key={house.id} house={house}/>)
    }
    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="mb-3 md:mb-0">
                    <HouseFilter data={data} setFilteredData={setFilteredData}/>
                </div>
                <div className="md:col-span-1 md:flex md:items-center md:justify-end">
                    <HousePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1">{renderHouses()}</div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:col-span-1 md:flex md:items-center md:justify-end">
                    <HousePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default House;