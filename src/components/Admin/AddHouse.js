import React, {useState} from 'react';
import {addHouse} from "../../utils/ApiFunctions";
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
        const {name, value} = e.target;
        setNewHouse({...newHouse, [name]: value});
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewHouse({...newHouse, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
            if (success) {
                setSuccessMessage("A new house was added to the database");
                setNewHouse({
                    photo: null,
                    houseType: "",
                    housePrice: "",
                    houseRoom: "",
                    houseBathroom: "",
                    houseSurface: "",
                    houseCountry: "",
                    houseAddress: "",
                    houseYear: "",
                    houseDescription: ""
                });
                setImagePreview("");
            } else {
                setErrorMessage("Error adding house");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            if (successMessage) {
                setSuccessMessage("");
            }
            if (errorMessage) {
                setErrorMessage("");
            }
        }, 3000);

    };

    return (
        <section className="p-6 dark:bg-first-800 dark:text-gray-50">
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                     role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd"
                      d="M9.293 14.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 11.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0z"/>
            </svg>
        </span>
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd"
                      d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16zm1 13a1 1 0 1 1-2 0V9a1 1 0 1 1 2 0v6zm0-9a1 1 0 1 1-2 0V7a1 1 0 1 1 2 0V6z"/>
            </svg>
        </span>
                </div>
            )}

            <form onSubmit={handleSubmit}
                  className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-first-900">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Add House</p>
                        <p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga
                            autem eum!</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="houseType" className="text-sm">House Type</label>
                            <HouseTypeSelector
                                handleHouseInputChange={handleHouseInputChange}
                                newHouse={newHouse}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="housePrice" className="text-sm">Rent</label>
                            <input required
                                   name="housePrice"
                                   type="number"
                                   value={newHouse.housePrice}
                                   onChange={handleHouseInputChange}
                                   className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-300  dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="houseCountry" className="text-sm">Country</label>
                            <input required
                                   name="houseCountry"
                                   type="text"
                                   value={newHouse.houseCountry}
                                   onChange={handleHouseInputChange}
                                   className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-300 dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="houseAddress" className="text-sm">Address</label>
                            <input required
                                   name="houseAddress"
                                   type="text"
                                   value={newHouse.houseAddress}
                                   onChange={handleHouseInputChange}
                                   className="w-full rounded-md focus:ring focus:ri focus:ri  border border-gray-300 dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="houseRoom" className="text-sm">Room</label>
                            <input required
                                   name="houseRoom"
                                   type="number"
                                   value={newHouse.houseRoom}
                                   onChange={handleHouseInputChange}
                                   className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-300 dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="houseBathroom" className="text-sm">Bathroom</label>
                            <input required
                                   name="houseBathroom"
                                   type="number"
                                   value={newHouse.houseBathroom}
                                   onChange={handleHouseInputChange}
                                   className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-300 dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="houseSurface" className="text-sm">Surface</label>
                            <input
                                required
                                name="houseSurface"
                                type="number"
                                value={newHouse.houseSurface}
                                onChange={handleHouseInputChange}
                                className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-300 dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm  dark:bg-first-900">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Image</p>
                        <p className="text-xs">Adipisci fuga autem eum!</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Year</label>
                            <input required

                                   name="houseYear"
                                   type="date"
                                   value={newHouse.houseYear}
                                   onChange={handleHouseInputChange}
                                   className="w-full rounded-md focus:ring focus:ring-indigo-500 border border-gray-300 dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="photo" className="text-sm">Upload Photo</label>
                            <div className="relative border-dashed border-2 border-gray-300 rounded-md">
                                <input
                                    required
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                                {newHouse.photo && <p className="mt-2">Selected Photo: {newHouse.photo.name}</p>}
                                {imagePreview &&
                                    <img src={imagePreview} alt="Preview House" className="mt-2 rounded-md"/>
                                }
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="houseDescription" className="text-sm">Description</label>
                            <textarea required

                                      name="houseDescription"
                                      value={newHouse.houseDescription}
                                      onChange={handleHouseInputChange}
                                      className="w-full rounded-md focus:ring focus:ring-indigo-500 border border-gray-300 dark:border-gray-700 dark:text-gray-900"></textarea>
                        </div>
                        <div className="col-span-full">
                            <div className="flex items-center space-x-2">
                                <button type="submit"
                                        className="px-4 py-2 border rounded-md border-gray-300 dark:border-gray-100">Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default AddHouse;