export type Status = 'Good' | 'Medium' | 'Low';

export interface Product {
  id: string | number;
  name: string;
  category: string;
  stock: number;
  price: number;
  sales: number;
  status: Status;
}

export interface KPI {
  id: string | number;
  title: string;
  value: number | string;
  trend: string;
  isUp: boolean;
  icon: any;
  color: string;
  symbol?: string;
}

export interface SalesData {
  name: string;
  sales: number;
  revenue: number;
}

export interface DashboardState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  dateRange: { start: Date; end: Date };
  activeCategory: string;
  searchQuery: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
}
