import { useState } from "react";
import { Modal } from "../Modals/Modal";
import UpdateWatchlistForm from "./watchlist_updateForm";

const UpdateFormModal = () => {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <button onClick={() => setShowModal(true)} className='btn-edit'>Edit</button>
            {showModal && (
                <Modal>
                    <UpdateWatchlistForm onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default UpdateFormModal;
