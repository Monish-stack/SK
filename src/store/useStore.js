import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  searchQuery: '',
  activeCategory: 'All',
  dateRange: '30d',
  notifications: [],

  toggleTheme: () =>
    set((s) => {
      const next = s.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      return { theme: next };
    }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveCategory: (c) => set({ activeCategory: c }),
  setDateRange: (r) => set({ dateRange: r }),
}));
