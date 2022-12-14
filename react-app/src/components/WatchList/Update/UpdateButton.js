import { useState } from "react";
import UpdateFormModal from "./UpdateFormModal";
import DeleteModal from "../Delete/DeleteFormModal";

const UpdateButton = ({watchlist,i}) => {
    const [open, setOpen] = useState({});

    const handleClickBtn = (i) => (e) => {
        e.stopPropagation();
        const newOpens = {
            ...open,
            [i]: !open[i]
        };
        setOpen(newOpens);
    }
    return (
        <div className="update-btn-main">
            <button className='btn-update' onClick={handleClickBtn(i)}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {open[i] && 
                <div className="watchlist-dropdown">
                    <div>
                        <UpdateFormModal watchlist={watchlist} />
                    </div>
                    <div>
                        <DeleteModal watchlist={watchlist}/>
                    </div>
                </div>
            }
    </div>
    )
}


export default UpdateButton;
