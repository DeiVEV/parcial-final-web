import CustomNavbar from 'components/CustomNavbar';
import useAuth from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
