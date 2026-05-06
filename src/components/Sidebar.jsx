import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingCart, BarChart2,
  Settings, Bell, HelpCircle, LogOut, ChevronLeft,
  Layers, Zap, Users, FileText,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, activeSection, setActiveSection } = useStore();

  const NAV = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Package, label: 'Inventory' },
    { icon: ShoppingCart, label: 'Orders' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Users, label: 'Customers' },
    { icon: FileText, label: 'Reports' },
  ];
  const BOTTOM_NAV = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
    { icon: LogOut, label: 'Sign Out' },
  ];

  return (
    <AnimatePresence>
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full z-30 flex flex-col glass-card rounded-none border-r"
        style={{ borderRadius: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border)] min-h-[64px]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Layers size={18} className="text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">SK Plumbing</p>
                <p className="text-[11px] text-[var(--text-muted)]">Solutions Dashboard</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {NAV.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveSection(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                activeSection === label
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="py-4 px-2 border-t border-[var(--border)] space-y-1">
          {BOTTOM_NAV.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => {
                if (label === 'Sign Out') {
                  alert('Signing out...');
                  // Implement actual logout logic here
                } else {
                  setActiveSection(label);
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeSection === label
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="whitespace-nowrap">{label}</span>}
            </button>
          ))}
        </div>

        {/* Collapse button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full glass-card border flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-10"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }}>
            <ChevronLeft size={12} />
          </motion.div>
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
