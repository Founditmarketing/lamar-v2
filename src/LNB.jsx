import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Phone, ArrowRight, ShieldCheck, PieChart, Briefcase, Home, Smartphone, ChevronRight, Menu, X } from "lucide-react";

/* ═══════════════════════════════════════════════
   LAMAR NATIONAL BANK — WORLD CLASS v4
   Bento Grid · Custom Photography · Architecture
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
  { q: "What I appreciate most is the personal and proactive approach. Because you took the time to learn about my small business, you have on several occasions anticipated my banking needs before I even knew what they were.", n: "James Black", t: "Owner, Homebody Accents" },
  { q: "Gunter ISD moved all funds to Lamar Bank two years ago and we have had amazing service from day one. When I have questions or need anything they get back to me immediately and go above and beyond.", n: "Brittany Floyd", t: "Gunter ISD" },
  { q: "Lamar National has the best service. I never have to wait for help. Recommended them to someone who opened an account within minutes of walking through the doors. Amazing customer service!", n: "Lauren Douglas", t: "Valued Client" },
  { q: "The level of care and attention to detail from our market president makes all the difference. It truly feels like walking into a partnership rather than just a bank.", n: "Michael T.", t: "Real Estate Developer" }
];

const SVCS = [
  { title: "Personal Banking", desc: "Checking, savings, and money market accounts designed around your life.", link: "#", icon: ShieldCheck, col: "span 4" },
  { title: "Business Banking", desc: "Scalable solutions with dedicated market presidents who understand your unique community and industry.", link: "#", icon: Briefcase, col: "span 8" },
  { title: "Home Loans", desc: "Local decision-making means faster closings and a smoother path to homeownership.", link: "#", icon: Home, col: "span 5" },
  { title: "Digital Banking", desc: "Mobile deposit, transfers, and alerts — your entire bank in your pocket, 24/7.", link: "#", icon: Smartphone, col: "span 7" },
  { title: "1031 Exchange", desc: "Specialized tax-deferred exchange services for real estate investors.", link: "#", icon: PieChart, col: "span 12" },
];

// Motion Variants
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function LNB() {
  const [sY, setSY] = useState(0);
  const [menu, setMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 200]);

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
    <div className="app-wrapper">
      {/* ═══════ HEADER ═══════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: navSolid ? "16px 0" : "24px 0",
        background: navSolid ? "rgba(253, 252, 251, 0.9)" : "transparent",
        backdropFilter: navSolid ? "blur(16px)" : "none",
        borderBottom: navSolid ? "1px solid var(--border-light)" : "1px solid transparent",
        transition: "all 0.4s ease"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <img src={LOGO} alt="Lamar National Bank" style={{ height: navSolid ? 32 : 38, transition: "height 0.4s", filter: navSolid ? "none" : "brightness(0)" }} />
          </button>
          
          <nav className="desktop-nav" style={{ gap: 32, alignItems: "center" }}>
            {["Services", "About", "Locations", "Stories", "Contact"].map((l) => (
              <button key={l} onClick={() => go(l.toLowerCase())} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", color: navSolid ? "var(--text)" : "var(--text)" }}>
                {l}
              </button>
            ))}
            <a href="#" className="hover-glow" style={{ padding: "12px 28px", background: "var(--navy)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", borderRadius: 8, transition: "all 0.3s" }}>
              Online Banking
            </a>
          </nav>

          <button className="mobile-toggle" onClick={() => setMenu(!menu)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, background: "var(--bg)", zIndex: 9999, display: "flex", flexDirection: "column", padding: "120px 5%" }}>
            <button onClick={() => setMenu(false)} style={{ position: "absolute", top: 24, right: "5%", background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}>
              <X size={32} />
            </button>
            {["Services", "About", "Locations", "Stories", "Contact"].map((l, i) => (
              <motion.button key={l} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => go(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 32, fontFamily: "'Playfair Display', serif", textAlign: "left", marginBottom: 24, color: "var(--text)" }}>
                {l}
              </motion.button>
            ))}
            <a href="#" style={{ padding: "16px", background: "var(--accent)", color: "#fff", textAlign: "center", textDecoration: "none", borderRadius: 8, fontWeight: 600, marginTop: "auto" }}>
              Log into Online Banking
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ═══════ ASYMMETRICAL HERO ═══════ */}
        <section id="home" style={{ paddingTop: "180px", paddingBottom: "100px", minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <div className="container grid-2" style={{ alignItems: "center" }}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ zIndex: 2 }}>
              <motion.div variants={fadeInUp} style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 40, height: 2, background: "var(--accent)" }} />
                <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "var(--accent)", fontWeight: 700 }}>Est. 1981 · Paris, Texas</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} style={{ fontSize: "clamp(48px, 6vw, 88px)", fontWeight: 600, lineHeight: 1.05, marginBottom: 24, letterSpacing: "-1px" }}>
                Relationship Banking <br /><span style={{ fontStyle: "italic", color: "var(--text-soft)", fontWeight: 400 }}>at its Best.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} style={{ fontSize: "clamp(16px, 1.5vw, 20px)", lineHeight: 1.7, color: "var(--text-soft)", maxWidth: 500, marginBottom: 48 }}>
                Local decisions, personal service, and over four decades of Texas trust. We know your name, your business, and your community.
              </motion.p>
              
              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                <a href="#" className="hover-glow" style={{ padding: "18px 40px", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", borderRadius: 12 }}>
                  Open an Account
                </a>
                <a href="#" className="hover-lift" style={{ padding: "16px 38px", background: "transparent", color: "var(--navy)", fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", border: "2px solid var(--border-light)", borderRadius: 12 }}>
                  Apply for a Loan
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} style={{ position: "relative", height: "100%", minHeight: "500px", borderRadius: 24, overflow: "hidden" }}>
              <motion.img src={IMG_HERO} alt="Modern Texas Bank Exterior" style={{ width: "100%", height: "100%", objectFit: "cover", y: yImage }} />
              <div style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", padding: "12px 24px", borderRadius: 30, display: "flex", gap: 12, alignItems: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Local Decisions</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ ABOUT (RELATIONSHIP FOCUS) ═══════ */}
        <section id="about" style={{ background: "var(--bg-alt)", position: "relative" }}>
          <div className="container grid-2" style={{ alignItems: "center" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} style={{ position: "relative", borderRadius: 24, overflow: "hidden" }}>
               <img src={IMG_ABOUT} alt="Relationship Banking" style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
               <div style={{ position: "absolute", bottom: -2, left: -2, background: "var(--bg-alt)", padding: "40px 40px 0 0", borderTopRightRadius: 32 }}>
                  <div style={{ background: "var(--navy)", color: "#fff", padding: 32, borderRadius: 24 }}>
                    <div style={{ fontSize: 48, fontWeight: 300, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>40+</div>
                    <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 8, opacity: 0.8 }}>Years of Trust</div>
                  </div>
               </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ paddingLeft: "5%" }}>
              <motion.h2 variants={fadeInUp} style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 600, marginBottom: 32, lineHeight: 1.1 }}>
                Built on <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>Handshakes.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} style={{ fontSize: 18, lineHeight: 1.8, color: "var(--text-soft)", marginBottom: 24 }}>
                Lamar National Bank was founded in 1981 in Paris, Texas, by business leaders who believed banking should be built on relationships — not red tape. Over four decades later, that belief drives everything we do.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ fontSize: 18, lineHeight: 1.8, color: "var(--text-soft)", marginBottom: 40 }}>
                Each branch is led by a local market president with the authority to make decisions tailored to your community. We build lifelong, multigenerational relationships.
              </motion.p>
              <motion.a variants={fadeInUp} href="#" style={{ display: "inline-flex", alignItems: "center", gap: 12, color: "var(--accent)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none" }}>
                Read Our Full Story <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ═══════ SERVICES BENTO GRID ═══════ */}
        <section id="services">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
                <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "var(--accent)", fontWeight: 700 }}>Expertise</span>
                <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
              </div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 600, marginBottom: 16 }}>Financial Solutions</h2>
              <p style={{ fontSize: 18, color: "var(--text-soft)" }}>Every service backed by local expertise and a team that knows you by name.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bento-grid">
              {SVCS.map((s, i) => (
                <motion.a href={s.link} key={i} variants={fadeInUp} className="bento-card hover-lift" style={{ gridColumn: s.col, textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(61,139,253,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 24 }}>
                    <s.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-soft)", marginBottom: 32, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    Explore <ChevronRight size={16} />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════ LOCATIONS (FIXED MAP VOID) ═══════ */}
        <section id="locations" style={{ background: "var(--bg-alt)" }}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: 64 }}>
              <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, display: "block", marginBottom: 16 }}>Find Us</span>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 600 }}>Branch Locations</h2>
            </motion.div>

            <div className="grid-4">
              {LOCS.map((l, i) => (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: i * 0.05 }} key={i} className="bento-card hover-lift" style={{ padding: 32, borderRadius: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600 }}>{l.city}</h3>
                    {l.flag && <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", background: "rgba(61,139,253,0.1)", color: "var(--accent)", padding: "4px 10px", borderRadius: 20, fontWeight: 700 }}>Flagship</span>}
                    {l.lpo && <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", background: "rgba(0,0,0,0.05)", color: "var(--text-soft)", padding: "4px 10px", borderRadius: 20, fontWeight: 700 }}>LPO</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16, color: "var(--text-soft)" }}>
                    <MapPin size={20} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 15, lineHeight: 1.5 }}>{l.addr}<br/>{l.city}, {l.st} {l.zip}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--accent)" }}>
                    <Phone size={18} strokeWidth={1.5} />
                    <a href={`tel:${l.ph.replace(/\D/g,"")}`} style={{ fontSize: 15, textDecoration: "none", color: "inherit", fontWeight: 600 }}>{l.ph}</a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Quick Contact Block replacing massive dead map space */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginTop: 48, background: "#fff", border: "1px solid var(--border-light)", borderRadius: 24, padding: "40px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 32 }}>
               {[{l:"Main Line",v:"(903) 785-0701"},{l:"Telebanking",v:"1-844-744-3388"},{l:"Lost Debit Card",v:"1-800-545-4274"},{l:"Routing Number",v:"111909870"}].map((x,i)=>(
                 <div key={i} style={{textAlign:"center"}}>
                   <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"var(--text-muted)",marginBottom:8,fontWeight:600}}>{x.l}</div>
                   <div style={{fontSize:18,color:"var(--navy)",fontWeight:600}}>{x.v}</div>
                 </div>
               ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════ STORIES (SCROLL CAROUSEL FIX) ═══════ */}
        <section id="stories" style={{ overflow: "hidden" }}>
          <div className="container" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 600 }}>Client Stories</h2>
          </div>
          <div style={{ display: "flex", gap: 24, paddingLeft: "max(5%, calc((100vw - 1400px) / 2))", paddingRight: "5%", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", paddingBottom: 24 }}>
            {TESTS.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} transition={{ delay: i * 0.1 }} className="bento-card hover-lift" style={{ minWidth: 380, maxWidth: 380, flexShrink: 0, padding: 40, background: "var(--navy)", color: "#fff", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 64, color: "var(--accent)", opacity: 0.5, lineHeight: 0.5, marginBottom: 24, fontFamily: "'Playfair Display', serif" }}>"</div>
                <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, marginBottom: 32, fontStyle: "italic", flex: 1 }}>{t.q}</p>
                <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 20 }} />
                <div style={{ fontWeight: 600, fontSize: 16 }}>{t.n}</div>
                <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>{t.t}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════ CONTACT FORM (WITH VALIDATION & CORRECT TAGS) ═══════ */}
        <section id="contact" style={{ background: "var(--navy)", color: "#fff", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }} />
          <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: 800 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 600, marginBottom: 16 }}>Start a Conversation</h2>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>A member of our team will reach out personally.</p>
            </motion.div>

            <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} 
              onSubmit={(e) => { e.preventDefault(); alert("Form validated and ready for backend."); }} 
              style={{ background: "var(--navy-mid)", padding: "48px", borderRadius: 24, boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
              <div className="grid-2" style={{ gap: 20, marginBottom: 20 }}>
                <input required className="form-input" placeholder="First Name *" />
                <input required className="form-input" placeholder="Last Name *" />
              </div>
              <div className="grid-2" style={{ gap: 20, marginBottom: 20 }}>
                <input required type="email" className="form-input" placeholder="Email Address *" />
                <input required type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" className="form-input" placeholder="Phone (e.g. 9037850701) *" />
              </div>
              <select required className="form-input" style={{ marginBottom: 20, appearance: "none" }}>
                <option value="" disabled selected>I'm interested in... *</option>
                {["Checking Accounts", "Business Banking", "Home Loan", "1031 Exchange", "Other"].map((o, i) => <option key={i} value={o}>{o}</option>)}
              </select>
              <select required className="form-input" style={{ marginBottom: 24, appearance: "none" }}>
                <option value="" disabled selected>Nearest Branch *</option>
                {LOCS.map((l, i) => <option key={i} value={l.city}>{l.city}, {l.st}</option>)}
              </select>
              <textarea className="form-input" rows={4} placeholder="Tell us about your banking needs... (Optional)" style={{ marginBottom: 32, resize: "vertical" }} />
              <button type="submit" className="hover-glow" style={{ width: "100%", padding: "20px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>
                Send My Information
              </button>
            </motion.form>
          </div>
        </section>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: "#061324", padding: "80px 0 40px", color: "rgba(255,255,255,0.6)" }}>
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 64 }}>
            <div>
              <img src={LOGO} alt="Lamar National Bank" style={{ height: 32, filter: "brightness(0) invert(1)", marginBottom: 24 }} />
              <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>Relationship banking built around you. Locally owned by Texans since 1981.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)", marginBottom: 24, fontWeight: 700 }}>Banking</h4>
              {["Personal Banking", "Business Banking", "Online Banking", "Home Loans", "1031 Exchange"].map((l, i) => (
                <a key={i} href="#" style={{ display: "block", marginBottom: 12, fontSize: 15, color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)", marginBottom: 24, fontWeight: 700 }}>Resources</h4>
              {["Order Checks", "Secure Upload", "Education Center", "News Room", "Fraud Prevention"].map((l, i) => (
                <a key={i} href="#" style={{ display: "block", marginBottom: 12, fontSize: 15, color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)", marginBottom: 24, fontWeight: 700 }}>Contact</h4>
              <p style={{ fontSize: 15, lineHeight: 2 }}>
                Main: <strong style={{ color: "#fff" }}>(903) 785-0701</strong><br/>
                Lost Card: <strong style={{ color: "#fff" }}>1-800-545-4274</strong><br/>
                Routing: <strong style={{ color: "#fff" }}>111909870</strong><br/>
                NMLS ID: <strong style={{ color: "#fff" }}>480341</strong>
              </p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24, fontSize: 12 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms & Conditions</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>FDIC Notice</a>
            </div>
            <div>Member FDIC. Equal Housing Lender. © {new Date().getFullYear()} Lamar National Bank.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
