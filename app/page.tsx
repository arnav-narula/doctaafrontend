"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import {
  MessageSquare, CalendarDays, FileText, Shield,
  Star, Clock, Users, ArrowRight, CheckCircle2,
  Lock, Send, ChevronDown,
} from "lucide-react"

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
  { icon: MessageSquare, title: "AI Health Chat",    desc: "Instant, evidence-based guidance from an AI trained on millions of clinical cases." },
  { icon: CalendarDays,  title: "Smart Booking",     desc: "Book GPs and specialists in seconds. Telehealth, in-person, same-day where available." },
  { icon: FileText,      title: "Unified Records",   desc: "All your health history, scripts, and results — one secure place, shareable instantly." },
  { icon: Shield,        title: "Private by Design", desc: "End-to-end encrypted. Australian Privacy Act compliant. Your data is never sold." },
]

const STEPS = [
  { n: "01", title: "Describe your symptoms",   body: "Type naturally — no forms, no jargon. Just tell doctaa what's going on." },
  { n: "02", title: "Get instant AI guidance",  body: "Receive clear, clinically-informed information tailored to your situation." },
  { n: "03", title: "Book care if you need it", body: "Connect with a GP or specialist directly — same day where available." },
]

const STATS = [
  { value: "1.2M+", label: "Australians helped", icon: Users        },
  { value: "24/7",  label: "Always available",   icon: Clock        },
  { value: "4.8★",  label: "App Store rating",   icon: Star         },
  { value: "<2 min",label: "Average response",   icon: MessageSquare},
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
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

// ─── Animated orb background ──────────────────────────────────────────────────
function OrbBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
      }} />
      {/* Orb 1 */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-15%", left: "30%",
          width: "700px", height: "600px", borderRadius: "50%",
          background: `radial-gradient(ellipse, ${PINK}22 0%, transparent 68%)`,
        }}
      />
      {/* Orb 2 */}
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute", bottom: "5%", right: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: `radial-gradient(ellipse, ${PINK}14 0%, transparent 70%)`,
        }}
      />
      {/* Orb 3 — subtle blue */}
      <motion.div
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        style={{
          position: "absolute", top: "40%", left: "-8%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(30,80,160,0.25) 0%, transparent 70%)`,
        }}
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
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "0 1.5rem",
        transition: "background 0.3s",
        background: scrolled ? `${NAVY}ee` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
    <section style={{
      minHeight: "100dvh", backgroundColor: NAVY, position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "6rem 1.5rem 3rem", overflow: "hidden",
    }}>
      <OrbBackground />

      <div style={{ position: "relative", width: "100%", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

        {/* Avatar cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}
        >
          <motion.div
            animate={{ boxShadow: [`0 0 0 0px ${PINK}44`, `0 0 0 10px ${PINK}00`] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: "58px", height: "58px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${PINK}, #a83460)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `3px solid ${NAVY}`, zIndex: 3, fontSize: "1.6rem",
            }}
          >
            🩺
          </motion.div>
          {["👩‍⚕️", "👨‍⚕️"].map((e, i) => (
            <div key={i} style={{
              width: "48px", height: "48px", borderRadius: "50%",
              backgroundColor: i === 0 ? "#1a3a6e" : "#162d55",
              fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
              border: `3px solid ${NAVY}`, marginLeft: "-10px", zIndex: 2 - i,
            }}>{e}</div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: "#fff", fontSize: "clamp(2.5rem, 7vw, 4rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2.5px", marginBottom: "1rem" }}
        >
          Hi, I&apos;m <span style={{ color: PINK }}>doctaa.</span>
        </motion.h1>

        {/* Animated tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "1rem", minHeight: "2rem" }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Your care, </span>
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "460px" }}
        >
          I&apos;m your private AI doctor. I&apos;ve already helped Australians{" "}
          <strong style={{ color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
            <Counter to={1247830} suffix=" times" />
          </strong>. After we chat, you can book a real GP if needed.
        </motion.p>

        {/* Chat input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%" }}
        >
          <motion.div
            animate={focused ? {
              boxShadow: `0 0 0 1.5px ${PINK}90, 0 0 40px ${PINK}28, 0 20px 60px rgba(0,0,0,0.5)`,
              borderColor: `${PINK}70`,
            } : {
              boxShadow: `0 0 30px ${PINK}10, 0 20px 50px rgba(0,0,0,0.4)`,
              borderColor: "rgba(255,255,255,0.1)",
            }}
            transition={{ duration: 0.2 }}
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: "1.25rem",
              padding: "1.25rem",
              backdropFilter: "blur(16px)",
            }}
          >
            <textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="What's going on? Describe your symptoms..."
              rows={3}
              style={{
                width: "100%", background: "transparent", border: "none", outline: "none",
                color: "#fff", fontSize: "1rem", lineHeight: 1.65, resize: "none",
                fontFamily: "inherit", marginBottom: "0.75rem",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Lock size={10} /> Private · Australian Privacy Act
              </span>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  backgroundColor: value.trim() ? PINK : "rgba(255,255,255,0.08)",
                  color: value.trim() ? "#fff" : "rgba(255,255,255,0.25)",
                  border: "none", borderRadius: "0.65rem",
                  padding: "0.5rem 1.1rem", fontSize: "0.875rem", fontWeight: 600,
                  cursor: value.trim() ? "pointer" : "default",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  transition: "background-color 0.15s, color 0.15s", fontFamily: "inherit",
                }}
              >
                Get started <Send size={13} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Suggestion chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}
        >
          {SUGGESTIONS.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.07, duration: 0.4 }}
              whileHover={{ backgroundColor: `${PINK}22`, borderColor: `${PINK}60`, color: "rgba(255,255,255,0.85)" }}
              onClick={() => setValue(s)}
              style={{
                backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "9999px", color: "rgba(255,255,255,0.45)",
                fontSize: "0.77rem", padding: "0.35rem 0.85rem",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={18} color="#fff" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section style={{ backgroundColor: PINK, padding: "2.75rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
        {STATS.map(({ value, label, icon: Icon }, i) => (
          <FadeUp key={label} delay={i * 0.08}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-1px", lineHeight: 1 }}>{value}</span>
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}>
                <Icon size={11} />{label}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="features" style={{ backgroundColor: CREAM, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: PINK, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
              What doctaa does
            </p>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
          </div>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: i % 2 === 0 ? "0 16px 40px rgba(10,22,40,0.12)" : `0 16px 40px ${PINK}20` }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: i % 2 === 0 ? "#fff" : NAVY,
                  borderRadius: "1.25rem", padding: "2.25rem",
                  border: i % 2 === 0 ? "1px solid rgba(10,22,40,0.07)" : "none",
                  height: "100%",
                }}
              >
                <div style={{
                  width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem",
                  backgroundColor: i % 2 === 0 ? `${PINK}18` : `${PINK}28`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem",
                }}>
                  <Icon size={20} style={{ color: PINK }} />
                </div>
                <h3 style={{ color: i % 2 === 0 ? NAVY : "#fff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.6rem" }}>{title}</h3>
                <p style={{ color: i % 2 === 0 ? "rgba(10,22,40,0.5)" : "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" style={{ backgroundColor: NAVY, padding: "7rem 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Subtle orb */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "400px", pointerEvents: "none",
        background: `radial-gradient(ellipse, ${PINK}0e 0%, transparent 65%)`,
      }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ color: PINK, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
              How it works
            </p>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Care in three steps.
            </h2>
          </div>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2.5rem" }}>
          {STEPS.map(({ n, title, body }, i) => (
            <FadeUp key={n} delay={i * 0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <motion.div
                  whileInView={{ borderColor: PINK }}
                  initial={{ borderColor: "rgba(212,83,126,0.3)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                  style={{
                    width: "3rem", height: "3rem", borderRadius: "50%", border: `2px solid`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: PINK, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.5px",
                  }}
                >
                  {n}
                </motion.div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.875rem", lineHeight: 1.75 }}>{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── For Doctors ──────────────────────────────────────────────────────────────
function ForDoctors() {
  const perks = [
    "AI-generated consultation notes",
    "Integrated scheduling & telehealth",
    "Automated patient follow-ups",
    "Secure messaging & referrals",
  ]
  return (
    <section id="for-doctors" style={{ backgroundColor: CREAM, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <FadeUp>
          <div>
            <p style={{ color: PINK, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
              For clinicians
            </p>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(2rem,4vw,2.75rem)", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Less admin.<br />More care.
            </h2>
            <p style={{ color: "rgba(10,22,40,0.5)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>
              Doctaa handles the paperwork so you can focus on patients. Built for how Australian clinicians actually work.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.25rem" }}>
              {perks.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
                >
                  <CheckCircle2 size={16} style={{ color: PINK, flexShrink: 0 }} />
                  <span style={{ color: NAVY, fontSize: "0.9rem" }}>{p}</span>
                </motion.li>
              ))}
            </ul>
            <Link href="/doctor" style={{ color: PINK, fontWeight: 700, fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              Explore the clinician portal <ArrowRight size={15} />
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ backgroundColor: NAVY, borderRadius: "1.5rem", padding: "2rem", overflow: "hidden" }}>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "1.5rem" }}>
              Today&apos;s snapshot
            </p>
            {[
              { label: "Appointments", value: "12", sub: "3 telehealth" },
              { label: "Pending notes", value: "2",  sub: "AI draft ready" },
              { label: "New messages", value: "5",  sub: "1 urgent" },
            ].map(({ label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.875rem",
                  padding: "1rem 1.1rem", marginBottom: "0.75rem",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.06)", transition: "background 0.15s",
                }}
              >
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{label}</div>
                  <div style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.7rem", marginTop: "2px" }}>{sub}</div>
                </div>
                <span style={{ color: PINK, fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-1px" }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section style={{ backgroundColor: PINK, padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "700px", height: "400px", pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 65%)",
        }}
      />
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <FadeUp>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(2rem,5vw,3rem)", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Ready to take control<br />of your health?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.25rem" }}>
            Join Australians who already manage their care with doctaa.<br />Free to start. No credit card.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: "inline-block" }}>
            <Link href="/doctor" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "#fff", color: PINK, fontWeight: 700, fontSize: "1rem",
              padding: "0.9rem 2.25rem", borderRadius: "9999px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}>
              Start chatting free <ArrowRight size={17} />
            </Link>
          </motion.div>
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
                  {links.map(l => (
                    <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.84rem" }} className="hover:text-white transition-colors">{l}</a></li>
                  ))}
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
        <StatsBar />
        <Features />
        <HowItWorks />
        <ForDoctors />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
