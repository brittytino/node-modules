import React, { useEffect } from 'react';
import Modal from 'react-modal';

// Set the root element for accessibility (important for screen readers)
Modal.setAppElement('#root');

const SipModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            Modal.setAppElement('#root');
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white shadow-lg rounded-lg p-6 w-3/4 mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    &#x2715;
                </button>

                {/* Embed sip.html using iframe */}
                <iframe
                    src="/sip.html"
                    title="SIP Interface"
                    className="w-full h-[600px] border rounded"
                ></iframe>
            </div>
        </Modal>
    );
};

export default SipModal;