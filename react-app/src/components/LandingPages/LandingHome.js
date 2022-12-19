import React from "react";
import "../../stylesheets/HomePage.css";
import LandingHomeFooter from "./LandingHomeFooter";

const LandingHome = () => {
    return (
        <div id='home-whole-container'>
            <div id="home-video-section">
                <div id="video-container">
                    <video className="video" controlsList="nodownload nofullscreen noremoteplayback" muted autoPlay playsInline src="https://rockethood.s3.us-west-2.amazonaws.com/assets/retirement-hero-hq__67df1aeb147a73f52166e1f391f37f0e.mp4" />
                </div>
                <div id="under-video-container">
                    <div id="under-video-text">
                        <div id="top-line">
                            Earn a 1% match.
                        </div>
                        <div id="bottom-line">
                            No employer necessary.
                        </div>
                    </div>
                    <div id="button-container">
                        <a href="https://github.com/kmaikat/robinhood-clone">

                            <button id="home-page-learn-more">Learn More</button>
                        </a>
                    </div>
                </div>
            </div>
            <LandingHomeFooter />
        </div >
    );
};

export default LandingHome;
