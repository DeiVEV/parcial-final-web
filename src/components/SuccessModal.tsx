import { Button, Modal } from 'flowbite-react';
import useSuccessModal from 'hooks/useSuccessModal';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

const SuccessModal: React.FC = () => {
  const { showSuccessModal, successModalMessage, successModalCloseButtonLabel, successModalHandleClose } = useSuccessModal();

  return (
    <Modal show={showSuccessModal} size='lg' onClose={successModalHandleClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineCheckCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>{successModalMessage}</h3>
          <div className='flex justify-center gap-4'>
            <Button color='green' onClick={successModalHandleClose}>
              {successModalCloseButtonLabel}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
