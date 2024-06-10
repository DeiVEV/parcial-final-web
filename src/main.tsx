import AuthProvider from 'providers/AuthProvider';
import ConfirmModalProvider from 'providers/ConfirmModalProvider';
import ErrorModalProvider from 'providers/ErrorModalProvider';
import SuccessModalProvider from 'providers/SuccessModalProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';

import App from '@~app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ConfirmModalProvider>
        <ErrorModalProvider>
          <SuccessModalProvider>
            <App />
          </SuccessModalProvider>
        </ErrorModalProvider>
      </ConfirmModalProvider>
    </AuthProvider>
  </React.StrictMode>,
);
