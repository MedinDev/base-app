import React, {useState} from 'react';
import {getAvailableHouses} from "../utils/ApiFunctions";
import moment from "moment";
import HouseTypeSelector from "./HouseTypeSelector";
import HouseSearchResult from "./HouseSearchResult";

const HouseSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        houseType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableHouses, setAvailableHouses] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkInMoment = moment(searchQuery.checkInDate)
        const checkOutMoment = moment(searchQuery.checkOutDate)
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please enter valid dates")
            return
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Check-out date must be after check-in date")
            return
        }
        setIsLoading(true)
        getAvailableHouses(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.houseType)
            .then((response) => {
                setAvailableHouses(response.data)
                setTimeout(() => setIsLoading(false), 2000)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSearchQuery({...searchQuery, [name]: value})
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("")
        }
    }
    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            houseType: ""
        })
        setAvailableHouses([])
    }
    return (
        <>
            <div className="shadow mt-n5 mb-5 py-5 container mx-auto">
                <form onSubmit={handleSearch}>
                    <div className="flex justify-center">
                        <div className="md:flex md:justify-center md:space-x-4 md:w-full">
                            <div className="mb-4 md:w-1/3">
                                <label htmlFor="checkInDate" className="block">Check-in Date</label>
                                <input
                                    type="date"
                                    id="checkInDate"
                                    name="checkInDate"
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4 md:w-1/3">
                                <label htmlFor="checkOutDate" className="block">Check-out Date</label>
                                <input
                                    type="date"
                                    id="checkOutDate"
                                    name="checkOutDate"
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="roomType" className="block">House Type</label>
                                <div className="flex items-center">
                                    <HouseTypeSelector
                                        handleHouseInputChange={handleInputChange}
                                        newRoom={searchQuery}
                                    />
                                    <button type="submit"
                                            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50">Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {isLoading ? (
                    <p className="mt-4">Finding available houses....</p>
                ) : availableHouses ? (
                    <HouseSearchResult results={availableHouses} onClearSearch={handleClearSearch}/>
                ) : (
                    <p className="mt-4">No rooms available for the selected dates and Houses type.</p>
                )}
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
        </>

    );
};

export default HouseSearch;