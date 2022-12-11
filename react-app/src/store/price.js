// action types
const SET_PRICE = 'price/SET'

export const setPrice = price => ({
    type: SET_PRICE,
    price
})

const initialState = 0

const priceReducer = ( state = initialState, action ) => {
    switch(action.type){
        case SET_PRICE:
            return action.price || 0
        default:
            return state
    }
}

export default priceReducer
