import React, { useState } from 'react';
import { Bell, Sun, Moon, Search, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { alertsData } from '../data/mockData';
import { format } from 'date-fns';

export function Topbar() {
  const { theme, toggleTheme, toggleSidebar, searchQuery, setSearchQuery } = useStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const criticalCount = alertsData.filter((a) => a.type === 'critical').length;

  return (
    <header className="sticky top-0 z-20 h-16 glass-card rounded-none border-b border-[var(--border)] flex items-center px-4 gap-4" style={{ borderRadius: 0 }}>
      {/* Mobile hamburger */}
      <button onClick={toggleSidebar} className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-elevated)]">
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="search"
          placeholder="Search products, orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-2">
        {/* Date */}
        <span className="hidden lg:block text-xs text-[var(--text-muted)]">
          {format(new Date(), 'EEEE, dd MMM yyyy')}
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-xl hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs((p) => !p)}
            className="relative p-2 rounded-xl hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors"
            aria-label={`${criticalCount} notifications`}
          >
            <Bell size={18} />
            {criticalCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-surface)]" />
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 glass-card border border-[var(--border)] overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-[var(--border)] flex justify-between items-center">
                  <span className="font-semibold text-sm text-[var(--text-primary)]">Notifications</span>
                  <span className="text-xs text-blue-400 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[var(--border)]">
                  {alertsData.map((a) => (
                    <div key={a.id} className="px-4 py-3 hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer">
                      <div className="flex gap-2 items-start">
                        <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${a.type === 'critical' ? 'bg-red-500' : a.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-primary)]">{a.title}</p>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[var(--border)]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
            <User size={15} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-bold text-[var(--text-primary)] leading-tight">S. Kumar</p>
            <p className="text-[10px] text-[var(--text-muted)]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
