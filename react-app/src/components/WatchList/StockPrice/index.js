import { useEffect } from "react";
import * as stockReducer from '../../../store/watchlistStock';
import { useDispatch, useSelector } from "react-redux";

const StockPrice = ({ symbol }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.watchlistStocks[symbol]);
    console.log(data)
    useEffect(() => {
        dispatch(stockReducer.fetchStockPrice(symbol));
    }, [dispatch]);

    return (
        <div>
            {data &&
                <div>
                    <div>
                        ${data.currPrice}
                    </div>
                    <div>
                        {data.diffPercentage}%
                    </div>
                </div>
            }
        </div>
    );
}

export default StockPrice
