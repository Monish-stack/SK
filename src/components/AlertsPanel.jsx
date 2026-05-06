import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, X } from 'lucide-react';
import { alertsData } from '../data/mockData';

const TYPE_MAP = {
  critical: { icon: AlertTriangle, cls: 'text-red-400', bg: 'bg-red-500/5 border-red-500/20', dot: 'bg-red-500', glow: true },
  warning:  { icon: AlertTriangle, cls: 'text-amber-400', bg: 'bg-amber-500/5 border-amber-500/20', dot: 'bg-amber-500', glow: false },
  info:     { icon: Info,          cls: 'text-blue-400',  bg: 'bg-blue-500/5  border-blue-500/20',  dot: 'bg-blue-500',  glow: false },
};

export function AlertsPanel({ loading }) {
  if (loading) {
    return (
      <div className="glass-card p-5 space-y-3">
        <div className="skeleton h-5 w-32 mb-4" />
        {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">Alerts & Notifications</h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
          {alertsData.filter(a => a.type === 'critical').length} Critical
        </span>
      </div>

      <div className="space-y-3">
        {alertsData.map((alert, i) => {
          const { icon: Icon, cls, bg, dot, glow } = TYPE_MAP[alert.type];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`relative flex gap-3 p-3.5 rounded-xl border ${bg} ${glow ? 'pulse-glow' : ''}`}
            >
              <div className={`mt-0.5 flex-shrink-0 ${cls}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{alert.title}</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">{alert.message}</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{alert.time}</p>
              </div>
              <button
                className="flex-shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors self-start"
                aria-label="Dismiss alert"
              >
                <X size={13} />
              </button>
            </motion.div>
          );
        })}
      </div>

      <button className="mt-4 w-full py-2 text-xs text-blue-400 hover:text-blue-300 border border-blue-500/20 rounded-xl hover:bg-blue-500/5 transition-all font-medium">
        View All Alerts →
      </button>
    </motion.div>
  );
}
