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
            <div>
                <div>
                    <div>Lists</div>
                </div>
                <div>
                    <button>+</button>
                </div>
            </div>
        )
    } 
    const watchlists = Object.values(data.watchlists)
    console.log(openForm)
    return (
        <div>
            <div>
                <div>
                    <div>Lists</div>
                </div>
                <div>
                    <button onClick={createWatchlist}>+</button>
                </div>
            </div>
            {openForm && <NewWatchList props={openForm} />}
            <div>
                {watchlists && watchlists.map(
                    watchlist => (
                        <div>
                            {watchlist.name}
                            <div>
                                {watchlist.watchlist_stocks.length > 0 && 
                                    watchlist.watchlist_stocks.map(stock => (
                                        <div>
                                            {stock.stock_symbol}
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
