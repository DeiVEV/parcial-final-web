import { Button, Card, Label, Select, Textarea, TextInput } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import useErrorModal from 'hooks/useErrorModal';
import useSuccessModal from 'hooks/useSuccessModal';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { FaHandHoldingDollar, FaRegRectangleList } from 'react-icons/fa6';
import { MdOutlineDriveFileRenameOutline, MdOutlineNumbers } from 'react-icons/md';
import { getIncomes, saveIncomes } from 'utils/incomes';

import type { Income, IncomeType } from '@~types/common';

const IncomeManagement: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const { setShowErrorModal, setErrorModalTitle, setErrorModalMessage, setErrorModalCloseButtonLabel, setOnCloseErrorModal } = useErrorModal();
  const { setShowSuccessModal, setSuccessModalMessage, setSuccessModalCloseButtonLabel, setOnCloseSuccessModal } = useSuccessModal();

  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<'ingreso' | 'egreso' | null>(null);
  const [incomeName, setIncomeName] = useState<string>('');
  const [incomeType, setIncomeType] = useState<IncomeType | null>(null);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value.trim());
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value.trim() as 'ingreso' | 'egreso');
  const handleIncomeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setIncomeName(e.target.value.trim());
  const handleIncomeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIncomeType(e.target.value.trim() as IncomeType);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value.trim());

  const handleShowSuccessModal = (message: string) => {
    setSuccessModalMessage(message);
    setSuccessModalCloseButtonLabel('Aceptar');
    setOnCloseSuccessModal(() => () => setShowSuccessModal(false));
    setShowSuccessModal(true);
  };

  const handleShowErrorModal = (message: string) => {
    setErrorModalTitle('Error al crear el ingreso/egreso');
    setErrorModalMessage(message);
    setErrorModalCloseButtonLabel('Cerrar');
    setOnCloseErrorModal(() => () => setShowErrorModal(false));
    setShowErrorModal(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedIncomes = getIncomes(user.id);

    if (!code || !incomeName || !incomeType || !type) {
      handleShowErrorModal('Por favor, complete todos los campos');
      return;
    } else if (code.length < 3 || incomeName.length < 3) {
      handleShowErrorModal('El código y el nombre del ingreso deben tener al menos 3 caracteres');
      return;
    } else if (description && (description.length < 10 || description.length > 500)) {
      handleShowErrorModal('La descripción debe tener entre 10 y 500 caracteres');
      return;
    } else if (!description) {
      setDescription('No hay descripción');
    } else if (storedIncomes.some((income) => income.code === code && income.userId === user.id)) {
      handleShowErrorModal('Ya existe un ingreso o egreso con el código ingresado');
      return;
    }

    const newIncome: Income = { code, type, incomeName, incomeType, description, userId: user.id };

    storedIncomes.push(newIncome);
    saveIncomes(user.id, storedIncomes);
    setLoading(true);
    setTimeout(() => {
      handleShowSuccessModal(`${type} creado correctamente`);
      setLoading(false);
    }, 2_000);
  };

  const LoadingSpinner = <AiOutlineLoading className='h-6 w-6 animate-spin' />;

  return (
    <main className='container mx-auto flex-grow p-4'>
      <h1 className='text-center text-4xl font-bold'>Gestión de ingresos y egresos</h1>
      <Card className='mx-auto mt-4 max-w-2xl p-4'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='code' value='Código' />
              </div>
              <TextInput
                type='text'
                id='code'
                icon={MdOutlineNumbers}
                placeholder='H05K3'
                minLength={3}
                value={code}
                onChange={handleCodeChange}
                shadow
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='income-name' value='Nombre de Ingreso' />
              </div>
              <TextInput
                type='text'
                id='income-name'
                icon={MdOutlineDriveFileRenameOutline}
                placeholder='Salario, Comida, Transporte, Otros'
                minLength={3}
                value={incomeName}
                onChange={handleIncomeNameChange}
                shadow
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='type' value='Tipo' />
              </div>
              <Select id='type' icon={FaRegRectangleList} value={!type ? 'Seleccione un tipo' : type} onChange={handleTypeChange} shadow required>
                <option disabled>Seleccione un tipo</option>
                <option value='ingreso'>Ingreso</option>
                <option value='egreso'>Egreso</option>
              </Select>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='banks' value='Tipo de ingreso o egreso' />
              </div>
              <Select
                id='banks'
                icon={FaHandHoldingDollar}
                value={!incomeType ? 'Seleccione un tipo' : incomeType}
                onChange={handleIncomeTypeChange}
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

            <div className='col-span-full'>
              <div className='mb-2 block'>
                <Label htmlFor='description' value='Descripción' />
              </div>
              <Textarea
                id='description'
                placeholder='Pago de salario, compra de alimentos, pago de transporte, etc…'
                rows={4}
                className='min-h-10'
                value={description}
                minLength={10}
                maxLength={500}
                helperText='(opcional) Mínimo 10 caracteres, máximo 500 caracteres'
                onChange={handleDescriptionChange}
                shadow
              />
            </div>
          </div>

          <Button type='submit' isProcessing={loading} processingSpinner={LoadingSpinner} className='mt-4 w-full'>
            <FaSave className='mr-2 h-5 w-5' /> Guardar
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default IncomeManagement;
