import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {bookHouse, getHouseById} from "../utils/ApiFunctions";
import moment from "moment";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
    const [validated, setValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [housePrice, setHousePrice] = useState(0)

    const currentUser = localStorage.getItem("userId")

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    })

    const {houseId} = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }


    const getHousePriceById = async (houseId) => {
        try {
            const response = await getHouseById(houseId)
            setHousePrice(response.housePrice)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getHousePriceById(houseId)
    }, [houseId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, "days")
        const paymentPerDay = housePrice ? housePrice : 0
        return diffInDays * paymentPerDay
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must be after check-in date")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setValidated(true)
    }

    const handleFormSubmit = async () => {
        try {
            const confirmationCode = await bookHouse(houseId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", {state: {message: confirmationCode}})
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
            navigate("/booking-success", {state: {error: errorMessage}})
        }
    }
    return (
        <>
            <div className="container mx-auto mb-5">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4">
                        <div className="bg-white shadow-md rounded-lg p-6 mt-5">
                            <h4 className="text-lg font-semibold mb-4">Reserve Room</h4>

                            <form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="guestFullName" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your fullname"
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                    />
                                    <p className="mt-2 text-sm text-red-600">Please enter your full name.</p>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                        disabled
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                    />
                                    <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <fieldset>
                                        <legend className="text-base font-medium text-gray-900">Lodging Period</legend>
                                        <div className="flex flex-wrap -mx-4">
                                            <div className="w-full md:w-1/2 px-4 mb-4">
                                                <label htmlFor="checkInDate"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Check-in date
                                                </label>
                                                <input
                                                    required
                                                    type="date"
                                                    id="checkInDate"
                                                    name="checkInDate"
                                                    value={booking.checkInDate}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                />
                                                <p className="mt-2 text-sm text-red-600">Please select a check in
                                                    date.</p>
                                            </div>

                                            <div className="w-full md:w-1/2 px-4 mb-4">
                                                <label htmlFor="checkOutDate"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Check-out date
                                                </label>
                                                <input
                                                    required
                                                    type="date"
                                                    id="checkOutDate"
                                                    name="checkOutDate"
                                                    value={booking.checkOutDate}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                />
                                                <p className="mt-2 text-sm text-red-600">Please select a check out
                                                    date.</p>
                                            </div>
                                            {errorMessage &&
                                                <div
                                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                    role="alert">
                                                    <strong className="font-bold">Error! </strong>
                                                    <span className="block sm:inline">{errorMessage}</span>
                                                </div>}
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <fieldset>
                                        <legend className="text-base font-medium text-gray-900">Number of Guest</legend>
                                        <div className="flex flex-wrap -mx-4">
                                            <div className="w-full md:w-1/2 px-4 mb-4">
                                                <label htmlFor="numOfAdults"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Adults
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    id="numOfAdults"
                                                    name="numOfAdults"
                                                    value={booking.numOfAdults}
                                                    min={1}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                />
                                                <p className="mt-2 text-sm text-red-600">Please select at least 1
                                                    adult.</p>
                                            </div>
                                            <div className="w-full md:w-1/2 px-4 mb-4">
                                                <label htmlFor="numOfChildren"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Children
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    id="numOfChildren"
                                                    name="numOfChildren"
                                                    value={booking.numOfChildren}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                />
                                                <p className="mt-2 text-sm text-red-600">Select 0 if no children.</p>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="mt-6">
                                    <button type="submit"
                                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 px-4">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                onConfirm={handleFormSubmit}
                                isFormValid={validated}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>


    );
};

export default BookingForm;