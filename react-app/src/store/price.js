// action types
const SET_CURRENT_PRICE = 'currentPrice/SET'
const SET_STARTING_PRICE = 'startingPrice/SET'
const SET_TERM = 'term/SET'
const SET_IS_HOVERING = 'isHovering/SET'

export const setCurrentPrice = price => {
    return {
        type: SET_CURRENT_PRICE,
        price
    }
}

export const setStartingPrice = price => ({
    type: SET_STARTING_PRICE,
    price
})

export const setTerm = term => ({
    type: SET_TERM,
    term
})

export const setIsHovering = isHovering => ({
    type: SET_IS_HOVERING,
    isHovering
})

const initialState = {
    currentPrice: 0,
    startingPrice: 0,
    term: '1D',
    isHovering: false
}

const priceReducer = ( state = initialState, action ) => {
    switch(action.type){
        case SET_CURRENT_PRICE:
            return {...state, currentPrice: action.price}
        case SET_STARTING_PRICE:
            return {...state, startingPrice: action.price}
        case SET_TERM:
            return {...state, term: action.term}
        case SET_IS_HOVERING:
            return {...state, isHovering: action.isHovering}
        default:
            return state
    }
}

export default priceReducer
