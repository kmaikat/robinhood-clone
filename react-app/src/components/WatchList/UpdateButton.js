import { useState } from "react";

const UpdateButton = ({watchlist,i}) => {
    const [open, setOpen] = useState({});

    const handleClickBtn = (i) => () => {
        const newOpens = {
            ...open,
            [i]: !open[i]
        };
        setOpen(newOpens);
    }
    return (
        <div className="update-btn-main">
            <button className='btn-update' onClick={handleClickBtn(i)}>
                Edit
            </button>
            {open[i] && 
                <div>
                    <div>Edit {watchlist.id}</div>
                    <div>Delete</div>
                </div>
            }
    </div>
    )
}


export default UpdateButton;
