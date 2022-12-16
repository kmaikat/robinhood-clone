import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneDayPrices } from "../util/util";
import "../stylesheets/Transactions.css";
import AddStock from "./WatchList/WatchlistStock/AddStock";

async function grabLatestPrice(symbol) {
    const test = await getOneDayPrices(symbol);
    return test;
}

function Transactions() {
    const usDollar = Intl.NumberFormat("en-US");
    const optionContainer = useRef(null);
    const [color, setColor] = useState("#ec5e2a");
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [sharesOrDollars, setSharesOrDollars] = useState("dollars");
    const [showSharesOrDollars, setShowSharesOrDollars] = useState(false);
    const [transactionAmount, setTransactionAmount] = useState("");
    const buyingPower = useSelector(state => state.session.user.buyingPower);
    const [sharePrice, setSharePrice] = useState(0);
    const ownedShares = 20;
    const [buyOrSale, setBuyOrSale] = useState("buy");
    const symbol = useParams().symbol.toUpperCase();

    useEffect(async () => {
        const price = await grabLatestPrice(symbol);
        setSharePrice(price.data[price.data.length - 1]);
    }, [symbol]);

    useEffect(() => {
        if (!showSharesOrDollars) return;

        const onClick = (e) => {
            if (optionContainer.current && optionContainer.current.contains(e.target) === false) {
                setShowSharesOrDollars(false);
            }
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [showSharesOrDollars]);

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
                        <div className="transaction-form-data-container" style={{ userSelect: "none" }}>
                            <p>Order Type</p>
                            <p>Market Order</p>
                        </div>
                        <div className="transaction-form-data-container">
                            <label style={{ userSelect: "none" }}>Buy In</label>
                            <div ref={optionContainer} className={`transaction-shares-or-dollars-outer-container `} id={showSharesOrDollars ? "transaction-shares-or-dollars-outer-container" : ""}>
                                <button onClick={() => setShowSharesOrDollars(!showSharesOrDollars)} id="transaction-shares-or-dollars-display">
                                    {sharesOrDollars === "dollars" ? "Dollars" : "Shares"}
                                </button>
                                {showSharesOrDollars &&
                                    <div className={`transaction-shares-or-dollars-container ${showSharesOrDollars ? "transactions-shares-or-dollars-open" : ""}`}>
                                        <button
                                            className={`transactions-show-shares-or-dollars
                                            ${buyOrSale === "buy" && sharesOrDollars === "dollars" ? "transaction-green" :
                                                    buyOrSale === "sell" && sharesOrDollars === "dollars" ? "transaction-red" : "transaction-not-active"
                                                }`
                                            }
                                            onClick={e => {
                                                e.preventDefault();
                                                setSharesOrDollars("dollars");
                                                setShowSharesOrDollars(false);
                                            }}
                                        >
                                            Dollars
                                        </button>
                                        <button
                                            className={`transactions-show-shares-or-dollars
                                            ${buyOrSale === "buy" && sharesOrDollars === "shares" ? "transaction-green" :
                                                    buyOrSale === "sell" && sharesOrDollars === "shares" ? "transaction-red" : "transaction-not-active"
                                                }`
                                            }
                                            onClick={e => {
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
                            <p style={{ userSelect: "none" }}>Amount</p>
                            <input type="text"
                                id="transaction-form-text-input"
                                placeholder={sharesOrDollars === "dollars" ? "$0.00" : "0"}
                                value={transactionAmount}
                                onChange={(event) => {
                                    if (isNaN(event.target.value) === false) {
                                        // buy conditions
                                        if (buyOrSale === "buy" && sharesOrDollars === "dollars" && Number(buyingPower) >= Number(event.target.value)) setTransactionAmount(event.target.value);

                                        //sell conditions
                                        if (sharesOrDollars === "shares" && Number(ownedShares) >= Number(event.target.value)) setTransactionAmount(event.target.value);
                                    }
                                }} />
                        </div>
                        <div className="transaction-form-data-container" id="transaction-est-quantity" style={{ userSelect: "none" }}>
                            <p>Est. Quantity</p>
                            <p>0</p>
                        </div>
                        <div id="transaction-submit-container">
                            <button id="transaction-submit-button" type="submit" onClick={() => setSubmittingOrder(true)} className={`transaction-submit-${buyOrSale}`}>
                                Submit Order
                            </button>
                        </div>
                    </form>
                    {buyOrSale === "buy" && <div id="transaction-buying-power-container" style={{ userSelect: "none" }}>
                        <p>{`$${usDollar.format(buyingPower)} buying power available`}</p>
                    </div>}
                    {buyOrSale === "sell" &&
                        sharesOrDollars === "shares" &&
                        <div id="transaction-buying-power-container" style={{ userSelect: "none" }}>
                            <p>{`${ownedShares} ${symbol} shares remaining`}</p>
                        </div>
                    }
                    {buyOrSale === "sell" &&
                        sharesOrDollars === "dollars" &&
                        <div id="transaction-buying-power-container" style={{ userSelect: "none" }}>
                            <p>{`Roughly $${usDollar.format(Number(ownedShares) * Number(sharePrice))} of ${symbol} remaining`}</p>
                        </div>}
                </div>
                <AddStock symbol={symbol} />
            </div >
        </div >
    );
}

export default Transactions;;