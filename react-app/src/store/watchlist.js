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

export function deleteStock(info) {
    return {
        type: REMOVE_STOCK,
        info
    }
}

export const fetchUserWatchlists = () => async dispatch => {
    const response = await fetch(`/api/watchlists/current`); 
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

export const updateWatchlist = (watchlist) => async dispatch => {
    try {
        const response = await fetch(`/api/watchlists/${watchlist.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: watchlist.name })
        }); 

        if (response.ok) {
            const data = await response.json();
            dispatch(editWatchlist(data));
            console.log('response is running')
            return response;
        } else {
            console.log('something wrongggggg')
            const data = await response.json();
            if (data) {
                throw data.error.message;
            }
        }
    } catch (err) {
        throw err
    }
}

export const deleteWatchlist = (watchlistId) => async dispatch => {
    try {
        const response = await fetch(`/api/watchlists/${watchlistId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(removeWatchlist(watchlistId));
            const data = response.json(); 
            return data;
        } else {
            const data = await response.json();
            if (data) {
                throw data.error.message;
            }
        }
        
    } catch (err) {
        throw err;
    }
}

export const addStockToWatchlist = (info) => async dispatch => {
    const { watchlistId, symbol } = info;
    
    try {
        const response = await fetch(`/api/watchlists/${watchlistId}/stocks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({symbol})
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(fetchUserWatchlists());
            return response;
        } else {
            const data = await response.json();
            if (data) {
                throw data.error.message;
            }
        }
    } catch (err) {
        throw err;
    }
}

export const deleteStockFromWatchlist = (stock) => async dispatch => {
    const { watchlistId, stockId } = stock;
    try {
        const response = await fetch(`/api/watchlists/stocks/${stockId}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({stockId})
        });

        if (response.ok) {
            const data = response.json();
            dispatch(deleteStock({watchlistId, stockId }));
            return response;
        } else {
            const data = await response.json();
            if (data) {
                throw data.error.message;
            }
        }
    } catch (err) {
        throw err;
    }
}


const watchlistReducer = (state = {}, action) => {
    let newState;
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
            newState = deepCopy(state);
            newState.watchlists[action.watchlist.id] = action.watchlist;
            return newState;
        
        case EDIT_WATCHLIST:
            newState = deepCopy(state);
            const watchlist = action.watchlist;
            newState.watchlists[watchlist.id] = watchlist;
            return newState;
        
        case REMOVE_WATCHLIST:
            newState = deepCopy(state);
            delete newState.watchlists[action.watchlistId];
            return newState;
        
        case REMOVE_STOCK:
            newState = deepCopy(state);
            let { watchlistId, stockId } = action.info;
            let stocklists = newState.watchlists[watchlistId].watchlist_stocks.filter(stock => stock.id !== stockId);
            newState.watchlists[watchlistId].watchlist_stocks = stocklists;
            return newState;
        default:
            return state
    }
}

function deepCopy(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[entry[0]] = deepCopy(entry[1]);
            });
            return result;
        }
    } else {
        return value;
    }
}

export default watchlistReducer;
