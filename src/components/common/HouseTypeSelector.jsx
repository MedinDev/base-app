import React, {useEffect, useState} from 'react';
import {getHouseTypes} from "../utils/ApiFunctions";

const HouseTypeSelector = ({handleHouseInputChange, newHouse}) => {
    const [houseTypes, setHouseTypes] = useState([""]);
    const [showNewHouseTypeInput, setShowNewHouseTypeInput] = useState(false);
    const [newHouseType, setNewHouseType] = useState("");

    useEffect(() => {
        getHouseTypes()
            .then((data) => {
                if (data && data.length > 0) {
                    setHouseTypes(data);
                } else {
                    // Handle empty or unexpected data format
                    console.log("No data or unexpected format:", data);
                    setHouseTypes(["Default Type"]); // Example default value
                }
            })
            .catch((error) => {
                console.error("Error fetching house types:", error);
                setHouseTypes(["Default Type"]); // Set a default value in case of error
            });
    }, []);

    const handleNewHouseTypeInputChange = (e) => {
        setNewHouseType(e.target.value);
    };

    const handleAddNewHouseType = () => {
        if (newHouseType !== "") {
            setHouseTypes([...houseTypes, newHouseType]);
            setNewHouseType("");
            setShowNewHouseTypeInput(false);
        }
    };

    return (
        <>
            {houseTypes.length > 0 && (
                <div>
                    <select
                        required
                        className="block w-full mt-1 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        name="houseType"
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewHouseTypeInput(true);
                            } else {
                                handleHouseInputChange(e);
                            }
                        }}
                        value={newHouse.houseType}>
                        <option value="">Select a house type</option>
                        <option value="Add New">Add New</option>
                        {houseTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewHouseTypeInput && (
                        <div className="mt-2">
                            <div className="flex">
                                <input
                                    type="text"
                                    className="flex-1 block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                    placeholder="Enter New House Type"
                                    value={newHouseType}
                                    onChange={handleNewHouseTypeInputChange}
                                />
                                <button
                                    className="ml-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    type="button"
                                    onClick={handleAddNewHouseType}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default HouseTypeSelector;
