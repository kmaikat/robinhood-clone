import * as watchlistAction from '../../store/watchlist'; 
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const NewWatchList = (openForm) => {
    const [name, setName] = useState('');
    const [validationError, setValidationError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError([]);
        if (name.length > 64) {
            setValidationError('Your list name must be less than 64 characters')
            return (
                <div>
                    <div>icon</div>
                    <div>{validationError }</div>
                </div>
            )
        }
    
        dispatch(watchlistAction.createWatchlist(name))
            .then((res) => { const data = res; })
            .catch(async (res) => {
                const data = await res.json(); 
                if (data.errors) {
                    setValidationError(data.errors.message)
                } else { 
                    setValidationError(data[0])
                }
            })

    }

    const handleCancelButton = (e) => {
        e.preventDefault()
    }    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>icon</div>
                    <div>
                        <label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName = e.target.value}
                                placeholder='List Name'
                            />
                        </label>
                    </div>
                    <div>
                        <button type='submit'>Create List</button>
                        <button onClick={handleCancelButton}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewWatchList
