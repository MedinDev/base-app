import React, {useEffect, useState} from 'react';
import {deleteHouse, getAllHouses} from "../utils/ApiFunctions";
import HousePaginator from "../common/HousePaginator";
import HouseFilter from "../common/HouseFilter";
import {Link} from "react-router-dom";
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from "react-icons/fa";

const ExistingHouses = () => {
    const [houses, setHouses] = useState([{
        id: "",
        houseType: "",
        housePrice: "",
        houseRoom: "",
        houseBathroom: "",
        houseSurface: "",
        houseCountry: "",
        houseAddress: "",
        houseYear: ""
    }])
    const [currentPage, setCurrentPage] = useState(1)
    const [housesPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredHouses, setFilteredHouses] = useState([{
        id: "",
        houseType: "",
        housePrice: "",
        houseRoom: "",
        houseBathroom: "",
        houseSurface: "",
        houseCountry: "",
        houseAddress: "",
        houseYear: ""
    }])
    const [selectedHouseType] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        fetchHouses()
    }, [])

    const fetchHouses = async () => {
        setIsLoading(true)
        try {
            const result = await getAllHouses()
            setHouses(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage("Error fetching houses")
            setIsLoading(false)
        }
    }


    useEffect(() => {
        if (selectedHouseType === "") {
            setFilteredHouses(houses)
        } else {
            const filtered = houses.filter((house) => house.houseType === selectedHouseType)
            setFilteredHouses(filtered)
        }
        setCurrentPage(1)
    }, [houses, selectedHouseType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (houseId) => {
        try {
            const result = await deleteHouse(houseId)
            if (result === "") {
                setSuccessMessage(`House No ${houseId} deleted successfully`)
                fetchHouses()
            } else {
                console.error(`Error deleting house : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredHouses, housesPerPage, houses) => {
        const totalHouses = filteredHouses.length > 0 ? filteredHouses.length : houses.length
        return Math.ceil(totalHouses / housesPerPage)
    }

    const indexOfLastHouse = currentPage * housesPerPage
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage
    const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse)
    return (
        <>
            <div className="justify-center">
                {successMessage &&
                    <div className="flex w-96 shadow-lg rounded-lg">
                        <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white fill-current"
                                 viewBox="0 0 16 16"
                                 width="20" height="20">
                                <path fillRule="evenodd"
                                      d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                            </svg>
                        </div>
                        <div
                            className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                            <div>{successMessage}</div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700"
                                     viewBox="0 0 16 16" width="20" height="20">
                                    <path fillRule="evenodd"
                                          d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                }

                {errorMessage &&
                    <div className="flex w-96 shadow-lg rounded-lg">
                        <div className="bg-red-600 py-4 px-6 rounded-l-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                 className="fill-current text-white"
                                 width="20" height="20">
                                <path fillRule="evenodd"
                                      d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                            </svg>
                        </div>
                        <div
                            className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                            <div>{errorMessage}</div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700"
                                     viewBox="0 0 16 16" width="20" height="20">
                                    <path fillRule="evenodd"
                                          d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                }
            </div>
            {isLoading ? (
                <p>Loading existing Houses</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="flex justify-center mb-3 mt-5">
                            <h1 className="text-2xl font-bold">Existing Houses</h1>
                        </div>
                        <div
                            className=" flex flex-row ">
                            <div
                                className="rounded m-1">
                                <HouseFilter data={houses} setFilteredData={setFilteredHouses}/>
                            </div>
                            <div className="flex flex-row-reverse flex-wrap m-auto justify-items-end">
                                <Link to={"/add-house"}
                                      className=" flex gap-2 rounded p-1 bg-blue-800 border-blue-900 text-white ">
                                    <FaPlus/> Add House
                                </Link>
                            </div>
                        </div>
                        <div
                            className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Type</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Price</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Room</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Bathroom</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Surface</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Country</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Address</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Year</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Action</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {currentHouses.map((house) => (
                                    <tr key={house.id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5 text-gray-800">{house.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="text-sm leading-5 text-blue-900">{house.houseType}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">${house.housePrice}</span>
                                    </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">{house.houseRoom}</span>
                                    </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">{house.houseBathroom}</span>
                                    </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">{house.houseSurface} sqf</span>
                                    </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{house.houseCountry}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{house.houseAddress}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">{house.houseYear}</span>
                                    </span>
                                        </td>

                                        <td className="gap-3 flex items-center px-6 py-4 whitespace-no-wrap text-blue-900 border-gray-500 text-sm leading-5">
                                            <Link to={`/edit-house/${house.id}`} class="gap-2 flex items-center">
                                                <span className="btn btn-info btn-sm"><FaEye/></span>
                                                <span className="btn btn-warning btn-sm ml-5"><FaEdit/></span>
                                            </Link>
                                            <button className="btn btn-danger btn-sm ml-5"
                                                    onClick={() => handleDelete(house.id)}><FaTrashAlt/></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <HousePaginator
                                currentPage={currentPage}
                                totalPages={calculateTotalPages(filteredHouses, housesPerPage, houses)}
                                onPageChange={handlePaginationClick}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default ExistingHouses;