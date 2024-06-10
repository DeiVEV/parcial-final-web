import { Button, Modal } from 'flowbite-react';
import useConfirmModal from 'hooks/useConfirmModal';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

const ConfirmModal: React.FC = () => {
  const {
    showConfirmModal,
    confirmModalMessage,
    confirmModalAcceptButtonLabel,
    confirmModalCancelButtonLabel,
    confirmModalHandleCancel,
    confirmModalHandleAccept,
  } = useConfirmModal();

  return (
    <Modal show={showConfirmModal} size='md' onClose={confirmModalHandleCancel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>{confirmModalMessage}</h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={confirmModalHandleAccept}>
              {confirmModalAcceptButtonLabel}
            </Button>
            <Button color='gray' onClick={confirmModalHandleCancel}>
              {confirmModalCancelButtonLabel}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
