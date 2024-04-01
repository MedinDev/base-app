import React, {useEffect, useState} from 'react';
import {parseISO} from "date-fns";

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStarDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return (
                    bookingStarDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
                )
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])
    return (
        <section className="p-4">
            <table className="table-auto border-collapse border border-gray-300 shadow">
                <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>House ID</th>
                    <th>House Type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guest</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
                </thead>
                <tbody className="text-center">
                {filteredBookings.map((booking, index) => (
                    <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.id}</td>
                        <td>{booking.house.id}</td>
                        <td>{booking.house.houseType}</td>
                        <td>{booking.checkInDate}</td>
                        <td>{booking.checkOutDate}</td>
                        <td>{booking.guestName}</td>
                        <td>{booking.guestEmail}</td>
                        <td>{booking.numOfAdults}</td>
                        <td>{booking.numOfChildren}</td>
                        <td>{booking.totalNumOfGuests}</td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm"
                                onClick={() => handleBookingCancellation(booking.id)}
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filterBookings.length === 0 && <p> No booking found for the selected dates</p>}
        </section>

    );
};

export default BookingsTable;