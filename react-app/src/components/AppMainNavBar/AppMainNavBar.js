import React, { useCallback, useEffect, useRef, useState } from "react";
import AppHome from "../AppHome";
import AccountButton from "./AccountButton";
import "../../stylesheets/AppMainNavBar.css";
import Search from "../Search";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AppMainNavBar = () => {
    return (
        <div id="app-nav-bar">
            <Link to="/app"> <i className="fa-solid fa-rocket" id="app-nav-bar-logo" /></Link>
            <Search />
            <AccountButton />
        </div>
    );
};

export default AppMainNavBar;