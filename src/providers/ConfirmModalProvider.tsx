import ConfirmModalContext from 'contexts/ConfirmModalContext';
import { useState } from 'react';

interface ConfirmModalProviderProps {
  children: React.ReactNode;
}

const ConfirmModalProvider: React.FC<ConfirmModalProviderProps> = ({ children }) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [onAcceptConfirmModal, setOnAcceptConfirmModal] = useState<() => void>(() => {});
  const [onCancelConfirmModal, setOnCancelConfirmModal] = useState<() => void>(() => {});
  const [confirmModalMessage, setConfirmModalMessage] = useState<string>('');
  const [confirmModalAcceptButtonLabel, setConfirmModalAcceptButtonLabel] = useState<string>('Aceptar');
  const [confirmModalCancelButtonLabel, setConfirmModalCancelButtonLabel] = useState<string>('Cancelar');

  const confirmModalHandleCancel = () => {
    onCancelConfirmModal();
  };

  const confirmModalHandleAccept = () => {
    onAcceptConfirmModal();
  };

  return (
    <ConfirmModalContext.Provider
      value={{
        showConfirmModal,
        onAcceptConfirmModal,
        onCancelConfirmModal,
        confirmModalMessage,
        confirmModalAcceptButtonLabel,
        confirmModalCancelButtonLabel,
        setShowConfirmModal,
        setOnAcceptConfirmModal,
        setOnCancelConfirmModal,
        setConfirmModalMessage,
        setConfirmModalAcceptButtonLabel,
        setConfirmModalCancelButtonLabel,
        confirmModalHandleCancel,
        confirmModalHandleAccept,
      }}
    >
      {children}
    </ConfirmModalContext.Provider>
  );
};

export default ConfirmModalProvider;
