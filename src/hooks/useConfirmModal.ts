import ConfirmModalContext from 'contexts/ConfirmModalContext';
import { useContext } from 'react';

function useConfirmModal() {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error('useConfirmModal must be used within an ConfirmModalProvider');
  }
  return context;
}

export default useConfirmModal;
