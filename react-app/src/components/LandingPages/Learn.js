import React from "react";
import "../../stylesheets/LearnPage.css";
import heroJourney from "../../assets/hero-journey.svg";


const LearnPage = () => {
    return (
        <div id="learn-page-body">
            <div className="learn-page-top-green-section">
                <div className="learn-page-top-green-section-top">
                    <h1>Investing basics</h1>
                </div>
                <div className="learn-page-top-green-section-bottom">
                    <div className="learn-page-top-green-section-bottom-container">
                        <div className="learn-page-top-green-section-bottom-content">
                            <h2>The building blocks of your financial journey </h2>
                            <p>What you need to know about investing from the get-go.</p>
                        </div>
                        <div className="learn-page-top-green-section-bottom-image">
                            <img src={heroJourney} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="learn-page-bottom">
                <div className="learn-page-bottom-title">
                    <h2>Investing 101</h2>
                    <p>A good place to start. Get the
                        low-down before you dive in.</p>
                </div>
            </div>
        </div>
    );

};

export default LearnPage;
