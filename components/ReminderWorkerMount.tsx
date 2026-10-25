'use client';
import { useEffect } from 'react';
import { startReminderWorker } from '@/lib/notifications';
export default function ReminderWorkerMount() {
  useEffect(() => { startReminderWorker(); }, []);
  return null;
}
