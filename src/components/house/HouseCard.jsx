import React from 'react';
import {Link} from "react-router-dom";


const HouseCard = ({house}) => {
    return (
        <div key={house.id} className="mb-4" xs={12}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex flex-wrap items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`/book-house/${house.id}`}>
                            <img
                                className="w-full max-w-xs h-auto"
                                src={`data:image/png;base64, ${house.photo}`}
                                alt="House"
                            />
                        </Link>
                    </div>
                    <div className="flex-grow ml-3 px-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{house.houseType}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{house.housePrice} / night</p>
                        <p className="mt-1 text-sm text-gray-500">Some house information goes here for the guest to read
                            through</p>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/book-house/${house.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HouseCard;