import React, {useState} from 'react';
import {cancelBooking, getBookingByConfirmationCode} from "../utils/ApiFunctions";
import moment from "moment";

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        bookingConfirmationCode: "",
        house: {id: "", houseType: ""},
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        getGuestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    })

    const emptyBookingInfo = {
        id: "",
        bookingConfirmationCode: "",
        house: {id: "", houseType: ""},
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        getGuestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    }
    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(emptyBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError(null)
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }
    return (
        <>
            <div className="container mx-auto mt-5 flex flex-col items-center justify-center">
                <h2 className="text-center mb-4">Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className="w-full md:w-1/2">
                    <div className="flex mb-3">
                        <input
                            className="form-input flex-1 rounded-l-md border p-2"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confirmation code"
                        />

                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">
                            Find booking
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div>Finding your booking...</div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className="w-full md:w-1/2 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-green-500">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                        <p>House Number: {bookingInfo.house.id}</p>
                        <p>House Type: {bookingInfo.house.houseType}</p>
                        <p>
                            Check-in Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {bookingInfo.guestFullName}</p>
                        <p>Email Address: {bookingInfo.getGuestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Children: {bookingInfo.numOfChildren}</p>
                        <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(bookingInfo.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-3">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <div>find booking...</div>
                )}

                {isDeleted &&
                    <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                         role="alert">{successMessage}</div>}
            </div>
        </>

    );
};

export default FindBooking;