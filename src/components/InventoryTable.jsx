import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Search, Download } from 'lucide-react';
import { inventoryData, CATEGORIES } from '../data/mockData';
import { useStore } from '../store/useStore';

const STATUS_STYLE = {
  Good:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Medium: 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  Low:    'bg-red-500/10    text-red-400    border-red-500/20 pulse-glow',
};

function SortIcon({ col, sortCol, sortDir }) {
  if (sortCol !== col) return <ChevronUp size={12} className="text-[var(--text-muted)] opacity-30" />;
  return sortDir === 'asc' ? <ChevronUp size={12} className="text-blue-400" /> : <ChevronDown size={12} className="text-blue-400" />;
}

function exportCSV(rows) {
  const headers = ['Name','Category','Stock','Price (₹)','Monthly Sales','Status'];
  const lines = [headers, ...rows.map(r => [r.name, r.category, r.stock, r.price, r.sales, r.status])];
  const csv = lines.map(l => l.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'sk_inventory.csv'; a.click();
  URL.revokeObjectURL(url);
}

export function InventoryTable({ loading }) {
  const { searchQuery, activeCategory, setActiveCategory } = useStore();
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [localSearch, setLocalSearch] = useState('');

  const q = (searchQuery || localSearch).toLowerCase();

  const rows = useMemo(() => {
    let data = [...inventoryData];
    if (activeCategory !== 'All') data = data.filter(r => r.category === activeCategory);
    if (q) data = data.filter(r => r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
    data.sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol];
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [activeCategory, q, sortCol, sortDir]);

  function toggleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  }

  const COLS = [
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock' },
    { key: 'price', label: 'Price' },
    { key: 'sales', label: 'Sales' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[var(--border)] flex flex-wrap items-center gap-3">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">Inventory Overview</h3>
          <p className="text-xs text-[var(--text-muted)]">{rows.length} of {inventoryData.length} products</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {/* Category filter tabs */}
          <div className="flex gap-1 p-1 bg-[var(--bg-elevated)] rounded-xl">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${activeCategory === cat ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
                {cat}
              </button>
            ))}
          </div>
          {/* Local search */}
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input value={localSearch} onChange={e => setLocalSearch(e.target.value)}
              placeholder="Filter table…"
              className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-1.5 pl-7 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-36" />
          </div>
          {/* Export */}
          <button onClick={() => exportCSV(rows)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <Download size={13} /> CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-10 rounded-lg" />)}
          </div>
        ) : (
          <table className="w-full text-sm" role="table" aria-label="Inventory table">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {COLS.map(col => (
                  <th key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-primary)] transition-colors select-none"
                    scope="col"
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      <SortIcon col={col.key} sortCol={sortCol} sortDir={sortDir} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-[var(--bg-elevated)] transition-colors group cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                      </div>
                      <span className="font-medium text-[var(--text-primary)]">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--text-secondary)]">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-xs">{row.category}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[var(--text-primary)]">
                    <span className={row.stock <= row.minStock ? 'text-red-400' : ''}>{row.stock}</span>
                    <span className="text-[var(--text-muted)] text-xs"> units</span>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--text-primary)] font-medium">₹{row.price.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-primary)]">{row.sales}</span>
                      <div className="w-16 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((row.sales / 1200) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_STYLE[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-[var(--text-muted)]">No products match your filters.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
