import React, { useEffect, useReducer, useRef, useState } from "react";
import AccountModal from "../../Modals/AccountModal";

function AccountButton() {
    const [showAccount, setShowAccount] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!showAccount) return;

        const onClick = (e) => {
            console.log(ref.current, e.target);
            if (ref.current && ref.current.contains(e.target) === false) {
                setShowAccount(false);
            }
        };

        document.addEventListener("click", onClick);

        return () => document.removeEventListener("click", onClick);
    }, [showAccount]);
    return (
        <div id="account-button-container">
            <button onClick={() => setShowAccount(true)} id="account-button">Account</button>
            {showAccount &&
                <div ref={ref} id="app-nav-bar-account-submenu">
                    This do be lit tho
                </div>
            }
        </div>
    );
}

export default AccountButton;