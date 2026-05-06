import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { salesTrendData } from '../data/mockData';

const RADAR_DATA = [
  { subject: 'Service', A: 120, fullMark: 150 },
  { subject: 'Quality', A: 98, fullMark: 150 },
  { subject: 'Speed', A: 86, fullMark: 150 },
  { subject: 'Price', A: 99, fullMark: 150 },
  { subject: 'Support', A: 85, fullMark: 150 },
];

export function AnalyticsView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Advanced Analytics</h2>
        <div className="flex gap-2">
          <select className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Growth Rate', val: '+24.5%', sub: 'vs last month', color: 'text-emerald-400' },
          { label: 'Churn Rate', val: '1.2%', sub: 'performing well', color: 'text-blue-400' },
          { label: 'Customer LTV', val: '₹42,000', sub: 'average per user', color: 'text-purple-400' },
          { label: 'ROI', val: '4.8x', sub: 'marketing spend', color: 'text-cyan-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-[var(--text-primary)] mb-6">Market Share vs Competition</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f620" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col">
          <h3 className="font-semibold text-[var(--text-primary)] mb-6">Service Quality Metrics</h3>
          <div className="flex-1 flex flex-col justify-between">
            {RADAR_DATA.map((d, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">{d.subject}</span>
                  <span className="text-[var(--text-primary)] font-bold">{d.A}%</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.A / 150) * 100}%` }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
