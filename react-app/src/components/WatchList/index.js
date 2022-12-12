import * as watchlistAction from '../../store/watchlist'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const WatchList = () => {
    const dispatch = useDispatch(); 
    const data = useSelector(state => state.watchlists)
    // console.log(Object.values(watchlists.watchlists))
    const watchlists = Object.values(data.watchlists)

    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists())
    }, [dispatch])
    return (
        <div>
            <div>
                <div>Lists</div>
                <div>Plus button</div>
            </div>
            <div>
                {watchlists.length > 0 && watchlists.map(
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
