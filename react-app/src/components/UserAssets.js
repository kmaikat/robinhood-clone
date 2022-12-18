import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../stylesheets/UserAssets.css";

function UserAssets() {
    const assets = Object.values(useSelector(state => state.session.user?.assets));
    const usDollar = Intl.NumberFormat("en-us");
    const history = useHistory();
    return (
        <>
            {assets.length > 0 ?
                <div>
                    <ul className="profile-asset-header">
                        <li className="profile-asset-header-text">Company Symbol</li>
                        <li className="profile-asset-header-text">Avg Share Price</li>
                        <li className="profile-asset-header-text">Quantity</li>
                    </ul>
                    <ul className="profile-asset-list">
                        {assets.map(asset => {
                            return (
                                <>
                                    <li className="profile-asset-list-content asset-list-symbol" onClick={() => history.push(`/stocks/${asset.symbol}`)}>{asset.symbol}</li>
                                    <li className="profile-asset-list-content">{"$" + usDollar.format(asset.avgPrice)}</li>
                                    <li className="profile-asset-list-content">{asset.quantity}</li>
                                </>
                            );
                        })}
                    </ul>
                </div > :
                <div className="profile-no-content">
                    <h3>Any stocks you buy will show up here! <i className="fa-solid fa-money-bill-trend-up"></i></h3>
                </div>
            }
        </>
    );
}

export default UserAssets;