import { NextResponse } from "next/server"

type Appointment = {
  id: string
  doctor: string
  specialty: string
  start: string
  durationMinutes: number
  status: "Booked"
  notes?: string
}

// Static mock data; in production, fetch upcoming booked appointments for the user.
const appointments: Appointment[] = [
  {
    id: "apt-2041",
    doctor: "Dr. Sarah Chen",
    specialty: "Dermatology",
    start: "2025-12-15T09:30:00.000Z",
    durationMinutes: 40,
    status: "Booked",
    notes: "Follow-up on skin routine results",
  },
  {
    id: "apt-2042",
    doctor: "Dr. Michael Brown",
    specialty: "Sleep Medicine",
    start: "2026-01-04T16:00:00.000Z",
    durationMinutes: 45,
    status: "Booked",
    notes: "Bring last week’s sleep journal",
  },
  {
    id: "apt-2043",
    doctor: "Dr. Anita Kapoor",
    specialty: "Cardiology",
    start: "2026-01-20T14:15:00.000Z",
    durationMinutes: 30,
    status: "Booked",
  },
]

const formatICSDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

const buildIcsFile = (appts: Appointment[]) => {
  const events = appts
    .map((appt) => {
      const start = new Date(appt.start)
      const end = new Date(start.getTime() + appt.durationMinutes * 60 * 1000)
      const uid = `${appt.id}@aihealth.app`
      const summary = `${appt.doctor} · ${appt.specialty}`
      const description = [appt.notes, "Telehealth visit"].filter(Boolean).join("\\n")

      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        "LOCATION:Video visit",
        "END:VEVENT",
      ].join("\n")
    })
    .join("\n")

  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AIHealth//Appointments//EN", events, "END:VCALENDAR"].join(
    "\n",
  )
}

export async function GET() {
  const upcoming = appointments.filter((appt) => new Date(appt.start).getTime() > Date.now())
  const icsContent = buildIcsFile(upcoming)

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="appointments.ics"',
    },
  })
}

