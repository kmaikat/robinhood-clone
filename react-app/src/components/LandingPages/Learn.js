import React from "react";
import "../../stylesheets/LearnPage.css"
import heroJourney from "../../assets/hero-journey.svg"


const LearnPage = () => {
    return (
        <div id="learn-page-body">
            {/* <div id="learn-page-inventing-basics-container"> */}
            <div id="learn-page-inventing-basics-heading-container">
                <div id="learn-page-inventing-basic-title">
                    Inventing basics
                </div>
            </div>
            <div id="learn-page-inventing-body-container">

                <div id="learn-page-inventing-basics-text-image-container">
                    <div id="inventing-basics-text-block">
                        <div id="inventing-basics-text">
                            <div id="inventing-basics-title-text">
                                The building blocks of your financial journey
                            </div>
                            <div id="inventing-basics-body-text">
                                What you need to know about investing from the get-go.
                            </div>

                        </div>
                    </div>
                    <div id="inventing-basics-image-block">
                        <img className="hero-journey-img" src={heroJourney} alt="hero-journey-pic" />
                    </div>

                </div>
            </div>

            {/* investing 101 */}


        </div>
    )

}

export default LearnPage
