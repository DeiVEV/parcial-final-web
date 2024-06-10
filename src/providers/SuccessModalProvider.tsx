import SuccessModalContext from 'contexts/SuccessModalContext';
import { useState } from 'react';

interface SuccessModalProviderProps {
  children: React.ReactNode;
}

const SuccessModalProvider: React.FC<SuccessModalProviderProps> = ({ children }) => {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successModalMessage, setSuccessModalMessage] = useState<string>('');
  const [successModalCloseButtonLabel, setSuccessModalCloseButtonLabel] = useState<string>('Cerrar');
  const [onCloseSuccessModal, setOnCloseSuccessModal] = useState<() => void>(() => {});

  const successModalHandleClose = () => {
    onCloseSuccessModal();
  };

  return (
    <SuccessModalContext.Provider
      value={{
        showSuccessModal,
        successModalMessage,
        successModalCloseButtonLabel,
        onCloseSuccessModal,
        setShowSuccessModal,
        setSuccessModalMessage,
        setSuccessModalCloseButtonLabel,
        setOnCloseSuccessModal,
        successModalHandleClose,
      }}
    >
      {children}
    </SuccessModalContext.Provider>
  );
};

export default SuccessModalProvider;
