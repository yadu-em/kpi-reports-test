import type { Report } from '@/types';

export const REPORTS: Report[] = [
  { id: 'sales-performance', name: 'Sales Performance', path: '/report/sales-performance' },
];

export const REPORT_NAMES: Record<string, string> = {
  'sales-performance': 'Sales Performance',
};

export const DEFAULT_REPORT_ID = REPORTS[0]?.id || 'sales-performance';

