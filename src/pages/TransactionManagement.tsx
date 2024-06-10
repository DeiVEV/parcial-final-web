import { Button, Card, Label, Modal, Select, Textarea, TextInput } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import useErrorModal from 'hooks/useErrorModal';
import useSuccessModal from 'hooks/useSuccessModal';
import AccountsNotFound from 'pages/AccountsNotFound';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { FaCoins, FaDollarSign, FaHandHoldingDollar } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import { RiLockPasswordFill } from 'react-icons/ri';
import { getBankAccounts } from 'utils/bankAccounts';
import { getTransactions, saveTransactions } from 'utils/transactions';

import type { BankAccount, IncomeType, Transaction, TransactionType } from '@~types/common';

const TransactionManagement: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const { setShowErrorModal, setErrorModalTitle, setErrorModalMessage, setErrorModalCloseButtonLabel, setOnCloseErrorModal } = useErrorModal();
  const { setShowSuccessModal, setSuccessModalMessage, setSuccessModalCloseButtonLabel, setOnCloseSuccessModal } = useSuccessModal();

  const [transactionType, setTransactionType] = useState<TransactionType | null>(null);
  const [transactionIncomeType, setTransactionIncomeType] = useState<IncomeType | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<number | null>(null);
  const [transactionAccountNumber, setTransactionAccountNumber] = useState<string | null>(null);
  const [transactionDescription, setTransactionDescription] = useState<string>('');
  const [userAccounts, setUserAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleTransactionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTransactionType(e.target.value.trim() as TransactionType);
  const handleTransactionIncomeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTransactionIncomeType(e.target.value.trim() as IncomeType);
  const handleTransactionAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => setTransactionAmount(+e.target.value);
  const handleTransactionAccountNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTransactionAccountNumber(e.target.value.trim());
  const handleTransactionDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTransactionDescription(e.target.value.trim());
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value.trim());
  const handleCloseConfirmPasswordModal = () => setShowConfirmPasswordModal(false);

  const handleShowSuccessModal = (message: string) => {
    setSuccessModalMessage(message);
    setSuccessModalCloseButtonLabel('Aceptar');
    setOnCloseSuccessModal(() => () => setShowSuccessModal(false));
    setShowSuccessModal(true);
  };

  const handleShowErrorModal = (message: string) => {
    setErrorModalTitle('Error al crear la transacción');
    setErrorModalMessage(message);
    setErrorModalCloseButtonLabel('Cerrar');
    setOnCloseErrorModal(() => () => setShowErrorModal(false));
    setShowErrorModal(true);
  };

  const saveTransaction = () => {
    if (!transactionType || !transactionIncomeType || !transactionAmount || !transactionAccountNumber) {
      handleShowErrorModal('Por favor, complete todos los campos');
      return;
    } else if (transactionAmount < 50_000) {
      handleShowErrorModal('El valor de la transacción debe ser mayor a $50.000.');
      return;
    } else if (transactionDescription && (transactionDescription.length < 10 || transactionDescription.length > 500)) {
      handleShowErrorModal('La descripción debe tener entre 10 y 500 caracteres');
      return;
    } else if (!transactionDescription) {
      setTransactionDescription('No hay descripción');
    }

    const storedTransactions = getTransactions(user.id);
    const transactionWithGreaterId = storedTransactions.reduce((prev, current) => (prev.transactionId > current.transactionId ? prev : current), {
      transactionId: 0,
    });

    const newTransaction: Transaction = {
      transactionId: transactionWithGreaterId.transactionId + 1,
      transactionType,
      transactionIncomeType,
      transactionAmount,
      transactionDate: new Date().toISOString(),
      transactionAccountNumber,
      transactionDescription,
      userId: user.id,
    };

    setLoading(true);
    setTimeout(() => {
      storedTransactions.push(newTransaction);
      saveTransactions(user.id, storedTransactions);
      handleShowSuccessModal('Transacción realizada correctamente.');
      setLoading(false);
    }, 2_000);
  };

  const verifyPassword = () => {
    if (!confirmPassword) {
      handleCloseConfirmPasswordModal();
      setConfirmPassword('');
      handleShowErrorModal('Debe ingresar su contraseña para verificar su identidad.');
      return;
    }

    if (confirmPassword !== user.password) {
      handleCloseConfirmPasswordModal();
      setConfirmPassword('');
      handleShowErrorModal('La contraseña ingresada no coincide con la registrada en su cuenta.');
      return;
    }

    saveTransaction();
    handleCloseConfirmPasswordModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmPasswordModal(true);
  };

  const LoadingSpinner = <AiOutlineLoading className='h-6 w-6 animate-spin' />;

  useEffect(() => {
    const storedBankAccounts = getBankAccounts(user.id);
    setUserAccounts(storedBankAccounts);
  }, [user.id]);

  if (!userAccounts.length) {
    return <AccountsNotFound />;
  }

  return (
    <main className='container mx-auto flex-grow p-4'>
      <h1 className='text-center text-4xl font-bold'>Agregar Transacción</h1>
      <Card className='mx-auto mt-4 max-w-2xl p-4'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='types' value='Tipo de transacción' />
              </div>
              <Select
                id='types'
                icon={FaCoins}
                value={!transactionType ? 'Seleccione un tipo' : transactionType}
                onChange={handleTransactionTypeChange}
                shadow
                required
              >
                <option disabled>Seleccione un tipo</option>
                <option value='Pago de nómina'>Pago de nómina</option>
                <option value='Pago de servicios'>Pago de servicios</option>
                <option value='Pago de impuestos'>Pago de impuestos</option>
                <option value='Pago de proveedores'>Pago de proveedores</option>
                <option value='Pago de préstamo'>Pago de préstamo</option>
              </Select>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='incomeTypes' value='Tipo de ingreso o egreso asociado' />
              </div>
              <Select
                id='incomeTypes'
                icon={FaHandHoldingDollar}
                value={!transactionIncomeType ? 'Seleccione un tipo' : transactionIncomeType}
                onChange={handleTransactionIncomeTypeChange}
                shadow
                required
              >
                <option disabled>Seleccione un tipo</option>
                <option value='Pasivo'>Pasivo</option>
                <option value='Activo'>Activo</option>
                <option value='Patrimonio'>Patrimonio</option>
                <option value='Corriente'>Corriente</option>
                <option value='Capital'>Capital</option>
              </Select>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='amount' value='Valor de la transacción' />
              </div>
              <TextInput
                type='number'
                id='amount'
                icon={FaDollarSign}
                placeholder='10.000.000'
                min={50_000}
                value={transactionAmount ? transactionAmount.toString() : ''}
                onChange={handleTransactionAmountChange}
                helperText='El saldo debe ser mayor a $50.000'
                shadow
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='accounts' value='Cuenta bancaria relacionada' />
              </div>
              <Select
                id='accounts'
                icon={FaHandHoldingDollar}
                value={!transactionAccountNumber ? 'Seleccione una cuenta' : transactionAccountNumber}
                onChange={handleTransactionAccountNumberChange}
                shadow
                required
              >
                <option disabled>Seleccione una cuenta</option>
                {userAccounts.map((account) => (
                  <option key={account.accountNumber} value={account.accountNumber}>
                    {account.accountNumber}
                  </option>
                ))}
              </Select>
            </div>

            <div className='col-span-full'>
              <div className='mb-2 block'>
                <Label htmlFor='description' value='Descripción' />
              </div>
              <Textarea
                id='description'
                placeholder='Pago de salario, compra de alimentos, pago de transporte, etc…'
                rows={4}
                className='min-h-10'
                value={transactionDescription}
                minLength={10}
                maxLength={500}
                helperText='(opcional) Mínimo 10 caracteres, máximo 500 caracteres'
                onChange={handleTransactionDescriptionChange}
                shadow
              />
            </div>
          </div>
          <Button type='submit' isProcessing={loading} processingSpinner={LoadingSpinner} className='mt-4 w-full'>
            <FaSave className='mr-2 h-5 w-5' /> Guardar
          </Button>
        </form>
      </Card>

      <Modal show={showConfirmPasswordModal} size='xl' onClose={handleCloseConfirmPasswordModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='text-lg font-normal text-gray-500 dark:text-gray-400'>Para realizar esta acción, necesitamos verificar tu contraseña.</h3>
            <TextInput
              type='password'
              icon={RiLockPasswordFill}
              placeholder='Contraseña'
              className='mx-auto my-5 w-full max-w-md'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              shadow
              required
            />
            <div className='flex justify-center gap-4'>
              <Button color='green' onClick={verifyPassword}>
                Verificar
              </Button>
              <Button color='red' onClick={handleCloseConfirmPasswordModal}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default TransactionManagement;
