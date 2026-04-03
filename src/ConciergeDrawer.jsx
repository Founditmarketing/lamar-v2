import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, ChevronRight, Briefcase } from 'lucide-react';

export default function ConciergeDrawer({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(4, 11, 20, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
            }}
          />
          <motion.div
            className="drawer-container"
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 500,
              background: 'rgba(9, 27, 51, 0.85)',
              backdropFilter: 'blur(30px) saturate(200%)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 80px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div className="modal-header" style={{ padding: '32px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 500, fontFamily: "'Playfair Display', serif" }}>Digital Concierge</h3>
                <p style={{ fontSize: 13, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginTop: 4 }}>Priority Routing Active</p>
              </div>
              <button 
                onClick={onClose}
                className="hover-glow modal-btn-close" 
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat/Form Area */}
            <div className="drawer-inner" style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff', flexShrink: 0 }}>
                  <Briefcase size={20} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                  Welcome to the priority queue. To ensure we route you to the correct market president for immediate execution, please confirm your primary objective below.
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("System encrypted. Request dispatched to requested president."); }}>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontWeight: 700 }}>Select Routing Module</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {["Commercial Real Estate Structuring", "Private Wealth Advisory", "M&A Capital Deployment", "Treasury Orchestration"].map((opt, i) => (
                      <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, cursor: 'pointer', transition: 'all 0.3s' }} className="hover-lift">
                        <input type="radio" name="objective" style={{ accentColor: '#00e5ff', width: 16, height: 16 }} required />
                        <span style={{ fontSize: 15, fontWeight: 500 }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                   <label style={{ display: 'block', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontWeight: 700 }}>Identification</label>
                   <input required className="form-input" style={{ marginBottom: 12, background: 'rgba(0,0,0,0.2)' }} placeholder="Corporate Entity or Full Name" />
                   <input required type="email" className="form-input" style={{ marginBottom: 12, background: 'rgba(0,0,0,0.2)' }} placeholder="Authorized Email Address" />
                   <div style={{ position: 'relative' }}>
                     <textarea required className="form-input" rows={3} style={{ background: 'rgba(0,0,0,0.2)', resize: 'vertical' }} placeholder="Briefly detail capital parameters..." />
                   </div>
                </div>

                <button type="submit" className="hover-glow" style={{ width: '100%', padding: 20, background: '#00e5ff', color: 'var(--navy)', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  Deploy Request <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
