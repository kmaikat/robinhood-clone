import { useState } from "react";
import { Modal } from "../../Modals/Modal";
import DeleteWatchlist from "./DeleteForm";

const DeleteModal = ({watchlist}) => {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <button onClick={() => setShowModal(true)} className='btn-edit'>Delete</button>
            {showModal && (
                <Modal>
                    <DeleteWatchlist watchlist={watchlist} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default DeleteModal;
