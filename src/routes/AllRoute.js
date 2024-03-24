import {Routes, Route} from "react-router-dom";
import Home from "../components/home/Home";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


export const AllRoutes = () => {
    return (
        <main>

            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>

            <Footer/>
        </main>
    );
};
