import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../stylesheets/Transactions.css";

function Transactions() {
    const usDollar = Intl.NumberFormat("en-US");
    const [color, setColor] = useState("#ec5e2a");
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const buyingPower = useSelector(state => usDollar.format(state.session.user.buyingPower));
    const [buyOrSale, setBuyOrSale] = useState("buy");
    const symbol = useParams().symbol.toUpperCase();
    // setColor(currentPrice >= startingPrice ? '#5ac53b' : '#ec5e2a')

    function submitOrder(e) {
        e.preventDefault();
    }

    return (
        <div id="transactions-outer-container">
            <div id="transaction-container">
                <div id="transaction-heading-container">
                    <p
                        onClick={() => setBuyOrSale("buy")}
                        id={buyOrSale === "buy" ? "transaction-tab-buy" : ""}
                        className="transaction-tab">
                        {`Buy ${symbol}`}
                    </p>
                    <p
                        onClick={() => setBuyOrSale("sell")}
                        id={buyOrSale === "sell" ? "transaction-tab-sell" : ""}
                        className="transaction-tab">
                        {`Sell ${symbol}`}
                    </p>
                </div>

                <form id="transaction-form" onSubmit={submitOrder}>
                    <div className="transaction-form-data-container">

                    </div>
                    <div className="transaction-form-data-container">

                    </div>
                    <div className="transaction-form-data-container">

                    </div>
                    <div id="transaction-submit-container">
                        <button id="transaction-submit-button" type="submit" onClick={() => setSubmittingOrder(true)} className={`transaction-submit-${buyOrSale}`}>
                            Submit Order
                        </button>
                    </div>
                </form>
                {buyOrSale === "buy" && <div id="transaction-buying-power-container">
                    <p>{`$${buyingPower} buying power available`}</p>
                </div>}
            </div>
        </div>
    );
}

export default Transactions;