import SuccessModalContext from 'contexts/SuccessModalContext';
import { useContext } from 'react';

function useSuccessModal() {
  const context = useContext(SuccessModalContext);
  if (!context) {
    throw new Error('useSuccessModal must be used within an SuccessModalProvider');
  }
  return context;
}

export default useSuccessModal;
