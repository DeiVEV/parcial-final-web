import ErrorModalContext from 'contexts/ErrorModalContext';
import { useContext } from 'react';

function useErrorModal() {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error('useErrorModal must be used within an ErrorModalProvider');
  }
  return context;
}

export default useErrorModal;
