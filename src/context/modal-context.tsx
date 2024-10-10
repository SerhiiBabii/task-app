import { createContext, useState, useContext, ReactNode, FC } from 'react';
import { Task } from '../models/task';
import { ModalTypes } from '../models/modal';

export type ModalType = ModalTypes | null;

interface ModalContextProps {
  isOpen: boolean;
  modalType: ModalType;
  modalData: Task | null;
  handleOpenModal: (type: ModalType, taskData?: Task) => void;
  handleCloseModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  modalType: null,
  modalData: null,
  handleOpenModal: (_type: ModalType, _taskData?: Task) => {},
  handleCloseModal: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<Task | null>(null);

  const handleOpenModal = (type: ModalType, taskData?: Task) => {
    setIsOpen(true);
    setModalType(type);
    setModalData(taskData || null);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalType(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalType,
        modalData,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
