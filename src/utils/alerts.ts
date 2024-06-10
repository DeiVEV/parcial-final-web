import type { Alert } from '@~types/common';

export function getAlerts(userId: string | number) {
  const alerts = localStorage.getItem(`alerts-${userId}`) || '[]';
  const alertsParsed: Alert[] = JSON.parse(alerts);
  return alertsParsed;
}

export function saveAlerts(userId: string | number, alerts: Alert[]) {
  localStorage.setItem(`alerts-${userId}`, JSON.stringify(alerts));
}
