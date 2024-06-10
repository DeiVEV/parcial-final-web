import type { Income } from '@~types/common';

export function getIncomes(userId: string | number) {
  const incomes = localStorage.getItem(`incomes-${userId}`) || '[]';
  const incomesParsed: Income[] = JSON.parse(incomes);
  return incomesParsed;
}

export function saveIncomes(userId: string | number, incomes: Income[]) {
  localStorage.setItem(`incomes-${userId}`, JSON.stringify(incomes));
}
