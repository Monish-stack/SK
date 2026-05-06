import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Mail, Phone, MapPin } from 'lucide-react';

const CUSTOMERS = [
  { name: 'Arun Varma', email: 'arun@example.com', phone: '+91 98765 43210', location: 'Chennai', tier: 'Gold' },
  { name: 'Sita Ram', email: 'sita@example.com', phone: '+91 87654 32109', location: 'Bangalore', tier: 'Silver' },
  { name: 'Meera Devi', email: 'meera@example.com', phone: '+91 76543 21098', location: 'Hyderabad', tier: 'Platinum' },
  { name: 'Karan Johar', email: 'karan@example.com', phone: '+91 65432 10987', location: 'Mumbai', tier: 'Gold' },
];

export function CustomersView() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Customer Database</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
          <UserPlus size={14} /> Add Customer
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input placeholder="Search by name, email, or location..." className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CUSTOMERS.map((c, i) => (
          <div key={i} className="glass-card p-5 flex items-center gap-5 group hover:border-blue-500/30 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center text-blue-400 font-bold text-xl border border-blue-500/10">
              {c.name.charAt(0)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[var(--text-primary)]">{c.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${c.tier === 'Platinum' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                  {c.tier}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                <p className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]"><Mail size={10} /> {c.email}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]"><Phone size={10} /> {c.phone}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]"><MapPin size={10} /> {c.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
