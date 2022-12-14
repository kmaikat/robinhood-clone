import * as watchlistAction from '../../../store/watchlist'; 
import { useDispatch } from 'react-redux';
import { useState, useSelector } from 'react';


const DeleteWatchlist = ({ watchlist, onClose }) => {
    const dispatch = useDispatch();
    const [validationError, setValidationError] = useState(''); 
    
    const handleDeletebtn = async (e) => {
        e.stopPropagation();
        setValidationError('');
        const response = await dispatch(watchlistAction.deleteWatchlist(watchlist.id))
            .catch(async (err) => {
                return setValidationError(err[0])
            });
        if (response) {
            console.log('running')
            onClose();
        }
    };

    const handleClosebtn = (e) => {
        e.stopPropagation()
        onClose();
    };

    return (
        <div>
            <div>
                <div>
                    <h2>Are you sure you want to delete {watchlist.name} ?</h2>
                </div>
                <div>
                    <button onClick={handleClosebtn}>Close btn</button>
                </div>
            </div>
            <div>
                <p>If you delete this list, its will be gone forever!</p>
            </div>
            {validationError && 
                <div>
                    {validationError}
                </div>
            }
            <div>
                <button onClick={handleDeletebtn}> Delete {watchlist.name}</button>
            </div>
        </div>
    );
}

export default DeleteWatchlist; 
