import React, {useEffect, useState} from 'react';
import {getAllHouses} from "../utils/ApiFunctions";
import {Link} from "react-router-dom";

const HouseCarousel = () => {

    const [houses, setHouses] = useState([{
        id: "",
        photo: "",
        houseType: "",
        housePrice: "",
        househouse: "",
        houseBathhouse: "",
        houseSurface: "",
        houseCountry: "",
        houseAddress: "",
        houseYear: "",
        houseDescription: "",
    }])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllHouses()
            .then((data) => {
                setHouses(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <div className="mt-5">Loading houses....</div>
    }
    if (errorMessage) {
        return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
    }
    return (
        <section className="bg-gray-100 my-5 shadow">
            <Link to={"/browse-all-houses"} className="text-center text-blue-500 block py-2">
                Browse all houses
            </Link>
            <div className="container mx-auto px-4">
                <div className="carousel">
                    {[...Array(Math.ceil(houses.length / 4))].map((_, index) => (
                        <div key={index} className="carousel-item">
                            <div className="flex flex-wrap -mx-4">
                                {houses.slice(index * 4, index * 4 + 4).map((house) => (
                                    <div key={house.id} className="mb-4 px-4 w-full md:w-1/2 lg:w-1/4">
                                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                            <Link to={`/book-house/${house.id}`}>
                                                <img
                                                    src={`data:image/png;base64, ${house.photo}`}
                                                    alt="house"
                                                    className="w-full"
                                                    style={{height: "200px", objectFit: "cover"}}
                                                />
                                            </Link>
                                            <div className="p-4">
                                                <h5 className="text-blue-500">{house.houseType}</h5>
                                                <h5 className="text-gray-900">${house.housePrice}/night</h5>
                                                <div className="mt-4">
                                                    <Link to={`/book-house/${house.id}`}
                                                          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg text-sm">
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default HouseCarousel;