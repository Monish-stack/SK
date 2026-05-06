import { subDays, format, eachDayOfInterval } from 'date-fns';

// --- KPI Data ---
export const kpiData = [
  { id: 1, title: 'Total Revenue', value: 842500, prev: 748200, symbol: '₹', key: 'revenue' },
  { id: 2, title: 'Total Orders', value: 1240, prev: 1145, symbol: '', key: 'orders' },
  { id: 3, title: 'Units Sold', value: 4520, prev: 4292, symbol: '', key: 'units' },
  { id: 4, title: 'Low Stock Alerts', value: 12, prev: 9, symbol: '', key: 'alerts' },
  { id: 5, title: 'Avg Order Value', value: 679, prev: 653, symbol: '₹', key: 'aov' },
];

// --- Generate daily sales data for last 30 days ---
const today = new Date();
const days30 = eachDayOfInterval({ start: subDays(today, 29), end: today });
const seeds = [42, 68, 55, 80, 72, 90, 65, 78, 88, 95, 70, 60, 85, 100, 92, 77, 63, 88, 105, 115, 98, 110, 125, 118, 130, 145, 122, 135, 150, 142];

export const salesTrendData = days30.map((date, i) => ({
  date: format(date, 'dd MMM'),
  revenue: Math.round((seeds[i] || 80) * 1100 + Math.random() * 5000),
  orders: Math.round((seeds[i] || 80) / 3),
}));

// --- Top Products Bar Chart ---
export const topProductsData = [
  { name: 'PVC Pipe 110mm', units: 450, revenue: 202500 },
  { name: 'CPVC Elbow 25mm', units: 380, revenue: 17100 },
  { name: 'Gate Valve Brass', units: 290, revenue: 92800 },
  { name: 'Sintex Tank 500L', units: 210, revenue: 945000 },
  { name: 'PVC Solvent', units: 180, revenue: 32400 },
  { name: 'Garden Hose 15m', units: 160, revenue: 48000 },
];

// --- Category Distribution ---
export const categoryData = [
  { name: 'PVC Fittings', value: 35, color: '#3b82f6' },
  { name: 'CPVC Fittings', value: 25, color: '#8b5cf6' },
  { name: 'Tanks', value: 15, color: '#06b6d4' },
  { name: 'Accessories', value: 15, color: '#10b981' },
  { name: 'Tools', value: 10, color: '#f59e0b' },
];

// --- Inventory Table ---
export const inventoryData = [
  { id: 1, name: 'PVC Pipe 110mm 6m', category: 'PVC', stock: 120, price: 450, sales: 850, minStock: 30, status: 'Good' },
  { id: 2, name: 'CPVC Elbow 25mm', category: 'CPVC', stock: 15, price: 45, sales: 1200, minStock: 50, status: 'Low' },
  { id: 3, name: 'Sintex Tank 1000L', category: 'Tanks', stock: 5, price: 8500, sales: 45, minStock: 10, status: 'Low' },
  { id: 4, name: 'Gate Valve Brass 3/4"', category: 'Accessories', stock: 45, price: 320, sales: 180, minStock: 20, status: 'Medium' },
  { id: 5, name: 'PVC Solvent 250ml', category: 'PVC', stock: 85, price: 180, sales: 640, minStock: 20, status: 'Good' },
  { id: 6, name: 'CPVC Pipe 25mm 3m', category: 'CPVC', stock: 62, price: 210, sales: 420, minStock: 30, status: 'Good' },
  { id: 7, name: 'Float Valve 3/4"', category: 'Accessories', stock: 28, price: 150, sales: 310, minStock: 25, status: 'Medium' },
  { id: 8, name: 'PVC Ball Valve 1"', category: 'PVC', stock: 8, price: 195, sales: 260, minStock: 20, status: 'Low' },
  { id: 9, name: 'Sintex Tank 500L', category: 'Tanks', stock: 12, price: 4800, sales: 72, minStock: 8, status: 'Medium' },
  { id: 10, name: 'Teflon Tape Roll', category: 'Accessories', stock: 200, price: 30, sales: 890, minStock: 50, status: 'Good' },
];

// --- Alerts ---
export const alertsData = [
  { id: 1, type: 'critical', title: 'Critical Stock: CPVC Elbow 25mm', message: 'Only 15 units remaining. Minimum threshold is 50 units.', time: '2 min ago' },
  { id: 2, type: 'critical', title: 'Critical Stock: Sintex Tank 1000L', message: 'Only 5 units remaining. Reorder immediately.', time: '15 min ago' },
  { id: 3, type: 'warning', title: 'Low Stock: PVC Ball Valve 1"', message: 'Only 8 units left. Below minimum threshold of 20.', time: '1 hr ago' },
  { id: 4, type: 'info', title: 'Sales Milestone Reached', message: 'Monthly revenue crossed ₹8 Lakh target!', time: '3 hr ago' },
  { id: 5, type: 'warning', title: 'Supplier Delay: Float Valve', message: 'Expected delivery delayed by 3 days.', time: '5 hr ago' },
];

export const CATEGORIES = ['All', 'PVC', 'CPVC', 'Tanks', 'Accessories', 'Tools'];
