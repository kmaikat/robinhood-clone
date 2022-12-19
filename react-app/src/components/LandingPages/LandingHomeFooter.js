import React from "react";
import "../../stylesheets/LandingPageHomeFooter.css"
import flaskIcon from "../../assets/flask.svg"
import amazonAWS from "../../assets/amazonaws.svg"
import css from "../../assets/css3.svg"
import html from "../../assets/html5.svg"
import javascript from "../../assets/javascript.svg"
import npm from "../../assets/npm.svg"
import postgres from "../../assets/postgresql.svg"
import python from "../../assets/python.svg"
import react from "../../assets/react.svg"
import reactRouter from "../../assets/reactrouter.svg"
import redux from "../../assets/redux.svg"
import render from "../../assets/render.svg"
import sqla from "../../assets/sqla.png"


const LandingHomeFooter = () => {
    return (
        <div id="footer-container">
            <div id="footer-top-container">
                <div id="footer-top-left-container">
                    <div id="footer-top-left-content">
                        <div id="top-footer-text">Hosted by</div>
                        <div id="render-info">
                            <div id="icons" className="render-icon">
                                <img classname="backend-icons" src={render} alt="render-icon" />
                                Render
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer-top-right-container">
                    <div id="footer-top-right-content">
                        <div id="top-footer-text">Made with</div>
                        <div id="icons">
                            <img classname="made-with-icons" src={npm} alt="npm-icon" />
                            <img classname="made-with-icons" src={python} alt="python-icon" />
                            <img classname="made-with-icons" src={sqla} alt="sqla-icon" />
                            <img classname="made-with-icons" src={flaskIcon} alt="flask-icon" />
                            <img classname="made-with-icons" src={amazonAWS} alt="aws-icon" />
                            <img classname="made-with-icons" src={css} alt="css-icon" />
                            <img classname="made-with-icons" src={html} alt="html-icon" />
                            <img classname="made-with-icons" src={javascript} alt="javascript-icon" />
                            <img classname="made-with-icons" src={redux} alt="redux-icon" />
                            <img classname="made-with-icons" src={react} alt="react-icon" />
                            <img classname="made-with-icons" src={postgres} alt="postgresql-icon" />
                            <img classname="made-with-icons" src={reactRouter} alt="react-icon" />
                        </div>
                    </div>
                </div>

            </div>
            <div id="footer-bottom-container">
                <div id="footer-bottom-left">
                    <div id="footer-bottom-left-content">
                        <div className="names" id="name-container">
                            Efrain Saldana
                            <a href="https://github.com/epsldn">
                                Github
                            </a>
                            <a href="https://www.linkedin.com/in/efrainpsaldana">
                                LinkedIn
                            </a>
                        </div>
                        <div className="names" id="name-container">
                            Ha Nguyen
                            <a href="https://github.com/vietha3110">
                                Github
                            </a>
                            <a href="https://www.linkedin.com/in/havietng/">
                                LinkedIn
                            </a>

                        </div>
                        <div className="names" id="name-container">
                            Joonil Kim
                            <a href="https://github.com/hydralisk1">
                                Github
                            </a>
                            <a href="https://www.linkedin.com">
                                LinkedIn
                            </a>
                        </div>
                        <div className="names" id="name-container">
                            Katherine Mai
                            <a href="https://github.com/kmaikat">
                                Github
                            </a>
                            <a href="https://www.linkedin.com/in/kpmai20">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
                <div id="footer-bottom-right">
                    <div id="footer-bottom-right-content">
                        <div id="text-disclaimer">
                            <div id="disclaimer">
                                All investing involves risk, except for Rockethood. No deposit needed. Any money in Rockethood is virtual money.
                            </div>
                            <div id="disclaimer">
                                This site is not Robinhood. Please do not provide your personal information. Rockethood will not be responsible for any trades made based off of this cloned site.
                            </div>
                            <div id="disclaimer">
                                © 2022 Rockethood. All rights reserved.

                            </div>



                        </div>
                    </div>
                </div>


            </div>

        </div>
    )

}

export default LandingHomeFooter;
