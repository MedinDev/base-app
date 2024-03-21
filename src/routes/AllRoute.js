import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import {Admin, Login, Profile, Registration} from "../pages";


export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/registration"} element={<Registration/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
        </Routes>
    );
};
