import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as watchlistAction from '../../../store/watchlist';

const AddStockForm = ({ symbol }) => {
    const dispatch = useDispatch();
    const [createList, setCreateList] = useState(false);
    const watchlists = Object.values(useSelector(state => state.watchlists));
    console.log(watchlists);

    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists());
    }, [dispatch]);

    return (
        <div className='addstock-form-container'>
            <div className='addstock-form-head'>
                <div className='addstock-form-title'>
                    Add {symbol} Your Lists
                </div>
                <div className='addstock-form-closebtn-main'>
                    <button className='addstock-form-btnclose'>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div className='addstock-form-content'>
                <div className='addstock-form-createform'>
                    <button> + </button>
                    <div>Create New List</div>
                </div>
                <form className='addstock-form-main'>
                    <div className='addstock-form-lists'>
                        {watchlists && watchlists.map((watchlist, i) =>
                            <div>
                                <input
                                    type='radio'
                                    name='watchlist'
                                    value={watchlist}
                                    id={watchlist.id}
                                />
                                <label for={watchlist.id}>{watchlist}</label>
                            </div>
                        )
                        }
                    </div>
                    <button className='addstock-form-btnsave'> Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default AddStockForm;
