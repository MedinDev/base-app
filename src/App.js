import Navbar from "./components/layout/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import EditHouse from "./components/house/EditHouse";
import AddHouse from "./components/house/AddHouse";
import ExistingHouses from "./components/house/ExistingHouses";
import HouseListing from "./components/house/HouseListing";
import Admin from "./components/Admin/Admin";
import Checkout from "./components/booking/Checkout";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import FindBooking from "./components/booking/FindBooking";
import {AuthProvider} from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";

function App() {
    return (
        <AuthProvider>
            <main>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={"/edit-house/:houseId"} element={<EditHouse/>}/>
                    <Route path={"/add-House"} element={<AddHouse/>}/>
                    <Route path={"/existing-Houses"} element={<ExistingHouses/>}/>
                    <Route path={"/browse-all-houses"} element={<HouseListing/>}/>
                    <Route path={"/admin"} element={<Admin/>}/>
                    <Route path={"/book-house/:houseId"} element={<RequireAuth> <Checkout/> </RequireAuth>}/>
                    <Route path={"/booking-success"} element={<BookingSuccess/>}/>
                    <Route path={"/existing-bookings"} element={<Bookings/>}/>
                    <Route path={"/find-bookings"} element={<FindBooking/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/profile" element={<Profile/>}/>

                </Routes>
                {/*<Footer/>*/}
            </main>
        </AuthProvider>
    );
}

export default App;
