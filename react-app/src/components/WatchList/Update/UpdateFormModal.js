import { useEffect } from "react";
import UpdateWatchlistForm from "./watchlist_updateForm";

const UpdateFormModal = ({ watchlist, closeDropdown, openModal, closeModal }) => {
    const onClick = (e) => {
        e.stopPropagation();
        openModal(
            <UpdateWatchlistForm watchlist={watchlist} onClose={() => closeModal()} />
        );
        closeDropdown();
    };
    useEffect(() => {
        document.addEventListener('click', e => {
            closeDropdown();
        });
    });

    return (
        <button onClick={onClick} className='btn-edit'>Edit</button>
    );
}

export default UpdateFormModal;
