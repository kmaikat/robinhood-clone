import React from "react";

const LandingHome = () => {
    return (
        <div id='home-whole-container'>
            <div id="home-video-section">
                <video controlsList="nodownload nofullscreen noremoteplayback" autoPlay playsInline muted>
                    <source media="(min-width:1400px)" src="https://rockethood.s3.us-west-2.amazonaws.com/assets/retirement-hero-hq__67df1aeb147a73f52166e1f391f37f0e.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default LandingHome;
