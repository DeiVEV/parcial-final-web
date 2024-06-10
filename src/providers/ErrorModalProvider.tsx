import ErrorModalContext from 'contexts/ErrorModalContext';
import { useState } from 'react';

interface ErrorModalProviderProps {
  children: React.ReactNode;
}

const ErrorModalProvider: React.FC<ErrorModalProviderProps> = ({ children }) => {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorModalTitle, setErrorModalTitle] = useState<string>('');
  const [errorModalMessage, setErrorModalMessage] = useState<string>('');
  const [errorModalCloseButtonLabel, setErrorModalCloseButtonLabel] = useState<string>('Cerrar');
  const [onCloseErrorModal, setOnCloseErrorModal] = useState<() => void>(() => {});

  const errorModalHandleClose = () => {
    onCloseErrorModal();
  };

  return (
    <ErrorModalContext.Provider
      value={{
        showErrorModal,
        errorModalTitle,
        errorModalMessage,
        errorModalCloseButtonLabel,
        onCloseErrorModal,
        setShowErrorModal,
        setErrorModalTitle,
        setErrorModalMessage,
        setErrorModalCloseButtonLabel,
        setOnCloseErrorModal,
        errorModalHandleClose,
      }}
    >
      {children}
    </ErrorModalContext.Provider>
  );
};

export default ErrorModalProvider;
