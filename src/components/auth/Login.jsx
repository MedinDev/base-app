import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {loginUser} from "../utils/ApiFunctions";
import {useAuth} from "./AuthProvider";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const auth = useAuth()
    const location = useLocation()
    const redirectUrl = location.state?.path || "/"

    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await loginUser(login)
        if (success) {
            const token = success.token
            auth.handleLogin(token)
            navigate(redirectUrl, {replace: true})
        } else {
            setErrorMessage("Invalid username or password. Please try again.")
        }
        setTimeout(() => {
            setErrorMessage("")
        }, 4000)
    }
    return (
        <div className="bg-white dark:bg-first-900">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/3"
                     style={{backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"}}>
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <div className=" flex-row text-gray-700 dark:text-white">
                                 <span className="text-2xl self-center font-semibold whitespace-nowrap text-white">
              RealEstate
            </span>
                                <h5 className="text-white">OBSHR</h5>
                            </div>

                            <p className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur
                                adipisicing
                                elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit
                                nam temporibus molestiae</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <div className=" flex-row text-gray-700 dark:text-white">
                                 <span className="text-2xl self-center font-semibold whitespace-nowrap dark:text-white">
              RealEstate
            </span>
                                <h5 className="dark:text-white">OBSHR</h5>
                            </div>

                            <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                        </div>
                        {errorMessage &&
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                 role="alert">
                                <strong className="font-bold">Error!</strong>
                                <span className="block sm:inline">{errorMessage}</span>
                            </div>}
                        <div className="mt-8">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label form="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email
                                        Address</label>
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           value={login.email}
                                           onChange={handleInputChange}
                                           placeholder="example@example.com"
                                           className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between mb-2">
                                        <label form="password"
                                               className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                        <Link
                                            className="text-sm text-gray-400 focus:text-red-500 hover:text-red-500 hover:underline"
                                            to={"/"}>Forgot
                                            password?</Link>
                                    </div>

                                    <input type="password"
                                           name="password"
                                           id="password"
                                           value={login.password}
                                           onChange={handleInputChange}
                                           placeholder="Your Password"
                                           className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type={"submit"}
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50">
                                        Sign in
                                    </button>
                                </div>

                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <Link
                                className="text-red-500 focus:outline-none focus:underline hover:underline"
                                to={"/register"}>Sign
                                up</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;