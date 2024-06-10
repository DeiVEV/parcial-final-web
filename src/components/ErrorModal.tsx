import { Button, Modal } from 'flowbite-react';
import useErrorModal from 'hooks/useErrorModal';
import { HiOutlineXCircle } from 'react-icons/hi2';

const ErrorModal: React.FC = () => {
  const { showErrorModal, errorModalTitle, errorModalMessage, errorModalCloseButtonLabel, errorModalHandleClose } = useErrorModal();

  return (
    <Modal show={showErrorModal} size='lg' onClose={errorModalHandleClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <h2 className='mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200'>{errorModalTitle}</h2>
          <HiOutlineXCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>{errorModalMessage}</h3>
          <div className='flex justify-center gap-4'>
            <Button color='red' onClick={errorModalHandleClose}>
              {errorModalCloseButtonLabel}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
