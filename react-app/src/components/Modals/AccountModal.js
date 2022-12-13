import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { useModalContext } from './Modal';
import "./AccountModal.css";
const ModalContext = React.createContext();

export function AccountModal({ onClose, children }) {
    const modalNode = useModalContext();
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="account-modal">
            <div id="account-modal-background" onClick={onClose} />
            <div id="account-modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}

export default AccountModal;