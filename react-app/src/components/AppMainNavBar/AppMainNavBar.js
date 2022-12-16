import React, { useCallback, useEffect, useRef, useState } from "react";
import AppHome from "../AppHome";
import AccountButton from "./AccountButton";
import Search from "../Search";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../stylesheets/AppMainNavBar.css";

const AppMainNavBar = () => {
    const [color, setColor] = useState('#5ac53b');
    const { currentPrice, startingPrice } = useSelector(state => state.price);

    const className = startingPrice > currentPrice ? "navbar-red" : "navbar-green";
    document.querySelector('meta[name="theme-color"]').setAttribute('content', `${startingPrice > currentPrice ? "#FF6600" : "#00C805"}`);
    return (
        <div id="app-nav-bar">
            <Link to="/app"> <i className={`fa-solid fa-rocket ${className}`} id="app-nav-bar-logo" /></Link>
            <Search />
            <AccountButton />
        </div>
    );
};

export default AppMainNavBar;