import "../stylesheets/StockShowcase.css";
import AppMainNavBar from "./AppMainNavBar/AppMainNavBar";
import SymbolNews from "./News/SymbolNews";

function StockShowcase() {
    return (
        <>
            <AppMainNavBar />
            <div>
                <SymbolNews />
            </div>
        </>
    );
}

export default StockShowcase;