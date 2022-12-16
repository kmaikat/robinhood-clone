import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneDayPrices } from "../util/util";
import "../stylesheets/Transactions.css";
import AddStock from "./WatchList/WatchlistStock/AddStock";

async function grabLatestPrice(symbol) {
    const data = await getOneDayPrices(symbol);
    return data;
}

function Transactions() {
    const usDollar = Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const transactionDollar = Intl.NumberFormat("en-US", { maximumFractionDigits: 2, roundingMode: "trunc" });
    const optionContainer = useRef(null);
    const [color, setColor] = useState("#ec5e2a");
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [sharesOrDollars, setSharesOrDollars] = useState("dollars");
    const [showSharesOrDollars, setShowSharesOrDollars] = useState(false);
    const [transactionAmount, setTransactionAmount] = useState("");
    const [sharePrice, setSharePrice] = useState(0);
    const [buyOrSale, setBuyOrSale] = useState("buy");
    const [estQuantity, setEstQuantity] = useState(0);
    const buyingPower = useSelector(state => state.session.user.buyingPower);
    const ownedShares = 20;
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
                            onClick={() => {
                                setBuyOrSale("buy");
                                setTransactionAmount("");
                                setEstQuantity(0);
                            }}
                            id={buyOrSale === "buy" ? "transaction-tab-buy" : ""}
                            className="transaction-tab">
                            {`Buy ${symbol}`}
                        </p>
                        <p
                            onClick={() => {
                                setBuyOrSale("sell");
                                setTransactionAmount("");
                                setEstQuantity(0);
                            }}
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
                                <button onClick={() => {
                                    setShowSharesOrDollars(!showSharesOrDollars);
                                }}
                                    id="transaction-shares-or-dollars-display">
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
                                                setTransactionAmount("");
                                                setEstQuantity(0);
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
                                                setTransactionAmount("");
                                                setEstQuantity(0);
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
                                    if (event.target.value[0] === "$") {
                                        event.target.value = event.target.value.slice(1);
                                        event.target.value = event.target.value.replace(",", "");
                                    }

                                    if (isNaN(event.target.value) === false) {
                                        // buy conditions
                                        if (buyOrSale === "buy" && sharesOrDollars === "dollars" && Number(buyingPower) >= Number(event.target.value)) {
                                            let dollar;
                                            if (event.target.value.split(".")[1]?.length > 2) dollar = transactionDollar.format(event.target.value.slice(0, -1));
                                            else if (event.target.value[event.target.value.length - 1] === ".") dollar = transactionDollar.format(event.target.value) + ".";
                                            else if (event.target.value[event.target.value.length - 1] === "0" && event.target.value[event.target.value.length - 2] === ".") dollar = transactionDollar.format(event.target.value) + ".0";
                                            else dollar = transactionDollar.format(event.target.value);
                                            setTransactionAmount("$" + dollar);
                                            setEstQuantity(Number(event.target.value) / sharePrice);
                                        }
                                        if (buyOrSale === "buy" && sharesOrDollars === "shares" && Number(buyingPower / sharePrice) >= Number(event.target.value)) {
                                            setTransactionAmount(event.target.value);
                                            setEstQuantity(`$${usDollar.format(Number(event.target.value) * sharePrice)}`);
                                        }
                                        //sell conditions
                                        if (buyOrSale === "sell" && sharesOrDollars === "dollars" && Number(ownedShares) * Number(sharePrice) >= Number(event.target.value)) {
                                            console.log(event.target.value);
                                            let dollar;
                                            if (event.target.value.split(".")[1]?.length > 2) dollar = transactionDollar.format(event.target.value.slice(0, -1));
                                            else if (event.target.value[event.target.value.length - 1] === ".") dollar = transactionDollar.format(event.target.value) + ".";
                                            else if (event.target.value[event.target.value.length - 1] === "0" && event.target.value[event.target.value.length - 2] === ".") dollar = transactionDollar.format(event.target.value) + ".0";
                                            else dollar = transactionDollar.format(event.target.value);
                                            setTransactionAmount("$" + dollar);
                                            setEstQuantity(Number(event.target.value) / sharePrice);
                                        }
                                        if (buyOrSale === "sell" && sharesOrDollars === "shares" && Number(ownedShares) >= Number(event.target.value)) {
                                            setTransactionAmount(event.target.value);
                                            setEstQuantity(usDollar.format(Number(event.target.value) * sharePrice));
                                        }
                                    }
                                }} />
                        </div>
                        <div className="transaction-form-data-container" id="transaction-est-quantity" style={{ userSelect: "none" }}>
                            <p>Est. {sharesOrDollars === "shares" ? "Dollars" : "Shares"} </p>
                            <p>{sharesOrDollars === "dollars" ? null : "$"}{estQuantity}</p>
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
                            <p>{`Roughly $${(Number(ownedShares) * Number(sharePrice)).toString().split(".")[0]}.${(Number(ownedShares) * Number(sharePrice)).toString().split(".")[1]?.slice(0,2)} of ${symbol} remaining`}</p>
                        </div>}
                </div>
                <AddStock symbol={symbol} />
            </div >
        </div >
    );
}

export default Transactions;;