import { createContext } from 'react';

interface ErrorModalContextProps {
  showErrorModal: boolean;
  errorModalTitle: string;
  errorModalMessage: string;
  errorModalCloseButtonLabel: string;
  onCloseErrorModal: () => void;
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalCloseButtonLabel: React.Dispatch<React.SetStateAction<string>>;
  setOnCloseErrorModal: React.Dispatch<React.SetStateAction<() => void>>;
  errorModalHandleClose: () => void;
}

const ErrorModalContext = createContext<ErrorModalContextProps>({
  showErrorModal: false,
  errorModalTitle: '',
  errorModalMessage: '',
  errorModalCloseButtonLabel: 'Cerrar',
  onCloseErrorModal: () => {},
  setShowErrorModal: () => {},
  setErrorModalTitle: () => {},
  setErrorModalMessage: () => {},
  setErrorModalCloseButtonLabel: () => {},
  setOnCloseErrorModal: () => {},
  errorModalHandleClose: () => {},
});

export default ErrorModalContext;
