import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../components/auth/AuthContextProvider";
import {loginUser} from "../utils/ApiFunctions";
import image from "../assets/img/img2.jpg"


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
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src={image}
                     alt="Placeholder Image" className="object-cover w-full h-full"/>
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label form="username" className="block text-gray-600">Email</label>
                        <input id="email"
                               name="email"
                               type="email"
                               value={login.email}
                               onChange={handleInputChange}
                               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               autoComplete="off"/>
                    </div>
                    <div className="mb-4">
                        <label form="password" className="block text-gray-600">Password</label>
                        <input id="password"
                               name="password"
                               type="password"
                               value={login.password}
                               onChange={handleInputChange}
                               className=" w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               autoComplete="off"/>
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember" name="remember" className="text-blue-500"/>
                        <label form="remember" className="text-gray-600 ml-2">Remember Me</label>
                    </div>
                    <div className="mb-6 text-blue-500">
                        <Link alt="boss" className="hover:underline" to={"/"}>Forgot Password?</Link>
                    </div>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login
                    </button>
                </form>
                <div className="mt-6 text-blue-500 text-center">
                    <Link className="hover:underline" to={"/registration"}>Sign up Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;