import {Routes, Route} from "react-router-dom";
import Home from "../components/home/Home";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AddHouse from "../components/house/AddHouse";
import ExistingHouses from "../components/house/ExistingHouses";
import EditHouse from "../components/house/EditHouse";
import HouseListing from "../components/house/HouseListing";
import Admin from "../components/Admin/Admin";
import Checkout from "../components/booking/Checkout";
import BookingSuccess from "../components/booking/BookingSuccess";
import Bookings from "../components/booking/Bookings";
import FindBooking from "../components/booking/FindBooking";


export const AllRoutes = () => {
    return (
        <main>

            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/edit-house/:houseId"} element={<EditHouse/>}/>
                <Route path={"/add-House"} element={<AddHouse/>}/>
                <Route path={"/existing-Houses"} element={<ExistingHouses/>}/>
                <Route path={"/browse-all-houses"} element={<HouseListing/>}/>
                <Route path={"/admin"} element={<Admin/>}/>
                <Route path={"/book-house/:houseId"} element={<Checkout/>}/>
                <Route path={"/booking-success"} element={<BookingSuccess/>}/>
                <Route path={"/existing-bookings"} element={<Bookings/>}/>
                <Route path={"/find-bookings"} element={<FindBooking/>}/>
            </Routes>
            <Footer/>
        </main>
    );
};
