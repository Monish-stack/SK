import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { salesTrendData, topProductsData, categoryData } from '../data/mockData';

const TOOLTIP_STYLE = {
  contentStyle: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: '0.75rem',
    color: 'var(--text-primary)',
    fontSize: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  cursor: { fill: 'rgba(59,130,246,0.06)' },
};

function SalesChart({ range }) {
  const data = range === '7d' ? salesTrendData.slice(-7) : salesTrendData;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="grad-orders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
        <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
        <YAxis yAxisId="right" orientation="right" hide />
        <Tooltip {...TOOLTIP_STYLE} formatter={(v, n) => [n === 'revenue' ? `₹${v.toLocaleString('en-IN')}` : v, n === 'revenue' ? 'Revenue' : 'Orders']} />
        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#grad-revenue)" dot={false} activeDot={{ r: 5, fill: '#3b82f6' }} yAxisId="left" />
        <Area type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} fill="url(#grad-orders)" dot={false} activeDot={{ r: 5, fill: '#8b5cf6' }} yAxisId="right" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function ProductsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={topProductsData} margin={{ top: 4, right: 4, bottom: 40, left: -10 }} barSize={24}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" />
        <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
        <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [v, 'Units Sold']} />
        <Bar dataKey="units" radius={[6, 6, 0, 0]}>
          {topProductsData.map((_, i) => (
            <Cell key={i} fill={['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444'][i % 6]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function CategoryPie() {
  const [active, setActive] = useState(null);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%" cy="45%"
          innerRadius="55%" outerRadius="75%"
          paddingAngle={3}
          dataKey="value"
          onMouseEnter={(_, i) => setActive(i)}
          onMouseLeave={() => setActive(null)}
          animationBegin={200}
          animationDuration={800}
        >
          {categoryData.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.color}
              opacity={active === null || active === i ? 1 : 0.45}
              style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
            />
          ))}
        </Pie>
        <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [`${v}%`, 'Share']} />
        <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ChartsSection({ loading }) {
  const [activeTab, setActiveTab] = useState('area');
  const [range, setRange] = useState('30d');

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5 h-72"><div className="skeleton w-full h-full rounded-xl" /></div>
        <div className="glass-card p-5 h-72"><div className="skeleton w-full h-full rounded-xl" /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Sales chart */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass-card p-5 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">Sales Performance</h3>
            <p className="text-xs text-[var(--text-muted)]">Revenue & order trends</p>
          </div>
          <div className="flex gap-2">
            {['7d','30d'].map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${range === r ? 'bg-blue-600 text-white' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
                {r === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 min-h-[220px]">
          <SalesChart range={range} />
        </div>
        <div className="flex gap-4 mt-3 pt-3 border-t border-[var(--border)]">
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Revenue</span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />Orders</span>
        </div>
      </motion.div>

      {/* Category + Products tabs */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5 flex flex-col">
        <div className="flex gap-1 mb-4 p-1 bg-[var(--bg-elevated)] rounded-xl">
          {[['cat','Categories'],['bar','Products']].map(([k, l]) => (
            <button key={k} onClick={() => setActiveTab(k)}
              className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${activeTab === k ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-muted)]'}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex-1 min-h-[220px]">
          {activeTab === 'cat' ? <CategoryPie /> : <ProductsChart />}
        </div>
      </motion.div>
    </div>
  );
}
