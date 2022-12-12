import * as watchlistAction from '../../store/watchlist'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NewWatchList from './watchlist_form';
const WatchList = () => {
    const dispatch = useDispatch(); 
    const data = useSelector(state => state.watchlists)
    
   
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists())
    }, [dispatch])
    const createWatchlist = () => {
        console.log('im running')
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
    const watchlists = Object.values(data.watchlists)
    // console.log(openForm)
    return (
        <div className='watchlist-container'>
            <div className='watchlist-header'>
                <div>
                    <div>Lists</div>
                </div>
                <div>
                    <button onClick={createWatchlist}>+</button>
                </div>
            </div>
            {openForm && <NewWatchList openForm={openForm} setOpenForm={setOpenForm} />}
            <div className='watchlist-lists'>
                {watchlists && watchlists.map(
                    watchlist => (
                        <div className='watchlist-content'>
                            <div className='watchlist-content-header'>
                                <div>
                                    icon
                                </div>
                                <div className='watchlist-name'>
                                    {watchlist.name}
                                </div>
                                <div>
                                    <button>+</button>
                                </div>
                            </div>
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
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default WatchList
