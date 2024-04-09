import React, {useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import {
    getAllBookings,
    getAllHouses,
    getAllUserLoginActivities,
    getAllUserLogoutActivities,
    getAllUsers
} from "../utils/ApiFunctions";

const Admin = () => {
    // State to store chart instances
    const [userEngagementChartInstance, setUserEngagementChartInstance] = useState(null);
    const [bookingVolumeChartInstance, setBookingVolumeChartInstance] = useState(null);

    const [users, setUsers] = useState([]);
    const [houses, setHouses] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loginActivities, setLoginActivities] = useState([]);
    const [logoutActivities, setLogoutActivities] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of items to display per page

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getAllUsers();
            const houseData = await getAllHouses();
            const bookingData = await getAllBookings();
            const loginActivityData = await getAllUserLoginActivities();
            const logoutActivityData = await getAllUserLogoutActivities();

            setUsers(userData);
            setHouses(houseData);
            setBookings(bookingData);
            setLoginActivities(loginActivityData);
            setLogoutActivities(logoutActivityData);
        };

        fetchData();
    }, []);


    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const currentHouses = houses.slice(indexOfFirstItem, indexOfLastItem);
    const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
    const currentLoginActivities = loginActivities.slice(indexOfFirstItem, indexOfLastItem);
    const currentLogoutActivities = logoutActivities.slice(indexOfFirstItem, indexOfLastItem);


    // Placeholder data processing functions
    const processLoginData = (loginActivities) => {
        // Implement based on your data structure
        return []; // Return processed data
    };

    const processBookingData = (bookings) => {
        // Implement based on your data structure
        return []; // Return processed data
    };

    useEffect(() => {
        if (loginActivities.length && bookings.length) {
            const processedLoginData = processLoginData(loginActivities);
            const processedBookingData = processBookingData(bookings);

            // Destroy previous instances if they exist
            if (userEngagementChartInstance) {
                userEngagementChartInstance.destroy(); // Destroy the previous Chart instance
            }
            if (bookingVolumeChartInstance) {
                bookingVolumeChartInstance.destroy(); // Destroy the previous Chart instance
            }

            // Initialize charts and store instances
            const newUserEngagementChartInstance = initializeUserEngagementChart(processedLoginData, processedBookingData);
            setUserEngagementChartInstance(newUserEngagementChartInstance);

            const newBookingVolumeChartInstance = initializeBookingVolumeChart(processedBookingData);
            setBookingVolumeChartInstance(newBookingVolumeChartInstance);
        }
    }, [loginActivities, bookings, userEngagementChartInstance, bookingVolumeChartInstance]);


    const initializeUserEngagementChart = (loginData, bookingData) => {
        const canvas = document.getElementById('userEngagementChart');
        const ctx = canvas.getContext('2d');

        // Destroy existing Chart instance if it exists
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        const chart = new Chart(ctx, {
            // Chart configuration...
        });

        // Store the chart instance on the canvas element
        canvas.chart = chart;

        return chart; // Return the chart instance
    };


    const initializeBookingVolumeChart = (bookingData) => {
        const canvas = document.getElementById('bookingVolumeChart');
        const ctx = canvas.getContext('2d');

        // Destroy existing Chart instance if it exists
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        const chart = new Chart(ctx, {
            // Chart configuration...
        });

        // Store the chart instance on the canvas element
        canvas.chart = chart;

        return chart; // Return the chart instance
    };


    useEffect(() => {
        // Assuming fetchData() is called and sets your state variables
        // Now, process the data for the charts
        const processedLoginData = processLoginData(loginActivities);
        const processedBookingData = processBookingData(bookings);

        // Initialize charts
        initializeUserEngagementChart(processedLoginData, processedBookingData);
        initializeBookingVolumeChart(processedBookingData);
    }, [loginActivities, logoutActivities, bookings]);
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 flex flex-wrap">
                <div className="flex-1 p-4 w-full md:w-3/4 lg:w-4/5 xl:w-5/6">
                    <div className="relative max-w-md w-full">
                        <div className="absolute top-1 left-2 inline-flex items-center p-2">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        <input
                            className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline"
                            type="search" placeholder="Buscar..."/>
                    </div>
                    <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
                        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-full lg:w-1/2 xl:w-1/3">
                            <h2 className="text-gray-500 text-lg font-semibold pb-1">Activity Analysis</h2>
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                            <div className="chart-container"
                                 style={{position: 'relative', height: '300px', width: '100%'}}>
                                <canvas id="userEngagementChart"></canvas>
                            </div>

                        </div>
                        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                            <h2 className="text-gray-500 text-lg font-semibold pb-1">Booking Volume Analysis</h2>
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                            <div className="chart-container"
                                 style={{position: 'relative', height: '300px', width: '100%'}}>
                                <canvas id="bookingVolumeChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-4 shadow rounded-lg">
                        <h2 className="text-gray-500 text-lg font-semibold pb-4">Users</h2>
                        <div className="my-1"></div>
                        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                        <table className="w-full table-auto text-sm">
                            <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start  text-sm text-grey-light border-b border-grey-light">User
                                    ID
                                </th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">Firstname</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">Lastname</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">Number</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">Username</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-grey-lighter">
                                    <td className="py-2 px-4 text-start border-b border-grey-light">{user.id}</td>
                                    <td className="py-2 px-4 text-start border-b border-grey-light">{user.firstName}</td>
                                    <td className="py-2 px-4 text-start border-b border-grey-light">{user.lastName}</td>
                                    <td className="py-2 px-4 text-start border-b border-grey-light">{user.phone}</td>
                                    <td className="py-2 px-4 text-start border-b border-grey-light">{user.username}</td>
                                    <td className="py-2 px-4 text-start border-b border-grey-light">{user.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                onClick={() => setCurrentPage(prev => prev < Math.ceil(users.length / itemsPerPage) ? prev + 1 : prev)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-4 shadow rounded-lg">
                        <div className="bg-white p-4 rounded-md mt-4">
                            <h2 className="text-gray-500 text-lg font-semibold pb-4">Houses list</h2>
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                            <table className="w-full table-auto text-sm">
                                <thead>
                                <tr className="text-sm leading-normal">
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">House
                                        ID
                                    </th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start  text-sm text-grey-light border-b border-grey-light">House
                                        Type
                                    </th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light ">House
                                        Price
                                    </th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">House
                                        Year
                                    </th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-start text-sm text-grey-light border-b border-grey-light">House
                                        Address
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentHouses.map((house) => (
                                    <tr key={house.id} className="hover:bg-grey-lighter">
                                        <td className="py-2 px-4 text-start border-b border-grey-light">{house.id}</td>
                                        <td className="py-2 px-4 text-start border-b border-grey-light">{house.houseType}</td>
                                        <td className="py-2 px-4 text-start border-b border-grey-light">{house.housePrice}</td>
                                        <td className="py-2 px-4 text-start border-b border-grey-light">{house.houseYear}</td>
                                        <td className="py-2 px-4 text-start border-b border-grey-light">{house.houseAddress}</td>
                                    </tr>
                                ))}
                                {/* More rows */}
                                </tbody>
                            </table>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                    onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)}
                                >
                                    Previous
                                </button>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                    onClick={() => setCurrentPage(prev => prev < Math.ceil(users.length / itemsPerPage) ? prev + 1 : prev)}
                                >
                                    Next
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="mt-8 bg-white p-4 shadow rounded-lg">
                        <div className="bg-white p-4 rounded-md mt-4">
                            <h2 className="text-gray-500 text-lg font-semibold pb-4">Booking list</h2>
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                            <table className="w-full table-auto text-sm">
                                <thead>
                                <tr className="text-sm leading-normal">
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">House
                                        ID
                                    </th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Check-In
                                    </th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Check-Out
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-grey-lighter">
                                        <td className="py-2 px-4 border-b border-grey-light">{booking.id}</td>
                                        <td className="py-2 px-4 border-b border-grey-light">{booking.checkInDate}</td>
                                        <td className="py-2 px-4 border-b border-grey-light">{booking.checkOutDate}</td>
                                    </tr>
                                ))}
                                {/* More rows */}
                                </tbody>
                            </table>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                    onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)}
                                >
                                    Previous
                                </button>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                    onClick={() => setCurrentPage(prev => prev < Math.ceil(users.length / itemsPerPage) ? prev + 1 : prev)}
                                >
                                    Next
                                </button>
                            </div>

                        </div>
                    </div>
                    <div>
                        <h2>User Activities</h2>
                        <table className="w-full table-auto text-sm">
                            <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Activity
                                    ID
                                </th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Timestamp</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Login</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Logout</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentLoginActivities.map((activity) => (
                                <tr key={activity.id} className="hover:bg-grey-lighter">
                                    <td className="py-2 px-4 border-b border-grey-light">{activity.id}</td>
                                    <td className="py-2 px-4 border-b border-grey-light">{activity.timestamp}</td>
                                    <td className="py-2 px-4 border-b border-grey-light"><input type="checkbox" checked
                                                                                                disabled/></td>
                                    <td className="py-2 px-4 border-b border-grey-light"><input type="checkbox"
                                                                                                disabled/></td>
                                </tr>
                            ))}
                            {currentLogoutActivities.map((activity) => (
                                <tr key={activity.id} className="hover:bg-grey-lighter">
                                    <td className="py-2 px-4 border-b border-grey-light">{activity.id}</td>
                                    <td className="py-2 px-4 border-b border-grey-light">{activity.timestamp}</td>
                                    <td className="py-2 px-4 border-b border-grey-light"><input type="checkbox"
                                                                                                disabled/></td>
                                    <td className="py-2 px-4 border-b border-grey-light"><input type="checkbox" checked
                                                                                                disabled/></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                onClick={() => setCurrentPage(prev => prev < Math.ceil(users.length / itemsPerPage) ? prev + 1 : prev)}
                            >
                                Next
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Admin;
