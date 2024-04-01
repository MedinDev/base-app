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
            <section className="container">
                <div className="row">
                    <div className="col-md-4 mt-5 mb-5">
                        {isLoading ? (
                            <p>Loading room information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="room-info">
                                <img
                                    src={`data:image/png;base64,${houseInfo.photo}`}
                                    alt="Room photo"
                                    style={{width: "100%", height: "200px"}}
                                />
                                <table className="table table-bordered">
                                    <tbody>
                                    <tr>
                                        <th>House Type:</th>
                                        <td>{houseInfo.houseType}</td>
                                    </tr>
                                    <tr>
                                        <th>Price per night:</th>
                                        <td>${houseInfo.housePrice}</td>
                                    </tr>
                                    <tr>
                                        <th>House Service:</th>
                                        <td>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <FaWifi/> Wifi
                                                </li>
                                                <li>
                                                    <FaTv/> Netflix Premium
                                                </li>
                                                <li>
                                                    <FaUtensils/> Breakfast
                                                </li>
                                                <li>
                                                    <FaWineGlassAlt/> Mini bar refreshment
                                                </li>
                                                <li>
                                                    <FaCar/> Car Service
                                                </li>
                                                <li>
                                                    <FaParking/> Parking Space
                                                </li>
                                                <li>
                                                    <FaTshirt/> Laundry
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <BookingForm/>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Checkout;