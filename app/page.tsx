"use client"

import Link from "next/link"
import { useState } from "react"
import {
  MessageSquare,
  CalendarDays,
  FileText,
  Shield,
  Star,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Lock,
  Send,
  Sparkles,
  ChevronDown,
} from "lucide-react"

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const PINK  = "#D4537E"
const CREAM = "#F8F4F6"
const NAVY  = "#0A1628"

// ─── Data ─────────────────────────────────────────────────────────────────────
const suggestions = [
  "I have a sore throat and fever",
  "My knee has been aching for a week",
  "I feel anxious and can't sleep",
  "I need a repeat prescription",
]

const features = [
  { icon: MessageSquare, title: "AI Health Chat",       desc: "Instant, evidence-based guidance from an AI trained on millions of clinical cases." },
  { icon: CalendarDays,  title: "Smart Booking",        desc: "Book GPs and specialists in seconds. Telehealth, in-person, same-day where available." },
  { icon: FileText,      title: "Unified Records",      desc: "All your health history, scripts, and results — one secure place, shareable instantly." },
  { icon: Shield,        title: "Private by Design",    desc: "End-to-end encrypted. Australian Privacy Act compliant. Your data is never sold." },
]

const steps = [
  { n: "01", title: "Describe your symptoms",   body: "Type naturally — no forms, no jargon. Just tell doctaa what's going on." },
  { n: "02", title: "Get instant AI guidance",  body: "Receive clear, clinically-informed information tailored to your situation." },
  { n: "03", title: "Book care if you need it", body: "Connect with a GP or specialist directly — same day where available." },
]

const stats = [
  { value: "10M+",  label: "Consultations",  icon: MessageSquare },
  { value: "50K+",  label: "Weekly users",   icon: Users         },
  { value: "24/7",  label: "Always on",      icon: Clock         },
  { value: "4.8★",  label: "User rating",    icon: Star          },
]

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "0 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ lineHeight: 1 }}>
          <span style={{ color: PINK, fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-1px" }}>doctaa</span>
        </div>
        <Link
          href="/doctor"
          style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", fontWeight: 500 }}
          className="hover:text-white transition-colors"
        >
          Log in
        </Link>
      </div>
    </nav>
  )
}

// ─── Hero (chat-first) ────────────────────────────────────────────────────────
function Hero() {
  const [value, setValue] = useState("")

  return (
    <section
      style={{
        minHeight: "100dvh",
        backgroundColor: NAVY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "600px", background: `radial-gradient(ellipse, ${PINK}18 0%, transparent 65%)` }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "400px", height: "400px", background: `radial-gradient(ellipse, ${PINK}0d 0%, transparent 70%)` }} />
      </div>

      {/* Grid texture overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", width: "100%", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

        {/* Avatar cluster */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem", gap: "0" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${PINK}, #a83460)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `3px solid ${NAVY}`, zIndex: 3,
            boxShadow: `0 0 0 1px ${PINK}40`,
          }}>
            <Sparkles size={24} color="#fff" />
          </div>
          {[
            { bg: "#2a4a7a", emoji: "👩‍⚕️" },
            { bg: "#1e3a5f", emoji: "🩺" },
          ].map((a, i) => (
            <div key={i} style={{
              width: "48px", height: "48px", borderRadius: "50%",
              backgroundColor: a.bg, fontSize: "1.25rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `3px solid ${NAVY}`,
              marginLeft: "-10px", zIndex: 2 - i,
            }}>
              {a.emoji}
            </div>
          ))}
        </div>

        {/* Headline */}
        <h1 style={{ color: "#fff", fontSize: "clamp(2.25rem, 6vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: "1.25rem" }}>
          Hi, I&apos;m{" "}
          <span style={{ color: PINK }}>doctaa.</span>
        </h1>

        {/* Subtext */}
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "0.5rem" }}>
          I&apos;m your private AI doctor.
        </p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "480px" }}>
          I&apos;ve already helped Australians over <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>1,247,830 times.</strong> After we chat, you can book a real GP visit if needed.
        </p>

        {/* Chat input */}
        <div style={{
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.05)",
          border: `1.5px solid rgba(255,255,255,0.12)`,
          borderRadius: "1.25rem",
          padding: "1.25rem",
          backdropFilter: "blur(12px)",
          boxShadow: `0 0 60px ${PINK}18, 0 20px 60px rgba(0,0,0,0.4)`,
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}>
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="What's going on? Describe your symptoms..."
            rows={3}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "1rem",
              lineHeight: 1.65,
              resize: "none",
              fontFamily: "inherit",
              marginBottom: "0.75rem",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Lock size={11} /> Private · Australian Privacy Act
            </span>
            <button
              style={{
                backgroundColor: value.trim() ? PINK : "rgba(255,255,255,0.1)",
                color: value.trim() ? "#fff" : "rgba(255,255,255,0.3)",
                border: "none",
                borderRadius: "0.65rem",
                padding: "0.5rem 1.1rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: value.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "background-color 0.15s, color 0.15s",
                fontFamily: "inherit",
              }}
            >
              Get started <Send size={13} />
            </button>
          </div>
        </div>

        {/* Suggestion chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}>
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => setValue(s)}
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "9999px",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.78rem",
                padding: "0.35rem 0.85rem",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background-color 0.15s, color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.backgroundColor = "rgba(212,83,126,0.15)"
                el.style.borderColor = `${PINK}60`
                el.style.color = "rgba(255,255,255,0.8)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.backgroundColor = "rgba(255,255,255,0.06)"
                el.style.borderColor = "rgba(255,255,255,0.1)"
                el.style.color = "rgba(255,255,255,0.5)"
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Scroll cue */}
        <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", opacity: 0.3 }}>
          <span style={{ color: "#fff", fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase" }}>Learn more</span>
          <ChevronDown size={16} color="#fff" />
        </div>
      </div>
    </section>
  )
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section style={{ backgroundColor: PINK, padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "2rem", letterSpacing: "-1px", lineHeight: 1 }}>{value}</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "4px" }}>
              <Icon size={11} />{label}
            </span>
          </div>
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
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: PINK, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
            What doctaa does
          </p>
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              style={{
                backgroundColor: i % 2 === 0 ? "#fff" : NAVY,
                borderRadius: "1.25rem",
                padding: "2.25rem",
                border: i % 2 === 0 ? "1px solid rgba(10,22,40,0.07)" : "none",
              }}
            >
              <div style={{
                width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem",
                backgroundColor: i % 2 === 0 ? `${PINK}18` : `${PINK}30`,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem",
              }}>
                <Icon size={20} style={{ color: PINK }} />
              </div>
              <h3 style={{ color: i % 2 === 0 ? NAVY : "#fff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.6rem" }}>{title}</h3>
              <p style={{ color: i % 2 === 0 ? "rgba(10,22,40,0.5)" : "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" style={{ backgroundColor: NAVY, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <p style={{ color: PINK, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
            How it works
          </p>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Care in three steps.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {steps.map(({ n, title, body }) => (
            <div key={n} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{
                width: "3rem", height: "3rem", borderRadius: "50%",
                border: `2px solid ${PINK}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: PINK, fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.5px",
              }}>
                {n}
              </div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>{title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── For doctors ──────────────────────────────────────────────────────────────
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
        <div>
          <p style={{ color: PINK, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
            For clinicians
          </p>
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(2rem,4vw,2.75rem)", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Less admin.<br />More care.
          </h2>
          <p style={{ color: "rgba(10,22,40,0.5)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            Doctaa handles the paperwork so you can focus on patients. Built for how Australian clinicians actually work.
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.25rem" }}>
            {perks.map(p => (
              <li key={p} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <CheckCircle2 size={16} style={{ color: PINK, flexShrink: 0 }} />
                <span style={{ color: NAVY, fontSize: "0.9rem" }}>{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/doctor" style={{ color: PINK, fontWeight: 700, fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            Explore the clinician portal <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ backgroundColor: NAVY, borderRadius: "1.5rem", padding: "2rem", overflow: "hidden" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "1.5rem" }}>
            Today&apos;s snapshot
          </p>
          {[
            { label: "Appointments", value: "12", sub: "3 telehealth" },
            { label: "Pending notes", value: "2",  sub: "AI draft ready" },
            { label: "New messages", value: "5",  sub: "1 urgent" },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{
              backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.875rem",
              padding: "1rem 1.1rem", marginBottom: "0.75rem",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{label}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: "2px" }}>{sub}</div>
              </div>
              <span style={{ color: PINK, fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-1px" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section style={{ backgroundColor: PINK, padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(2rem,5vw,3rem)", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "1.25rem" }}>
          Ready to take control<br />of your health?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.25rem" }}>
          Join Australians who already manage their care with doctaa. Free to start. No credit card.
        </p>
        <Link href="/doctor" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          backgroundColor: "#fff", color: PINK, fontWeight: 700, fontSize: "1rem",
          padding: "0.875rem 2rem", borderRadius: "9999px",
        }}>
          Start chatting free <ArrowRight size={17} />
        </Link>
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
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", letterSpacing: "0.5px", marginBottom: "0.75rem" }}>care, organised.</div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", lineHeight: 1.6, maxWidth: "200px" }}>
              AI-powered primary care for Australia.
            </p>
          </div>
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            {cols.map(({ heading, links }) => (
              <div key={heading}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
                  {heading}
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {links.map(l => (
                    <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }} className="hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
            © 2026 Doctaa Health Pty Ltd. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>
            Doctaa is not a substitute for professional medical advice. Always consult a qualified healthcare provider.
          </p>
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
