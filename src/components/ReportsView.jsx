import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, ArrowRight } from 'lucide-react';

const REPORTS = [
  { title: 'Monthly Sales Summary', date: 'May 2026', type: 'Financial', size: '2.4 MB' },
  { title: 'Inventory Stock Levels', date: 'May 2026', type: 'Operational', size: '1.1 MB' },
  { title: 'Customer Satisfaction Score', date: 'April 2026', type: 'Analytics', size: '0.8 MB' },
  { title: 'Quarterly Tax Report', date: 'Q1 2026', type: 'Legal', size: '4.5 MB' },
  { title: 'Employee Performance', date: 'April 2026', type: 'Management', size: '1.2 MB' },
];

export function ReportsView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Business Reports</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map((report, i) => (
          <motion.div key={i} whileHover={{ y: -4 }} className="glass-card p-5 group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <FileText size={24} />
              </div>
              <button className="p-2 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-blue-400 transition-all">
                <Download size={18} />
              </button>
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">{report.title}</h3>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-[var(--text-muted)]">
              <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
              <span>•</span>
              <span>{report.type}</span>
              <span>•</span>
              <span>{report.size}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View details</span>
              <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
