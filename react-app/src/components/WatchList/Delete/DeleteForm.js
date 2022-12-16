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
            onClose();
        }
    };

    const handleClosebtn = (e) => {
        e.stopPropagation()
        onClose();
    };

    return (
        <div className='delete-container'>
            <div className='delete-head'>
                <h1>Are you sure you want to delete "{watchlist.name}" ?</h1>
                <div className='delete-btncontainer'>
                    <button className='delete-btnclose' onClick={handleClosebtn}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div className='delete-reminder'>
                <p>If you delete this list, its will be gone forever!</p>
            </div>
            {validationError && 
                <div>
                    {validationError}
                </div>
            }
            <div className='delete-btndelete-container'>
                <button className='delete-btndelete' onClick={handleDeletebtn}> Delete {watchlist.name}</button>
            </div>
        </div>
    );
}

export default DeleteWatchlist; 
