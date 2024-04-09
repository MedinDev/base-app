import React, {useState} from 'react';
import heroimg from '../../assets/images/hero1.webp'
import moment from "moment/moment";
import {getAvailableHouses} from "../utils/ApiFunctions";
import HouseTypeSelector from "../common/HouseTypeSelector";
import HouseSearchResult from "../common/HouseSearchResult";

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        houseType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableHouses, setAvailableHouses] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkInMoment = moment(searchQuery.checkInDate)
        const checkOutMoment = moment(searchQuery.checkOutDate)
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please enter valid dates")
            return
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Check-out date must be after check-in date")
            return
        }
        setIsLoading(true)
        getAvailableHouses(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.houseType)
            .then((response) => {
                setAvailableHouses(response.data)
                setTimeout(() => setIsLoading(false), 2000)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSearchQuery({...searchQuery, [name]: value})
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("")
        }
    }
    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            houseType: ""
        })
        setAvailableHouses([])
    }
    return (
        <>
            <div>
                <section id='hero'
                         className='w-[95%] h-[600px] m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-start lg:px-28 px-10 gap-7 z-20'
                         style={{backgroundImage: `url(${heroimg})`}}>
                    <h1 data-aos="zoom-in"
                        className='text-6xl text-white font-semibold lg:pr-[500px] pr-0 lg:leading-[70px] leading-[60px]'>Find
                        your next
                        Home in Las Vegas</h1>
                    <p data-aos="zoom-in" className='text-white text-xl lg:pr-[500px] pr-0'>Through our proprietary
                        platform, WpResidence is changing how agents and clients navigate the process of finding or
                        selling a home.</p>
                </section>
            </div>


            {/* form starts here  */}
            <div className="z-10">
                <form onSubmit={handleSearch}>
                    <div data-aos="zoom-in" id='form'
                         className="bg-white lg:w-[70%] w-full m-auto grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-6 p-8 rounded-xl -mt-14">
                        <div className='w-full'>
                            <h1 className='uppercase text-black font-semibold dark:text-white'>Check-in</h1>
                            <input type="date"
                                   id="checkInDate"
                                   name="checkInDate"
                                   value={searchQuery.checkInDate}
                                   onChange={handleInputChange}
                                   min={moment().format("YYYY-MM-DD")}
                                   className='bg-white p-2 w-full mt-2 border-b-[1px] border-[#c9c7c1]'/>
                        </div>
                        <div className='w-full'>
                            <h1 className='uppercase text-black font-semibold dark:text-white'>Check-out</h1>
                            <input type="date"
                                   id="checkOutDate"
                                   name="checkOutDate"
                                   value={searchQuery.checkOutDate}
                                   onChange={handleInputChange}
                                   min={moment().format("YYYY-MM-DD")}
                                   className='bg-white p-2 w-full mt-2 border-b-[1px] border-[#c9c7c1]'/>
                        </div>
                        <div className='w-full'>
                            <h1 className='text-black dark:text-white font-semibold'>CATEGORY</h1>
                            <div id="selectOption"
                                 className='bg-white p-2 border-b-[1px] w-full mt-2 border-[#c9c7c1] text-gray-500 text-md'>
                                <HouseTypeSelector
                                    handleHouseInputChange={handleInputChange}
                                    newHouse={searchQuery}
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <button
                                className='bg-red-600 dark:bg-red-700 hover:bg-black dark:hover:bg-white dark:hover:text-black text-lg p-4 w-full text-white font-semibold rounded-xl cursor-pointer transform hover:scale-105 transition-transform duration-300'>SUBMIT
                            </button>
                        </div>
                    </div>
                </form>
                {isLoading ? (
                    <p className="mt-4">Finding available houses....</p>
                ) : availableHouses ? (
                    <HouseSearchResult results={availableHouses} onClearSearch={handleClearSearch}/>
                ) : (
                    <p className="mt-4">No rooms available for the selected dates and Houses type.</p>
                )}
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
        </>

    );
};

export default Hero;