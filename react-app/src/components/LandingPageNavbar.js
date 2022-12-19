import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, Redirect } from "react-router-dom";
import "../stylesheets/LandingPageNavbar.css";
const LandingPageNavbar = () => {
    const location = useLocation();
    const current_url = location.pathname;
    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to='/app' />;
    }

    if (current_url === "/") document.querySelector('meta[name="theme-color"]').setAttribute('content', `#002615`);
    return (
        <div className="landing-page-container">
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
                        <NavLink to="/learn">
                            <li className="landing-page-navlink" id="landing-page-learn-button">Learn</li>
                        </NavLink>
                        <NavLink to="/cashcard">
                            <li className="landing-page-navlink" id="landing-page-CashCard-button">RocketCard</li>
                        </NavLink>
                        <a className="landing-page-navlink" href="https://github.com/kmaikat/robinhood-clone" target="_blank" rel="noopener noreferrer">Repository</a>
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
        </div>
    );
};

export default LandingPageNavbar;
