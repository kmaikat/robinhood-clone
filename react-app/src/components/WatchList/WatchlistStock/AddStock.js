import { Modal } from "../../Modals/Modal";
import { useState } from "react";
import AddStockForm from "./AddStockForm";
const AddStock = ({ symbol }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }
    return (
        <div className="addstock-container">
            {showModal && (
                <Modal>
                    <div>
                        <AddStockForm symbol={symbol} closeModal={() => setShowModal(false)} />
                    </div>
                </Modal>
            )}
            <button className="addstock-btn" onClick={handleClick}>Add to lists</button>
        </div>
    )
}

export default AddStock;
