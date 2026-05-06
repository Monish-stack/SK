import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Globe, CreditCard, Save } from 'lucide-react';
import { useStore } from '../store/useStore';

export function SettingsView() {
  const { theme, toggleTheme } = useStore();

  const SECTIONS = [
    { icon: User, label: 'Profile Settings', desc: 'Manage your public info and account details' },
    { icon: Bell, label: 'Notifications', desc: 'Configure how you receive alerts and updates' },
    { icon: Shield, label: 'Security', desc: 'Password, 2FA, and login history' },
    { icon: Globe, label: 'Regional', desc: 'Currency, timezone, and language' },
    { icon: CreditCard, label: 'Billing', desc: 'Subscription plan and payment methods' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Settings</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
          <Save size={14} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          {SECTIONS.map((s, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'}`}>
              <s.icon size={18} />
              {s.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Appearance</h3>
              <div className="flex items-center justify-between p-4 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border)]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Dark Mode</p>
                  <p className="text-xs text-[var(--text-muted)]">Switch between light and dark themes</p>
                </div>
                <button onClick={toggleTheme} className={`w-12 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <motion.div animate={{ x: theme === 'dark' ? 26 : 2 }} className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Full Name</label>
                  <input defaultValue="Admin User" className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Email Address</label>
                  <input defaultValue="admin@skplumbing.com" className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Business Address</label>
                <textarea rows={3} defaultValue="123 Industry Ave, Chennai, Tamil Nadu" className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
