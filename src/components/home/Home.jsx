import React from 'react';
import About from "./About";
import Hero from "./Hero";
import PopularAreas from "./PopularAreas";
import {useLocation} from "react-router-dom";

const Home = () => {
    const location = useLocation()
    const message = location.state && location.state.message
    const currentUser = localStorage.getItem("userId")
    return (
        <div className="">
            {message && <p className="text-warning px-5">{message}</p>}
            {currentUser && (
                <h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
            )}
            <Hero/>
            <About/>
            <PopularAreas/>
        </div>
    );
};

export default Home;