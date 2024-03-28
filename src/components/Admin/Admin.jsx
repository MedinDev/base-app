import React from 'react';
import {Link} from "react-router-dom";

const Admin = () => {
    return (
        <section>
            <h2> Welcome to Admin Panel</h2>
            <hr/>
            <Link to={"/existing-houses"}>
                Manage Houses
            </Link>
            <Link to={"/existing-bookings"}>
                Manage Bookings
            </Link>

        </section>
    );
};

export default Admin;