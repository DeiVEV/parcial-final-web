import { Banks } from './Banks';

export interface User {
  name: string;
  email: string;
  rol: 'admin' | 'user';
  id: number;
  avatar?: string;
  password?: string;
}

export interface BankAccount {
  accountType: AccountType;
  accountState: AccountState;
  accountNumber: string;
  bank: Banks;
  incomeType: IncomeType;
  currentBalance: number;
  userId: number;
}

export interface Income {
  code: string;
  type: 'ingreso' | 'egreso';
  incomeName: string;
  incomeType: IncomeType;
  description: string;
  userId: number;
}

export interface Transaction {
  transactionId: number;
  transactionType: TransactionType;
  transactionIncomeType: IncomeType;
  transactionAmount: number;
  transactionDate: string;
  transactionAccountNumber: string;
  transactionDescription: string;
  userId: number;
}

export interface Alert {
  alertId: number;
  alertName: string;
  alertType: AlertType;
  alertDescription: string;
  alertDate: string;
  userId: number;
}

export type AccountType = 'corriente' | 'ahorro';
export type AccountState = 'activa' | 'inactiva' | 'cerrada';
export type IncomeType = 'pasivo' | 'activo' | 'patrimonio' | 'corriente' | 'capital';
export type TransactionType = 'Pago de nómina' | 'Pago de servicios' | 'Pago de impuestos' | 'Pago de proveedores' | 'Pago de préstamo';
export type AlertType = 'Recordatorio' | 'Urgente' | 'Importante';
