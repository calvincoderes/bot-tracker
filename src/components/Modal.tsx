import React, { useState } from 'react';
import styled from 'styled-components'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            onClose();
        }, 300); // Adjust the duration as needed
    };

    if (!isOpen && !isAnimating) {
        return null;
    }

    return (
        <StyledModalWrapper>
            <div className={`modal ${isOpen ? 'open' : ''}`}>
                <button className="modal-close" onClick={handleClose}>
                    X
                </button>
                <div className="modal-content">
                    {children}
                </div>
                <div className={`modal-overlay ${isAnimating ? 'fade' : ''}`} onClick={handleClose} />
            </div>
        </StyledModalWrapper>
    );
};


const StyledModalWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    background: #a3a3a36e;
    top: 0;
    left: 0;

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
    }
    
    .modal.open {
        opacity: 1;
        pointer-events: auto;
    }
    
    .modal-content {
        padding: 20px;
        min-width: 40vw;
        min-height: 20vh;
    }
    
    .modal-close {
        display: block;
        position: relative;
        float: right;
        font-size: 10pt;
        background: #ff6565e8;
        color: white;
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(8px);
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
    }
    
    .modal-overlay.fade {
        opacity: 1;
    }
`