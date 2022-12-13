import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../stylesheets/Transactions.css";

function Transactions() {
    const usDollar = Intl.NumberFormat("en-US");
    const [color, setColor] = useState("#ec5e2a");
    const buyingPower = useSelector(state => usDollar.format(state.session.user.buyingPower));
    const [buyOrSale, setBuyOrSale] = useState("buy");
    const { symbol } = useParams();
    // setColor(currentPrice >= startingPrice ? '#5ac53b' : '#ec5e2a')

    function submitForm(e) {
        e.preventDefault();
    }

    return (
        <div id="transaction-container">
            <div id="transaction-heading-container">
                {buyOrSale === "buy" ? `Buy ${symbol}` : `Sale ${symbol}`}
            </div>
            <form id="transaction-form">
                <div id="transaction-order-type">
                    
                </div>
                <div id="transaction-buying-option">

                </div>
                <div id="transaction-quantity">

                </div>
                <button type="submit">
                    Submit Order
                </button>
            </form>
            <div id="transaction-buying-power-container">
                <p>{`$${buyingPower} buying power available`}</p>
            </div>
        </div>
    );
}

export default Transactions;