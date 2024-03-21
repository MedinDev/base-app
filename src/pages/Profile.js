import React, {useEffect, useState} from "react"
import {deleteUser, getBookingsByUserId, getUser} from "../utils/ApiFunctions"
import {useNavigate} from "react-router-dom"
import moment from "moment"

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{id: "", name: ""}]
    })

    const [bookings, setBookings] = useState([
        {
            id: "",
            room: {id: "", roomType: ""},
            checkInDate: "",
            checkOutDate: "",
            bookingConfirmationCode: ""
        }
    ])
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token)
                setUser(userData)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserId(userId, token)
                setBookings(response)
            } catch (error) {
                console.error("Error fetching bookings:", error.message)
                setErrorMessage(error.message)
            }
        }

        fetchBookings()
    }, [userId])

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        )
        if (confirmed) {
            await deleteUser(userId)
                .then((response) => {
                    setMessage(response.data)
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("userRole")
                    navigate("/")
                    window.location.reload()
                })
                .catch((error) => {
                    setErrorMessage(error.data)
                })
        }
    }

    return (
        <div className="container">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {message && <p className="text-red-500">{message}</p>}
            {user ? (
                <div className="bg-whitesmoke p-5 mt-5 rounded-lg">
                    <h4 className="text-center text-xl font-bold">User Information</h4>
                    <div className="py-5">
                        <div className="mx-auto w-10/12">
                            <div className="bg-white shadow-md p-5 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="flex justify-center items-center mb-4 md:mb-0">
                                        <img
                                            src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                            alt="Profile"
                                            className="rounded-full"
                                            style={{width: "150px", height: "150px", objectFit: "cover"}}
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <p className="font-bold">ID: {user.id}</p>
                                        </div>
                                        <hr/>

                                        <div>
                                            <p className="font-bold">First Name: {user.firstName}</p>
                                        </div>
                                        <hr/>

                                        <div>
                                            <p className="font-bold">Last Name: {user.lastName}</p>
                                        </div>
                                        <hr/>

                                        <div>
                                            <p className="font-bold">Email: {user.email}</p>
                                        </div>
                                        <hr/>

                                        <div>
                                            <p className="font-bold">Roles:</p>
                                            <ul>
                                                {user.roles.map((role) => (
                                                    <li key={role.id}>{role.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-center text-xl font-bold mt-5">Booking History</h4>

                            {bookings.length > 0 ? (
                                <table
                                    className="table-auto w-full border border-collapse border-gray-400 shadow-md mt-3">
                                    <thead>
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Room ID</th>
                                        <th>Room Type</th>
                                        <th>Check In Date</th>
                                        <th>Check Out Date</th>
                                        <th>Confirmation Code</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td>{booking.id}</td>
                                            <td>{booking.room.id}</td>
                                            <td>{booking.room.roomType}</td>
                                            <td>{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</td>
                                            <td>{moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}</td>
                                            <td>{booking.bookingConfirmationCode}</td>
                                            <td className="text-green-500">On-going</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>You have not made any bookings yet.</p>
                            )}

                            <div className="flex justify-center mt-5">
                                <button className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={handleDeleteAccount}>
                                    Close account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    )
}

export default Profile
