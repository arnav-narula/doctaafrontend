"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lock, Send, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"

// ─── Brand ────────────────────────────────────────────────────────────────────
const PINK  = "#D4537E"
const CREAM = "#F8F4F6"
const NAVY  = "#0A1628"

// ─── Data ─────────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "I have a sore throat and fever",
  "My knee has been aching for a week",
  "I feel anxious and can't sleep",
  "I need a repeat prescription",
]

const FEATURES = [
  { num: "01", title: "AI Health Chat",    desc: "Describe your symptoms in plain English. Get instant, evidence-based guidance — no waiting room, no appointment needed." },
  { num: "02", title: "Smart Booking",     desc: "Book a GP or specialist in seconds. Same-day telehealth where available. Reminders handled automatically." },
  { num: "03", title: "Unified Records",   desc: "Every script, result, and referral — one secure place. Share with any provider in a single tap." },
  { num: "04", title: "Private by Design", desc: "End-to-end encrypted. Australian Privacy Act compliant. Your data belongs to you — never sold, never shared." },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / 60
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
const PHRASES = ["organised.", "in one place.", "stress-free.", "on your terms."]
function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const full = PHRASES[phraseIdx]
    if (!deleting && displayed.length < full.length) {
      const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 55)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === full.length) {
      const t = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % PHRASES.length)
    }
  }, [displayed, deleting, phraseIdx])
  return (
    <span style={{ color: PINK }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{ display: "inline-block", width: "2px", height: "0.85em", backgroundColor: PINK, marginLeft: "2px", verticalAlign: "middle" }}
      />
    </span>
  )
}

// ─── Orb background ───────────────────────────────────────────────────────────
function OrbBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
      }} />
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-15%", left: "30%", width: "700px", height: "600px", borderRadius: "50%", background: `radial-gradient(ellipse, ${PINK}22 0%, transparent 68%)` }}
      />
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ position: "absolute", bottom: "5%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(ellipse, ${PINK}14 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        style={{ position: "absolute", top: "40%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(30,80,160,0.25) 0%, transparent 70%)" }}
      />
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "0 1.5rem",
        background: scrolled ? `${NAVY}ee` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.3s, border 0.3s",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: PINK, fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-1px" }}>doctaa</span>
        <Link href="/doctor" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", fontWeight: 500 }} className="hover:text-white transition-colors">
          Log in
        </Link>
      </div>
    </motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  return (
    <section style={{ minHeight: "100dvh", backgroundColor: NAVY, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem 3rem", overflow: "hidden" }}>
      <OrbBackground />
      <div style={{ position: "relative", width: "100%", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
          <motion.div animate={{ boxShadow: [`0 0 0 0px ${PINK}44`, `0 0 0 10px ${PINK}00`] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: "58px", height: "58px", borderRadius: "50%", background: `linear-gradient(135deg, ${PINK}, #a83460)`, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${NAVY}`, zIndex: 3, fontSize: "1.6rem" }}>
            🩺
          </motion.div>
          {["👩‍⚕️", "👨‍⚕️"].map((e, i) => (
            <div key={i} style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: i === 0 ? "#1a3a6e" : "#162d55", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${NAVY}`, marginLeft: "-10px", zIndex: 2 - i }}>{e}</div>
          ))}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: "#fff", fontSize: "clamp(2.5rem, 7vw, 4rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2.5px", marginBottom: "1rem" }}>
          Hi, I&apos;m <span style={{ color: PINK }}>doctaa.</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "1rem", minHeight: "2rem" }}>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Your care, </span>
          <Typewriter />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "460px" }}>
          I&apos;m your private AI doctor. I&apos;ve already helped Australians{" "}
          <strong style={{ color: "rgba(255,255,255,0.65)", fontWeight: 600 }}><Counter to={1247830} suffix=" times" /></strong>.{" "}
          After we chat, you can book a real GP if needed.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }} style={{ width: "100%" }}>
          <motion.div
            animate={focused ? { boxShadow: `0 0 0 1.5px ${PINK}90, 0 0 40px ${PINK}28, 0 20px 60px rgba(0,0,0,0.5)`, borderColor: `${PINK}70` } : { boxShadow: `0 0 30px ${PINK}10, 0 20px 50px rgba(0,0,0,0.4)`, borderColor: "rgba(255,255,255,0.1)" }}
            transition={{ duration: 0.2 }}
            style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: "1.25rem", padding: "1.25rem", backdropFilter: "blur(16px)" }}
          >
            <textarea value={value} onChange={e => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              placeholder="What's going on? Describe your symptoms..." rows={3}
              style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "1rem", lineHeight: 1.65, resize: "none", fontFamily: "inherit", marginBottom: "0.75rem" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Lock size={10} /> Private · Australian Privacy Act
              </span>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ backgroundColor: value.trim() ? PINK : "rgba(255,255,255,0.08)", color: value.trim() ? "#fff" : "rgba(255,255,255,0.25)", border: "none", borderRadius: "0.65rem", padding: "0.5rem 1.1rem", fontSize: "0.875rem", fontWeight: 600, cursor: value.trim() ? "pointer" : "default", display: "flex", alignItems: "center", gap: "0.4rem", transition: "background-color 0.15s, color 0.15s", fontFamily: "inherit" }}>
                Get started <Send size={13} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}>
          {SUGGESTIONS.map((s, i) => (
            <motion.button key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + i * 0.07, duration: 0.4 }}
              whileHover={{ backgroundColor: `${PINK}22`, borderColor: `${PINK}60`, color: "rgba(255,255,255,0.85)" }}
              onClick={() => setValue(s)}
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", color: "rgba(255,255,255,0.45)", fontSize: "0.77rem", padding: "0.35rem 0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
              {s}
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.2 }}
          style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={18} color="#fff" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Statement ────────────────────────────────────────────────────────────────
// Bold editorial problem/solution — no icons, no grid, just words
function Statement() {
  return (
    <section style={{ backgroundColor: CREAM, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <FadeUp>
          <p style={{ color: PINK, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2.5rem" }}>
            The problem
          </p>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end" }}>
          <FadeUp delay={0.05}>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.0, letterSpacing: "-3px", margin: 0 }}>
              The average Australian waits{" "}
              <span style={{ color: PINK }}>2 weeks</span>{" "}
              to see a GP.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div>
              <p style={{ color: "rgba(10,22,40,0.55)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                You shouldn&apos;t have to wait to know if something&apos;s wrong. Doctaa gives you instant, clinically-informed guidance — and books you in when you need the real thing.
              </p>
              <Link href="/doctor"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: NAVY, fontWeight: 700, fontSize: "0.95rem", borderBottom: `2px solid ${PINK}`, paddingBottom: "2px" }}>
                Try it now <ArrowRight size={15} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Numbers ──────────────────────────────────────────────────────────────────
// Editorial, scattered — not a neat grid
function Numbers() {
  return (
    <section style={{ backgroundColor: NAVY, padding: "6rem 1.5rem", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.5rem", alignItems: "center" }}>
          {/* Big number — spans 5 cols */}
          <FadeUp>
            <div style={{ gridColumn: "span 5" }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(5rem, 12vw, 9rem)", lineHeight: 1, letterSpacing: "-5px" }}>
                1.2<span style={{ color: PINK }}>M</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem", marginTop: "0.75rem", letterSpacing: "0.5px" }}>
                Australians helped
              </p>
            </div>
          </FadeUp>

          {/* Divider */}
          <div style={{ gridColumn: "span 1", height: "100px", width: "1px", backgroundColor: "rgba(255,255,255,0.1)", margin: "0 auto" }} />

          {/* Stacked smaller stats */}
          <div style={{ gridColumn: "span 6", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {[
              { val: "< 2 min", label: "Average response time" },
              { val: "4.8 ★",   label: "App Store rating" },
              { val: "24 / 7",  label: "Always available" },
            ].map(({ val, label }, i) => (
              <FadeIn key={label} delay={i * 0.12}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "2rem" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-2px", minWidth: "120px" }}>{val}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>{label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Features — editorial list ────────────────────────────────────────────────
function Features() {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <section style={{ backgroundColor: CREAM, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", gap: "2rem", flexWrap: "wrap" }}>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-2px", lineHeight: 1.05, margin: 0 }}>
              Everything in<br />one place.
            </h2>
            <p style={{ color: "rgba(10,22,40,0.45)", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "280px", margin: 0 }}>
              No more juggling apps, portals, and paper records.
            </p>
          </div>
        </FadeUp>

        {/* Editorial list */}
        <div>
          {FEATURES.map(({ num, title, desc }, i) => (
            <FadeUp key={num} delay={i * 0.08}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  display: "grid", gridTemplateColumns: "80px 1fr auto",
                  alignItems: "center", gap: "2rem",
                  padding: "2rem 1.5rem",
                  borderTop: "1px solid rgba(10,22,40,0.1)",
                  borderRadius: "1rem",
                  cursor: "default",
                  backgroundColor: hovered === i ? "rgba(10,22,40,0.04)" : "transparent",
                  transition: "background-color 0.2s",
                }}
              >
                <span style={{ color: hovered === i ? PINK : "rgba(10,22,40,0.25)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "1px", transition: "color 0.2s" }}>
                  {num}
                </span>
                <div>
                  <h3 style={{ color: NAVY, fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", letterSpacing: "-0.5px", marginBottom: "0.4rem" }}>{title}</h3>
                  <p style={{ color: "rgba(10,22,40,0.5)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0, maxWidth: "520px" }}>{desc}</p>
                </div>
                <motion.div animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -6 }} transition={{ duration: 0.2 }}>
                  <ArrowUpRight size={20} style={{ color: PINK }} />
                </motion.div>
              </motion.div>
            </FadeUp>
          ))}
          <div style={{ borderTop: "1px solid rgba(10,22,40,0.1)" }} />
        </div>
      </div>
    </section>
  )
}

// ─── For Doctors ──────────────────────────────────────────────────────────────
// Full-bleed dark section, big statement left, clean mockup right
function ForDoctors() {
  return (
    <section style={{ backgroundColor: NAVY, padding: "7rem 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "-20%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(ellipse, ${PINK}0e 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <FadeUp>
          <div>
            <p style={{ color: PINK, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>For clinicians</p>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Less admin.<br />More patients.<br /><span style={{ color: PINK }}>More care.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "380px" }}>
              AI-generated notes, smart scheduling, and seamless patient communication — built for how Australian clinicians actually work.
            </p>
            <Link href="/doctor" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontWeight: 600, fontSize: "0.9rem", padding: "0.75rem 1.5rem", borderRadius: "9999px" }}
              className="hover:bg-white/10 transition-colors">
              Open clinician portal <ArrowRight size={15} />
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.5rem", padding: "2rem", backdropFilter: "blur(8px)" }}>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "1.75rem" }}>
              Today&apos;s snapshot
            </div>
            {[
              { label: "Appointments today",  value: "12", sub: "3 telehealth · 9 in-person" },
              { label: "AI notes ready",       value: "2",  sub: "Draft generated, needs review" },
              { label: "Unread messages",      value: "5",  sub: "1 flagged urgent" },
              { label: "Avg wait time",        value: "8m", sub: "Down 40% vs last month" },
            ].map(({ label, value, sub }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1rem", borderRadius: "0.75rem", marginBottom: "0.5rem", transition: "background 0.15s" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500, fontSize: "0.875rem" }}>{label}</div>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", marginTop: "2px" }}>{sub}</div>
                </div>
                <span style={{ color: PINK, fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-1px" }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
// Minimal, dark, personal — not a pink slab
function CtaBanner() {
  return (
    <section style={{ backgroundColor: CREAM, padding: "8rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-3px", lineHeight: 0.95, margin: 0 }}>
                Your health,<br />
                <span style={{ color: PINK }}>sorted.</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
              <p style={{ color: "rgba(10,22,40,0.5)", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "280px", margin: 0 }}>
                Free to start. No credit card. Join Australians already using doctaa.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/doctor" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: NAVY, color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "0.9rem 2rem", borderRadius: "9999px" }}>
                  Start for free <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { heading: "Product",    links: ["Features", "How it works", "Pricing", "Security"] },
    { heading: "Clinicians", links: ["Doctor portal", "Integrations", "API docs", "Support"] },
    { heading: "Company",    links: ["About", "Blog", "Careers", "Contact"] },
  ]
  return (
    <footer style={{ backgroundColor: NAVY, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "4rem 1.5rem 2.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          <div>
            <div style={{ color: PINK, fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-1px", marginBottom: "0.35rem" }}>doctaa</div>
            <div style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.68rem", letterSpacing: "0.5px", marginBottom: "0.75rem" }}>care, organised.</div>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.8rem", lineHeight: 1.6, maxWidth: "200px" }}>AI-powered primary care for Australia.</p>
          </div>
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            {cols.map(({ heading, links }) => (
              <div key={heading}>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>{heading}</div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {links.map(l => <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.84rem" }} className="hover:text-white transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.74rem", marginBottom: "0.3rem" }}>© 2026 Doctaa Health Pty Ltd. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.68rem" }}>Doctaa is not a substitute for professional medical advice. Always consult a qualified healthcare provider.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-geist-sans, sans-serif)" }}>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Numbers />
        <Features />
        <ForDoctors />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
