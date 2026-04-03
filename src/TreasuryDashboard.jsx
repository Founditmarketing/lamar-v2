import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, DollarSign, Activity, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', liquidity: 4000, outbound: 2400 },
  { name: 'Tue', liquidity: 3000, outbound: 1398 },
  { name: 'Wed', liquidity: 2000, outbound: 9800 },
  { name: 'Thu', liquidity: 2780, outbound: 3908 },
  { name: 'Fri', liquidity: 1890, outbound: 4800 },
  { name: 'Sat', liquidity: 2390, outbound: 3800 },
  { name: 'Sun', liquidity: 3490, outbound: 4300 },
];

const customTooltipStyle = {
  backgroundColor: 'rgba(9, 27, 51, 0.9)',
  border: '1px solid rgba(0, 229, 255, 0.3)',
  borderRadius: '12px',
  color: '#fff',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  padding: '12px'
};

export default function TreasuryDashboard({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(4, 11, 20, 0.8)', backdropFilter: 'blur(12px)' }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 1200,
              height: '85vh',
              background: '#0a1019',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24,
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 500, fontFamily: "'Playfair Display', serif" }}>Advanced Treasury</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Corporate Liquidity & Transaction Orchestration</p>
              </div>
              <button 
                onClick={onClose}
                className="hover-glow" 
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Dashboard Grid */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }} className="grid-3">
              
              {/* Main Chart Span */}
              <div style={{ gridColumn: 'span 2', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 500 }}>Real-Time Liquidity</h4>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 13, color: '#00e5ff', background: 'rgba(0,229,255,0.1)', padding: '4px 12px', borderRadius: 20 }}>Net Pos: +$4.2M</span>
                  </div>
                </div>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#00e5ff' }} />
                      <Area type="monotone" dataKey="liquidity" stroke="#00e5ff" strokeWidth={3} fillOpacity={1} fill="url(#colorLiquidity)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Side Panel Metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 24 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
                     <DollarSign size={18} /> <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Total Deposits</span>
                   </div>
                   <h2 style={{ fontSize: 36, fontWeight: 500 }}>$142.5M</h2>
                   <p style={{ fontSize: 14, color: '#00e5ff', display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}><TrendingUp size={14}/> +12.4% vs Last Month</p>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 24, flex: 1 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 500, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={18} color="#00e5ff" /> Recent Transactions</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { dest: "Payroll ACH Batch", type: "Outbound", amt: "-$245,000.00", status: "Processed" },
                      { dest: "Commercial Wire - R.E.", type: "Outbound", amt: "-$1.2M", status: "Clearing" },
                      { dest: "Lockbox Receipts", type: "Inbound", amt: "+$84,200.00", status: "Processed" }
                    ].map((tx, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500 }}>{tx.dest}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{tx.type} • <span style={{ color: tx.status === 'Clearing' ? '#ffcc00' : '#00e5ff' }}>{tx.status}</span></div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace' }}>
                          {tx.amt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
