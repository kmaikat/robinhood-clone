import * as watchlistAction from '../../store/watchlist'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NewWatchList from './watchlist_form';
import './index.css';

const WatchList = () => {
    const dispatch = useDispatch(); 
    const data = useSelector(state => state.watchlists);
    const [openForm, setOpenForm] = useState(false);
    const [openings, setOpenings] = useState({});

    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists())
    }, [dispatch]);

    const createWatchlist = () => {
        setOpenForm(true);
    }
    if (!data.watchlists) {
        return (
            <div className='watchlist-container'>
                <div className='watchlist-header'>
                    <div>
                        <div>Lists</div>
                    </div>
                    <div>
                        <button>+</button>
                    </div>
                </div>
            </div>
        )
    } 

    const watchlists = Object.values(data.watchlists);

    const handleClickBtn = (i) => () => {
        const newOpenings = {
            ...openings,
            [i]: !openings[i]
        };
        setOpenings(newOpenings);
    };

    return (
        <div className='watchlist-container'>
            <header>
                <div className='watchlist-header'>
                    <span>Lists</span>
                    <button className='btn-open' onClick={createWatchlist}>+</button>
                </div>
            </header>
            {openForm && <NewWatchList openForm={openForm} setOpenForm={setOpenForm} />}
            <div className='watchlist-lists'>
                {watchlists && watchlists.map(
                    (watchlist, i) => (
                        <div className='watchlist-content'>
                            <div className='watchlist-content-header'>
                                <div className='watchlist-wrapper-head'>
                                    <div className='icon'>
                                        💡
                                    </div>
                                    <div className='watchlist-name'>
                                        {watchlist.name}
                                    </div>
                                </div>
                                <div>
                                    <div className='btn-openstock' onClick={handleClickBtn(i)}>
                                        {openings[i] ? <span>V</span> : <span>Λ</span>}
                                    </div>
                                </div>
                            </div>
                            {openings[i] &&
                                <div className='watchlist-stocks-container'>
                                    {watchlist.watchlist_stocks.length > 0 &&
                                        watchlist.watchlist_stocks.map(stock => (
                                            <div className='watchlist-stocks-content'>
                                                <div className='watchlist-stocksymbol'>
                                                    {stock.stock_symbol}
                                                </div>
                                                <div className='watchlist-minigraph'>
                                                    Graph here
                                                </div>
                                                <div className='watchlist-stockprice'>
                                                    <div>stock price</div>
                                                    <div>stock change</div>
                                                </div>
                                            </div>
                                    
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default WatchList
