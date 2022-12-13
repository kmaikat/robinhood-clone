import "../stylesheets/StockShowcase.css";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import ChartDrawing from "./ChartDrawing";
import SymbolNews from "./News/SymbolNews";
import { setSymbol } from "../store/ticker";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Transactions from "./Transactions";

function StockShowcase() {
    const { symbol } = useParams();
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(true);
    const [companyInfo, setCompanyInfo] = useState({ "about": {}, "statistics": {} });
    const [companyInfoLoaded, setCompanyInfoLoaded] = useState(false);

    const { about: company, statistics: stats } = companyInfo;
    useEffect(() => {
        fetch(`/api/stock/search/${symbol}`)
            .then(res => res.json())
            .then(res => {
                if (res.length) {
                    dispatch(setSymbol(symbol, res[0].name));
                    setIsError(false);
                }
            });
    }, [symbol]);

    useEffect(() => {
        fetch(`/api/stock/company-information/${symbol}`)
            .then(res => res.json())
            .then(res => {
                setCompanyInfo(res);
                setCompanyInfoLoaded(true);
            });
    }, [symbol]);

    console.log(companyInfo);
    return (
        <>
            <AppMainNavBar />
            <div className="app-home-container">
                <div className="app-stocks">
                    <div className="app-home-left">
                        {/* <AllNews /> */}
                        <div id="stock-home-chart-container">
                            {!isError && <ChartDrawing />}
                        </div>
                        <div className="stock-showcase-info">
                            <h2 className="stock-showcase-heading-title">About</h2>
                            <p id="stock-showcase-about-description">
                                {companyInfoLoaded && company.Description}
                            </p>
                            <div className="stock-showcase-grid">
                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Name
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && company.Name}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Address
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && company.Address}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Industry
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && company.Industry}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Exchange Listed On
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && company.Exchange}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="stock-showcase-info">
                            <h2 className="stock-showcase-heading-title">Key statistics</h2>
                            <div className="stock-showcase-grid">
                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Market Cap
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.MarketCap || "—"}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Price-Earnings Ratio
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.PERatio || "—"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Dividend Yield
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.IndDividendYieldustry || "—"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Analyst Target Price
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.AnalystTargetPrice || "—"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Symbol
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.Symbol || "—"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Year high
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.YearHigh || "—"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Year Low
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.YearLow || "—"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="stock-showcase-grid-title">
                                        Sector
                                    </h3>
                                    <p className="stock-showcase-grid-info">
                                        {companyInfoLoaded && stats.Sector || "—"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="app-home-news-container">
                            <SymbolNews />
                        </div>
                    </div>
                    <div className="app-home-right">
                        <Transactions />
                    </div>
                </div>
            </div>
        </>
    );
}

export default StockShowcase;
