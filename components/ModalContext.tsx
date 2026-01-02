import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ModalType = 'privacy' | 'terms' | null;

interface ModalContextType {
    activeModal: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = useCallback((type: ModalType) => {
        setActiveModal(type);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        document.body.style.overflow = '';
    }, []);

    return (
        <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
