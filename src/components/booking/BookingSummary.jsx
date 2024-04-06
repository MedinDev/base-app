import React, {useEffect, useState} from 'react';
import moment from "moment";
import {useNavigate} from "react-router-dom";

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numberOfDays = checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate()

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])
    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-1/2"></div>
            <div className="mt-5 p-4 shadow-lg rounded-lg bg-white">
                <h4 className="text-xl font-semibold mb-4 text-indigo-600">Reservation Summary</h4>
                <p>
                    Name: <strong>{booking.guestFullName}</strong>
                </p>
                <p>
                    Email: <strong>{booking.getGuestEmail}</strong>
                </p>
                <p>
                    Check-in Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
                </p>
                <p>
                    Check-out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
                </p>
                <p>
                    Number of Days Booked: <strong>{numberOfDays}</strong>
                </p>

                <div>
                    <h5 className="text-lg font-semibold text-indigo-600">Number of Guest</h5>
                    <p><strong>Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}</strong></p>
                    <p><strong>Children : {booking.numOfChildren}</strong></p>
                </div>

                {payment > 0 ? (
                    <>
                        <p>
                            Total payment: <strong>${payment}</strong>
                        </p>

                        {isFormValid && !isBookingConfirmed ? (
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleConfirmBooking}>
                                {isProcessingPayment ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Booking Confirmed, redirecting to payment...
                                    </>
                                ) : (
                                    "Confirm Booking & proceed to payment"
                                )}
                            </button>
                        ) : isBookingConfirmed ? (
                            <div className="flex justify-center items-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className="text-red-500">Check-out date must be after check-in date.</p>
                )}
            </div>
        </div>


    );
};

export default BookingSummary;