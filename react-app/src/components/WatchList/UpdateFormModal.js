import { useState } from "react";
import { Modal } from "../Modals/Modal";
import UpdateWatchlistForm from "./Update/watchlist_updateForm";

const UpdateFormModal = ({watchlist}) => {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <button onClick={() => setShowModal(true)} className='btn-edit'>Edit</button>
            {showModal && (
                <Modal>
                    <UpdateWatchlistForm watchlist={watchlist} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default UpdateFormModal;
