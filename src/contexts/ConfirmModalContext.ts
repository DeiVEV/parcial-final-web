import { createContext } from 'react';

interface ConfirmModalContextProps {
  showConfirmModal: boolean;
  onAcceptConfirmModal: () => void;
  onCancelConfirmModal: () => void;
  confirmModalMessage: string;
  confirmModalAcceptButtonLabel: string;
  confirmModalCancelButtonLabel: string;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOnAcceptConfirmModal: React.Dispatch<React.SetStateAction<() => void>>;
  setOnCancelConfirmModal: React.Dispatch<React.SetStateAction<() => void>>;
  setConfirmModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setConfirmModalAcceptButtonLabel: React.Dispatch<React.SetStateAction<string>>;
  setConfirmModalCancelButtonLabel: React.Dispatch<React.SetStateAction<string>>;
  confirmModalHandleCancel: () => void;
  confirmModalHandleAccept: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextProps>({
  showConfirmModal: false,
  onAcceptConfirmModal: () => {},
  onCancelConfirmModal: () => {},
  confirmModalMessage: '',
  confirmModalAcceptButtonLabel: 'Aceptar',
  confirmModalCancelButtonLabel: 'Cancelar',
  setShowConfirmModal: () => {},
  setOnAcceptConfirmModal: () => {},
  setOnCancelConfirmModal: () => {},
  setConfirmModalMessage: () => {},
  setConfirmModalAcceptButtonLabel: () => {},
  setConfirmModalCancelButtonLabel: () => {},
  confirmModalHandleCancel: () => {},
  confirmModalHandleAccept: () => {},
});

export default ConfirmModalContext;
