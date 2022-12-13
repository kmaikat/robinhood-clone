import { useState } from "react";
import UpdateFormModal from "./UpdateFormModal";
import DeleteModal from "../Delete/DeleteFormModal";

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
