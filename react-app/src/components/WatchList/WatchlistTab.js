import { useEffect, useState } from "react";
import * as watchlistAction from '../../store/watchlist';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StockPrice from "./StockPrice";

const WatchlistTab = () => {
    const dispatch = useDispatch();
    const watchlists = useSelector(state => state.watchlists.watchlists);
    const [isOpen, setIsOpen] = useState({});
    
    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists());
    })

    const handleClick = (i) => (e) => {
        e.stopPropagation();
        setIsOpen({
            ...isOpen,
            [i]: !isOpen[i]
        })
    }
    return (
        <div className="profile-page-watchlists-container">
            {watchlists && Object.values(watchlists).map(
                (watchlist,i) => (
                    <div className="profile-page-watchlists-label">
                        <button onClick={handleClick(i)} className="profile-page-watchlists-btnname">
                            <span>{watchlist.name}</span>
                        </button>
                        {isOpen[i] && 
                            <div className="profile-page-watchlists-stocks">
                                {watchlist.watchlist_stocks.length > 0 && 
                                    watchlist.watchlist_stocks.map(
                                        stock => (
                                            <div className="profile-page-watchlists-havestocks">
                                                <div>
                                                    <Link to={`/stocks/${stock.stock_symbol}`}>
                                                        <span>{stock.stock_symbol}</span>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <StockPrice symbol={stock.stock_symbol}/>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                                {watchlist.watchlist_stocks.length === 0 && 
                                    <div className="profile-page-watchlists-nostock">
                                        <h1> Feels a little empty here...</h1>
                                        <p> Search for companies to add and stay up to date</p>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                )
            )}
        </div>
    )
}

export default WatchlistTab;
