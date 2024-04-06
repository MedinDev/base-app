import axios from "axios";

// Centralized Axios Instance Configuration
export const api = axios.create({
    baseURL: "http://localhost:1906",
});

// Axios Request Interceptor for Automatically Adding Headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Axios Response and Error Interceptors for Centralized Error Handling
api.interceptors.response.use((response) => {
    // You can perform actions based on successful responses here
    return response;
}, (error) => {
    // Centralized error handling
    const errorMessage = error.response?.data?.error || "An error occurred";
    throw new Error(errorMessage);
});

// Helper Function for FormData Creation
const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return formData;
};

// API Functions

export async function addHouse(data) {
    const formData = createFormData(data);
    const response = await api.post("/houses/add/new-house", formData);
    return response.data; // Assuming the API returns some data on success
}

export async function getHouseTypes() {
    const response = await api.get("/houses/house/types");
    return response.data;
}

export async function getAllHouses() {
    const response = await api.get("/houses/all-houses");
    return response.data;
}

export async function deleteHouse(houseId) {
    const response = await api.delete(`/houses/delete/house/${houseId}`);
    return response.data;
}

export async function updateHouse(houseId, data) {
    const formData = createFormData(data);
    const response = await api.put(`/houses/update/${houseId}`, formData);
    return response.data;
}

export async function getHouseById(houseId) {
    const response = await api.get(`/houses/house/${houseId}`);
    return response.data;
}

export async function bookHouse(houseId, booking) {
    const response = await api.post(`/bookings/house/${houseId}/booking`, booking);
    return response.data;
}

export async function getAllBookings() {
    const response = await api.get("/bookings/all-bookings");
    return response.data;
}

export async function getBookingByConfirmationCode(confirmationCode) {
    const response = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return response.data;
}

export async function cancelBooking(bookingId) {
    const response = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return response.data;
}

export async function getAvailableHouses(checkInDate, checkOutDate, houseType) {
    const response = await api.get(`/houses/available-houses`, {
        params: {checkInDate, checkOutDate, houseType},
    });
    return response.data;
}

export async function registerUser(registration) {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
}

export async function loginUser(login) {
    const response = await api.post("/auth/login", login);
    return response.data;
}

export async function getUserProfile(userId) {
    const response = await api.get(`/users/profile/${userId}`);
    return response.data;
}

export async function deleteUser(userId) {
    const response = await api.delete(`/users/delete/${userId}`);
    return response.data;
}

export async function getUser(userId) {
    const response = await api.get(`/users/${userId}`);
    return response.data;
}

export async function getBookingsByUserId(userId) {
    const response = await api.get(`/bookings/user/${userId}/bookings`);
    return response.data;
}

export async function updateUserRole(userId, newRole) {
    const response = await api.put(`/users/users/${userId}/role`, null, {
        params: {newRole},
    });
    return response.data;
}
