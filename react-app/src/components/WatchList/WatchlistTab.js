import { useEffect, useState } from "react";
import * as watchlistAction from '../../store/watchlist';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StockPrice from "./StockPrice";
import RemoveStockBtn from "./Delete/RemoveStock";

const WatchlistTab = () => {
    const dispatch = useDispatch();
    const watchlists = useSelector(state => state.watchlists.watchlists);
    const [isOpen, setIsOpen] = useState({});

    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists());
    }, [dispatch])

    const handleClick = (i) => (e) => {
        e.stopPropagation();
        setIsOpen({
            ...isOpen,
            [i]: !isOpen[i]
        })
    }
    console.log('rerendering');

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
                                <div className="profile-page-watchlists-stocks-table">
                                    {watchlist.watchlist_stocks.length > 0 &&
                                        watchlist.watchlist_stocks.map(
                                            stock => (
                                                <div>
                                                    <div className="profile-page-watchlists-stocks-table-head">
                                                        <div>Symbol</div>
                                                        <div>Price</div>
                                                        <div>Delete</div>
                                                    </div>
                                                    <div className="profile-page-watchlists-stocks-content">
                                                    
                                                        <Link to={`/stocks/${stock.stock_symbol}`}>
                                                            <div>{stock.stock_symbol}</div>
                                                        </Link>
                                                        <div>
                                                            <StockPrice symbol={stock.stock_symbol}/>
                                                        </div>
                                                        <div>
                                                            <RemoveStockBtn watchlist={watchlist} stockId={stock.id} />
                                                        </div>
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
                            </div>
                        }
                    </div>
                )
            )}
        </div>
    )
}

export default WatchlistTab;
