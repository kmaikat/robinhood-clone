import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as watchlistAction from '../../../store/watchlist';
import NewWatchList from '../watchlist_form';

const AddStockForm = ({ symbol, closeModal }) => {
    const dispatch = useDispatch();
    const [checkedLists, setCheckedLists] = useState([]);
    const watchlists = useSelector(state => state.watchlists.watchlists);
    const [openForm, setOpenForm] = useState(false);
    useEffect(async () => {
        dispatch(watchlistAction.fetchUserWatchlists());
    }, [dispatch]);
    
    const handleSubmit = () => {
    
        checkedLists.forEach(element => {
            if (!element.watchlist_stocks.some(stock => stock.stock_symbol === symbol)) {
                const watchlistId = element.id;
                dispatch(watchlistAction.addStockToWatchlist({ watchlistId, symbol }));
                closeModal();
            }
        });
    };

    const createWatchlist = () => {
        setOpenForm(true);
    };

    const closeForm = (e) => {
        closeModal();
    };
    
    function isValid() {
        return checkedLists.some(element => !element.watchlist_stocks.some(stock => stock.stock_symbol === symbol));
    }

    const handleChange = (watchlist) => (e) => {
        if (e.target.checked) {
            const list = [...checkedLists];
            list.push(watchlist);
            setCheckedLists(list);
        } else {
            setCheckedLists(checkedLists.filter(element => element.id !== watchlist.id));
        }
    };

    return (
        <div className='addstock-form-container'>
            <div className='addstock-form-head'>
                <div className='addstock-form-title'>
                    Add {symbol} to Your Lists 
                </div>
                <div className='addstock-form-closebtn-main'>
                    <button className='addstock-form-btnclose' onClick={closeForm}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div className='addstock-form-content'>
                <div className='addstock-form-createform'>
                    <div></div>
                    <button className='addstock-form-btnopen' onClick={createWatchlist}><i className="fa-solid fa-plus"></i></button>
                    <div className='addstock-form-createtitle'>Create New List </div>
                </div>
                <div className='addstock-form-newlist'>
                    {openForm && 
                         <div>
                            <NewWatchList openForm={openForm} setOpenForm={setOpenForm} />
                        </div>
                    }
                </div>
                <div className='addstock-form-main'>
                    <div className='addstock-form-lists'>
                        { watchlists && Object.values(watchlists).map((watchlist, i) =>
                            <div key={watchlist.id} className='addstock-form-check'>
                                <input
                                    type='checkbox'
                                    name='watchlist'
                                    value={watchlist.id}
                                    onChange={handleChange(watchlist)}
                                    id={watchlist.id}
                                />
                                <div className='addstock-icon'>
                                    <img src="https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"/>
                                </div>
                                <label for={watchlist.id}>{watchlist.name}</label>
                            </div>
                        )
                        }
                    </div>
                    {isValid() ? <button className='addstock-form-btnsave'  onClick={handleSubmit}> Save Changes</button> :
                    <button className='addstock-form-btnsave' type='submit' disabled> Save Changes</button>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default AddStockForm;
