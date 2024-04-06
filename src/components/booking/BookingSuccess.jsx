import React from 'react';
import {useLocation} from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error
    return (
        <div className="container mx-auto px-4">
            <Header title="Booking Success"/>
            <div className="mt-5">
                {message ? (
                    <div>
                        <h3 className="text-green-500"> Booking Success!</h3>
                        <p className="text-green-500">{message}</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-red-500"> Error Booking Room!</h3>
                        <p className="text-red-500">{error}</p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default BookingSuccess;