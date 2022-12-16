import React from "react";
import "../../stylesheets/HomePage.css"

const LandingHome = () => {
    return (
        <div id='home-whole-container'>
            <div id="home-video-section">
                <div id="video-container">

                    <video className="video" controlsList="nodownload nofullscreen noremoteplayback" autoPlay playsInline muted>
                        <source media="(min-width:1400px)" src="https://rockethood.s3.us-west-2.amazonaws.com/assets/retirement-hero-hq__67df1aeb147a73f52166e1f391f37f0e.mp4" type="video/mp4" />
                    </video>
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
                        container
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingHome;
