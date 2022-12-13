import "../stylesheets/StockShowcase.css";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import ChartDrawing from "./ChartDrawing";
import SymbolNews from "./News/SymbolNews";

function StockShowcase() {
    return (
        <>
            <AppMainNavBar />
            <div className="app-home-container">
                <div className="app-stocks">
                    <div className="app-home-left">
                        {/* <AllNews /> */}
                        <div id="app-home-chart-container">
                            <ChartDrawing />
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