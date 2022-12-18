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
    const watchlistPresent = watchlists ? Object.keys(watchlists).length > 0 : false;
    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists());
    }, [dispatch]);

    const handleClick = (i) => (e) => {
        e.stopPropagation();
        setIsOpen({
            ...isOpen,
            [i]: !isOpen[i]
        });
    };

    return (
        <>
            {watchlistPresent ?
                <div className="profile-page-watchlists-container">
                    {watchlists && Object.values(watchlists).map(
                        (watchlist, i) => (
                            <div className="profile-page-watchlists-label" key={watchlist.id}>
                                <button onClick={handleClick(i)} className="profile-page-watchlists-btnname">
                                    <span>{watchlist.name}</span>
                                </button>
                                {isOpen[i] &&
                                    <div className="profile-page-watchlists-stocks">
                                        <div className="profile-page-watchlists-stocks-table">
                                            {watchlist.watchlist_stocks.length > 0 &&
                                                <div className="profile-page-watchlists-stocks-table-head">
                                                    <div className="tab-table-label">Symbol</div>
                                                    <div className="tab-table-label">Price</div>
                                                    <div className='tab-table-label'>Today</div>
                                                    <div className="tab-table-label"></div>
                                                </div>
                                            }
                                            {watchlist.watchlist_stocks.length > 0 &&
                                                watchlist.watchlist_stocks.map(
                                                    stock => (
                                                        <div className="profile-page-watchlists-stocks-content" key={stock.id}>
                                                            <Link to={`/stocks/${stock.stock_symbol}`} className="tab-table-content tab-link">
                                                                <div>{stock.stock_symbol}</div>
                                                            </Link>
                                                            <>
                                                                <StockPrice symbol={stock.stock_symbol} />
                                                            </>
                                                            <div className="tab-remove">
                                                                <RemoveStockBtn watchlist={watchlist} stockId={stock.id} />
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
                </div> :
                <div className="profile-no-content">
                    <h3>Any watchlists you create will show up here! <i class="fa-solid fa-rectangle-list" /></h3>
                </div>
            }
        </>
    );
};

export default WatchlistTab;
