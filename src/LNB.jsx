import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { MapPin, Phone, ArrowRight, ShieldCheck, PieChart, Briefcase, Home, Smartphone, ChevronRight, Menu, X, KeySquare } from "lucide-react";

import ConciergeDrawer from "./ConciergeDrawer";
import TreasuryDashboard from "./TreasuryDashboard";

/* ═══════════════════════════════════════════════
   LAMAR NATIONAL BANK — WORLD CLASS v5 (Fintech Edge)
   Stripe-level Interactions · Fintech Tone · Paris Roots
   ═══════════════════════════════════════════════ */

const LOGO = "https://www.lamarnationalbank.com/wp-content/uploads/2020/12/output-onlinepngtools-15-2-980x237-1.png";
const LOGO_MARK = "https://www.lamarnationalbank.com/wp-content/uploads/2025/01/pr23110b.png";
const IMG_HERO = "/hero.png";
const IMG_ABOUT = "/about.png";

const LOCS = [
  { city: "Paris", st: "TX", addr: "200 S Collegiate Dr.", zip: "75460", ph: "(903) 785-0701", flag: true },
  { city: "Frisco", st: "TX", addr: "6801 Gaylord Pkwy.", zip: "75034", ph: "(469) 956-4336" },
  { city: "Celina", st: "TX", addr: "110 S Preston Rd.", zip: "75009", ph: "(469) 296-1192" },
  { city: "Reno", st: "TX", addr: "6270 Lamar Rd.", zip: "75462", ph: "(903) 785-0701" },
  { city: "Northlake", st: "TX", addr: "100 Plaza Place, Ste. 100", zip: "76226", ph: "(972) 318-1060" },
  { city: "Anna", st: "TX", addr: "1515 W White St.", zip: "75409", ph: "(945) 732-4300" },
  { city: "College Station", st: "TX", addr: "4282 Boonville Rd., Ste. 200", zip: "77802", ph: "(979) 500-3609", lpo: true },
];

const TESTS = [
  { q: "The level of operational precision we demand from our banking partner was finally met here. They move with tech-startup speed but secure backing.", n: "Michael T.", t: "Real Estate Developer" },
  { q: "What I appreciate most is the proactive insight. Because they took the time to map our business metrics, they anticipated our scaling needs before we even called them.", n: "James Black", t: "Owner, Homebody Accents" },
  { q: "We moved our entire district's treasury here two years ago. When we have complex compliance questions, we get immediate, top-tier executive responses. Invaluable.", n: "Brittany Floyd", t: "Gunter ISD" },
  { q: "World-class digital tools paired with presidents who actually pick up the phone. It's the exact hybrid model modern enterprises need to scale.", n: "Lauren Douglas", t: "Fintech Partner" }
];

const SVCS = [
  { id: "wealth", title: "Personal Wealth", desc: "Private banking architecture designed around liquidity and long-term asset growth.", icon: ShieldCheck, col: "span 4" },
  { id: "business", title: "Business & Enterprise", desc: "Scalable commercial solutions with dedicated market presidents who understand capital markets.", icon: Briefcase, col: "span 8" },
  { id: "cre", title: "Commercial Real Estate", desc: "Streamlined underwriting and local decision-making for faster acquisitions and development.", icon: Home, col: "span 6" },
  { id: "treasury", title: "Advanced Treasury", desc: "Corporate-grade liquidity management, fraud prevention, and real-time reconciliation.", icon: PieChart, col: "span 6" },
  { id: "1031", title: "1031 Exchange", desc: "Specialized, tax-deferred exchange mechanics for sophisticated real estate investors.", icon: KeySquare, col: "span 5" },
  { id: "concierge", title: "The Digital Concierge", desc: "Direct priority routing to your market president. Skip the wait. Talk to decision-makers.", icon: Smartphone, col: "span 7", highlight: true },
];

// Motion Variants
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

// WOW FACTOR: 3D Tilt Card Mechanics
const TiltCard = ({ children, className, style }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000, ...style }}
    >
      <div style={{ transform: "translateZ(30px)", height: "100%", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function LNB() {
  const [sY, setSY] = useState(0);
  const [menu, setMenu] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [activeLoc, setActiveLoc] = useState(LOCS[0]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const yHeroImg = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yAboutText = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

  useEffect(() => {
    const handleScroll = () => setSY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  }, []);

  const navSolid = sY > 50;

  return (
    <div className="app-wrapper" style={{ background: "var(--navy)", color: "#fff" }}>
      {/* ═══════ HEADER (SMART LOGO SWAP) ═══════ */}
      <header className="app-header" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: navSolid ? "12px 0" : "24px 0",
        background: navSolid ? "rgba(9, 27, 51, 0.85)" : "transparent",
        backdropFilter: navSolid ? "blur(20px) saturate(180%)" : "none",
        borderBottom: navSolid ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", height: 40, width: 200, justifyContent: "flex-start" }}>
            {/* Dynamic Logo Rendering */}
            <img 
              src={LOGO} 
              alt="Lamar National Bank" 
              style={{ 
                height: navSolid ? 28 : 36, 
                transition: "all 0.3s ease",
                filter: "brightness(0) invert(1)",
                objectFit: "contain"
              }} 
            />
          </button>
          
          <nav className="desktop-nav" style={{ gap: 32, alignItems: "center" }}>
            {["Services", "Approach", "Locations", "Stories", "Contact"].map((l) => (
              <button key={l} onClick={() => go(l.toLowerCase())} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.85)" }}>
                {l}
              </button>
            ))}
            <a href="#" className="hover-glow" style={{ padding: "12px 28px", background: "#00e5ff", color: "var(--navy)", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", borderRadius: 8, transition: "all 0.3s", boxShadow: "0 0 15px rgba(0, 229, 255, 0.3)" }}>
              Online Banking
            </a>
          </nav>

          <button className="mobile-toggle" onClick={() => setMenu(!menu)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", zIndex: 9999, position: "relative" }}>
            {menu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", inset: 0, background: "rgba(4, 11, 20, 0.98)", backdropFilter: "blur(20px)", zIndex: 900, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 32 }}>
            {["Services", "Approach", "Locations", "Stories", "Contact"].map((l) => (
              <button key={l} onClick={() => go(l.toLowerCase())} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, fontWeight: 500, fontFamily: "'Playfair Display', serif" }}>
                {l}
              </button>
            ))}
            <button onClick={() => { setMenu(false); setIsConciergeOpen(true); }} className="hover-glow" style={{ padding: "16px 32px", background: "#00e5ff", color: "var(--navy)", fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", border: "none", borderRadius: 12, marginTop: 24 }}>
              Digital Concierge
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ position: "relative" }}>
        {/* Ambient Glowing Orbs */}
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 60%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(29, 77, 138, 0.15) 0%, transparent 60%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 60%)", borderRadius: "50%", pointerEvents: "none" }} />
        
        {/* ═══════ HERO (FINTECH EDGE) ═══════ */}
        <section id="home" style={{ paddingTop: "160px", paddingBottom: "100px", minHeight: "85vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />
          
          <div className="container grid-2" style={{ alignItems: "center", position: "relative", zIndex: 2 }}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 32, padding: "8px 16px", background: "rgba(0, 229, 255, 0.1)", borderRadius: 30, border: "1px solid rgba(0, 229, 255, 0.2)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 10px #00e5ff" }} />
                <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#00e5ff", fontWeight: 700 }}>Built in Paris, Texas</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} style={{ fontSize: "clamp(48px, 6vw, 84px)", fontWeight: 500, lineHeight: 1.05, marginBottom: 24, letterSpacing: "-1px" }}>
                Capital Without the Bureaucracy.
              </motion.h1>
              
              <motion.p variants={fadeInUp} style={{ fontSize: "clamp(17px, 1.6vw, 21px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 520, marginBottom: 48 }}>
                Forty years of quiet, heavy-lifting financial power masked as Texas hospitality. Growth without the red tape. We know your business, not just your account number.
              </motion.p>
              
              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                <button onClick={() => setIsConciergeOpen(true)} className="hover-glow" style={{ cursor: "pointer", border: "none", padding: "18px 40px", background: "#00e5ff", color: "var(--navy)", fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", borderRadius: 12, boxShadow: "0 0 20px rgba(0, 229, 255, 0.2)" }}>
                  Open an Account
                </button>
                <button onClick={() => setIsConciergeOpen(true)} className="hover-lift" style={{ cursor: "pointer", padding: "16px 38px", background: "rgba(255,255,255,0.03)", color: "#fff", fontWeight: 600, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, backdropFilter: "blur(10px)" }}>
                  Apply for a Loan
                </button>
              </motion.div>
            </motion.div>

            <motion.div className="hero-img-wrap" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ position: "relative", height: "100%", minHeight: "550px", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <motion.img src={IMG_HERO} alt="Modern Texas Bank Exterior" style={{ width: "100%", height: "100%", objectFit: "cover", y: yHeroImg, scale: 1.1 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, var(--navy), transparent)" }} />
            </motion.div>
          </div>
        </section>

        {/* ═══════ APPROACH (STICKY SCROLL-JACKING) ═══════ */}
        <section id="approach" style={{ background: "var(--navy-mid)", position: "relative" }}>
          <div className="container grid-2" style={{ alignItems: "flex-start" }}>
            
            {/* Sticky Text Side */}
            <motion.div className="sticky-desk" style={{ position: "sticky", top: "180px", paddingRight: "5%", y: yAboutText }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 40, height: 1, background: "#00e5ff" }} />
                <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#00e5ff", fontWeight: 700 }}>Our Edge</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, marginBottom: 32, lineHeight: 1.1 }}>
                Wall Street Engine.<br/><span style={{ color: "#00e5ff", fontStyle: "italic" }}>Paris, Texas Soul.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
                Our model is built on an aggressive deployment of capital married to hyper-local relationships. Every market president holds the authority to approve loans, restructure debt, and fast-track complex deals.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: 40 }}>
                We removed the endless committees and the corporate red tape. The result? Execution speed that outpaces megabanks, with a partnership mentality that outlasts market cycles.
              </motion.p>
              <motion.button variants={fadeInUp} onClick={() => setIsConciergeOpen(true)} className="hover-glow" style={{ cursor: "pointer", padding: 0, background: "none", border: "none", display: "inline-flex", alignItems: "center", gap: 12, color: "#00e5ff", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none" }}>
                Meet the Leadership <ArrowRight size={18} />
              </motion.button>
            </motion.div>

            {/* Scrolling Image Side */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ borderRadius: 24, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
               <img src={IMG_ABOUT} alt="Relationship Banking" style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
            </motion.div>
          </div>
        </section>

        {/* ═══════ SERVICES (BENTO GRID WITH 3D TILT & NO ORPHAN) ═══════ */}
        <section id="services" style={{ background: "transparent", position: "relative", zIndex: 10, marginTop: "-80px" }}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 80px" }}>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, marginBottom: 16 }}>Financial Infrastructure</h2>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>Enterprise-grade tooling, backed by specialized market presidents.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bento-grid">
              {SVCS.map((s, i) => (
                <TiltCard key={i} className="hover-lift bento-item" style={{ gridColumn: s.col, padding: "40px", background: s.highlight ? "#04101e" : "rgba(255,255,255,0.02)", border: s.highlight ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,255,255,0.05)", borderRadius: 24, textDecoration: "none", color: "inherit", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                  <div 
                    style={{ position: "absolute", inset: 0, zIndex: 10 }}
                    onClick={() => {
                      if (s.id === 'treasury') setIsDashboardOpen(true);
                      else setIsConciergeOpen(true);
                    }}
                  />
                  {s.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #00e5ff, transparent)" }} />}
                  
                  {/* Visual Differentiators */}
                  {s.id === 'treasury' && (
                    <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '50%', opacity: 0.1, pointerEvents: 'none' }} viewBox="0 0 100 50" preserveAspectRatio="none">
                      <path d="M0,50 L0,30 Q10,40 20,20 T40,10 T60,30 T80,10 L100,20 L100,50 Z" fill="#00e5ff" />
                    </svg>
                  )}
                  {s.id === 'cre' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at bottom right, rgba(255,255,255,0.03) 0%, transparent 60%)', pointerEvents: 'none' }} />
                  )}
                  {s.id === 'concierge' && (
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', top: 40, left: 40, width: 56, height: 56, borderRadius: '16px', border: '1px solid #00e5ff', pointerEvents: 'none' }} />
                  )}

                  <div style={{ width: 56, height: 56, borderRadius: 16, background: s.highlight ? "rgba(0,229,255,0.1)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", color: s.highlight ? "#00e5ff" : "#fff", marginBottom: 24, position: 'relative', zIndex: 2 }}>
                    <s.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 500, marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", marginBottom: 32, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: s.highlight ? "#00e5ff" : "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    {s.highlight ? "Connect Now" : "Explore Module"} <ChevronRight size={14} />
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════ LOCATIONS (INTERACTIVE MAP LAYOUT) ═══════ */}
        <section id="locations" style={{ background: "transparent", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container" style={{ maxWidth: 1400, padding: 0 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: 64, padding: "0 5%" }}>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500 }}>Texas Footprint</h2>
            </motion.div>

            <div className="grid-2" style={{ gap: 0, alignItems: 'stretch' }}>
              {/* Left Side: Locations Scroller */}
              <div style={{ padding: "0 5% 5% 5%", maxHeight: "600px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, scrollbarWidth: "thin" }}>
                {LOCS.map((l, i) => (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: i * 0.05 }} key={i} className={`hover-lift bento-item`} onClick={() => setActiveLoc(l)} style={{ padding: "24px 32px", borderRadius: 20, background: activeLoc.city === l.city ? "rgba(0,229,255,0.05)" : "rgba(255,255,255,0.02)", border: activeLoc.city === l.city ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.3s ease" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: l.flag || activeLoc.city === l.city ? "#00e5ff" : "transparent", transition: "all 0.3s ease" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ fontSize: 20, fontWeight: 500, color: activeLoc.city === l.city ? "#00e5ff" : "#fff", transition: "color 0.3s" }}>{l.city}</h3>
                      {l.flag && <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", background: "rgba(0, 229, 255, 0.1)", color: "#00e5ff", padding: "4px 10px", borderRadius: 20, fontWeight: 700 }}>Flagship</span>}
                      {l.lpo && <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", padding: "4px 10px", borderRadius: 20, fontWeight: 700 }}>LPO</span>}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: Map Visualizer */}
              <div style={{ position: "relative", minHeight: "400px", background: "rgba(0,0,0,0.2)", borderRadius: "32px 0 0 32px", border: "1px solid rgba(255,255,255,0.05)", borderRight: "none", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                {/* Abstract Line Grid Background */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }} />
                
                {/* High Tech Texas Map Integration */}
                <img src="/texas_map.png" alt="Texas Operations Map" style={{ position: "absolute", width: "95%", height: "95%", objectFit: "contain", opacity: 0.9, pointerEvents: "none", mixBlendMode: 'screen' }} />

                {/* State GUI Panel */}
                <AnimatePresence mode="wait">
                   <motion.div key={activeLoc.city} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ position: "relative", zIndex: 10, background: "rgba(9, 27, 51, 0.6)", backdropFilter: "blur(20px)", padding: 32, borderRadius: 24, border: "1px solid rgba(0, 229, 255, 0.3)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", maxWidth: 320, width: "100%" }}>
                     <h3 style={{ fontSize: 24, fontWeight: 500, color: "#fff", marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>{activeLoc.city} Node</h3>
                     <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "#00e5ff", fontWeight: 700, marginBottom: 24 }}>System Active</p>
                     
                     <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#fff", marginBottom: 12 }}>
                        <Phone size={16} strokeWidth={1.5} color="rgba(255,255,255,0.5)" />
                        <a href={`tel:${activeLoc.ph.replace(/\D/g,"")}`} style={{ fontSize: 15, textDecoration: "none", color: "inherit", fontWeight: 600 }}>{activeLoc.ph}</a>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
                        <MapPin size={16} strokeWidth={1.5} color="rgba(255,255,255,0.5)" style={{ marginTop: 4 }} />
                        <span style={{ fontSize: 14, lineHeight: 1.5 }}>{activeLoc.addr}<br/>{activeLoc.city}, {activeLoc.st} {activeLoc.zip}</span>
                      </div>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.addr + ", " + activeLoc.city + " " + activeLoc.st + " " + activeLoc.zip)}`} target="_blank" rel="noreferrer" className="hover-glow" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "12px", background: "rgba(0, 229, 255, 0.1)", color: "#00e5ff", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none", borderRadius: 8, border: "1px solid rgba(0, 229, 255, 0.2)" }}>
                        Launch Route <ArrowRight size={14} />
                      </a>
                   </motion.div>
                </AnimatePresence>
                
                {/* Simulated Radar Blips */}
                <motion.div animate={{ scale: [1, 2], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: "absolute", top: "40%", left: "55%", width: 12, height: 12, background: "#00e5ff", borderRadius: "50%", boxShadow: "0 0 20px #00e5ff" }} />
                <div style={{ position: "absolute", top: "40%", left: "55%", width: 12, height: 12, background: "#00e5ff", borderRadius: "50%", boxShadow: "0 0 20px #00e5ff" }} />

                <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} style={{ position: "absolute", top: "60%", left: "40%", width: 8, height: 8, background: "#00e5ff", borderRadius: "50%" }} />
                <div style={{ position: "absolute", top: "60%", left: "40%", width: 8, height: 8, background: "#00e5ff", borderRadius: "50%" }} />

                <div style={{ position: "absolute", bottom: 20, right: 30, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Live Node Tracking Active</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ INTERACTIVE CTA (Replaces old ugly form) ═══════ */}
        <section id="contact" style={{ background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} 
              className="hover-glow hover-lift"
              onClick={() => setIsConciergeOpen(true)}
              style={{ 
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0, 229, 255, 0.05) 100%)", 
                padding: "80px 48px", 
                borderRadius: 40, 
                border: "1px solid rgba(0, 229, 255, 0.2)", 
                backdropFilter: "blur(20px)",
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #00e5ff, transparent)" }} />
              
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00e5ff", marginBottom: 32 }}>
                <Smartphone size={36} />
              </div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, marginBottom: 16 }}>Bypass the bureaucracy.</h2>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginBottom: 40, maxWidth: 500, lineHeight: 1.6 }}>
                Stop filling out generic contact forms. Initialize the Digital Concierge to be routed directly to a local market president instantly.
              </p>
              <div style={{ padding: "20px 48px", background: "#00e5ff", color: "var(--navy)", borderRadius: 16, fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 0 30px rgba(0, 229, 255, 0.3)" }}>
                Start Concierge Routing <ArrowRight size={20} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══════ SECURE FOOTER ═══════ */}
      <footer style={{ background: "#040b14", padding: "80px 0 40px", color: "rgba(255,255,255,0.4)" }}>
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 64 }}>
            <div>
              <img src={LOGO} alt="LNB Vault" style={{ height: 48, filter: "brightness(0) invert(1)", marginBottom: 24, opacity: 0.9, objectFit: "contain" }} />
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>High-precision capital deployment masked as Texas hospitality. Since 1981.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#00e5ff", marginBottom: 24, fontWeight: 700 }}>Infrastructure</h4>
              {["Private Wealth", "Enterprise Banking", "Commercial Real Estate", "Digital Treasury", "1031 Exchange Module"].map((l, i) => (
                <a key={i} href="#" style={{ display: "block", marginBottom: 12, fontSize: 14, color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#00e5ff", marginBottom: 24, fontWeight: 700 }}>Security</h4>
              {["Fraud Prevention Grid", "Secure Upload Vault", "Duo Mobile Auth", "Reorder Checks", "Legal Notice"].map((l, i) => (
                <a key={i} href="#" style={{ display: "block", marginBottom: 12, fontSize: 14, color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#00e5ff", marginBottom: 24, fontWeight: 700 }}>Direct Line</h4>
              <p style={{ fontSize: 14, lineHeight: 2.2 }}>
                HQ Node: <strong style={{ color: "#fff" }}>(903) 785-0701</strong><br/>
                Report Fraud: <strong style={{ color: "#fff" }}>1-800-545-4274</strong><br/>
                Routing Number: <strong style={{ color: "#fff" }}>111909870</strong><br/>
                Security ID: <strong style={{ color: "#fff" }}>NMLS 480341</strong>
              </p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24, fontSize: 11, letterSpacing: 0.5 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>FDIC Compliance</a>
            </div>
            <div>Member FDIC. Equal Housing Lender. © {new Date().getFullYear()} Lamar National Bank.</div>
          </div>
        </div>
      </footer>

      {/* ═══════ OVERLAYS ═══════ */}
      <ConciergeDrawer isOpen={isConciergeOpen} onClose={() => setIsConciergeOpen(false)} />
      <TreasuryDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
    </div>
  );
}
