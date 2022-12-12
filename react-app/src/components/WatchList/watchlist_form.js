import * as watchlistAction from '../../store/watchlist'; 
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const NewWatchList = ({openForm, setOpenForm}) => {
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
    
        const response = await dispatch(watchlistAction.createWatchlist(name))
            .catch(async (err) => {
                setValidationError(err[0])
                if (err.response) {
                    const data = await err.response.json();
                }
            });
        setName('');
        setOpenForm(false)

    }

    const handleCancelButton = (e) => {
        openForm === false ? setOpenForm(true):setOpenForm(false)
    }    
    return (
        <div className='newform-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    {validationError && <li>{validationError}</li>}
                </div>
                <div className='newform-content'>
                    <div>icon</div>
                    <div className='newform-info'>
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
                    <div className='newform-button'>
                        <button onClick={handleCancelButton}>Cancel</button>
                        <button type='submit'>Create List</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewWatchList
