'use client';

import ConfirmModal from 'components/ConfirmModal';
import ErrorModal from 'components/ErrorModal';
import PrivateRoutes from 'components/PrivateRoutes';
import SuccessModal from 'components/SuccessModal';
import AccountManagement from 'pages/AccountManagement';
import AlertManagement from 'pages/AlertManagement';
import ExpenseManagement from 'pages/ExpenseManagement';
import History from 'pages/History';
import Home from 'pages/Home';
import IncomeManagement from 'pages/IncomeManagement';
import Login from 'pages/Login';
import PageNotFound from 'pages/PageNotFound';
import TransactionManagement from 'pages/TransactionManagement';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas a las cuales se puede acceder sin necesidad de autenticación */}
        <Route path='/' element={<Home showNavbar />} />
        <Route path='login' element={<Login />} />

        {/* Rutas Privadas a las cuales solo se pueden acceder si se está autenticado correctamente */}
        <Route element={<PrivateRoutes />}>
          <Route path='home' element={<Home />} />
          <Route path='history' element={<History />} />
          <Route path='account-management'>
            <Route index element={<AccountManagement />} />
            <Route path='add' element={<AccountManagement />} />
            <Route path='edit/:AccountNumber' element={<AccountManagement />} />
          </Route>
          <Route path='income-management' element={<IncomeManagement />} />
          <Route path='transaction-management' element={<TransactionManagement />} />
          <Route path='expense-management' element={<ExpenseManagement />} />
          <Route path='alert-management' element={<AlertManagement />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>

      <ConfirmModal />
      <ErrorModal />
      <SuccessModal />
    </BrowserRouter>
  );
};

export default App;
