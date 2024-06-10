import type { Transaction } from '@~types/common';

export function getTransactions(userId: string | number) {
  const transactions = localStorage.getItem(`transactions-${userId}`) || '[]';
  const transactionsParsed: Transaction[] = JSON.parse(transactions);
  return transactionsParsed;
}

export function saveTransactions(userId: string | number, transactions: Transaction[]) {
  localStorage.setItem(`transactions-${userId}`, JSON.stringify(transactions));
}
