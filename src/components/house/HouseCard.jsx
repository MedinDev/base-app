import React from 'react';
import {Link} from "react-router-dom";

const HouseCard = ({house}) => {
    return (
        <div key={house.id} className="mb-4">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
                <div className="p-4 flex items-center">
                    <div className="mr-3">
                        <Link to={`/book-room/${house.id}`}>
                            <img
                                className="w-full h-auto"
                                src={`data:image/png;base64, ${house.photo}`}
                                alt="house Photo"
                            />
                        </Link>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{house.houseType}</h3>
                        <p className="text-sm text-gray-600">{house.housePrice} / night</p>
                        <p className="text-sm text-gray-700">Some room information goes here for the guest to read
                            through</p>
                    </div>
                    <div className="ml-auto">
                        <Link to={`/book-house/${house.id}`}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HouseCard;