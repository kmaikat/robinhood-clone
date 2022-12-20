import React from "react";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import AllNews from "./News/AllNews";
import WatchList from "./WatchList";
import UserChart from "./UserChart";
import "../stylesheets/AppHome.css";
import { useSelector } from "react-redux";

const AppHome = () => {
    const buyingPower = useSelector(state => state.session.user?.buyingPower);
    const usDollar = Intl.NumberFormat("en-us", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    return (
        <>
            <AppMainNavBar />
            <div className="app-home-container">
                <div className="app-home">
                    <div className="app-home-left">
                        <div id="app-home-chart-container">
                            <UserChart />
                            <div className="buying-power-section">
                                <p className="buying-power-section-label">Buying Power</p>
                                <p className="buying-power-section-content">${usDollar.format(buyingPower)}</p>
                            </div>
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
