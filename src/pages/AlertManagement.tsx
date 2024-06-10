import { Button, Card, Label, Select, Table, Textarea, TextInput } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import useConfirmModal from 'hooks/useConfirmModal';
import useErrorModal from 'hooks/useErrorModal';
import useSuccessModal from 'hooks/useSuccessModal';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaCalendarPlus, FaClockRotateLeft, FaRegBell, FaRegRectangleList } from 'react-icons/fa6';
import { getAlerts, saveAlerts } from 'utils/alerts';

import type { Alert, AlertType } from '@~types/common';

const AlertTypeColors = {
  Recordatorio: 'success',
  Urgente: 'failure',
  Importante: 'warning',
};

const AlertManagement: React.FC = () => {
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
  const { setShowErrorModal, setErrorModalTitle, setErrorModalMessage, setErrorModalCloseButtonLabel, setOnCloseErrorModal } = useErrorModal();
  const { setShowSuccessModal, setSuccessModalMessage, setSuccessModalCloseButtonLabel, setOnCloseSuccessModal } = useSuccessModal();

  const storedAlerts = getAlerts(user.id);

  const [alerts, setAlerts] = useState<Alert[]>(storedAlerts);
  const [alertName, setAlertName] = useState<string>('');
  const [alertType, setAlertType] = useState<AlertType | null>(null);
  const [alertDescription, setAlertDescription] = useState<string>('');
  const [alertDate, setAlertDate] = useState<string>(new Date().toISOString());
  const [loading, setLoading] = useState<boolean>(false);

  const handleAlertNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setAlertName(e.target.value.trim());
  const handleAlertTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setAlertType(e.target.value.trim() as AlertType);
  const handleAlertDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setAlertDescription(e.target.value.trim());
  const handleAlertDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setAlertDate(e.target.value.trim());

  const handleDelete = (alertId: number) => {
    const newAlerts = alerts.filter((alert) => alert.alertId !== alertId);
    saveAlerts(user.id, newAlerts);
    setAlerts(newAlerts);
    storedAlerts.splice(
      storedAlerts.findIndex((alert) => alert.alertId === alertId),
      1,
    );
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = (alertId: number) => {
    setConfirmModalMessage(`¿Estás seguro/a de que deseas eliminar la alerta ${alertId}?`);
    setConfirmModalAcceptButtonLabel('Eliminar');
    setConfirmModalCancelButtonLabel('Cancelar');
    setOnAcceptConfirmModal(() => () => handleDelete(alertId));
    setOnCancelConfirmModal(() => () => setShowConfirmModal(false));
    setShowConfirmModal(true);
  };

  const handleShowSuccessModal = (message: string) => {
    setSuccessModalMessage(message);
    setSuccessModalCloseButtonLabel('Aceptar');
    setOnCloseSuccessModal(() => () => setShowSuccessModal(false));
    setShowSuccessModal(true);
  };

  const handleShowErrorModal = (message: string) => {
    setErrorModalTitle('Error al crear la alerta');
    setErrorModalMessage(message);
    setErrorModalCloseButtonLabel('Cerrar');
    setOnCloseErrorModal(() => () => setShowErrorModal(false));
    setShowErrorModal(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!alertName || !alertType || !alertDate) {
      handleShowErrorModal('Por favor, complete todos los campos');
      return;
    } else if (alertName.length < 3) {
      handleShowErrorModal('El nombre de la alerta debe tener al menos 3 caracteres');
      return;
    } else if (alertDescription && (alertDescription.length < 10 || alertDescription.length > 500)) {
      handleShowErrorModal('La descripción de la alerta debe tener entre 10 y 500 caracteres');
      return;
    } else if (new Date(alertDate) < new Date()) {
      handleShowErrorModal('La fecha de la alerta debe ser posterior a la fecha actual');
      return;
    } else if (storedAlerts.some((alert) => alert.alertName === alertName)) {
      handleShowErrorModal('Ya existe una alerta con el mismo nombre');
      return;
    } else if (!alertDescription) {
      setAlertDescription('No hay descripción');
    }

    setLoading(true);

    const alertWithGreaterId = storedAlerts.reduce((prev, current) => (prev.alertId > current.alertId ? prev : current), {
      alertId: 0,
    });

    const newAlert: Alert = {
      alertId: alertWithGreaterId.alertId + 1,
      alertName,
      alertType: alertType as AlertType,
      alertDescription,
      alertDate,
      userId: user.id,
    };

    setTimeout(() => {
      storedAlerts.push(newAlert);
      saveAlerts(user.id, storedAlerts);
      setAlerts([...storedAlerts]);
      handleShowSuccessModal('Alerta programada correctamente.');
      setLoading(false);
    }, 2_000);
  };

  const LoadingSpinner = <AiOutlineLoading className='h-6 w-6 animate-spin' />;

  return (
    <main className='container mx-auto grid flex-grow grid-cols-1 gap-4 p-4 xl:grid-cols-3'>
      <h1 className='col-span-full text-center text-4xl font-bold'>Alertas</h1>
      <Card className='mx-auto max-w-2xl p-4'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Nombre de la alerta' />
              </div>
              <TextInput
                type='text'
                id='name'
                icon={FaRegBell}
                placeholder='Alerta de pago…'
                minLength={3}
                value={alertName}
                onChange={handleAlertNameChange}
                shadow
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='type' value='Tipo de alerta' />
              </div>
              <Select
                id='type'
                icon={FaRegRectangleList}
                value={!alertType ? 'Seleccione un tipo' : alertType}
                onChange={handleAlertTypeChange}
                shadow
                required
              >
                <option disabled>Seleccione un tipo</option>
                <option value='Recordatorio'>Recordatorio</option>
                <option value='Urgente'>Urgente</option>
                <option value='Importante'>Importante</option>
              </Select>
            </div>

            <div className='col-span-full'>
              <div className='mb-2 block'>
                <Label htmlFor='date' value='Fecha de la alerta' />
              </div>
              <TextInput type='datetime-local' id='date' icon={FaCalendarPlus} value={alertDate} onChange={handleAlertDateChange} shadow required />
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
                value={alertDescription}
                minLength={10}
                maxLength={500}
                helperText='(opcional) Mínimo 10 caracteres, máximo 500 caracteres'
                onChange={handleAlertDescriptionChange}
                shadow
              />
            </div>
          </div>
          <Button type='submit' isProcessing={loading} processingSpinner={LoadingSpinner} className='mt-4 w-full'>
            <FaClockRotateLeft className='mr-2 h-5 w-5' /> Programar
          </Button>
        </form>
      </Card>

      {alerts.length ? (
        <Card className='xl:col-span-2'>
          <div className='h-full overflow-x-auto'>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Tipo</Table.HeadCell>
                <Table.HeadCell>Fecha</Table.HeadCell>
                <Table.HeadCell>Descripción</Table.HeadCell>
                <Table.HeadCell>Acciones</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {alerts.map((alert) => (
                  <Table.Row key={alert.alertId}>
                    <Table.Cell>{alert.alertId}</Table.Cell>
                    <Table.Cell>{alert.alertName}</Table.Cell>
                    <Table.Cell>
                      <Label color={AlertTypeColors[alert.alertType]} value={alert.alertType} />
                    </Table.Cell>
                    <Table.Cell>{new Date(alert.alertDate).toLocaleString()}</Table.Cell>
                    <Table.Cell>{alert.alertDescription || 'No hay descripción'}</Table.Cell>
                    <Table.Cell>
                      <Button color='red' size='sm' onClick={() => handleConfirmDelete(alert.alertId)} pill>
                        Eliminar
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      ) : (
        <Card className='xl:col-span-2'>
          <p className='text-center text-lg font-semibold'>No hay alertas programadas</p>
        </Card>
      )}
    </main>
  );
};

export default AlertManagement;
