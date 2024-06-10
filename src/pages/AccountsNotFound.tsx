import { Button, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const AccountsNotFound: React.FC = () => {
  return (
    <main className='container mx-auto flex flex-grow flex-col items-center justify-center p-4'>
      <Card className='mx-auto mt-4 max-w-2xl'>
        <h2 className='text-center text-2xl font-semibold'>No hay cuentas bancarias registradas</h2>
        <p className='mt-2 text-center'>Para agregar una cuenta bancaria, haz clic en el botón de abajo.</p>
        <div className='mt-4 flex justify-center'>
          <Button gradientDuoTone='purpleToBlue' as={Link} to='/account-management'>
            Agregar cuenta bancaria
          </Button>
        </div>
      </Card>
    </main>
  );
};

export default AccountsNotFound;
