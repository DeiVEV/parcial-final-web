import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import useConfirmModal from 'hooks/useConfirmModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CustomNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  const {
    setShowConfirmModal,
    setConfirmModalMessage,
    setConfirmModalAcceptButtonLabel,
    setConfirmModalCancelButtonLabel,
    setOnAcceptConfirmModal,
    setOnCancelConfirmModal,
  } = useConfirmModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setShowConfirmModal(false);
    navigate('/login');
  };

  const handleConfirmLogout = () => {
    setConfirmModalMessage('¿Estás seguro/a de que deseas cerrar sesión?');
    setConfirmModalAcceptButtonLabel('Cerrar Sesión');
    setConfirmModalCancelButtonLabel('Cancelar');
    setOnAcceptConfirmModal(() => () => handleLogout());
    setOnCancelConfirmModal(() => () => setShowConfirmModal(false));
    setShowConfirmModal(true);
  };

  const handleActiveLocation = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Navbar fluid rounded border>
      <Navbar.Brand as={Link} to='/home'>
        <img src='/icons/favicon.ico' className='mr-3 h-6 sm:h-9' alt='Bank Kors Logo' />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Bank Kors</span>
      </Navbar.Brand>
      <div className='flex gap-3 md:order-2'>
        <DarkThemeToggle />
        <Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img={user.avatar} rounded />}>
          <Dropdown.Header>
            <span className='block text-sm'>{user.name}</span>
            <span className='mb-2 block truncate text-sm font-medium'>{user.email}</span>
            <span className='block text-xs'>
              <strong>Rol:</strong> {user.rol}
            </span>
            <span className='block text-xs'>
              <strong>ID:</strong> {user.id}
            </span>
          </Dropdown.Header>
          <Dropdown.Item className='text-red-600 dark:text-red-500' onClick={handleConfirmLogout}>
            Cerrar Sesión
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to='/history' active={handleActiveLocation('/history')}>
          Historial
        </Navbar.Link>
        <Navbar.Link as={Link} to='/account-management' active={handleActiveLocation('/account-management')}>
          Gestionar Cuentas
        </Navbar.Link>
        <Navbar.Link as={Link} to='/income-management' active={handleActiveLocation('/income-management')}>
          Gestionar Ingresos
        </Navbar.Link>
        <Navbar.Link as={Link} to='/transaction-management' active={handleActiveLocation('/transaction-management')}>
          Gestionar Transacciones
        </Navbar.Link>
        {user.rol === 'admin' && (
          <Navbar.Link as={Link} to='/expense-management' active={handleActiveLocation('/expense-management')}>
            Gestionar Gastos
          </Navbar.Link>
        )}
        <Navbar.Link as={Link} to='/alert-management' active={handleActiveLocation('/alert-management')}>
          Gestionar Alertas
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
