import React from "react";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import AllNews from "./News/AllNews";
import WatchList from "./WatchList";
import UserChart from "./UserChart";
import "../stylesheets/AppHome.css";

const AppHome = () => {
    return (
        <>
            <AppMainNavBar />
            <div className="app-home-container">
                <div className="app-home">
                    <div className="app-home-left">
                        {/* <AllNews /> */}
                        <div id="app-home-chart-container">
                            <UserChart />
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
