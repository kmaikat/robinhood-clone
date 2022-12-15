import { useEffect, useState } from "react";
import * as watchlistAction from '../../store/watchlist';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        <div>
            {watchlists && Object.values(watchlists).map(
                (watchlist,i) => (
                    <div>
                        <button onClick={handleClick(i)}>
                            <span>{watchlist.name}</span>
                        </button>
                        {isOpen[i] && 
                            <div>
                                {watchlist.watchlist_stocks.length > 0 && 
                                    watchlist.watchlist_stocks.map(
                                        stock => (
                                            <Link to={`/stocks/${stock.stock_symbolß}`}>
                                                <span>{stock.stock_symbol}</span>
                                            </Link>
                                        )
                                    )
                                }
                                {watchlist.watchlist_stocks.length === 0 && 
                                    <div>
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
