import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneDayPrices } from "../util/util";
import "../stylesheets/Transactions.css";
import AddStock from "./WatchList/WatchlistStock/AddStock";

function Transactions() {
    const usDollar = Intl.NumberFormat("en-US");
    const [color, setColor] = useState("#ec5e2a");
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [sharesOrDollars, setSharesOrDollars] = useState("dollars");
    const [showSharesOrDollars, setShowSharesOrDollars] = useState(false);
    const [transactionAmount, setTransactionAmount] = useState("");
    const buyingPower = useSelector(state => state.session.user.buyingPower);
    const sharePrice = useSelector(state => state.price.currentPrice);
    const ownedShares = 20;
    const [buyOrSale, setBuyOrSale] = useState("buy");
    const symbol = useParams().symbol.toUpperCase();

    async function tester() {
        const test = await getOneDayPrices(symbol);
        console.log(test);
    }

    console.log(tester());
    function submitOrder(e) {
        e.preventDefault();
    }

    return (
        <div id="transactions-outer-container">
            <div id="transactions-and-watchlist-container">
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
                            <p>Order Type</p>
                            <p>Market Order</p>
                        </div>
                        <div className="transaction-form-data-container">
                            <label>Buy In</label>
                            <div className="transaction-shares-or-dollars-outer-container">
                                <button onClick={() => setShowSharesOrDollars(!showSharesOrDollars)} id="transaction-shares-or-dollars-display" className={showSharesOrDollars ? "transactions-shares-or-dollars-open" : ""}>
                                    {sharesOrDollars === "dollars" ? "Dollars" : "Shares"}
                                </button>
                                {showSharesOrDollars &&
                                    <div className="transaction-shares-or-dollars-container">
                                        <button
                                            className={`transactions-show-shares-or-dollars ${buyOrSale === "buy" ? "transaction-green" : "transaction-red"}`} onClick={e => {
                                                e.preventDefault();
                                                setSharesOrDollars("dollars");
                                                setShowSharesOrDollars(false);
                                            }}
                                        >
                                            Dollars
                                        </button>
                                        <button
                                            className={`transactions-show-shares-or-dollars ${buyOrSale === "buy" ? "transaction-green" : "transaction-red"}`} onClick={e => {
                                                e.preventDefault();
                                                setSharesOrDollars("shares");
                                                setShowSharesOrDollars(false);
                                            }}
                                        >
                                            Shares
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="transaction-form-data-container" id="transaction-amount">
                            <p>Amount</p>
                            <input type="text"
                                id="transaction-form-text-input"
                                placeholder={sharesOrDollars === "dollars" ? "$0.00" : "0"}
                                value={transactionAmount}
                                onChange={(event) => {
                                    if (isNaN(event.target.value) === false) {
                                        // buy conditions
                                        if (buyOrSale === "buy" && sharesOrDollars === "dollars" && Number(buyingPower) > Number(event.target.value)) setTransactionAmount(event.target.value);

                                        //sell conditions
                                        if (sharesOrDollars === "shares" && Number(ownedShares) > Number(event.target.value)) setTransactionAmount(event.target.value);
                                    }
                                }} />
                        </div>
                        <div className="transaction-form-data-container" id="transaction-est-quantity">
                            <p>Est. Quantity</p>
                            <p>0</p>
                        </div>
                        <div id="transaction-submit-container">
                            <button id="transaction-submit-button" type="submit" onClick={() => setSubmittingOrder(true)} className={`transaction-submit-${buyOrSale}`}>
                                Submit Order
                            </button>
                        </div>
                    </form>
                    {buyOrSale === "buy" && <div id="transaction-buying-power-container">
                        <p>{`$${usDollar.format(buyingPower)} buying power available`}</p>
                    </div>}
                    {buyOrSale === "sell" &&
                        // sharesOrDollars === "shares" &&
                        <div id="transaction-buying-power-container">
                            <p>{`${ownedShares} ${symbol} shares remaining`}</p>
                        </div>
                    }
                    {buyOrSale === "sell" &&
                        // sharesOrDollars === "shares" &&
                        <div id="transaction-buying-power-container">
                            <p>{`Roughly ${usDollar.format(Number(ownedShares) * Number(sharePrice))} of ${symbol} remaining`}</p>
                        </div>}
                </div>
                <AddStock symbol={symbol} />
            </div>
        </div>
    );
}

export default Transactions;;