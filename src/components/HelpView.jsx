import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, BookOpen, Video, ExternalLink } from 'lucide-react';

export function HelpView() {
  const FAQS = [
    { q: 'How do I add a new product?', a: 'Go to the Inventory tab and click on the "Add Product" button at the top right.' },
    { q: 'Can I export reports to Excel?', a: 'Yes, every table has a "Download CSV" or "Export" button in its header.' },
    { q: 'How to change the dashboard theme?', a: 'Navigate to Settings > Appearance or use the sun/moon icon in the Topbar.' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">How can we help?</h2>
        <div className="relative max-w-xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input placeholder="Search documentation, guides..." className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: BookOpen, label: 'Documentation', sub: 'Read the full guide' },
          { icon: Video, label: 'Video Tutorials', sub: 'Watch how-to videos' },
          { icon: MessageCircle, label: 'Live Support', sub: 'Chat with our team' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 text-center space-y-3 hover:border-blue-500/50 transition-colors cursor-pointer group">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <item.icon size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{item.label}</h3>
              <p className="text-xs text-[var(--text-muted)]">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-card p-4 space-y-2">
              <p className="font-medium text-sm text-[var(--text-primary)]">{faq.q}</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 rounded-3xl p-8 text-center text-white space-y-4 shadow-2xl shadow-blue-500/30">
        <h3 className="text-xl font-bold">Still need help?</h3>
        <p className="text-sm text-blue-100 max-w-md mx-auto">Our support team is available 24/7 to help you with any technical issues or business questions.</p>
        <button className="px-6 py-2.5 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto">
          Contact Support <ExternalLink size={14} />
        </button>
      </div>
    </motion.div>
  );
}
