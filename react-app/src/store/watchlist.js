//action types 
const LOAD_WATCHLISTS = "watchlist/loadWatchlists";
const ADD_WATCHLIST = "watchlist/addWatchlist"; 
const REMOVE_WATCHLIST = "watchlist/removeWatchlist";
const EDIT_WATCHLIST = "watchlist/editWatchlist";
const ADD_STOCK = "watchlist/addStock";
const REMOVE_STOCK = "watchlist/removeStock";

export function loadWatchlists(watchlists) {
    return {
        type: LOAD_WATCHLISTS, 
        watchlists
    }
}

export function addWatchlist(watchlist) {
    return {
        type: ADD_WATCHLIST, 
        watchlist
    }
}

export function removeWatchlist(watchlistId) {
    return {
        type: REMOVE_WATCHLIST, 
        watchlistId
    }
}

export function editWatchlist(watchlist) {
    return {
        type: EDIT_WATCHLIST, 
        watchlist
    }
}

export function addStock(stock) {
    return {
        type: ADD_STOCK, 
        stock
    }
}

export function deleteStock(stockId) {
    return {
        type: REMOVE_STOCK,
        stockId
    }
}

export const fetchUserWatchlists = () => async dispatch => {
    const response = await fetch(`api/watchlists/current`); 

    if (response.ok) {
        const data = await response.json();
        dispatch(loadWatchlists(data.watchlists)); 
        return response
    }
    
}

export const createWatchlist = (watchlist) => async dispatch => {
    try {
        const response = await fetch(`/api/watchlists/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: watchlist })
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(addWatchlist(data));
            return response;
        
        } else {
            const data = await response.json();
            if (data) {
                throw data.error.name;
            } else {
                throw ['An error occurred. Please try again.'];
            }
        }
    } catch (err) {
        throw err
    }
};

const watchlistReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_WATCHLISTS:
            return {
                ...state,
                watchlists: action.watchlists.reduce(
                    (watchlistsById, watchlist) => ({
                        ...watchlistsById,
                        [watchlist.id]: watchlist,
                     }),
                    {}
                    ),
            };
        case ADD_WATCHLIST:
            let newState = { ...state };
            newState.watchlists[action.watchlist.id] = action.watchlist;
            return newState;
        default: 
            return state
    }
}

export default watchlistReducer;
