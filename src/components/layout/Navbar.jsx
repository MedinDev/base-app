import {useEffect, useState, useCallback, useMemo} from "react";
import {Link, NavLink} from "react-router-dom";
import {FaUser} from "react-icons/fa";
import Logout from "../auth/Logout";

const Navbar = () => {
    const [hidden, setHidden] = useState(true);
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAccount, setShowAccount] = useState(false)
    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")

    const handleAccountClick = useCallback(() => {
        setShowAccount(!showAccount)
    }, [showAccount]);

    const toggleDropdown = useCallback(() => {
        setShowDropdown(!showDropdown);
    }, [showDropdown]);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const activeClass = useMemo(() =>
            "text-base block py-2 pr-4 pl-3 text-white bg-second-700 rounded md:bg-transparent md:text-second-700 md:p-0 dark:text-white",
        []);

    const inActiveClass = useMemo(() =>
            "text-base block py-2 pr-4 pl-3 text-first-700 rounded hover:bg-first-100 md:hover:bg-transparent md:hover:text-second-700 md:p-0 md:dark:hover:text-white dark:text-first-400 dark:hover:bg-first-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-first-700",
        []);
    return (
        <header className="sticky z-20 top-0 ">
            <nav
                className="bg-white border-b-2 border-first-200 px-2 sm:px-4 py-2 dark:bg-first-900 dark:border-b-1 dark:border-first-700">
                <div className=" flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/" className="flex items-center">
                            <span className="text-2xl self-center font-semibold whitespace-nowrap dark:text-white">
              RealEstate
            </span>
                        <h5 className="dark:text-white">OBSHR</h5>

                    </Link>

                    <div id="mobile-nav" className="flex md:order-2">
                        <div className="flex gap-2 ">
                            <div className="relative">
                                <button onClick={toggleDropdown}
                                        type="button"
                                        className="flex items-center p-2 mr-2 text-xs font-medium text-first-700 bg-white rounded-lg border border-first-200 toggle-dark-state-example hover:bg-first-100 hover:text-second-700 focus:z-10 focus:ring-2 focus:ring-first-300 dark:focus:ring-first-500 dark:bg-first-800 focus:outline-none dark:text-first-400 dark:border-first-600 dark:hover:text-white dark:hover:bg-first-700">
                                     <span className="">
     <FaUser className="h-4 w-5"/>

    </span>
                                </button>


                                {showDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        {isLoggedIn ? (
                                            <Logout/>
                                        ) : (
                                            <Link to="/login"
                                                  onClick={handleAccountClick}
                                                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${showAccount ? "show" : ""}`}>Login</Link>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    data-tooltip-target="navbar-search-example-toggle-dark-mode-tooltip"
                                    type="button"
                                    data-toggle-dark="light"
                                    className="flex items-center p-2 mr-2 text-xs font-medium text-first-700 bg-white rounded-lg border border-first-200 toggle-dark-state-example hover:bg-first-100 hover:text-second-700 focus:z-10 focus:ring-2 focus:ring-first-300 dark:focus:ring-first-500 dark:bg-first-800 focus:outline-none dark:text-first-400 dark:border-first-600 dark:hover:text-white dark:hover:bg-first-700"
                                >
                                    {darkMode ? (
                                        <svg
                                            aria-hidden="true"
                                            data-toggle-icon="sun"
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <svg
                                            aria-hidden="true"
                                            data-toggle-icon="moon"
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>

                        </div>


                        <button
                            onClick={() => setHidden(!hidden)}
                            data-collapse-toggle="navbar-search"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-first-500 rounded-lg md:hidden hover:bg-first-100 focus:outline-none focus:ring-2 focus:ring-first-200 dark:text-first-400 dark:hover:bg-first-700 dark:focus:ring-first-600"
                            aria-controls="navbar-search"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div
                        className={`${
                            hidden ? "hidden" : ""
                        } justify-between items-center w-full md:flex md:w-auto md:order-1`}
                        id="navbar-search"
                    >
                        <div className="relative mt-3 md:hidden"></div>
                        <ul className="flex flex-col p-4 mt-4 bg-first-50 rounded-lg border border-first-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-first-800 md:dark:bg-first-900 dark:border-first-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({isActive}) =>
                                        isActive ? activeClass : inActiveClass
                                    }
                                    end
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                {isLoggedIn && userRole === "ROLE_ADMIN" && (
                                    <NavLink
                                        to="/admin"
                                        className={({isActive}) =>
                                            isActive ? activeClass : inActiveClass
                                        }
                                    >
                                        Admin
                                    </NavLink>)}
                            </li>

                            <li>
                                <NavLink
                                    to="/browse-all-houses"
                                    className={({isActive}) =>
                                        isActive ? activeClass : inActiveClass
                                    }
                                    end
                                >
                                    All Houses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/find-bookings"
                                    className={({isActive}) =>
                                        isActive ? activeClass : inActiveClass
                                    }
                                >
                                    Find Bookings
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;