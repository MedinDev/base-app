import React, {useState} from "react";
import {NavLink, Link} from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isLoggedIn = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    console.log(userRole);

    return (
        <nav className=" px-5 py-3 shadow sticky top-0 z-50">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link to={"/"} className="text-xl text-gray-800 font-semibold">
                   <span className="text-2xl self-center font-semibold whitespace-nowrap dark:text-white">
              RealEstate
            </span>
                </Link>

                <button
                    className="text-gray-800 inline-flex p-3 hover:bg-gray-300 rounded lg:hidden ml-auto hover:text-gray-700 outline-none"
                    onClick={toggleMenu}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <div className={`${
                    isMenuOpen ? "flex" : "hidden"
                } w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
                    <ul className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-800 items-center justify-center hover:bg-gray-300"
                                to={"/browse-all-houses"}>
                                Browse all houses
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-800 items-center justify-center hover:bg-gray-300"
                                    to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}

                        <li className="nav-item">
                            <NavLink
                                className="nav-link lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-800 items-center justify-center hover:bg-gray-300"
                                to={"/find-bookings"}>
                                Find my booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown relative">
                            <button
                                className="nav-link lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-800 items-center justify-center hover:bg-gray-300"
                                onClick={handleAccountClick}>
                                Account
                            </button>

                            {showAccount && (
                                <ul className="dropdown-menu absolute bg-white shadow rounded-lg mt-2">
                                    {isLoggedIn ? (
                                        <Logout/>
                                    ) : (
                                        <li>
                                            <Link
                                                className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                to={"/login"}>
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
