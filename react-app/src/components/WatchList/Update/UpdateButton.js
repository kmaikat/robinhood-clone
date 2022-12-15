import { useState } from "react";
import UpdateFormModal from "./UpdateFormModal";
import DeleteModal from "../Delete/DeleteFormModal";

const UpdateButton = ({watchlist, i, openModal, closeModal}) => {
    const [open, setOpen] = useState({});

    const handleClickBtn = (i) => (e) => {
        e.stopPropagation();
        const newOpens = {
            ...open,
            [i]: !open[i]
        };
        setOpen(newOpens);
    }

    const closeDropdown = () => {
        setOpen(false);
    };

    return (
        <div className="update-btn-main">
            <button className='btn-update' onClick={handleClickBtn(i)}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {open[i] &&
                <div className="watchlist-dropdown">
                    <div className="watchlist-dropdown-update">
                        <UpdateFormModal watchlist={watchlist} closeDropdown={closeDropdown} openModal={openModal} closeModal={closeModal} />
                    </div>
                    <div className="watchlist-dropdown-delete">
                        <DeleteModal watchlist={watchlist} closeDropdown={closeDropdown} openModal={openModal} closeModal={closeModal}/>
                    </div>
                </div>
            }
    </div>
    )
}


export default UpdateButton;
