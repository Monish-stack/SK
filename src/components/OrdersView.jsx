import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, MoreVertical, Eye } from 'lucide-react';

const ORDERS = [
  { id: 'ORD-8821', customer: 'Rajesh Kumar', date: '2026-05-06', status: 'Delivered', amount: 12500, items: 3 },
  { id: 'ORD-8822', customer: 'Amit Singh', date: '2026-05-06', status: 'Processing', amount: 4200, items: 1 },
  { id: 'ORD-8823', customer: 'Priya Sharma', date: '2026-05-05', status: 'Shipped', amount: 8900, items: 2 },
  { id: 'ORD-8824', customer: 'Suresh Raina', date: '2026-05-05', status: 'Cancelled', amount: 1500, items: 1 },
  { id: 'ORD-8825', customer: 'Vikram Seth', date: '2026-05-04', status: 'Delivered', amount: 22000, items: 5 },
];

const STATUS_MAP = {
  Delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function OrdersView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Orders Management</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 glass-card text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg transition-colors border border-[var(--border)]">
            <Download size={13} /> Export PDF
          </button>
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
            Create Order
          </button>
        </div>
      </div>

      <div className="glass-card p-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input placeholder="Search orders, customers..." className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
          <Filter size={14} /> Filters
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]/50">
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Order ID</th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Customer</th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Date</th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {ORDERS.map((order, i) => (
              <motion.tr key={order.id} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-blue-400 font-medium">{order.id}</td>
                <td className="px-5 py-4 font-medium text-[var(--text-primary)]">{order.customer}</td>
                <td className="px-5 py-4 text-[var(--text-secondary)]">{order.date}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_MAP[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 font-bold text-[var(--text-primary)]">₹{order.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 hover:bg-blue-500/10 text-[var(--text-muted)] hover:text-blue-400 rounded-lg transition-all"><Eye size={14} /></button>
                    <button className="p-1.5 hover:bg-gray-500/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg transition-all"><MoreVertical size={14} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
