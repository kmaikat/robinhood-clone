import React from "react";
import "../stylesheets/AppHome.css";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import AllNews from "./News/AllNews";
import WatchList from "./WatchList";
import ChartDrawing from "./ChartDrawing";

const AppHome = () => {
    return (
        <>
            <AppMainNavBar />
            <div className="app-home-container">
                <div className="app-home">
                    <div className="app-home-left">
                        {/* <AllNews /> */}
                        <div id="app-home-chart-container">
                            <ChartDrawing />
                        </div>
                        <div className="app-home-news-container">
                            <AllNews />
                        </div>
                    </div>
                    <div className="app-home-right">
                        <WatchList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppHome;
