import { Button, Table } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import useConfirmModal from 'hooks/useConfirmModal';
import AccountsNotFound from 'pages/AccountsNotFound';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBankAccounts, saveBankAccounts } from 'utils/bankAccounts';

import type { BankAccount } from '@~types/common';

const AccountTypeColors = {
  corriente: 'text-blue-400 dark:text-blue-500',
  ahorro: 'text-green-400 dark:text-green-500',
};

const AccountStateColors = {
  activa: 'text-green-400 dark:text-green-500',
  inactiva: 'text-yellow-400 dark:text-yellow-500',
  cerrada: 'text-red-400 dark:text-red-500',
};

const IncomeTypeColors = {
  pasivo: 'text-sky-700 dark:text-sky-700',
  activo: 'text-yellow-300 dark:text-yellow-300',
  patrimonio: 'text-green-500 dark:text-green-500',
  corriente: 'text-blue-500 dark:text-blue-500',
  capital: 'text-red-500 dark:text-red-500',
};

const History: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const {
    setShowConfirmModal,
    setConfirmModalMessage,
    setConfirmModalAcceptButtonLabel,
    setConfirmModalCancelButtonLabel,
    setOnAcceptConfirmModal,
    setOnCancelConfirmModal,
  } = useConfirmModal();

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const handleDelete = (accountNumber: string) => {
    const newBankAccounts = bankAccounts.filter((bankAccount) => bankAccount.accountNumber !== accountNumber);
    setBankAccounts(newBankAccounts);
    saveBankAccounts(user.id, newBankAccounts);
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = (accountNumber: string) => {
    setConfirmModalMessage(`¿Estás seguro/a de que deseas eliminar la cuenta bancaria ${accountNumber}?`);
    setConfirmModalAcceptButtonLabel('Eliminar');
    setConfirmModalCancelButtonLabel('Cancelar');
    setOnAcceptConfirmModal(() => () => handleDelete(accountNumber));
    setOnCancelConfirmModal(() => () => setShowConfirmModal(false));
    setShowConfirmModal(true);
  };

  useEffect(() => {
    const storedBankAccounts = getBankAccounts(user.id);
    if (storedBankAccounts) {
      setBankAccounts(storedBankAccounts);
    }
  }, []);

  if (!bankAccounts.length) {
    return <AccountsNotFound />;
  }

  return (
    <main className='container mx-auto flex flex-grow flex-col p-4'>
      <header className='mb-4 flex items-center justify-evenly'>
        <h1 className='text-xl font-semibold md:text-2xl'>Mis cuentas bancarias</h1>
        <Button as={Link} to='/account-management/add' color='success' size='sm' pill>
          Agregar cuenta
        </Button>
      </header>

      <section className='flex-grow overflow-x-auto xl:mx-auto'>
        <Table className='mx-auto max-w-7xl dark:shadow-md' hoverable>
          <Table.Head>
            <Table.HeadCell>Cuenta</Table.HeadCell>
            <Table.HeadCell>Tipo de cuenta</Table.HeadCell>
            <Table.HeadCell>Estado de cuenta</Table.HeadCell>
            <Table.HeadCell>Tipo de ingreso</Table.HeadCell>
            <Table.HeadCell>Banco</Table.HeadCell>
            <Table.HeadCell>Saldo actual</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {bankAccounts.map((bankAccount) => (
              <Table.Row key={bankAccount.accountNumber} className='cursor-pointer'>
                <Table.Cell className='text-base font-semibold'>{bankAccount.accountNumber}</Table.Cell>
                <Table.Cell className={AccountTypeColors[bankAccount.accountType]}>{bankAccount.accountType}</Table.Cell>
                <Table.Cell className={AccountStateColors[bankAccount.accountState]}>{bankAccount.accountState}</Table.Cell>
                <Table.Cell className={IncomeTypeColors[bankAccount.incomeType]}>{bankAccount.incomeType}</Table.Cell>
                <Table.Cell>{bankAccount.bank}</Table.Cell>
                <Table.Cell>{bankAccount.currentBalance.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Table.Cell>
                <Table.Cell className='flex gap-4'>
                  <Button color='failure' size='xs' onClick={() => handleConfirmDelete(bankAccount.accountNumber)} pill>
                    Eliminar
                  </Button>
                  <Button color='warning' size='xs' as={Link} to={`/account-management/edit/${bankAccount.accountNumber}`} pill>
                    Editar
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    </main>
  );
};

export default History;
