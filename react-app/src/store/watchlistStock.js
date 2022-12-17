//action types
const LOAD_STOCKS = "stock/loadStocks";

export function loadStocks(stock) {
    return {
        type: LOAD_STOCKS,
        stock
    }
}

export const fetchStockPrice = (symbol) => async dispatch => {
    const url = `https://yahoo-finance-api.vercel.app/${symbol}`;
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        const currPrice = data.chart.result[0].meta.regularMarketPrice.toFixed(2);
        const prePrice = data.chart.result[0].meta.previousClose;
        const diffPercentage = (((currPrice - prePrice) / prePrice) * 100).toFixed(2);
        let info = {symbol, currPrice, prePrice, diffPercentage }
        dispatch(loadStocks(info));
        return response
    }
}


const watchlistStockReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_STOCKS:
            newState = { ...state };
            newState[action.stock.symbol] = {
                currPrice: action.stock.currPrice,
                prePrice: action.stock.prePrice,
                diffPercentage: action.stock.diffPercentage
            }
            return newState;

        default:
            return state;
    }

}

export default watchlistStockReducer;
