import { create } from 'zustand';
import { DashboardState } from '../types/dashboard';

export const useDashboardStore = create<DashboardState>((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  dateRange: {
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  },
  activeCategory: 'All',
  searchQuery: '',
  setTheme: (theme) => set({ theme }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
