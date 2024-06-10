import { Button } from 'flowbite-react';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <main className='container mx-auto flex flex-grow flex-col items-center justify-center gap-4 p-4 text-center'>
      <FaTriangleExclamation size={100} color='orange' />
      <h1 className='text-4xl font-bold'>404 - Página no encontrada</h1>
      <p className='text-lg'>La página que buscas no existe.</p>
      <Button gradientDuoTone='purpleToBlue' onClick={handleClick}>
        Volver a la página anterior
      </Button>
    </main>
  );
};

export default PageNotFound;
