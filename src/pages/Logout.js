import React, {useContext} from "react"
import {Link, useNavigate} from "react-router-dom"
import {AuthContext} from "../components/auth/AuthContextProvider";

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", {state: {message: " You have been logged out!"}})
    }

    return (
        <>
            <li>
                <Link className="text-gray-700 hover:text-black" to={"/profile"}>
                    Profile
                </Link>
            </li>
            <li>
                <hr className="my-2 border-gray-200"/>
            </li>
            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default Logout
