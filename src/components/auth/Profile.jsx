import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {deleteUser, getBookingsByUserId, getUser, updateUserRole} from "../utils/ApiFunctions";
import moment from "moment";

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        roles: [{id: "", name: ""}]
    })

    const [bookings, setBookings] = useState([
        {
            id: "",
            house: {id: "", houseType: ""},
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

    const [newRole, setNewRole] = useState("");
    const handleRoleChange = (event) => {
        setNewRole(event.target.value);
    };


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
    }, [userId, token]);

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
    }, [userId, token])

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

    const handleUpdateRole = async () => {
        if (newRole) {
            try {
                await updateUserRole(userId, newRole);
                alert("Role updated successfully.");
                // Refresh the user data to reflect the change
                const updatedUserData = await getUser(userId, token);
                setUser(updatedUserData);
            } catch (error) {
                console.error("Error updating role:", error.message);
                setErrorMessage(error.message);
            }
        } else {
            alert("Please select a role.");
        }
    };
    const roles = [
        {id: "1", name: "ROLE_USER"},
        {id: "2", name: "ROLE_OWNER"},
        // Add more roles as needed
    ];

    return (

        <div className="max-w-2xl mx-auto bg-white p-16">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">This is your profile </p>
            <hr className="my-6 border-gray-200 dark:border-gray-700"/>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Personal information</h2>
                <button className="text-blue-600 hover:underline dark:text-blue-500"
                        onClick={handleDeleteAccount}>Delete account
                </button>
            </div>

            {user ? (
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                            name</label>
                        <input
                            value={user.firstName}
                            disabled={true}
                            className="uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                            name</label>
                        <input
                            value={user.lastName}
                            disabled={true}
                            className="uppercase bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                        <input
                            value={user.username}
                            disabled={true}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone
                            number</label>
                        <input value={user.phone}
                               disabled={true}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email </label>
                        <input value={user.email}
                               disabled={true}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role </label>
                        <div
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <ul className={"list-none"}>{user.roles.map((role, index) => (
                                <li key={role.id}>{role.name}</li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Change
                        Role</label>
                    <select onChange={handleRoleChange} value={newRole}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                    <button onClick={handleUpdateRole}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Update Role
                    </button>
                </div>
                {errorMessage &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                         role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>}
                {message && <p className="text-danger">{message}</p>}
                <h2 className="mb-4 text-xl font-bold text-gray-700">Booking History</h2>
                {bookings.length > 0 ? (
                    <div
                        className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"> Booking
                                    ID
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">House
                                    ID
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">House
                                    Type
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"> Check
                                    In Date

                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"> Check
                                    Out Date
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"> Confirmation
                                    Code
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                                    Status
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {bookings.map((booking, index) => (

                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="flex items-center">
                                            <div>
                                                <div
                                                    className="text-sm leading-5 text-gray-800">{booking.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">{booking.house.id}</span>
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{booking.house.houseType}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span
                                            className="relative text-xs">	{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</span>
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">{moment(booking.checkOutDate)
                                            .subtract(1, "month")
                                            .format("MMM Do, YYYY")}</span>
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                                        {booking.bookingConfirmationCode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                        <button
                                            className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                                            on
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>You have not made any bookings yet.</p>
                )}
                <div className="flex justify-start p-4">
                    <div className="mx-2">
                        <Link
                            className="inline-block px-6 py-2 text-lg font-semibold text-green-600 transition duration-200 transform bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300 hover:text-green-700"
                            to={"/existing-Houses"}> Book House
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;