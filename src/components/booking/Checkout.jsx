import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getHouseById} from "../utils/ApiFunctions";
import BookingForm from "./BookingForm";
import {FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt} from "react-icons/fa";

const Checkout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [houseInfo, setHouseInfo] = useState({
        photo: "",
        houseType: "",
        housePrice: ""
    })

    const {houseId} = useParams()

    useEffect(() => {
        setTimeout(() => {
            getHouseById(houseId)
                .then((response) => {
                    setHouseInfo(response)
                    setIsLoading(false)
                })
                .catch((error) => {
                    setError(error)
                    setIsLoading(false)
                })
        }, 1000)
    }, [houseId])
    return (
        <div>
            <section className="container mx-auto">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/3 px-3 mt-5 mb-5">
                        {isLoading ? (
                            <p>Loading room information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="room-info">
                                <img
                                    src={`data:image/png;base64,${houseInfo.photo}`}
                                    alt="house"
                                    className="w-full h-48 object-cover" // Adjust 'h-48' as needed to match your design
                                />
                                <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
                                    <tbody>
                                    <tr>
                                        <th className="border border-gray-200 px-4 py-2 text-left">House Type:</th>
                                        <td className="border border-gray-200 px-4 py-2">{houseInfo.houseType}</td>
                                    </tr>
                                    <tr>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Price per night:</th>
                                        <td className="border border-gray-200 px-4 py-2">${houseInfo.housePrice}</td>
                                    </tr>
                                    <tr>
                                        <th className="border border-gray-200 px-4 py-2 text-left">House Service:</th>
                                        <td className="border border-gray-200 px-4 py-2">
                                            <ul className="list-none p-0">
                                                <li className="flex items-center">
                                                    <FaWifi className="mr-2"/> Wifi
                                                </li>
                                                <li className="flex items-center">
                                                    <FaTv className="mr-2"/> Netflix Premium
                                                </li>
                                                <li className="flex items-center">
                                                    <FaUtensils className="mr-2"/> Breakfast
                                                </li>
                                                <li className="flex items-center">
                                                    <FaWineGlassAlt className="mr-2"/> Mini bar refreshment
                                                </li>
                                                <li className="flex items-center">
                                                    <FaCar className="mr-2"/> Car Service
                                                </li>
                                                <li className="flex items-center">
                                                    <FaParking className="mr-2"/> Parking Space
                                                </li>
                                                <li className="flex items-center">
                                                    <FaTshirt className="mr-2"/> Laundry
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-2/3 px-3">
                        <BookingForm/>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Checkout;