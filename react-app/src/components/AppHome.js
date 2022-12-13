import React from "react";
import "../stylesheets/AppHome.css";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import AllNews from "./News/AllNews";

const AppHome = () => {
    return (
        <>
        <AppMainNavBar />
        <div className="app-home">
        </div>
        </>
    );
};

export default AppHome;