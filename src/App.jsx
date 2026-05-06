import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, RefreshCw, Download } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { KPISection } from './components/KPISection';
import { ChartsSection } from './components/ChartsSection';
import { InventoryTable } from './components/InventoryTable';
import { AlertsPanel } from './components/AlertsPanel';
import { OrdersView } from './components/OrdersView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { ReportsView } from './components/ReportsView';
import { HelpView } from './components/HelpView';
import { CustomersView } from './components/CustomersView';
import { useStore } from './store/useStore';
import { format } from 'date-fns';

// Simulate live "last updated" ticker
function useLastUpdated() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Simulate initial loading skeleton
function useLoading(ms = 1200) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(id);
  }, []);
  return loading;
}

// Filter chip button
function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
        active
          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
          : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-blue-500/50 hover:text-[var(--text-primary)]'
      }`}
    >
      {label}
    </button>
  );
}

export default function App() {
  const { sidebarOpen, theme, dateRange, setDateRange, activeSection } = useStore();
  const loading = useLoading(1400);
  const lastUpdated = useLastUpdated();

  // Apply theme class on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const sidebarW = sidebarOpen ? 240 : 64;

  const renderContent = () => {
    switch (activeSection) {
      case 'Inventory':
        return <InventoryTable loading={loading} />;
      case 'Orders':
        return <OrdersView />;
      case 'Analytics':
        return <AnalyticsView />;
      case 'Reports':
        return <ReportsView />;
      case 'Customers':
        return <CustomersView />;
      case 'Settings':
        return <SettingsView />;
      case 'Help':
        return <HelpView />;
      case 'Dashboard':
      default:
        return (
          <>
            <KPISection loading={loading} />
            <ChartsSection loading={loading} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-2">
                <InventoryTable loading={loading} />
              </div>
              <div>
                <AlertsPanel loading={loading} />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`} style={{ background: 'var(--bg-base)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main area offset by sidebar width */}
      <motion.div
        animate={{ marginLeft: sidebarW }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex flex-col min-h-screen"
      >
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 space-y-5 max-w-[1600px] w-full mx-auto">

          {/* Page heading + breadcrumb */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-1" aria-label="Breadcrumb">
                <span>Home</span><span>/</span><span className="text-[var(--text-primary)]">{activeSection}</span>
              </nav>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                {activeSection === 'Dashboard' ? 'Sales & Inventory ' : `${activeSection} `}
                <span className="gradient-text">{activeSection === 'Dashboard' ? 'Overview' : 'Panel'}</span>
              </h1>
            </div>

            {/* Date range quick-filter */}
            {activeSection === 'Dashboard' && (
              <div className="flex flex-wrap items-center gap-2">
                {['7d','30d','90d','1y'].map(r => (
                  <Chip key={r} label={{ '7d':'7 Days','30d':'30 Days','90d':'90 Days','1y':'1 Year' }[r]}
                    active={dateRange === r} onClick={() => setDateRange(r)} />
                ))}
                <button className="flex items-center gap-1.5 px-3 py-1.5 glass-card text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg transition-colors border border-[var(--border)]">
                  <Calendar size={13} /> Custom
                </button>
              </div>
            )}
          </div>

          {/* Filter bar */}
          {activeSection === 'Dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-3 flex flex-wrap items-center gap-3"
            >
              <Filter size={14} className="text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-muted)] font-medium">Active Filters:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Last {dateRange}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                All Regions
              </span>
              <div className="ml-auto flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Live data
                </span>
                <span>Last updated: {format(lastUpdated, 'hh:mm a')}</span>
                <button className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
            </motion.div>
          )}

          {/* Dynamic Section Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <footer className="border-t border-[var(--border)] pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-[var(--text-muted)]">
            <p>© 2026 <strong className="text-[var(--text-secondary)]">SK Plumbing Solutions</strong>. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Last updated: {format(lastUpdated, 'dd MMM yyyy, hh:mm a')}</span>
              <span className="italic opacity-70">Data is simulated for prototype</span>
              <button className="hover:text-blue-400 transition-colors">Support</button>
            </div>
          </footer>
        </main>
      </motion.div>
    </div>
  );
}
