import * as watchlistAction from '../../store/watchlist'; 
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


const UpdateWatchlistForm = () => {
    const [name, setName] = useState(''); 
    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (e) => {
        setValidationError('');
        if (name.length > 64) setValidationError('Your list name must be less than 64 characters');

        const response = await dispatch(watchlistAction.createWatchlist(name))
        .catch(async (err) => {
            setValidationError(err[0])
            if (err.response) {
                const data = await err.response.json();
            }
        });
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Edit List</div>
                    <button>Close btn</button>
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
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    );
}


export default UpdateWatchlistForm;
