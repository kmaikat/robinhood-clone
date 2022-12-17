import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { logout } from "../../../store/session";
import { getOneDayPrices } from "../../../util/util";
import LogoutButton from "../../auth/LogoutButton";

function AccountButton() {
    const [showAccount, setShowAccount] = useState(false);
    const ref = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const startingPrice = useSelector(state => state.price.startingPrice);
    const currentPrice = useSelector(state => state.price.currentPrice);

    const color = startingPrice > currentPrice ? "red" : "green"
    useEffect(() => {
        if (!showAccount) return;

        const onClick = (e) => {
            if (ref.current && ref.current.contains(e.target) === false) {
                const menu = document.querySelector("#app-nav-bar-account-submenu");
                menu.animate(
                    [
                        { opacity: "100%" },
                        { opacity: "0%" }
                    ], {
                    duration: 125,
                    fill: "forwards"
                }
                );
                setTimeout(() => setShowAccount(false), 125);
            }
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [showAccount]);

    return (
        <div id="account-button-container">
            <button onClick={() => setShowAccount(true)} id="account-button" className={`account-color-${color} ${showAccount ? "account-button-hold" : ""}`}>Account</button>
            {showAccount &&
                <div ref={ref} id="app-nav-bar-account-submenu">
                    <div id="submenu-account-information">
                        {user.username || user.email}
                    </div>
                    <Link to="/profile"><div id="submenu-profile-container">
                        <i className="fa-solid fa-face-smile" />
                        <p>Profile</p>
                    </div></Link>
                    <div id="submenu-logout-container" onClick={async (e) => await dispatch(logout())}>
                        <i className="fa-solid fa-arrow-right-from-bracket" />
                        <p> Log Out </p>
                    </div>
                </div>
            }
        </div >
    );
}

export default AccountButton;;;;;;