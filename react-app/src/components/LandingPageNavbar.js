import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../stylesheets/LandingPageNavbar.css";
const LandingPageNavbar = () => {
    const location = useLocation();
    const current_url = location.pathname;
    console.log(current_url);
    return (
        <div className={`landing-page ${current_url === "/" ? "landing-page-green" : "landing-page-white"}`}>
            <NavLink exact to="/">
                <div className="landing-page-logo">
                    <p className="landing-page-logo-text">Rockethood</p>
                    <i className="fa-solid fa-rocket"></i>
                </div>
            </NavLink>
            <div className="landing-page-navlink-actions-container">
                <ul className="landing-page-navlinks">
                    <NavLink to="/invest">
                        <li className="landing-page-navlink" id="landing-page-Invest-button">Invest</li>
                    </NavLink>
                    <NavLink to="/crypto">
                        <li className="landing-page-navlink" id="landing-page-Crypto-button">Crypto</li>
                    </NavLink>
                    <NavLink to="/learn">
                        <li className="landing-page-navlink" id="landing-page-learn-button">Learn</li>
                    </NavLink>
                    <NavLink to="/snacks">
                        <li className="landing-page-navlink" id="landing-page-Snacks-button">Snacks</li>
                    </NavLink>
                </ul>
                <div className="landing-page-actions">
                    <NavLink to="/login" exact>
                        <button id="landing-page-login">
                            Log in
                        </button>
                    </NavLink>
                    <NavLink to="/sign-up" exact>
                        <button id="landing-page-signup">
                            Sign up
                        </button>
                    </NavLink>
                </div>
            </div>
        </div >
    );
};

export default LandingPageNavbar;