import React, {useEffect, useState} from 'react';
import {getHouseById, updateHouse} from "../utils/ApiFunctions";
import {Link, useParams} from "react-router-dom";

const EditHouse = () => {
    const [house, setHouse] = useState({
        photo: "",
        houseType: "",
        housePrice: "",
        houseRoom: "",
        houseBathroom: "",
        houseSurface: "",
        houseCountry: "",
        houseAddress: "",
        houseYear: "",
        houseDescription: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const {houseId} = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setHouse({...house, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setHouse({...house, [name]: value})
    }


    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const houseData = await getHouseById(houseId)
                setHouse(houseData)
                setImagePreview(houseData.photo)
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        fetchHouse()
    }, [houseId]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateHouse(houseId, house)
            if (response.status === 200) {
                setSuccessMessage("House update successfully")
                const updatedHouseData = await getHouseById(houseId)
                setHouse(updatedHouseData)
                setImagePreview(updatedHouseData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating house")
            }
        } catch (error) {
            setErrorMessage(error.message)
            setErrorMessage(error.message)
        }
    }

    return (
        <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
            {errorMessage &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                     role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                </div>}
            {successMessage && <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert">
                <strong className="font-bold">Success! </strong>
                <span className="block sm:inline">{successMessage}</span>
            </div>}
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">Edit House details</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-white dark:text-gray-200" form="houseType">House Type</label>
                        <input
                            required
                            type="text"
                            id="houseType"
                            name="houseType"
                            value={house.houseType}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="housePrice">House Rent / Days</label>
                        <input
                            required
                            type="number"
                            id="housePrice"
                            name="housePrice"
                            value={house.housePrice}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" form="houseRoom">Room </label>
                        <input required
                               type="number"
                               id="houseRoom"
                               name="houseRoom"
                               value={house.houseRoom}
                               onChange={handleInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" form="houseBathroom">Bathroom</label>
                        <input required
                               type="number"
                               id="houseBahtroom"
                               name="houseBathroom"
                               value={house.houseBathroom}
                               onChange={handleInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" form="houseSurface">Surface (m2)</label>
                        <input required
                               type="number"
                               id="houseSurface"
                               name="houseSurface"
                               value={house.houseSurface}
                               onChange={handleInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>


                    <div>
                        <label className="text-white dark:text-gray-200" form="houseCountry">Country</label>
                        <input required
                               type="text"
                               id="houseCountry"
                               name="houseCountry"
                               value={house.houseCountry}
                               onChange={handleInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="houseAddress">Address</label>
                        <input required
                               type="text"
                               id="houseAddress"
                               name="houseAddress"
                               value={house.houseAddress}
                               onChange={handleInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="houseYear">Year of build </label>
                        <input required
                               type="date"
                               id="houseYear"
                               name="houseYear"
                               value={house.houseYear}
                               onChange={handleInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="houseDescription">House
                            description</label>
                        <textarea required
                                  type="textarea"
                                  id="houseDescription"
                                  name="houseDescription"
                                  value={house.houseDescription}
                                  onChange={handleInputChange}
                                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white">
                            Image
                        </label>
                        <div
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none"
                                     viewBox="0 0 48 48" aria-hidden="true">
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label form="file-upload"
                                           className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span className="">Upload a file</span>
                                        <input required
                                               name="photo"
                                               id="photo"
                                               type="file"
                                               onChange={handleImageChange} className="sr-only"/>
                                    </label>

                                    <p className="pl-1 text-white">or drag and drop</p>
                                </div>
                                <p className="text-xs text-white">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                    {imagePreview && (
                        <img src={imagePreview}
                             alt="Preview house"
                             style={{maxWidth: "400px", maxHeight: "400px"}}
                             className="mb-3"></img>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"> Edit
                        Home
                    </button>
                    <Link
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-first-950-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                        to={"/existing-house"}> Back
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default EditHouse;