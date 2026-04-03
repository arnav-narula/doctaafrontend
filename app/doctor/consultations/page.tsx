"use client"

import { useMemo, useState, type ReactNode } from "react"
import { endOfDay, format, startOfDay } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  IconAlertTriangle,
  IconArrowDownRight,
  IconArrowUpRight,
  IconCalendar,
  IconCheck,
  IconCrown,
  IconDeviceLaptop,
  IconLayoutGrid,
  IconLayoutList,
  IconSearch,
  IconStethoscope,
  IconUserCheck,
  IconVideo,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type ConsultationBucket = "ongoing" | "scheduled" | "completed"
type ConsultationType = "remote"
type RiskLevel = "high" | "medium" | "low"

type Consultation = {
  id: string
  patientName: string
  patientAvatar?: string
  topics: string
  dateLabel: string
  timeLabel: string
  type: ConsultationType
  doctorName: string
  risk: RiskLevel
  bucket: ConsultationBucket
  isMarkedComplete: boolean
}

const overviewStats = [
  {
    label: "Total Consultations",
    value: "3,489",
    helper: "Till date consultations",
    change: "+15%",
    trend: "up",
    icon: IconStethoscope,
  },
  {
    label: "Today's Consultations",
    value: "28",
    helper: "All sessions",
    change: "+10%",
    trend: "up",
    icon: IconCalendar,
  },
  {
    label: "Average Duration",
    value: "18m 20s",
    helper: "Shorter than last week",
    change: "-08%",
    trend: "up",
    icon: IconDeviceLaptop,
  },
] as const

const consultations: Consultation[] = [
  {
    id: "#226482",
    patientName: "Ayana Abigail",
    topics: "Diabetes",
    dateLabel: "April 22, 2025",
    timeLabel: "14:00",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "medium",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226483",
    patientName: "Ryo Kuzhiko",
    topics: "Dermatitis",
    dateLabel: "April 22, 2025",
    timeLabel: "10:00",
    type: "remote",
    doctorName: "Dr. Tommy Oliver",
    risk: "high",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226484",
    patientName: "Tammy Forshman",
    topics: "Hypertension",
    dateLabel: "April 22, 2025",
    timeLabel: "10:00",
    type: "remote",
    doctorName: "Dr. Amy Winston",
    risk: "medium",
    bucket: "scheduled",
    isMarkedComplete: true,
  },
  {
    id: "#226485",
    patientName: "Mike Lallana",
    topics: "Anxiety Disorder",
    dateLabel: "April 22, 2025",
    timeLabel: "09:00",
    type: "remote",
    doctorName: "Dr. Steven Gingerbread",
    risk: "low",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226486",
    patientName: "Tamara Johanson",
    topics: "Hypertension",
    dateLabel: "April 22, 2025",
    timeLabel: "09:00",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "medium",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226487",
    patientName: "Nico Adriann",
    topics: "Diabetes",
    dateLabel: "April 21, 2025",
    timeLabel: "14:00",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "low",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226488",
    patientName: "Helen Cobb",
    topics: "Post-op check",
    dateLabel: "April 22, 2025",
    timeLabel: "15:00",
    type: "remote",
    doctorName: "Dr. Amy Winston",
    risk: "medium",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226489",
    patientName: "Jonah Smith",
    topics: "Dermatology review",
    dateLabel: "April 22, 2025",
    timeLabel: "16:30",
    type: "remote",
    doctorName: "Dr. Tommy Oliver",
    risk: "high",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226490",
    patientName: "Elaine Harper",
    topics: "Asthma follow-up",
    dateLabel: "April 21, 2025",
    timeLabel: "11:00",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "medium",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226491",
    patientName: "Markus Jansen",
    topics: "Cardio screening",
    dateLabel: "April 21, 2025",
    timeLabel: "15:30",
    type: "remote",
    doctorName: "Dr. Steven Gingerbread",
    risk: "low",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226492",
    patientName: "Sasha Meyer",
    topics: "Migraine follow-up",
    dateLabel: "April 22, 2025",
    timeLabel: "17:30",
    type: "remote",
    doctorName: "Dr. Amy Winston",
    risk: "low",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226493",
    patientName: "Victor Kline",
    topics: "Cholesterol review",
    dateLabel: "April 23, 2025",
    timeLabel: "08:30",
    type: "remote",
    doctorName: "Dr. Steven Gingerbread",
    risk: "medium",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226494",
    patientName: "Hana Castillo",
    topics: "Prenatal consult",
    dateLabel: "April 21, 2025",
    timeLabel: "12:00",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "low",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226495",
    patientName: "Drew Patel",
    topics: "Sleep apnea",
    dateLabel: "April 23, 2025",
    timeLabel: "11:15",
    type: "remote",
    doctorName: "Dr. Tommy Oliver",
    risk: "high",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226496",
    patientName: "Lena Ortiz",
    topics: "Post-surgery follow-up",
    dateLabel: "April 22, 2025",
    timeLabel: "19:00",
    type: "remote",
    doctorName: "Dr. Amy Winston",
    risk: "medium",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226497",
    patientName: "Rahul Menon",
    topics: "Cardio rehab",
    dateLabel: "April 20, 2025",
    timeLabel: "10:45",
    type: "remote",
    doctorName: "Dr. Steven Gingerbread",
    risk: "medium",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226498",
    patientName: "Monica Ruiz",
    topics: "Allergy panel review",
    dateLabel: "April 23, 2025",
    timeLabel: "14:45",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "low",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226499",
    patientName: "Zane Holloway",
    topics: "Knee pain consult",
    dateLabel: "April 24, 2025",
    timeLabel: "09:20",
    type: "remote",
    doctorName: "Dr. Amy Winston",
    risk: "medium",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226500",
    patientName: "Ivy Chen",
    topics: "Thyroid monitoring",
    dateLabel: "April 24, 2025",
    timeLabel: "13:40",
    type: "remote",
    doctorName: "Dr. Steven Gingerbread",
    risk: "high",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226501",
    patientName: "Noah Sylvan",
    topics: "COPD follow-up",
    dateLabel: "April 22, 2025",
    timeLabel: "20:00",
    type: "remote",
    doctorName: "Dr. Tommy Oliver",
    risk: "medium",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226502",
    patientName: "Priya Agrawal",
    topics: "Nutrition coaching",
    dateLabel: "April 19, 2025",
    timeLabel: "18:00",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "low",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226503",
    patientName: "Luis Cabrera",
    topics: "Sports physical",
    dateLabel: "April 19, 2025",
    timeLabel: "16:10",
    type: "remote",
    doctorName: "Dr. Amy Winston",
    risk: "medium",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226504",
    patientName: "Farah Idris",
    topics: "Dermatitis flare",
    dateLabel: "April 24, 2025",
    timeLabel: "15:45",
    type: "remote",
    doctorName: "Dr. Tommy Oliver",
    risk: "high",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226505",
    patientName: "Caleb Monroe",
    topics: "ACL rehab check",
    dateLabel: "April 25, 2025",
    timeLabel: "10:05",
    type: "remote",
    doctorName: "Dr. Steven Gingerbread",
    risk: "medium",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226506",
    patientName: "Eliora Park",
    topics: "Postpartum consult",
    dateLabel: "April 21, 2025",
    timeLabel: "21:30",
    type: "remote",
    doctorName: "Dr. Amy Winston",
    risk: "low",
    bucket: "completed",
    isMarkedComplete: true,
  },
  {
    id: "#226507",
    patientName: "Marcus Liu",
    topics: "Diabetes CGM review",
    dateLabel: "April 24, 2025",
    timeLabel: "18:20",
    type: "remote",
    doctorName: "Dr. Clara Redfield",
    risk: "medium",
    bucket: "ongoing",
    isMarkedComplete: false,
  },
  {
    id: "#226508",
    patientName: "Isabel Novak",
    topics: "Chronic pain plan",
    dateLabel: "April 26, 2025",
    timeLabel: "08:50",
    type: "remote",
    doctorName: "Dr. Tommy Oliver",
    risk: "high",
    bucket: "scheduled",
    isMarkedComplete: false,
  },
  {
    id: "#226509",
    patientName: "Omar Castillo",
    topics: "Sleep hygiene review",
    dateLabel: "April 20, 2025",
    timeLabel: "07:40",
    type: "remote",
    doctorName: "Dr. Steven Gingerbread",
    risk: "low",
    bucket: "completed",
    isMarkedComplete: true,
  },
] as const

const riskLabels: Record<RiskLevel, string> = {
  high: "AI Risk: High",
  medium: "AI Risk: Medium",
  low: "AI Risk: Low",
}

const riskStyles: Record<RiskLevel, string> = {
  high: "bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-200",
  low: "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200",
}

const typeBadges: Record<ConsultationType, { label: string; icon: typeof IconVideo }> = {
  remote: { label: "Remote", icon: IconVideo },
}

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [activeTab, setActiveTab] = useState<ConsultationBucket>("ongoing")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const dateLabel = useMemo(() => {
    if (dateRange?.from && dateRange.to) {
      return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
    }

    if (dateRange?.from) {
      return format(dateRange.from, "MMM d, yyyy")
    }

    return "All dates"
  }, [dateRange])

  const filteredConsultations = useMemo(() => {
    return consultations.filter((consultation) => {
      const matchesTab = consultation.bucket === activeTab
      const consultDate = new Date(consultation.dateLabel)
      const rangeStart = dateRange?.from
      const rangeEnd = dateRange?.to ?? dateRange?.from
      const matchesDate =
        !rangeStart ||
        !rangeEnd ||
        (consultDate >= startOfDay(rangeStart) && consultDate <= endOfDay(rangeEnd))
      const matchesSearch =
        consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.topics.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.id.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesTab && matchesDate && matchesSearch
    })
  }, [activeTab, searchQuery, dateRange])

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <section className="grid flex-none gap-3 md:grid-cols-3">
        {overviewStats.map((stat) => (
          <Card key={stat.label} className="gap-2 py-3 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-1.5">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <CardTitle className="mt-1.5 text-xl">{stat.value}</CardTitle>
              </div>
              <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{stat.helper}</div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200"
                    : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-200",
                )}
              >
                {stat.trend === "up" ? (
                  <IconArrowUpRight className="h-3 w-3" />
                ) : (
                  <IconArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ConsultationBucket)}
        className="flex flex-1 min-h-0 flex-col gap-4 overflow-hidden"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList className="w-full justify-start rounded-full bg-muted/50 p-0.5 lg:w-auto">
            <TabsTrigger value="ongoing" className="flex-1 rounded-full lg:flex-none">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex-1 rounded-full lg:flex-none">
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 rounded-full lg:flex-none">
              Completed
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <div className="relative w-full md:w-[320px]">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search patient, topic, or ID"
                className="rounded-full pl-9 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 md:justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 rounded-full px-4 text-left text-sm font-normal"
                  >
                    <IconCalendar className="h-4 w-4" />
                    {dateLabel}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    numberOfMonths={2}
                    selected={dateRange}
                    onSelect={setDateRange}
                  />
                  <div className="flex items-center justify-between border-t p-2">
                    <Button variant="ghost" size="sm" onClick={() => setDateRange(undefined)}>
                      Clear
                    </Button>
                    {dateRange?.from && dateRange?.to ? (
                      <p className="text-xs text-muted-foreground">
                        {format(dateRange.from, "MMM d")} → {format(dateRange.to, "MMM d")}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Select from & to</p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <div className="hidden rounded-full border bg-muted/50 p-0.5 md:flex">
                <Button
                  type="button"
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <IconLayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <IconLayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {(["ongoing", "scheduled", "completed"] as ConsultationBucket[]).map((bucket) => (
          <TabsContent
            key={bucket}
            value={bucket}
            className="hidden min-h-0 flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
          >
            <div className="queue-scroll h-full flex-1 overflow-y-auto pr-1">
              <ConsultationsGrid
                items={filteredConsultations.filter((consultation) => consultation.bucket === bucket)}
                viewMode={viewMode}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ConsultationsGrid({
  items,
  viewMode,
}: {
  items: Consultation[]
  viewMode: "grid" | "list"
}) {
  if (!items.length) {
    return (
      <Card className="border-dashed bg-muted/30">
        <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
          <IconUserCheck className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-medium">No consultations found</p>
            <p className="text-sm text-muted-foreground">
              Try changing the filters or pick a different date.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {items.map((consultation) => (
          <ConsultationListRow key={`${consultation.id}-${consultation.patientName}`} consultation={consultation} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((consultation) => (
        <ConsultationCard key={`${consultation.id}-${consultation.patientName}`} consultation={consultation} />
      ))}
    </div>
  )
}

function ConsultationCard({ consultation }: { consultation: Consultation }) {
  const typeBadge = typeBadges[consultation.type]
  const TypeIcon = typeBadge.icon

  return (
    <Card className="h-full border border-muted/40 px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 py-1">
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-muted-foreground">{consultation.id}</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 border">
              <AvatarImage src={consultation.patientAvatar} alt={consultation.patientName} />
              <AvatarFallback>{consultation.patientName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold leading-tight">{consultation.patientName}</p>
            </div>
          </div>
        </div>
        <Badge
          variant="muted"
          className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium", riskStyles[consultation.risk])}
        >
          <IconAlertTriangle className="h-2.5 w-2.5" />
          {riskLabels[consultation.risk]}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pb-1 pt-0.5 text-xs">
        <div className="grid gap-2 text-muted-foreground sm:grid-cols-2">
          <InfoItem label="Schedule" value={`${consultation.dateLabel} · ${consultation.timeLabel}`} />
          <InfoItem label="Description" value={consultation.topics} />
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t pt-2">
          <Button variant="outline" size="xs" className="flex-1 min-[420px]:flex-none rounded-full px-3 py-1 text-[11px]">
            View Details
          </Button>
          {consultation.isMarkedComplete ? (
            <Button variant="secondary" size="xs" className="gap-1 rounded-full px-3 py-1 text-[11px] text-emerald-600 dark:text-emerald-200">
              <IconCheck className="h-3 w-3" />
              Completed
            </Button>
          ) : (
            <Button size="xs" className="gap-1 rounded-full px-3 py-1 text-[11px]">
              Mark as Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ConsultationListRow({ consultation }: { consultation: Consultation }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-muted/40 bg-card px-4 py-3 shadow-sm transition hover:bg-muted/40 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-[200px] items-center gap-3">
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={consultation.patientAvatar} alt={consultation.patientName} />
          <AvatarFallback>{consultation.patientName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-[140px]">
          <p className="text-xs font-medium text-muted-foreground">{consultation.id}</p>
          <p className="text-sm font-semibold text-foreground">{consultation.patientName}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
        <div className="w-full rounded-lg border border-muted/40 bg-transparent px-3 py-2 sm:w-[240px]">
          <p className="text-[11px] font-medium text-muted-foreground">Schedule</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{`${consultation.dateLabel} · ${consultation.timeLabel}`}</p>
        </div>
        <div className="w-full rounded-lg border border-muted/40 bg-transparent px-3 py-2 sm:w-[200px]">
          <p className="text-[11px] font-medium text-muted-foreground">Description</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{consultation.topics}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="muted"
          className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium", riskStyles[consultation.risk])}
        >
          <IconAlertTriangle className="h-3 w-3" />
          {riskLabels[consultation.risk]}
        </Badge>
        {consultation.isMarkedComplete ? (
          <Badge variant="secondary" className="rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-medium text-emerald-700">
            <IconCheck className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        ) : (
          <Button size="xs" className="rounded-full px-3 py-1 text-[11px]">
            Mark as Completed
          </Button>
        )}
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string | ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground">{label}</p>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}
