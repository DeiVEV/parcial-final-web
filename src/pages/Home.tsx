import { Carousel, DarkThemeToggle, Navbar } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HomeProps {
  showNavbar?: boolean;
}

const Home: React.FC<HomeProps> = ({ showNavbar }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if ((isAuthenticated || user) && location.pathname === '/') {
      navigate('/home');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      {showNavbar && (
        <Navbar fluid rounded className='border-b'>
          <Navbar.Brand>
            <img src='/icons/favicon.ico' className='mr-3 h-6 sm:h-9' alt='Bank Kors Logo' />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Bank Kors</span>
            <DarkThemeToggle className='ml-4' />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link as={Link} to='/login'>
              Iniciar Sesión
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      )}

      <main className='flex-grow'>
        <Carousel slideInterval={3_000} className='bg-gray-800 text-white dark:bg-gray-800' draggable>
          <figure className='flex h-full flex-col items-center justify-center gap-4'>
            <img src='/images/banner1.jpeg' alt='banner 1' className='absolute h-auto w-full opacity-60 dark:opacity-40' />
            <figcaption className='relative p-4 text-center'>
              <h2 className='mb-5 text-5xl font-bold'>Tus finanzas, en un vistazo</h2>
              <p className='text-lg'>Consulta saldos, movimientos y transacciones recientes de todas tus cuentas en un solo lugar.</p>
            </figcaption>
          </figure>
          <figure className='flex h-full flex-col items-center justify-center gap-4'>
            <img src='/images/banner2.jpeg' alt='banner 2' className='absolute h-auto w-full opacity-60 dark:opacity-40' />
            <figcaption className='relative p-4 text-center'>
              <h2 className='mb-5 text-5xl font-bold'>Transacciones sin complicaciones</h2>
              <p className='text-lg'>Envía y recibe dinero de forma rápida y segura, en cualquier momento y lugar.</p>
            </figcaption>
          </figure>
          <figure className='flex h-full flex-col items-center justify-center gap-4'>
            <img src='/images/banner3.jpeg' alt='banner 3' className='absolute h-auto w-full opacity-60 dark:opacity-40' />
            <figcaption className='relative p-4 text-center'>
              <h2 className='mb-5 text-5xl font-bold'>Presupuesto inteligente</h2>
              <p className='text-lg'>Controla tus gastos, establece metas de ahorro y toma decisiones financieras informadas.</p>
            </figcaption>
          </figure>
          <figure className='flex h-full flex-col items-center justify-center gap-4'>
            <img src='/images/banner4.jpeg' alt='banner 4' className='absolute h-auto w-full opacity-60 dark:opacity-40' />
            <figcaption className='relative p-4 text-center'>
              <h2 className='mb-5 text-5xl font-bold'>Historial completo</h2>
              <p className='text-lg'>Accede a un registro detallado de tus operaciones y descarga extractos bancarios fácilmente.</p>
            </figcaption>
          </figure>
        </Carousel>
      </main>
    </>
  );
};

export default Home;
