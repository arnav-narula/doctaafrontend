import Link from "next/link"
import {
  MessageSquare,
  CalendarDays,
  FileText,
  Shield,
  ChevronRight,
  Star,
  Clock,
  Users,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

// ─── Brand tokens ────────────────────────────────────────────────────────────
const PINK = "#D4537E"
const CREAM = "#F8F4F6"
const NAVY = "#0A1628"

// ─── Static data ─────────────────────────────────────────────────────────────
const stats = [
  { label: "Consultations", value: "10M+", icon: MessageSquare },
  { label: "Weekly users", value: "50K+", icon: Users },
  { label: "Available", value: "24/7", icon: Clock },
  { label: "User rating", value: "4.8★", icon: Star },
]

const features = [
  {
    icon: MessageSquare,
    title: "AI Health Chat",
    desc: "Describe your symptoms in plain language. Our AI gives you instant, evidence-based guidance — no waiting room required.",
  },
  {
    icon: CalendarDays,
    title: "Smart Booking",
    desc: "Book appointments with GPs and specialists in seconds. Reminders, rescheduling, and telehealth — all handled seamlessly.",
  },
  {
    icon: FileText,
    title: "Unified Care Records",
    desc: "All your health history, prescriptions, and test results in one secure place. Share with any provider instantly.",
  },
  {
    icon: Shield,
    title: "Private by Design",
    desc: "Your data is encrypted and never sold. Built to meet Australian Privacy Act standards from day one.",
  },
]

const steps = [
  {
    number: "01",
    title: "Describe your symptoms",
    desc: "Chat naturally with Doctaa AI — type or speak. No forms, no waiting.",
  },
  {
    number: "02",
    title: "Get instant AI guidance",
    desc: "Receive clear, clinically-informed information tailored to your situation.",
  },
  {
    number: "03",
    title: "Book care if needed",
    desc: "Connect with a GP or specialist directly through the app — same day where available.",
  },
]

const chatMessages = [
  { role: "user", text: "I've had a sore throat and mild fever for two days. Should I see a doctor?" },
  {
    role: "ai",
    text: "Based on your symptoms, this sounds like it could be a viral throat infection. I'd recommend rest, plenty of fluids, and throat lozenges for now. If your fever rises above 38.5°C, symptoms worsen, or you develop difficulty swallowing, it's worth booking a GP. Would you like me to check available appointment times near you?",
  },
  { role: "user", text: "Yes please, tomorrow morning if possible." },
  {
    role: "ai",
    text: "I found 3 available GPs tomorrow morning within 5 km of you. Dr. Sarah Chen at 9:00 AM is the closest — shall I book that?",
  },
]

// ─── Components ───────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      style={{ backgroundColor: NAVY, borderBottom: `1px solid rgba(255,255,255,0.07)` }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span style={{ color: PINK, fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.5px" }}>
            doctaa
          </span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", letterSpacing: "0.5px" }}>
            care, organised.
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "For Doctors"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem" }}
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/doctor"
            style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}
            className="hidden md:block hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/doctor"
            style={{ backgroundColor: PINK, color: "#fff", fontSize: "0.875rem", borderRadius: "9999px" }}
            className="px-5 py-2 font-medium hover:opacity-90 transition-opacity"
          >
            Get started free
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section
      style={{ backgroundColor: NAVY }}
      className="pt-32 pb-24 px-6 relative overflow-hidden"
    >
      {/* Soft glow */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "500px",
          background: `radial-gradient(ellipse, ${PINK}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span
            style={{
              backgroundColor: `${PINK}22`,
              color: PINK,
              border: `1px solid ${PINK}44`,
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5"
          >
            <Sparkles size={13} />
            AI-Powered Healthcare · Australia
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{ color: "#fff", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1px" }}
          className="text-center text-5xl md:text-7xl mb-6"
        >
          Your health,
          <br />
          <span style={{ color: PINK }}>expertly organised.</span>
        </h1>

        <p
          style={{ color: "rgba(255,255,255,0.6)", maxWidth: "520px", lineHeight: 1.7, fontSize: "1.1rem" }}
          className="text-center mx-auto mb-10"
        >
          Chat with our AI doctor, book appointments, and manage your entire care journey — all in one place.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/doctor"
            style={{ backgroundColor: PINK, color: "#fff", borderRadius: "9999px", fontSize: "1rem" }}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold hover:opacity-90 transition-opacity"
          >
            Start chatting free
            <ArrowRight size={18} />
          </Link>
          <a
            href="#how-it-works"
            style={{
              color: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "9999px",
              fontSize: "1rem",
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-medium hover:border-white/40 transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Chat preview */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1.25rem",
            maxWidth: "640px",
            backdropFilter: "blur(12px)",
          }}
          className="mx-auto overflow-hidden"
        >
          {/* Chat header */}
          <div
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "50%",
                backgroundColor: PINK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={16} color="#fff" />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>Doctaa AI</div>
              <div style={{ color: "#22c55e", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "4px" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Online now
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-5 flex flex-col gap-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "0.65rem 0.9rem",
                    borderRadius: msg.role === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                    backgroundColor: msg.role === "user" ? PINK : "rgba(255,255,255,0.08)",
                    color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.85)",
                    fontSize: "0.82rem",
                    lineHeight: 1.55,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <input
              readOnly
              placeholder="Describe your symptoms..."
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "9999px",
                padding: "0.5rem 1rem",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.82rem",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: PINK,
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <ArrowRight size={14} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  return (
    <section style={{ backgroundColor: PINK }} className="py-10 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1">
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "2rem", lineHeight: 1 }}>{value}</span>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}>
              <Icon size={12} />
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" style={{ backgroundColor: CREAM }} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p style={{ color: PINK, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase" }} className="mb-3">
            What doctaa does
          </p>
          <h2 style={{ color: NAVY, fontWeight: 700, fontSize: "2.5rem", letterSpacing: "-0.5px", lineHeight: 1.15 }}>
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                padding: "2rem",
                border: `1px solid rgba(10,22,40,0.07)`,
                transition: "box-shadow 0.2s",
              }}
              className="hover:shadow-lg"
            >
              <div
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "0.75rem",
                  backgroundColor: `${PINK}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Icon size={20} style={{ color: PINK }} />
              </div>
              <h3 style={{ color: NAVY, fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ color: "rgba(10,22,40,0.55)", fontSize: "0.9rem", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ backgroundColor: NAVY }} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p style={{ color: PINK, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase" }} className="mb-3">
            How it works
          </p>
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "2.5rem", letterSpacing: "-0.5px", lineHeight: 1.15 }}>
            Care in three steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ number, title, desc }, i) => (
            <div key={number} className="relative flex flex-col gap-4">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "-16%",
                    width: "30%",
                    height: "1px",
                    backgroundColor: `${PINK}40`,
                  }}
                  className="hidden md:block"
                />
              )}

              <div
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "50%",
                  border: `2px solid ${PINK}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: PINK,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                {number}
              </div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>{title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ForDoctors() {
  const perks = [
    "AI-generated consultation summaries",
    "Integrated scheduling & telehealth",
    "Automated patient follow-ups",
    "Secure messaging & referrals",
  ]

  return (
    <section id="for-doctors" style={{ backgroundColor: CREAM }} className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p style={{ color: PINK, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase" }} className="mb-3">
            For clinicians
          </p>
          <h2 style={{ color: NAVY, fontWeight: 700, fontSize: "2.25rem", letterSpacing: "-0.5px", lineHeight: 1.2 }} className="mb-5">
            Less admin.
            <br />
            More care.
          </h2>
          <p style={{ color: "rgba(10,22,40,0.55)", fontSize: "0.95rem", lineHeight: 1.7 }} className="mb-8">
            Doctaa handles the paperwork so you can focus on patients. AI-generated notes, smart scheduling, and seamless patient communication — built for how Australian clinicians actually work.
          </p>
          <ul className="flex flex-col gap-3 mb-8">
            {perks.map((perk) => (
              <li key={perk} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <CheckCircle2 size={17} style={{ color: PINK, flexShrink: 0 }} />
                <span style={{ color: NAVY, fontSize: "0.9rem" }}>{perk}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/doctor"
            style={{ color: PINK, fontWeight: 600, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
            className="hover:gap-2 transition-all"
          >
            Explore the clinician portal <ChevronRight size={16} />
          </Link>
        </div>

        {/* Decorative card */}
        <div
          style={{
            backgroundColor: NAVY,
            borderRadius: "1.25rem",
            padding: "2rem",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
            Today&apos;s snapshot
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: "Appointments", value: "12", sub: "3 telehealth" },
              { label: "Pending notes", value: "2", sub: "AI draft ready" },
              { label: "New messages", value: "5", sub: "1 urgent" },
            ].map(({ label, value, sub }) => (
              <div
                key={label}
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: "0.75rem",
                  padding: "0.9rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{label}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{sub}</div>
                </div>
                <span style={{ color: PINK, fontWeight: 700, fontSize: "1.5rem" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section style={{ backgroundColor: PINK }} className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "2.5rem", letterSpacing: "-0.5px", lineHeight: 1.15 }} className="mb-5">
          Ready to take control
          <br />
          of your health?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.65 }} className="mb-8">
          Join thousands of Australians who already manage their care with doctaa. No credit card required.
        </p>
        <Link
          href="/doctor"
          style={{
            backgroundColor: "#fff",
            color: PINK,
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "1rem",
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 hover:opacity-90 transition-opacity"
        >
          Get started free <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ backgroundColor: NAVY, borderTop: `1px solid rgba(255,255,255,0.07)` }} className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div>
              <div style={{ color: PINK, fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.5px" }}>doctaa</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", letterSpacing: "0.5px" }}>care, organised.</div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", lineHeight: 1.6, maxWidth: "220px" }}>
              AI-powered primary care for Australia.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                heading: "Product",
                links: ["Features", "How it works", "Pricing", "Security"],
              },
              {
                heading: "Clinicians",
                links: ["Doctor portal", "Integrations", "API docs", "Support"],
              },
              {
                heading: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  {heading}
                </div>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}
                        className="hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>
            © 2026 Doctaa Health Pty Ltd. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem" }}>
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
