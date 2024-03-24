import React, {useEffect, useState} from 'react';
import {getHouseTypes} from "../utils/ApiFunctions";

const HouseTypeSelector = ({handleHouseInputChange, newHouse}) => {
    const [houseTypes, setHouseTypes] = useState([""])
    const [showNewHouseTypeInput, setShowNewHouseTypeInput] = useState(false)
    const [newHouseType, setNewHouseType] = useState("")

    useEffect(() => {
        getHouseTypes().then((data) => {
            setHouseTypes(data)
        })
    }, [])

    const handleNewHouseTypeInputChange = (e) => {
        setNewHouseType(e.target.value);
    }

    const handleAddNewHouseType = () => {
        if (newHouseType !== "") {
            setHouseTypes([...houseTypes, newHouseType])
            setNewHouseType("")
            setShowNewHouseTypeInput(false)
        }
    }

    return (
        <>
            {houseTypes.length > 0 && (
                <div>
                    <select
                        name='houseType'
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewHouseTypeInput(true)
                            } else {
                                handleHouseInputChange(e)
                            }
                        }}
                        value={newHouse.houseType}
                        className="block w-full px-4 py-2 mt-1 bg-white dark:bg-first-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a house type</option>
                        <option value={"Add New"}>Add New</option>
                        {houseTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewHouseTypeInput && (
                        <div className="mt-2">
                            <div className='flex'>
                                <input
                                    className='block w-full px-4 py-2 mr-2 dark:bg-first-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    type='text'
                                    placeholder='Enter a new house type'
                                    //value={newHouseType}
                                    onChange={handleNewHouseTypeInputChange}
                                />
                                <button
                                    className='inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-blue-500 active:bg-blue-700 transition ease-in-out duration-150'
                                    type='button' onClick={handleAddNewHouseType}>Add
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