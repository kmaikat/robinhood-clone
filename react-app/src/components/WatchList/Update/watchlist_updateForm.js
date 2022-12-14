import * as watchlistAction from '../../../store/watchlist'; 
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


const UpdateWatchlistForm = ({watchlist, onClose}) => {
    const id = watchlist.id;
    const [name, setName] = useState(watchlist.name); 
    const [validationError, setValidationError] = useState([]);
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');
        if (name.length > 64) {
            return setValidationError('Your list name must be less than 64 characters');
        }
        console.log('im line 14 handle submit')
        const response = await dispatch(watchlistAction.updateWatchlist({name, id}))
        .catch(async (err) => {
            setValidationError(err[0])
            if (err.response) {
                const data = await err.response.json();
            }
        });
        if (response) {
            onClose()
        }
    }
    const handleClose = (e) => {
        e.stopPropagation()
        onClose();
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Edit List</div>
                    <button className='btn-close' onClick={handleClose}>X</button>
                </div>
                <div>
                    <div>Icon</div>
                    <label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='List Name'
                            required
                        />
                    </label>
                </div>
                {validationError && 
                    <div>
                        {validationError}
                    </div>
                }
                <div>
                    <button type='submit' className='btn-save'>Save</button>
                </div>
            </form>
        </div>
    );
}


export default UpdateWatchlistForm;
