import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {registerUser} from "../utils/ApiFunctions";
import image from "../assets/img/img1.jpg"

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleInputChange = (e) => {
        setRegistration({...registration, [e.target.name]: e.target.value})
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        try {
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration({firstName: "", lastName: "", email: "", password: ""})
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Registration error : ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }
    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src={image}
                     alt="Placeholder Image" className="object-cover w-full h-full"/>
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form onSubmit={handleRegistration}>
                    <div className="mb-4">
                        <label form="firstName" className="block text-gray-600">First Name</label>
                        <input id="firstName"
                               name="firstName"
                               type="text"
                               value={registration.firstName}
                               onChange={handleInputChange}
                               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               autoComplete="off"/>
                    </div>
                    <div className="mb-4">
                        <label form="lastName" className="block text-gray-600">Last Name</label>
                        <input id="lastName"
                               name="lastName"
                               type="text"
                               value={registration.lastName}
                               onChange={handleInputChange}
                               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               autoComplete="off"/>
                    </div>
                    <div className="mb-4">
                        <label form="email" className="block text-gray-600">Email</label>
                        <input id="email"
                               name="email"
                               type="email"
                               value={registration.email}
                               onChange={handleInputChange}
                               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               autoComplete="off"/>
                    </div>
                    <div className="mb-4">
                        <label form="password" className="block text-gray-600">Password</label>
                        <input type="password"
                               id="password"
                               name="password"
                               value={registration.password}
                               onChange={handleInputChange}
                               className=" w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               autoComplete="off"/>
                    </div>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login
                    </button>
                </form>
                <div className="mt-6 text-blue-500 text-center">
                    <Link className="hover:underline" to={"/login"}>Sign in Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Registration;