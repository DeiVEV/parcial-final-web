import type { BankAccount } from '@~types/common';

export function getBankAccounts(userId: string | number) {
  const bankAccounts = localStorage.getItem(`accounts-${userId}`) || '[]';
  const bankAccountsParsed: BankAccount[] = JSON.parse(bankAccounts);
  return bankAccountsParsed;
}

export function saveBankAccounts(userId: string | number, bankAccounts: BankAccount[]) {
  localStorage.setItem(`accounts-${userId}`, JSON.stringify(bankAccounts));
}
