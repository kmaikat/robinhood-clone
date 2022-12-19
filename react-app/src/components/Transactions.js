import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneDayPrices } from "../util/util2";
import "../stylesheets/Transactions.css";
import AddStock from "./WatchList/WatchlistStock/AddStock";
import { updateBuyingPowerWithDb } from "../store/session";

async function grabLatestPrice(symbol) {
    const data = await getOneDayPrices(symbol);
    return data;
}

function formatTransactionAmount(event) {
    let dollar;
    const transactionDollar = Intl.NumberFormat("en-US", { maximumFractionDigits: 2, roundingMode: "trunc" });
    if (event.target.value.split(".")[1]?.length > 2) dollar = transactionDollar.format(event.target.value.slice(0, -1));
    else if (event.target.value[event.target.value.length - 1] === ".") dollar = transactionDollar.format(event.target.value) + ".";
    else if (event.target.value[event.target.value.length - 1] === "0" && event.target.value[event.target.value.length - 2] === ".") dollar = transactionDollar.format(event.target.value) + ".0";
    else dollar = transactionDollar.format(Math.abs(event.target.value));
    return dollar;
}

const loadTimes = [1000, 900, 200, 700, 3000, 2000, 1800, 400, 6000, 4200, 300, 3000, 2100, 1100];

const safeBet = [.95, .99, 1, .98, .9526, .98412, .98418, .912349, .99919, .95, 1, 1];

function Transactions() {
    const usDollar = Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const optionContainer = useRef(null);
    const [errors, setErrors] = useState({});
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [sharesOrDollars, setSharesOrDollars] = useState("dollars");
    const [showSharesOrDollars, setShowSharesOrDollars] = useState(false);
    const [transactionAmount, setTransactionAmount] = useState("");
    const [sharePrice, setSharePrice] = useState(0);
    const [buyOrSale, setBuyOrSale] = useState("buy");
    const [estQuantity, setEstQuantity] = useState(0);
    const [loading, setLoading] = useState(true);
    const [comanyName, setCompanyName] = useState("");
    const symbol = useParams().symbol.toUpperCase();
    const buyingPower = useSelector(state => state.session.user.buyingPower);
    const ownedShares = useSelector(state => state.session.user.assets[symbol]?.quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            const price = await grabLatestPrice(symbol);
            const response = await fetch('/api/stock/search/' + symbol);
            const data = await response.json();
            const company = data[0];
            setCompanyName(company.name);
            setSharePrice(price.data[price.data.length - 1]);
        })();
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

    async function submitOrder(e) {
        e.preventDefault();
        let purchaseAmount;

        if (sharesOrDollars === "dollars") purchaseAmount = Number(transactionAmount.slice(1).split(",").join(""));
        if (sharesOrDollars === "shares") purchaseAmount = transactionAmount;

        if (!purchaseAmount || !purchaseAmount > 0) {
            setSubmittingOrder(false);
            setErrors({ amount: "Amount cannot be equal to or less than 0" });
            return;
        }

        const randomIndex = Math.floor(Math.random() * (loadTimes.length + 1));
        const randomBet = Math.floor(Math.random() * (safeBet.length + 1));
        let finalQuant;
        let latestPrice;
        if (sharesOrDollars === "dollars") {
            if (purchaseAmount > buyingPower - sharePrice * 2) {
                latestPrice = safeBet[randomBet] * sharePrice;
            } else {
                latestPrice = await grabLatestPrice(symbol);
                latestPrice = latestPrice.data[latestPrice.data.length - 1];
            }

            finalQuant = Number(purchaseAmount) / Number(latestPrice);
        }

        if (sharesOrDollars === "shares") {
            if (estQuantity > .75 * buyingPower) {
                latestPrice = safeBet[randomBet] * sharePrice;
            } else {
                latestPrice = await grabLatestPrice(symbol);
                latestPrice = latestPrice.data[latestPrice.data.length - 1];
            }

            finalQuant = Number(purchaseAmount);
        }

        setTimeout(async () => {
            const response = await dispatch(updateBuyingPowerWithDb(symbol, comanyName, buyOrSale, finalQuant, latestPrice));
            setLoading(false);
            setSharePrice(latestPrice);
            setTimeout(() => {
                const submission = document.querySelector("#transaction-submitting-order");
                const animation = submission.animate(
                    [
                        { opacity: "100%" },
                        { opacity: "0%" }
                    ], {
                    duration: 700,
                    timingFunction: "ease-out",
                    fill: "forwards"
                });
                setTransactionAmount("");
                setErrors({});
                setSubmittingOrder(false);
                setLoading(true);
            }, 700);
        }, loadTimes[randomIndex]);
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
                                setErrors({});
                            }}
                            style={buyOrSale === "buy" ? { userSelect: "none", cursor: "default" } : {}}
                            id={buyOrSale === "buy" ? "transaction-tab-buy" : ""}
                            className="transaction-tab">
                            {`Buy ${symbol}`}
                        </p>
                        {ownedShares > 0 && <p
                            onClick={() => {
                                setBuyOrSale("sell");
                                setTransactionAmount("");
                                setEstQuantity(0);
                                setErrors({});
                            }}
                            id={buyOrSale === "sell" ? "transaction-tab-sell" : ""}
                            style={buyOrSale === "sell" ? { userSelect: "none", cursor: "default" } : {}}
                            className="transaction-tab">
                            {`Sell ${symbol}`}
                        </p>}
                    </div>

                    <form id="transaction-form" onSubmit={submitOrder}>
                        <div className="transaction-form-data-container" style={{ userSelect: "none" }}>
                            <p>Order Type</p>
                            <p>Market Order</p>
                        </div>
                        <div className="transaction-form-data-container">
                            <label style={{ userSelect: "none" }}>Buy In</label>
                            <div ref={optionContainer} className={`transaction-shares-or-dollars-outer-container `} id={showSharesOrDollars ? "transaction-shares-or-dollars-outer-container" : ""}>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setShowSharesOrDollars(!showSharesOrDollars);
                                }}
                                    id="transaction-shares-or-dollars-display">
                                    {sharesOrDollars === "dollars" ? "Dollars" : "Shares"}
                                    <i className="fa-solid fa-sort"></i>
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
                                                setErrors({});
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
                                                setErrors({});
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
                                className={errors.amount ? "transaction-form-error" : ""}
                                placeholder={sharesOrDollars === "dollars" ? "$0.00" : "0"}
                                value={transactionAmount}
                                onChange={(event) => {
                                    setErrors({});
                                    if (event.target.value[0] === "$") {
                                        event.target.value = event.target.value.slice(1);
                                        event.target.value = event.target.value.split(",").join("");
                                        event.target.value = Math.abs(event.target.value);
                                    }
                                    if (isNaN(event.target.value) === false) {
                                        // buy conditions
                                        if (buyOrSale === "buy" && sharesOrDollars === "dollars") {
                                            if (Number(buyingPower) >= Number(event.target.value)) {
                                                const dollar = formatTransactionAmount(event);
                                                setTransactionAmount("$" + dollar);
                                                setEstQuantity(Number(event.target.value) / sharePrice);
                                            } else {
                                                setErrors({ amount: "Not enough funds." });
                                            }
                                        }

                                        if (buyOrSale === "buy" && sharesOrDollars === "shares") {
                                            if (Number(buyingPower / sharePrice) >= Number(event.target.value)) {
                                                setTransactionAmount(Math.abs(event.target.value));
                                                setEstQuantity(`$${usDollar.format(Math.abs(Number(event.target.value) * sharePrice))}`);
                                            } else {
                                                setErrors({ amount: "Not enough funds." });
                                            }
                                        }
                                        //sell conditions
                                        if (buyOrSale === "sell" && sharesOrDollars === "dollars") {
                                            if (Number(ownedShares) * Number(sharePrice) >= Number(event.target.value)) {
                                                const dollar = formatTransactionAmount(event);
                                                setTransactionAmount("$" + dollar);
                                                setEstQuantity(Number(event.target.value) / sharePrice);
                                            } else {
                                                setErrors({ amount: "Not enough stock." });
                                            }
                                        }

                                        if (buyOrSale === "sell" && sharesOrDollars === "shares") {
                                            if (Number(ownedShares) >= Number(event.target.value)) {
                                                setTransactionAmount(Math.abs(event.target.value));
                                                setEstQuantity("$" + usDollar.format(Math.abs(Number(event.target.value) * sharePrice)));
                                            } else {
                                                setErrors({ amount: "Not enough stock." });
                                            }
                                        }
                                    }
                                }} />
                        </div>
                        <div className="transaction-form-data-container" id="transaction-est-quantity" style={{ userSelect: "none" }}>
                            <p>Est. {sharesOrDollars === "shares" ? "Dollars" : "Shares"} </p>
                            <p>{estQuantity}</p>
                        </div>
                        <div id="transaction-submit-container">
                            <button id="transaction-submit-button" type="submit" onClick={() => setSubmittingOrder(true)} className={`transaction-submit-${buyOrSale}`}>
                                Submit Order
                            </button>
                        </div>
                        {errors.amount &&
                            <div className="transactions-error-container">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <p>
                                    {errors.amount}
                                </p>
                            </div>
                        }
                    </form>
                    {buyOrSale === "buy" && <div id="transaction-buying-power-container" style={{ userSelect: "none" }}>
                        <p>{`$${usDollar.format(buyingPower)} of buying power available`}</p>
                    </div>}
                    {buyOrSale === "sell" &&
                        sharesOrDollars === "shares" &&
                        <div id="transaction-buying-power-container" style={{ userSelect: "none" }}>
                            <p>{`${ownedShares || 0} ${symbol} share${ownedShares > 1 && ownedShares !== 0 ? "s" : ""} remaining`}</p>
                        </div>
                    }
                    {buyOrSale === "sell" &&
                        sharesOrDollars === "dollars" &&
                        <div id="transaction-buying-power-container" style={{ userSelect: "none" }}>
                            <p>{`Roughly $${(Number(ownedShares) * Number(sharePrice)).toString().split(".")[0]}${(Number(ownedShares) * Number(sharePrice)).toString().split(".")[1]?.slice(0, 2) ? "." + (Number(ownedShares) * Number(sharePrice)).toString().split(".")[1]?.slice(0, 2) : ""} of ${symbol} remaining`}</p>
                        </div>}
                    {submittingOrder &&
                        <div id="transaction-submitting-order" >
                            {
                                loading &&
                                <div id="signup-spinner" />
                            }
                            {
                                !loading &&
                                <div className="transaction-submitted">
                                    <i className="fa-regular fa-circle-check" style={buyOrSale === "buy" ? { color: " #00C805", fontWeight: 500 } : { color: "#FF6600", fontWeight: 500 }} />
                                    <div className="transaction-submitted-text">
                                        <p>Order Successfully Submitted!</p>
                                        <p>Filled at <span style={buyOrSale === "buy" ? { color: " #00C805", fontWeight: 500 } : { color: "#FF6600", fontWeight: 500 }}>{`$${sharePrice.toString().split(".")[0]}.${sharePrice.toString().split(".")[1] ? sharePrice.toString().split(".")[1]?.slice(0, 2) : ""}`} </span>a share</p>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                <AddStock symbol={symbol} />
            </div >
        </div >
    );
}

export default Transactions;;