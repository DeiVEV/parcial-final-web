import { Button, Card, Label, Radio, Select, TextInput } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import useErrorModal from 'hooks/useErrorModal';
import useSuccessModal from 'hooks/useSuccessModal';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsBank } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import { FaArrowUp, FaCreditCard, FaDollarSign } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { getBankAccounts, saveBankAccounts } from 'utils/bankAccounts';

import { Banks } from '@~types/Banks';
import type { AccountState, AccountType, BankAccount, IncomeType } from '@~types/common';

const AccountManagement: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const { setShowErrorModal, setErrorModalTitle, setErrorModalMessage, setErrorModalCloseButtonLabel, setOnCloseErrorModal } = useErrorModal();
  const { setShowSuccessModal, setSuccessModalMessage, setSuccessModalCloseButtonLabel, setOnCloseSuccessModal } = useSuccessModal();
  const { AccountNumber } = useParams();

  const userStoredBankAccounts = getBankAccounts(user.id);
  const storedBankAccount = userStoredBankAccounts.find((account) => account.accountNumber === AccountNumber);

  const formTitle = storedBankAccount ? 'Editar cuenta bancaria' : 'Inscribir cuenta bancaria';
  const submitButtonIcon = storedBankAccount ? <FaArrowUp className='mr-2 h-5 w-5' /> : <FaSave className='mr-2 h-5 w-5' />;
  const submitButtonLabel = storedBankAccount ? 'Editar cuenta' : 'Inscribir cuenta';

  const [accountType, setAccountType] = useState<AccountType>(storedBankAccount?.accountType || 'ahorro');
  const [accountState, setAccountState] = useState<AccountState>(storedBankAccount?.accountState || 'activa');
  const [incomeType, setBankType] = useState<IncomeType>(storedBankAccount?.incomeType || 'pasivo');
  const [bank, setBank] = useState<Banks | null>(storedBankAccount?.bank || null);
  const [accountNumber, setAccountNumber] = useState<string | null>(storedBankAccount?.accountNumber || null);
  const [currentBalance, setCurrentBalance] = useState<number | null>(storedBankAccount?.currentBalance || null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAccountType(e.target.value.trim() as AccountType);
  const handleAccountStateChange = (e: React.ChangeEvent<HTMLInputElement>) => setAccountState(e.target.value.trim() as AccountState);
  const handleBankTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setBankType(e.target.value.trim() as IncomeType);
  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => setBank(e.target.value.trim() as unknown as Banks);
  const handleBankNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setAccountNumber(e.target.value.trim());
  const handleCurrentBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentBalance(parseInt(e.target.value.trim()));

  const handleShowSuccessModal = (message: string) => {
    setSuccessModalMessage(message);
    setSuccessModalCloseButtonLabel('Aceptar');
    setOnCloseSuccessModal(() => () => setShowSuccessModal(false));
    setShowSuccessModal(true);
  };

  const handleShowErrorModal = (message: string) => {
    setErrorModalTitle(`Error al ${storedBankAccount ? 'editar' : 'inscribir'} la cuenta bancaria`);
    setErrorModalMessage(message);
    setErrorModalCloseButtonLabel('Cerrar');
    setOnCloseErrorModal(() => () => setShowErrorModal(false));
    setShowErrorModal(true);
  };

  const verifyAccountData = () => {
    return (
      storedBankAccount &&
      accountType === storedBankAccount.accountType &&
      accountState === storedBankAccount.accountState &&
      incomeType === storedBankAccount.incomeType &&
      bank === storedBankAccount.bank &&
      accountNumber === storedBankAccount.accountNumber &&
      currentBalance === storedBankAccount.currentBalance
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accountType || !accountState || !incomeType || !bank || !accountNumber || !currentBalance) {
      handleShowErrorModal('Por favor, complete todos los campos');
      return;
    } else if (currentBalance < 50_000) {
      handleShowErrorModal('Por favor, ingrese un saldo mayor a $50.000');
      return;
    } else if (storedBankAccount) {
      if (verifyAccountData()) {
        handleShowErrorModal('Por favor, modifique al menos un campo');
        return;
      }

      const accountIndex = userStoredBankAccounts.findIndex((account) => account.accountNumber === storedBankAccount.accountNumber);
      userStoredBankAccounts[accountIndex] = { accountType, accountState, accountNumber, bank, incomeType, currentBalance, userId: user.id };
      saveBankAccounts(user.id, userStoredBankAccounts);
      setLoading(true);
      setTimeout(() => {
        handleShowSuccessModal('Cuenta bancaria editada exitosamente');
        setLoading(false);
      }, 2_000);
      return;
    } else if (userStoredBankAccounts.some((account) => account.accountNumber === accountNumber && account.userId === user.id)) {
      handleShowErrorModal('Ya existe una cuenta bancaria con ese número de cuenta');
      return;
    }

    const newAccount: BankAccount = { accountType, accountState, accountNumber, bank, incomeType, currentBalance, userId: user.id };

    userStoredBankAccounts.push(newAccount);
    saveBankAccounts(user.id, userStoredBankAccounts);
    setLoading(true);
    setTimeout(() => {
      handleShowSuccessModal('Cuenta bancaria inscrita exitosamente');
      setLoading(false);
    }, 2_000);
  };

  const LoadingSpinner = <AiOutlineLoading className='h-6 w-6 animate-spin' />;

  return (
    <main className='container mx-auto flex-grow p-4'>
      <h1 className='text-center text-4xl font-bold'>{formTitle}</h1>
      <Card className='mx-auto mt-4 max-w-4xl p-4'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <fieldset className='flex max-w-md flex-col gap-4'>
              <legend className='mb-4'>¿Qué tipo de cuenta desea inscribir?</legend>
              <div className='flex items-center gap-2'>
                <Radio
                  id='account-type-savings'
                  name='account-type'
                  value='ahorro'
                  className='checked:bg-emerald-500 dark:checked:bg-emerald-500 dark:active:bg-emerald-500'
                  defaultChecked={accountType === 'ahorro'}
                  onChange={handleAccountTypeChange}
                />
                <Label htmlFor='account-type-savings'>Cuenta Ahorro</Label>
              </div>

              <div className='flex items-center gap-2'>
                <Radio
                  id='account-type-current'
                  name='account-type'
                  value='corriente'
                  className='checked:bg-sky-500 dark:checked:bg-sky-500 dark:active:bg-sky-500'
                  defaultChecked={accountType === 'corriente'}
                  onChange={handleAccountTypeChange}
                />
                <Label htmlFor='account-type-current'>Cuenta Corriente</Label>
              </div>
            </fieldset>

            <fieldset className='flex max-w-md flex-col gap-4'>
              <legend className='mb-4'>Indique el estado de su cuenta</legend>
              <div className='flex items-center gap-2'>
                <Radio
                  id='account-state-active'
                  name='account-state'
                  value='activa'
                  className='checked:bg-green-500 dark:checked:bg-green-500 dark:active:bg-green-500'
                  defaultChecked={accountState === 'activa'}
                  onChange={handleAccountStateChange}
                />
                <Label htmlFor='account-state-active'>Activa</Label>
              </div>

              <div className='flex items-center gap-2'>
                <Radio
                  id='account-state-inactive'
                  name='account-state'
                  value='inactiva'
                  className='checked:bg-yellow-500 dark:checked:bg-yellow-500 dark:active:bg-yellow-500'
                  defaultChecked={accountState === 'inactiva'}
                  onChange={handleAccountStateChange}
                />
                <Label htmlFor='account-state-inactive'>Inactiva</Label>
              </div>

              <div className='flex items-center gap-2'>
                <Radio
                  id='account-state-closed'
                  name='account-state'
                  value='cerrada'
                  className='checked:bg-red-500 dark:checked:bg-red-500 dark:active:bg-red-500'
                  defaultChecked={accountState === 'cerrada'}
                  onChange={handleAccountStateChange}
                />
                <Label htmlFor='account-state-closed'>Cerrada</Label>
              </div>
            </fieldset>

            <fieldset className='flex max-w-md flex-col gap-4'>
              <legend className='mb-4'>Tipo de ingreso</legend>
              <div className='flex items-center gap-2'>
                <Radio
                  id='income-type-passive'
                  name='income-type'
                  value='pasivo'
                  className='checked:bg-sky-700 dark:checked:bg-sky-700 dark:active:bg-sky-700'
                  defaultChecked={incomeType === 'pasivo'}
                  onChange={handleBankTypeChange}
                />
                <Label htmlFor='income-type-passive'>Pasivo</Label>
              </div>

              <div className='flex items-center gap-2'>
                <Radio
                  id='income-type-active'
                  name='income-type'
                  value='activo'
                  className='checked:bg-yellow-300 dark:checked:bg-yellow-300 dark:active:bg-yellow-300'
                  defaultChecked={incomeType === 'activo'}
                  onChange={handleBankTypeChange}
                />
                <Label htmlFor='income-type-active'>Activo</Label>
              </div>
            </fieldset>
          </div>

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <div className='col-span-full'>
              <div className='mb-2 block'>
                <Label htmlFor='account-number' value='Número de cuenta' />
              </div>
              <TextInput
                type='text'
                id='account-number'
                icon={FaCreditCard}
                placeholder='1234567890123456'
                minLength={16}
                maxLength={16}
                pattern='[0-9]{16}'
                value={accountNumber ? accountNumber.toString() : ''}
                onChange={handleBankNumberChange}
                helperText='El número de cuenta debe tener 16 dígitos'
                disabled={!!storedBankAccount}
                shadow
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='banks' value='Nombre del banco' />
              </div>
              <Select id='banks' icon={BsBank} value={!bank ? 'Seleccione un banco' : bank} onChange={handleBankChange} shadow required>
                <option disabled>Seleccione un banco</option>
                {Object.entries(Banks).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='saldo-actual' value='Saldo Actual' />
              </div>
              <TextInput
                type='number'
                id='saldo-actual'
                icon={FaDollarSign}
                placeholder='10.000.000'
                min={50_000}
                value={currentBalance ? currentBalance.toString() : ''}
                onChange={handleCurrentBalanceChange}
                helperText='El saldo debe ser mayor a $50.000'
                shadow
                required
              />
            </div>
          </div>

          <Button type='submit' isProcessing={loading} processingSpinner={LoadingSpinner} className='mt-4 w-full'>
            {submitButtonIcon} {submitButtonLabel}
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default AccountManagement;
