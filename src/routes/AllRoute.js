import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import {Admin} from "../pages";


export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
    );
};
