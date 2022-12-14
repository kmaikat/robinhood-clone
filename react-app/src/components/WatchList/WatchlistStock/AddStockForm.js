import { useDispatch } from 'react-redux';
import { useState } from 'react';

const AddStockForm = ({ symbol }) => {
    const [createList, setCreateList] = useState(false);


    
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
                        WATCHLIST HERE
                    </div>
                    <button className='addstock-form-btnsave'> Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default AddStockForm;
