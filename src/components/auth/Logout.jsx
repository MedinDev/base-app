import React, {useContext} from 'react';
import {AuthContext} from "./AuthProvider";
import {Link, useNavigate} from "react-router-dom";

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", {state: {message: " You have been logged out!"}})
    }

    return (
        <>
            <div className="list-none px-4 py-2">
                <li>
                    <Link to={"/profile"}>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to={"/existing-bookings"}>
                        Bookings
                    </Link>
                </li>
                <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
    )
}

export default Logout