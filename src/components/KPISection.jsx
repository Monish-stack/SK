import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { kpiData } from '../data/mockData';

const ICONS = {
  revenue: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
  ),
  orders: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
  ),
  units: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
  ),
  alerts: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  aov: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  ),
};

const COLORS = {
  revenue: { icon: 'text-blue-400', bg: 'bg-blue-500/10' },
  orders:  { icon: 'text-purple-400', bg: 'bg-purple-500/10' },
  units:   { icon: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  alerts:  { icon: 'text-orange-400', bg: 'bg-orange-500/10' },
  aov:     { icon: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

const SPARKLINES = {
  revenue: [65, 78, 72, 95, 110, 105, 125],
  orders:  [42, 55, 48, 62, 70, 68, 82],
  units:   [120, 145, 138, 162, 180, 175, 210],
  alerts:  [8, 10, 12, 9, 11, 14, 12],
  aov:     [600, 640, 620, 660, 680, 672, 679],
};

const SPARK_COLORS = {
  revenue: '#3b82f6', orders: '#8b5cf6', units: '#06b6d4',
  alerts: '#f97316', aov: '#10b981',
};

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80, h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Separate component so useCounter hook is called at top level, not inside .map() */
function KPICard({ item, index }) {
  const [counted, setCounted] = useState(0);
  const target = typeof item.value === 'number' ? item.value : 0;

  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCounted(target); clearInterval(timer); }
      else setCounted(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  const pct = (((item.value - item.prev) / item.prev) * 100).toFixed(1);
  const isUp = item.value >= item.prev;
  const c = COLORS[item.key];
  const Icon = ICONS[item.key];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="glass-card p-5 cursor-default group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${c.bg}`}>
          <span className={c.icon}><Icon /></span>
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
          isUp
            ? (item.key === 'alerts' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400')
            : 'bg-emerald-500/10 text-emerald-400'
        }`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(pct)}%
        </span>
      </div>

      <p className="text-xs text-[var(--text-muted)] font-medium mb-1">{item.title}</p>
      <p className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
        {item.symbol}{counted.toLocaleString('en-IN')}
      </p>

      <div className="mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
        <Sparkline data={SPARKLINES[item.key]} color={SPARK_COLORS[item.key]} />
      </div>
    </motion.div>
  );
}

export function KPISection({ loading }) {
  if (loading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((item) => (
          <div key={item.id} className="glass-card p-5 space-y-3">
            <div className="skeleton h-10 w-10 rounded-xl" />
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-7 w-32" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiData.map((item, i) => (
        <KPICard key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}
