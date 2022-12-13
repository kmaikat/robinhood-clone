import "../stylesheets/StockShowcase.css";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import ChartDrawing from "./ChartDrawing";
import SymbolNews from "./News/SymbolNews";
import { setSymbol } from "../store/ticker";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function StockShowcase() {
    const { symbol } = useParams()
    const dispatch = useDispatch()
    const [isError, setIsError] = useState(true)

    useEffect(() => {
        fetch(`/api/stock/search/${symbol}`)
            .then(res => res.json())
            .then(res => {
                if(res.length){
                    dispatch(setSymbol(symbol, res[0].name))
                    setIsError(false)
                }
            })
    }, [symbol])

    return (
        <>
            <AppMainNavBar />
            <div className="app-home-container">
                <div className="app-stocks">
                    <div className="app-home-left">
                        {/* <AllNews /> */}
                        <div id="app-home-chart-container">
                            { !isError && <ChartDrawing /> }
                        </div>
                        <div className="app-home-news-container">
                            <SymbolNews />
                        </div>
                    </div>
                    <div className="app-home-right">

                    </div>
                </div>
            </div>
        </>
    );
}

export default StockShowcase;
