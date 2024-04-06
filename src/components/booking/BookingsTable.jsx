import React, {useEffect, useState} from 'react';
import {parseISO} from "date-fns";

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                console.log(booking.guestFullName, booking.guestEmail, booking.totalNumOfGuest); // Moved inside the filter function
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

    console.log(bookingInfo);

    return (
        <section className="p-4">
            <table
                className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking
                        ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">House
                        ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">House
                        Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In
                        Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out
                        Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest
                        Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest
                        Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adults</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Children</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total
                        Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmation
                        Code
                    </th>
                    <th colSpan={2}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking, index) => {
                    return (
                        <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.house.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.house.houseType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkInDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkOutDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.guestFullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.getGuestEmail}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.numOfAdults}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.numOfChildren}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.totalNumOfGuest}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.bookingConfirmationCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm"
                                    onClick={() => handleBookingCancellation(booking.id)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {filterBookings.length === 0 &&
                <p className="text-center mt-4">No booking found for the selected dates</p>}
        </section>


    );
};

export default BookingsTable;