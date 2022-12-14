import { useEffect } from "react";
import DeleteWatchlist from "./DeleteForm";

const DeleteModal = ({ watchlist, closeDropdown, openModal, closeModal }) => {
    const onClick = (e) => {
        e.stopPropagation();
        openModal(
            <DeleteWatchlist watchlist={watchlist} onClose={() => closeModal()} />
        );
        closeDropdown();
    };
    useEffect(() => {
        document.addEventListener('click', e => {
            closeDropdown();
        });
    });

    return (
        <button onClick={onClick} className='btn-edit'>Delete</button>
    );
}

export default DeleteModal;
