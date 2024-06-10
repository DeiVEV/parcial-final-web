import { createContext } from 'react';

interface SuccessModalContextProps {
  showSuccessModal: boolean;
  successModalMessage: string;
  successModalCloseButtonLabel: string;
  onCloseSuccessModal: () => void;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setSuccessModalCloseButtonLabel: React.Dispatch<React.SetStateAction<string>>;
  setOnCloseSuccessModal: React.Dispatch<React.SetStateAction<() => void>>;
  successModalHandleClose: () => void;
}

const SuccessModalContext = createContext<SuccessModalContextProps>({
  showSuccessModal: false,
  successModalMessage: '',
  successModalCloseButtonLabel: 'Cerrar',
  onCloseSuccessModal: () => {},
  setShowSuccessModal: () => {},
  setSuccessModalMessage: () => {},
  setSuccessModalCloseButtonLabel: () => {},
  setOnCloseSuccessModal: () => {},
  successModalHandleClose: () => {},
});

export default SuccessModalContext;
