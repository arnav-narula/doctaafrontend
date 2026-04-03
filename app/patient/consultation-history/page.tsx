"use client"

import { useMemo, useState, type ReactNode } from "react"
import { endOfDay, format, startOfDay } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  IconAlertTriangle,
  IconCalendar,
  IconCheck,
  IconLayoutGrid,
  IconLayoutList,
  IconSearch,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type ConsultationBucket = "upcoming" | "ongoing" | "completed"
type ConsultationType = "remote"
type RiskLevel = "high" | "medium" | "low"

type Consultation = {
  id: string
  doctorName: string
  doctorAvatar?: string
  doctorSpecialty: string
  topics: string
  dateLabel: string
  timeLabel: string
  type: ConsultationType
  risk: RiskLevel
  bucket: ConsultationBucket
  isCompleted: boolean
}

const consultations: Consultation[] = [
  {
    id: "#226482",
    doctorName: "Dr. Clara Redfield",
    doctorSpecialty: "Endocrinology",
    topics: "Diabetes Management",
    dateLabel: "April 22, 2025",
    timeLabel: "14:00",
    type: "remote",
    risk: "medium",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226483",
    doctorName: "Dr. Tommy Oliver",
    doctorSpecialty: "Dermatology",
    topics: "Skin Condition Review",
    dateLabel: "April 23, 2025",
    timeLabel: "10:00",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226484",
    doctorName: "Dr. Amy Winston",
    doctorSpecialty: "Cardiology",
    topics: "Blood Pressure Follow-up",
    dateLabel: "April 24, 2025",
    timeLabel: "15:30",
    type: "remote",
    risk: "medium",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226485",
    doctorName: "Dr. Steven Gingerbread",
    doctorSpecialty: "Psychiatry",
    topics: "Anxiety Management",
    dateLabel: "April 22, 2025",
    timeLabel: "09:00",
    type: "remote",
    risk: "low",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226486",
    doctorName: "Dr. Clara Redfield",
    doctorSpecialty: "Endocrinology",
    topics: "Lab Results Discussion",
    dateLabel: "April 21, 2025",
    timeLabel: "14:00",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226487",
    doctorName: "Dr. Amy Winston",
    doctorSpecialty: "Cardiology",
    topics: "Post-op Checkup",
    dateLabel: "April 22, 2025",
    timeLabel: "11:00",
    type: "remote",
    risk: "medium",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226488",
    doctorName: "Dr. Tommy Oliver",
    doctorSpecialty: "Dermatology",
    topics: "Allergy Panel Review",
    dateLabel: "April 20, 2025",
    timeLabel: "16:00",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226489",
    doctorName: "Dr. Steven Gingerbread",
    doctorSpecialty: "Psychiatry",
    topics: "Mental Health Check-in",
    dateLabel: "April 25, 2025",
    timeLabel: "10:30",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226490",
    doctorName: "Dr. Clara Redfield",
    doctorSpecialty: "Endocrinology",
    topics: "Thyroid Function Review",
    dateLabel: "April 19, 2025",
    timeLabel: "15:00",
    type: "remote",
    risk: "medium",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226491",
    doctorName: "Dr. Amy Winston",
    doctorSpecialty: "Cardiology",
    topics: "Cardiovascular Screening",
    dateLabel: "April 18, 2025",
    timeLabel: "09:30",
    type: "remote",
    risk: "high",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226492",
    doctorName: "Dr. Tommy Oliver",
    doctorSpecialty: "Dermatology",
    topics: "Eczema Treatment Plan",
    dateLabel: "April 26, 2025",
    timeLabel: "14:15",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226493",
    doctorName: "Dr. Steven Gingerbread",
    doctorSpecialty: "Psychiatry",
    topics: "Therapy Session",
    dateLabel: "April 17, 2025",
    timeLabel: "11:00",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226494",
    doctorName: "Dr. Clara Redfield",
    doctorSpecialty: "Endocrinology",
    topics: "Insulin Adjustment",
    dateLabel: "April 27, 2025",
    timeLabel: "13:00",
    type: "remote",
    risk: "medium",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226495",
    doctorName: "Dr. Amy Winston",
    doctorSpecialty: "Cardiology",
    topics: "EKG Results Discussion",
    dateLabel: "April 16, 2025",
    timeLabel: "10:00",
    type: "remote",
    risk: "high",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226496",
    doctorName: "Dr. Tommy Oliver",
    doctorSpecialty: "Dermatology",
    topics: "Mole Examination",
    dateLabel: "April 15, 2025",
    timeLabel: "16:30",
    type: "remote",
    risk: "medium",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226497",
    doctorName: "Dr. Steven Gingerbread",
    doctorSpecialty: "Psychiatry",
    topics: "Medication Review",
    dateLabel: "April 28, 2025",
    timeLabel: "09:45",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226498",
    doctorName: "Dr. Clara Redfield",
    doctorSpecialty: "Endocrinology",
    topics: "Weight Management Consult",
    dateLabel: "April 14, 2025",
    timeLabel: "14:30",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226499",
    doctorName: "Dr. Amy Winston",
    doctorSpecialty: "Cardiology",
    topics: "Stress Test Results",
    dateLabel: "April 13, 2025",
    timeLabel: "11:15",
    type: "remote",
    risk: "medium",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226500",
    doctorName: "Dr. Tommy Oliver",
    doctorSpecialty: "Dermatology",
    topics: "Acne Treatment Follow-up",
    dateLabel: "April 29, 2025",
    timeLabel: "15:00",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226501",
    doctorName: "Dr. Steven Gingerbread",
    doctorSpecialty: "Psychiatry",
    topics: "CBT Session",
    dateLabel: "April 12, 2025",
    timeLabel: "10:30",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226502",
    doctorName: "Dr. Maria Santos",
    doctorSpecialty: "General Practice",
    topics: "Annual Physical Exam",
    dateLabel: "April 30, 2025",
    timeLabel: "09:00",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226503",
    doctorName: "Dr. James Chen",
    doctorSpecialty: "Orthopedics",
    topics: "Knee Pain Assessment",
    dateLabel: "May 1, 2025",
    timeLabel: "11:30",
    type: "remote",
    risk: "medium",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226504",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Neurology",
    topics: "Migraine Management",
    dateLabel: "April 22, 2025",
    timeLabel: "16:00",
    type: "remote",
    risk: "medium",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226505",
    doctorName: "Dr. Robert Miller",
    doctorSpecialty: "Pulmonology",
    topics: "Asthma Check-up",
    dateLabel: "April 11, 2025",
    timeLabel: "14:00",
    type: "remote",
    risk: "high",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226506",
    doctorName: "Dr. Emily Davis",
    doctorSpecialty: "Gynecology",
    topics: "Routine Screening",
    dateLabel: "May 2, 2025",
    timeLabel: "10:00",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226507",
    doctorName: "Dr. Michael Brown",
    doctorSpecialty: "Urology",
    topics: "Follow-up Consultation",
    dateLabel: "April 10, 2025",
    timeLabel: "15:30",
    type: "remote",
    risk: "medium",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226508",
    doctorName: "Dr. Lisa Anderson",
    doctorSpecialty: "Ophthalmology",
    topics: "Eye Exam & Vision Test",
    dateLabel: "May 3, 2025",
    timeLabel: "13:00",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226509",
    doctorName: "Dr. David Wilson",
    doctorSpecialty: "ENT",
    topics: "Sinus Infection Follow-up",
    dateLabel: "April 22, 2025",
    timeLabel: "17:30",
    type: "remote",
    risk: "low",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226510",
    doctorName: "Dr. Jennifer Taylor",
    doctorSpecialty: "Rheumatology",
    topics: "Arthritis Management",
    dateLabel: "April 9, 2025",
    timeLabel: "11:00",
    type: "remote",
    risk: "medium",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226511",
    doctorName: "Dr. William Martinez",
    doctorSpecialty: "Gastroenterology",
    topics: "Digestive Issues Review",
    dateLabel: "May 4, 2025",
    timeLabel: "14:30",
    type: "remote",
    risk: "medium",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226512",
    doctorName: "Dr. Patricia Garcia",
    doctorSpecialty: "Hematology",
    topics: "Blood Work Analysis",
    dateLabel: "April 8, 2025",
    timeLabel: "09:15",
    type: "remote",
    risk: "high",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226513",
    doctorName: "Dr. Richard Lee",
    doctorSpecialty: "Nephrology",
    topics: "Kidney Function Test",
    dateLabel: "May 5, 2025",
    timeLabel: "10:45",
    type: "remote",
    risk: "high",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226514",
    doctorName: "Dr. Nancy White",
    doctorSpecialty: "Oncology",
    topics: "Cancer Screening",
    dateLabel: "April 22, 2025",
    timeLabel: "18:00",
    type: "remote",
    risk: "high",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226515",
    doctorName: "Dr. Christopher Clark",
    doctorSpecialty: "Infectious Disease",
    topics: "Vaccination Consultation",
    dateLabel: "April 7, 2025",
    timeLabel: "13:30",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226516",
    doctorName: "Dr. Barbara Rodriguez",
    doctorSpecialty: "Allergy & Immunology",
    topics: "Allergy Testing Results",
    dateLabel: "May 6, 2025",
    timeLabel: "11:00",
    type: "remote",
    risk: "medium",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226517",
    doctorName: "Dr. Daniel Lewis",
    doctorSpecialty: "Sports Medicine",
    topics: "Injury Recovery Plan",
    dateLabel: "April 6, 2025",
    timeLabel: "16:00",
    type: "remote",
    risk: "medium",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226518",
    doctorName: "Dr. Susan Walker",
    doctorSpecialty: "Pediatrics",
    topics: "General Health Check",
    dateLabel: "May 7, 2025",
    timeLabel: "09:30",
    type: "remote",
    risk: "low",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226519",
    doctorName: "Dr. Kevin Hall",
    doctorSpecialty: "Pain Management",
    topics: "Chronic Pain Therapy",
    dateLabel: "April 22, 2025",
    timeLabel: "19:00",
    type: "remote",
    risk: "medium",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226520",
    doctorName: "Dr. Margaret Young",
    doctorSpecialty: "Nutrition",
    topics: "Diet & Meal Planning",
    dateLabel: "April 5, 2025",
    timeLabel: "10:00",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226521",
    doctorName: "Dr. Joseph King",
    doctorSpecialty: "Plastic Surgery",
    topics: "Post-procedure Review",
    dateLabel: "May 8, 2025",
    timeLabel: "14:00",
    type: "remote",
    risk: "medium",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226522",
    doctorName: "Dr. Linda Wright",
    doctorSpecialty: "Geriatrics",
    topics: "Senior Health Assessment",
    dateLabel: "April 4, 2025",
    timeLabel: "11:30",
    type: "remote",
    risk: "medium",
    bucket: "completed",
    isCompleted: true,
  },
  {
    id: "#226523",
    doctorName: "Dr. Thomas Scott",
    doctorSpecialty: "Emergency Medicine",
    topics: "Follow-up After ER Visit",
    dateLabel: "May 9, 2025",
    timeLabel: "15:30",
    type: "remote",
    risk: "high",
    bucket: "upcoming",
    isCompleted: false,
  },
  {
    id: "#226524",
    doctorName: "Dr. Elizabeth Green",
    doctorSpecialty: "Family Medicine",
    topics: "Family Health Planning",
    dateLabel: "April 22, 2025",
    timeLabel: "20:00",
    type: "remote",
    risk: "low",
    bucket: "ongoing",
    isCompleted: false,
  },
  {
    id: "#226525",
    doctorName: "Dr. Charles Adams",
    doctorSpecialty: "Podiatry",
    topics: "Foot Pain Treatment",
    dateLabel: "April 3, 2025",
    timeLabel: "14:45",
    type: "remote",
    risk: "low",
    bucket: "completed",
    isCompleted: true,
  },
] as const

const riskLabels: Record<RiskLevel, string> = {
  high: "Priority: High",
  medium: "Priority: Medium",
  low: "Priority: Low",
}

const riskStyles: Record<RiskLevel, string> = {
  high: "bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-200",
  low: "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200",
}

const typeBadges: Record<ConsultationType, { label: string; icon: typeof IconVideo }> = {
  remote: { label: "Remote", icon: IconVideo },
}

export default function ConsultationHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [activeTab, setActiveTab] = useState<ConsultationBucket>("upcoming")
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
        consultation.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.topics.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.doctorSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.id.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesTab && matchesDate && matchesSearch
    })
  }, [activeTab, searchQuery, dateRange])

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ConsultationBucket)}
        className="flex flex-1 min-h-0 flex-col gap-4 overflow-hidden"
      >
        <div className="flex flex-none flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList className="w-full justify-start rounded-full bg-muted/50 p-0.5 lg:w-auto">
            <TabsTrigger value="upcoming" className="flex-1 rounded-full lg:flex-none">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="flex-1 rounded-full lg:flex-none">
              Ongoing
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
                placeholder="Search doctor, topic, or ID"
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

        {(["upcoming", "ongoing", "completed"] as ConsultationBucket[]).map((bucket) => (
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
          <ConsultationListRow key={`${consultation.id}-${consultation.doctorName}`} consultation={consultation} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((consultation) => (
        <ConsultationCard key={`${consultation.id}-${consultation.doctorName}`} consultation={consultation} />
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
              <AvatarImage src={consultation.doctorAvatar} alt={consultation.doctorName} />
              <AvatarFallback>{consultation.doctorName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold leading-tight">{consultation.doctorName}</p>
              <p className="text-[11px] text-muted-foreground">{consultation.doctorSpecialty}</p>
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
          <InfoItem label="Topic" value={consultation.topics} />
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t pt-2">
          <Button variant="outline" size="xs" className="flex-1 min-[420px]:flex-none rounded-full px-3 py-1 text-[11px]">
            View Details
          </Button>
          {consultation.bucket === "upcoming" ? (
            <Button size="xs" className="gap-1 rounded-full px-3 py-1 text-[11px]">
              <IconVideo className="h-3 w-3" />
              Join Call
            </Button>
          ) : consultation.isCompleted ? (
            <Button variant="secondary" size="xs" className="gap-1 rounded-full px-3 py-1 text-[11px] text-emerald-600 dark:text-emerald-200">
              <IconCheck className="h-3 w-3" />
              Completed
            </Button>
          ) : (
            <Button size="xs" className="gap-1 rounded-full px-3 py-1 text-[11px]">
              <IconVideo className="h-3 w-3" />
              Join Now
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
          <AvatarImage src={consultation.doctorAvatar} alt={consultation.doctorName} />
          <AvatarFallback>{consultation.doctorName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-[140px]">
          <p className="text-xs font-medium text-muted-foreground">{consultation.id}</p>
          <p className="text-sm font-semibold text-foreground">{consultation.doctorName}</p>
          <p className="text-[11px] text-muted-foreground">{consultation.doctorSpecialty}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
        <div className="w-full rounded-lg border border-muted/40 bg-transparent px-3 py-2 sm:w-[240px]">
          <p className="text-[11px] font-medium text-muted-foreground">Schedule</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{`${consultation.dateLabel} · ${consultation.timeLabel}`}</p>
        </div>
        <div className="w-full rounded-lg border border-muted/40 bg-transparent px-3 py-2 sm:w-[200px]">
          <p className="text-[11px] font-medium text-muted-foreground">Topic</p>
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
        {consultation.bucket === "upcoming" ? (
          <Button size="xs" className="gap-1 rounded-full px-3 py-1 text-[11px]">
            <IconVideo className="h-3 w-3" />
            Join Call
          </Button>
        ) : consultation.isCompleted ? (
          <Badge variant="secondary" className="rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-medium text-emerald-700">
            <IconCheck className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        ) : (
          <Button size="xs" className="gap-1 rounded-full px-3 py-1 text-[11px]">
            <IconVideo className="h-3 w-3" />
            Join Now
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
