"use client"

import { useState, useMemo } from "react"
import {
  IconActivity,
  IconCalendar,
  IconClockHour4,
  IconCurrencyDollar,
  IconStar,
  IconUsers,
} from "@tabler/icons-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { EventInput, EventClickArg } from "@fullcalendar/core"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { FullCalendarComponent } from "@/components/full-calendar"
import { cn } from "@/lib/utils"

type RiskLevel = "high" | "medium" | "low"

type PatientQueueItem = {
  id: string
  name: string
  gender: "Female" | "Male" | "Other"
  age: number
  waitingTime: string
  complaint: string
  riskLevel: RiskLevel
  summary: string
  avatar?: string
}

const patientQueue: PatientQueueItem[] = [
  {
    id: "Q-2451",
    name: "Emily Chen",
    gender: "Female",
    age: 34,
    waitingTime: "12 minutes",
    complaint: "Chest tightness and persistent cough since last night.",
    riskLevel: "high",
    summary:
      "Asthma patient with recent cold; reported mild wheezing and shortness of breath on exertion.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "Q-2452",
    name: "Jackson Reed",
    gender: "Male",
    age: 42,
    waitingTime: "8 minutes",
    complaint: "Lower back pain radiating to left leg after lifting weights.",
    riskLevel: "medium",
    summary:
      "History of sciatica; reports tingling in left foot but denies loss of bladder/bowel control.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "Q-2453",
    name: "Nia Gomez",
    gender: "Female",
    age: 28,
    waitingTime: "3 minutes",
    complaint: "Rash on both arms after starting new antibiotic yesterday.",
    riskLevel: "medium",
    summary: "No systemic symptoms. Rash described as itchy, non-pustular maculopapular.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "Q-2454",
    name: "Owen Patel",
    gender: "Male",
    age: 67,
    waitingTime: "New",
    complaint: "Routine blood pressure review and medication check.",
    riskLevel: "low",
    summary: "Hypertension managed with ARB; home BP readings elevated past 48 hours.",
  },
]

type ScheduleCategory = "appointment" | "exercise" | "admin"

type ScheduleEvent = {
  id: string
  title: string
  summary: string
  startTime: string
  endTime: string
  category: ScheduleCategory
  patientName: string
  patientAge: number
  patientGender: "Female" | "Male" | "Other"
  patientRisk: RiskLevel
  status: "scheduled" | "completed"
}

type ScheduleDay = {
  id: string
  dateLabel: string
  dayOfWeek: string
  displayDate: string
  events: ScheduleEvent[]
}

const scheduleDays: ScheduleDay[] = [
  {
    id: "2024-10-24",
    dateLabel: "24 Oct",
    dayOfWeek: "Thu",
    displayDate: "Thu, 24 Oct",
    events: [
      {
        id: "event-prev-1",
        title: "Telehealth: Post-op wound review",
        summary: "Secure video consult",
        startTime: "10:30 AM",
        endTime: "11:00 AM",
        category: "appointment",
        patientName: "James Walters",
        patientAge: 62,
        patientGender: "Male",
        patientRisk: "medium",
        status: "completed",
      },
      {
        id: "event-prev-2",
        title: "Workflow: Complete SOAP notes",
        summary: "Flagged telehealth consults awaiting documentation",
        startTime: "4:00 PM",
        endTime: "4:30 PM",
        category: "admin",
        patientName: "Internal",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "low",
        status: "completed",
      },
    ],
  },
  {
    id: "2024-10-25",
    dateLabel: "25 Oct",
    dayOfWeek: "Fri",
    displayDate: "Fri, 25 Oct",
    events: [
      {
        id: "event-1",
        title: "Telehealth: Migraine follow-up",
        summary: "Returning patient · Arabic interpreter",
        startTime: "08:00 AM",
        endTime: "08:30 AM",
        category: "appointment",
        patientName: "Maha Al-Fulan",
        patientAge: 28,
        patientGender: "Female",
        patientRisk: "medium",
        status: "scheduled",
      },
      {
        id: "event-2",
        title: "Remote vitals review",
        summary: "AI triage flagged: Irregular BP",
        startTime: "09:15 AM",
        endTime: "09:30 AM",
        category: "admin",
        patientName: "Automation Queue",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "high",
        status: "scheduled",
      },
      {
        id: "event-3",
        title: "Telehealth: Adolescent mental health",
        summary: "Guardians joining from separate devices",
        startTime: "10:00 AM",
        endTime: "10:45 AM",
        category: "appointment",
        patientName: "Leo Martinez",
        patientAge: 16,
        patientGender: "Male",
        patientRisk: "high",
        status: "scheduled",
      },
      {
        id: "event-4",
        title: "Recharge: Movement break",
        summary: "Guided stretch from wellness hub",
        startTime: "12:30 PM",
        endTime: "12:45 PM",
        category: "exercise",
        patientName: "Personal",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "low",
        status: "scheduled",
      },
    ],
  },
  {
    id: "2024-10-26",
    dateLabel: "26 Oct",
    dayOfWeek: "Sat",
    displayDate: "Sat, 26 Oct",
    events: [
      {
        id: "event-4",
        title: "Virtual GP clinic",
        summary: "Community bulk-bill session",
        startTime: "09:00 AM",
        endTime: "11:30 AM",
        category: "appointment",
        patientName: "Community list",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "medium",
        status: "scheduled",
      },
      {
        id: "event-5",
        title: "Workflow: Chronic care plans",
        summary: "Prep for Monday telehealth reviews",
        startTime: "01:00 PM",
        endTime: "02:00 PM",
        category: "admin",
        patientName: "Internal",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "low",
        status: "scheduled",
      },
      {
        id: "event-6",
        title: "Recharge: Mindfulness session",
        summary: "15 minute breathing exercise",
        startTime: "03:30 PM",
        endTime: "03:45 PM",
        category: "exercise",
        patientName: "Personal",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "low",
        status: "scheduled",
      },
    ],
  },
  {
    id: "2024-10-27",
    dateLabel: "27 Oct",
    dayOfWeek: "Sun",
    displayDate: "Sun, 27 Oct",
    events: [
      {
        id: "event-7",
        title: "Asynchronous review window",
        summary: "Respond to overnight triage questions",
        startTime: "08:00 AM",
        endTime: "09:00 AM",
        category: "admin",
        patientName: "Asynchronous queue",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "high",
        status: "scheduled",
      },
      {
        id: "event-8",
        title: "Telehealth: Paediatric dermatology",
        summary: "Parent uploading lesion photos live",
        startTime: "11:30 AM",
        endTime: "12:15 PM",
        category: "appointment",
        patientName: "Sia Patterson",
        patientAge: 5,
        patientGender: "Female",
        patientRisk: "medium",
        status: "scheduled",
      },
    ],
  },
  {
    id: "2024-10-28",
    dateLabel: "28 Oct",
    dayOfWeek: "Mon",
    displayDate: "Mon, 28 Oct",
    events: [
      {
        id: "event-9",
        title: "Back-to-back telehealth consults",
        summary: "AI queued patients awaiting doctor",
        startTime: "08:30 AM",
        endTime: "12:00 PM",
        category: "appointment",
        patientName: "Rapid triage block",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "high",
        status: "scheduled",
      },
      {
        id: "event-10",
        title: "Team sync: complex telehealth cases",
        summary: "Consultants + AI safety review",
        startTime: "03:30 PM",
        endTime: "04:15 PM",
        category: "admin",
        patientName: "Internal",
        patientAge: 0,
        patientGender: "Other",
        patientRisk: "low",
        status: "scheduled",
      },
    ],
  },
]

const scheduleCategoryStyles: Record<ScheduleCategory, string> = {
  appointment: "bg-primary/10 text-primary border-primary/20",
  exercise: "bg-emerald-500/10 text-emerald-600 border-emerald-400/20 dark:text-emerald-300",
  admin: "bg-sky-500/10 text-sky-600 border-sky-400/20 dark:text-sky-300",
}

const scheduleCategoryLabels: Record<ScheduleCategory, string> = {
  appointment: "Consult",
  exercise: "Recharge",
  admin: "Focus",
}

const riskStyles: Record<RiskLevel, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-amber-500/15 text-amber-600 border-amber-500/25 dark:text-amber-400",
  low: "bg-emerald-500/15 text-emerald-600 border-emerald-500/25 dark:text-emerald-400",
}

const consultTrendData = [
  { window: "08:00", consults: 6, followUps: 1 },
  { window: "09:00", consults: 5, followUps: 2 },
  { window: "10:00", consults: 7, followUps: 3 },
  { window: "11:00", consults: 4, followUps: 1 },
  { window: "12:00", consults: 3, followUps: 1 },
  { window: "13:00", consults: 5, followUps: 2 },
  { window: "14:00", consults: 4, followUps: 1 },
  { window: "15:00", consults: 6, followUps: 2 },
  { window: "16:00", consults: 5, followUps: 2 },
]

const consultTrendConfig = {
  consults: {
    label: "New consults",
    color: "hsl(var(--primary))",
  },
  followUps: {
    label: "Follow ups",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const todaysStats = [
  {
    label: "Consults complete",
    value: "18",
    helper: "Goal: 12 consults",
    icon: IconActivity,
  },
  {
    label: "Average duration",
    value: "14m 32s",
    helper: "↓ 1.5m vs yesterday",
    icon: IconClockHour4,
  },
  {
    label: "Earnings",
    value: "$640",
    helper: "$120 pending payout",
    icon: IconCurrencyDollar,
  },
  {
    label: "Rating",
    value: "4.9",
    helper: "Based on last 30 consults",
    icon: IconStar,
  },
].filter((stat) => stat.label !== "Rating")

export default function DoctorDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

  // Convert scheduleDays to FullCalendar events
  const calendarEvents = useMemo<EventInput[]>(() => {
    return scheduleDays.flatMap((day) =>
      day.events.map((event) => {
        // Parse time strings (e.g., "08:00 AM" -> "08:00")
        const parseTime = (timeStr: string): string => {
          const [time, period] = timeStr.split(' ')
          const [hours, minutes] = time.split(':')
          let hour24 = parseInt(hours, 10)
          if (period === 'PM' && hour24 !== 12) hour24 += 12
          if (period === 'AM' && hour24 === 12) hour24 = 0
          return `${hour24.toString().padStart(2, '0')}:${minutes}`
        }

        const startTime = parseTime(event.startTime)
        const endTime = parseTime(event.endTime)
        const start = `${day.id}T${startTime}:00`
        const end = `${day.id}T${endTime}:00`

        // Determine color based on category
        const categoryColors: Record<ScheduleCategory, string> = {
          appointment: 'hsl(var(--primary))',
          exercise: '#10b981', // emerald-500
          admin: '#0ea5e9', // sky-500
        }

        return {
          id: event.id,
          title: event.title,
          start,
          end,
          backgroundColor: categoryColors[event.category],
          borderColor: categoryColors[event.category],
          textColor: '#ffffff',
          extendedProps: {
            summary: event.summary,
            category: event.category,
            patientName: event.patientName,
            patientAge: event.patientAge,
            patientGender: event.patientGender,
            patientRisk: event.patientRisk,
            status: event.status,
          },
        }
      })
    )
  }, [])

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event
    const extendedProps = event.extendedProps as {
      summary: string
      category: ScheduleCategory
      patientName: string
      patientAge: number
      patientGender: string
      patientRisk: RiskLevel
      status: string
    }

    // You can add a dialog or modal here to show event details
    console.log('Event clicked:', {
      title: event.title,
      start: event.start,
      end: event.end,
      ...extendedProps,
    })
  }

  return (
    <div className="flex flex-col gap-2 pb-2">
      {/* Bento Box Layout */}
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-[3fr,2fr]">
        {/* Left Column: Provider Card (top) + Live Queue (bottom) */}
        <div className="flex flex-col gap-2">
          {/* Provider Card - Compact */}
          <Card className="py-1">
            <CardHeader className="items-start gap-0.5 pb-0 px-4 pt-2">
              <div className="space-y-0.5">
                <Badge variant="outline" className="bg-muted/40 text-xs uppercase tracking-wide">
                  Provider #AHPRA-482910
                </Badge>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base font-semibold leading-tight">
                    Dr. Maya Patel
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  Women&apos;s Health · Sydney, NSW
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* Live Queue - 50% width */}
          <Card className="py-1 flex-1 flex flex-col">
        <CardHeader className="gap-0 pb-0 px-4 pt-2 flex-shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-1 text-sm font-semibold">Live queue</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5">
                <Switch
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                  aria-label={isOnline ? "Go offline" : "Go online"}
                  className="scale-90"
                />
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                  <span className="text-xs font-medium">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium">
                    {patientQueue.length} waiting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
          <CardContent className="flex flex-col min-h-0 px-4 pt-0 pb-2 flex-1 overflow-hidden">
            <div className="queue-scroll space-y-3 overflow-y-auto overflow-x-hidden pr-1 flex-1 min-h-0" style={{ maxHeight: '280px' }}>
            {isOnline ? (
              patientQueue.map((patient, index) => (
            <div
              key={patient.id}
              role="button"
              tabIndex={0}
              onClick={() =>
                setSelectedPatientId((previous) =>
                  previous === patient.id ? null : patient.id,
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setSelectedPatientId((previous) =>
                    previous === patient.id ? null : patient.id,
                  )
                }
              }}
              className={cn(
                "rounded-2xl border border-border/60 bg-background/80 p-3 text-left shadow-xs outline-none transition",
                "hover:border-primary/40 hover:shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30",
                selectedPatientId === patient.id ? "border-primary bg-primary/5 shadow-sm" : null,
              )}
            >
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-start gap-2">
                  <Avatar className="size-10 border border-border/60">
                    {patient.avatar ? (
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                    ) : (
                      <AvatarFallback className="text-xs font-semibold">
                        {patient.name
                          .split(" ")
                          .map((segment) => segment[0])
                          .join("")
                          .slice(0, 3)
                          .toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-xs font-semibold sm:text-sm">{patient.name}</p>
                      <Badge variant="outline" className="border-dashed text-xs uppercase tracking-wide">
                        {patient.gender.slice(0, 1)} · {patient.age}
                      </Badge>
                      <Badge
                        className={cn(
                          "border px-2 py-0 text-[11px] font-medium uppercase tracking-wide",
                          riskStyles[patient.riskLevel],
                        )}
                      >
                        AI risk: {patient.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <IconClockHour4 className="size-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{patient.waitingTime}</span>
                      <span aria-hidden="true">•</span>
                      <span className="line-clamp-1 text-muted-foreground">
                        {patient.complaint}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="hidden text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:inline">
                  {index + 1}/{patientQueue.length}
                </span>
              </div>
              {selectedPatientId === patient.id ? (
                <div className="mt-3 space-y-3">
                                  <p className="text-xs leading-relaxed text-muted-foreground">
                                    {patient.summary}
                                  </p>
                                  <div className="grid gap-2.5 rounded-xl border border-border/60 bg-muted/15 p-2.5 text-xs sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                        Main complaint
                      </p>
                      <p className="text-foreground">{patient.complaint}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                        Waiting time
                      </p>
                      <p className="flex items-center gap-2 text-foreground">
                        <IconClockHour4 className="size-4 text-muted-foreground" />
                        {patient.waitingTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-start sm:gap-3">
                    <Button size="sm" className="w-full sm:w-auto">
                      Start consult
                    </Button>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      View full history
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
                ))
              ) : (
                // Placeholder cards when offline
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="rounded-2xl border border-dashed border-border/60 bg-muted/40 p-2.5"
                  >
                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-1 items-start gap-2">
                        <div className="size-10 rounded-full border border-border/60 bg-muted/60" />
                        <div className="flex flex-col gap-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <div className="h-4 w-24 bg-muted/80 rounded animate-pulse" />
                            <div className="h-4 w-12 bg-muted/80 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-muted/80 rounded animate-pulse" />
                          </div>
                          <div className="h-3 w-48 bg-muted/80 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          </Card>
        </div>

        {/* Right Column: Smart Schedule - Full Height */}
        <Card className="h-full py-1">
          <CardHeader className="gap-0 pb-0 px-3 pt-2">
            <CardTitle className="flex items-center gap-1 text-sm font-semibold">
              <IconCalendar className="size-3.5 text-muted-foreground" />
              Smart schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-0 pt-0 px-3 pb-3">
            <FullCalendarComponent
              events={calendarEvents}
              initialView="timeGridWeek"
              height={365}
              onEventClick={handleEventClick}
            />
          </CardContent>
        </Card>
      </div>

      {/* Consult Volume and Today's Stats - Side by Side */}
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-[55fr,45fr]">
        <Card className="py-1">
          <CardHeader className="gap-0 pb-0 px-4 pt-2">
            <CardTitle className="flex items-center gap-1 text-sm font-semibold">Consult volume today</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-4 pb-2">
            <ChartContainer
              config={consultTrendConfig}
              className="aspect-[16/4] w-full rounded-xl bg-muted/20 px-2 sm:px-4"
            >
            <AreaChart data={consultTrendData}>
              <defs>
                <linearGradient id="fillConsults" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-consults)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-consults)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="fillFollowUps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-followUps)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-followUps)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="window"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={32}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value, name) => [
                      value,
                      consultTrendConfig[name as keyof typeof consultTrendConfig]?.label ?? name,
                    ]}
                  />
                }
              />
              <Area
                dataKey="consults"
                type="monotone"
                stroke="var(--color-consults)"
                fill="url(#fillConsults)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="followUps"
                type="monotone"
                stroke="var(--color-followUps)"
                fill="url(#fillFollowUps)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
          </CardContent>
        </Card>

        <Card className="py-1">
          <CardHeader className="gap-0 pb-0 px-4 pt-2">
            <CardTitle className="flex items-center gap-1 text-sm font-semibold">Today&apos;s stats</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-3 pb-2">
            <div className="grid gap-2 grid-cols-3">
            {todaysStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-muted/20 p-4 shadow-xs min-h-[120px] flex flex-col justify-center"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{stat.label}</span>
                  <stat.icon className="size-3.5" />
                </div>
                <p className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.helper}</p>
              </div>
            ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
