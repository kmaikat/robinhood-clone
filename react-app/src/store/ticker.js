// action types
const SET_SYMBOL = 'symbol/SET'

export const setSymbol = (symbol, name) => ({
    type: SET_SYMBOL,
    symbol,
    name
})

const initialState = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
}

const tickerReducer = ( state = initialState, action ) => {
    switch(action.type){
        case SET_SYMBOL:
            return {symbol: action.symbol, name: action.name}
        default:
            return state
    }
}

export default tickerReducer
