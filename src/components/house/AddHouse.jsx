import React, {useState} from 'react';
import {addHouse} from "../utils/ApiFunctions";
import {Link} from "react-router-dom";
import HouseTypeSelector from "../common/HouseTypeSelector";

const AddHouse = () => {
    const [newHouse, setNewHouse] = useState({
        photo: null, houseType: "",
        housePrice: "", houseRoom: "",
        houseBathroom: "", houseSurface: "",
        houseCountry: "", houseAddress: "",
        houseYear: "", houseDescription: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleHouseInputChange = (e) => {
        const {name, value, type} = e.target;
        setNewHouse(prevState => ({
            ...prevState,
            [name]: type === 'number' ? parseFloat(value) || "" : value
        }));
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewHouse({...newHouse, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const success = await addHouse(
                newHouse.photo,
                newHouse.houseType,
                newHouse.housePrice,
                newHouse.houseRoom,
                newHouse.houseBathroom,
                newHouse.houseSurface,
                newHouse.houseCountry,
                newHouse.houseAddress,
                newHouse.houseYear,
                newHouse.houseDescription);
            Object.entries(newHouse).forEach(([key, value]) => {
                formData.append(key, value instanceof File ? value : String(value));
            });
            if (success) {
                setSuccessMessage("A new house was added to the database.");
                setNewHouse({
                    photo: null, houseType: "",
                    housePrice: "", houseRoom: "",
                    houseBathroom: "", houseSurface: "",
                    houseCountry: "", houseAddress: "",
                    houseYear: "", houseDescription: ""
                });
                setImagePreview("");
            } else {
                setErrorMessage("Error adding house. Please try again.");
            }
        } catch (error) {
            setErrorMessage(error.message || "An error occurred.");
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };
    console.log("Rendering HouseTypeSelector with houseTypes:", newHouse.houseType)

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
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">New House settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div className="text-white dark:text-gray-200">
                        <label className="text-white dark:text-gray-200" form="houseType">House Type</label>
                        <div
                            className="block w-full text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <div>
                                <HouseTypeSelector handleHouseInputChange={handleHouseInputChange}
                                                   newHouse={newHouse}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="housePrice">House Rent / Days</label>
                        <input
                            required
                            type="number"
                            id="housePrice"
                            name="housePrice"
                            value={newHouse.housePrice}
                            onChange={handleHouseInputChange}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" form="houseRoom">Room </label>
                        <input required
                               type="number"
                               id="houseRoom"
                               name="houseRoom"
                               value={newHouse.houseRoom}
                               onChange={handleHouseInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" form="houseBathroom">Bathroom</label>
                        <input required
                               type="number"
                               id="houseBahtroom"
                               name="houseBathroom"
                               value={newHouse.houseBathroom}
                               onChange={handleHouseInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" form="houseSurface">Surface (m2)</label>
                        <input required
                               type="number"
                               id="houseSurface"
                               name="houseSurface"
                               value={newHouse.houseSurface}
                               onChange={handleHouseInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>


                    <div>
                        <label className="text-white dark:text-gray-200" form="houseCountry">Country</label>
                        <input required
                               type="text"
                               id="houseCountry"
                               name="houseCountry"
                               value={newHouse.houseCountry}
                               onChange={handleHouseInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="houseAddress">Address</label>
                        <input required
                               type="text"
                               id="houseAddress"
                               name="houseAddress"
                               value={newHouse.houseAddress}
                               onChange={handleHouseInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="houseYear">Year of build </label>
                        <input required
                               type="date"
                               id="houseYear"
                               name="houseYear"
                               value={newHouse.houseYear}
                               onChange={handleHouseInputChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" form="houseDescription">House
                            description</label>
                        <textarea required
                                  type="textarea"
                                  id="houseDescription"
                                  name="houseDescription"
                                  value={newHouse.houseDescription}
                                  onChange={handleHouseInputChange}
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

                <div className="flex gap-4 justify-end mt-6">
                    <button
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save
                    </button>
                    <Link
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-first-950-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                        to={"/existing-Houses"}>Existing
                        house
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default AddHouse;