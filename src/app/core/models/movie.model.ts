export interface Movie {
  id: number;
  title: string;
  duration_minutes: number;
  language: string;
  status: 'ACTIVE' | 'INACTIVE';
}
