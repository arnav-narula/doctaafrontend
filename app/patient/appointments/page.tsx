"use client"

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  IconArrowRight,
  IconCalendar,
  IconChevronDown,
  IconClock,
  IconPhone,
  IconUser,
  IconVideo,
} from "@tabler/icons-react"

type Appointment = {
  id: string
  doctor: string
  specialty: string
  start: string
  durationMinutes: number
  type: "Video"
  status: "Booked"
  notes?: string
}

const appointments: Appointment[] = [
  {
    id: "apt-2041",
    doctor: "Dr. Sarah Chen",
    specialty: "Dermatology",
    start: "2025-12-15T09:30:00.000Z",
    durationMinutes: 40,
    type: "Video",
    status: "Booked",
    notes: "Follow-up on skin routine results",
  },
  {
    id: "apt-2042",
    doctor: "Dr. Michael Brown",
    specialty: "Sleep Medicine",
    start: "2026-01-04T16:00:00.000Z",
    durationMinutes: 45,
    type: "Video",
    status: "Booked",
    notes: "Bring last week’s sleep journal",
  },
  {
    id: "apt-2043",
    doctor: "Dr. Anita Kapoor",
    specialty: "Cardiology",
    start: "2026-01-20T14:15:00.000Z",
    durationMinutes: 30,
    type: "Video",
    status: "Booked",
  },
]

const formatDateTime = (isoDate: string) =>
  new Date(isoDate).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

const formatTimeRange = (isoDate: string, durationMinutes: number) => {
  const start = new Date(isoDate)
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000)

  return `${start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} – ${end.toLocaleTimeString(
    "en-US",
    { hour: "numeric", minute: "2-digit" },
  )}`
}

const timeOptions = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const formatTimeLabel = (time: string) =>
  new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

const formatDateLabel = (date: Date | null) =>
  date
    ? date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Pick a date"

export default function AppointmentsPage() {
  const { toast } = useToast()
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [newDate, setNewDate] = useState<Date | null>(null)
  const [newTime, setNewTime] = useState("")
  const [note, setNote] = useState("")

  const now = new Date()
  const RESCHEDULE_WINDOW_MS = 24 * 60 * 60 * 1000
  const isReschedulable = (appt: Appointment) => new Date(appt.start).getTime() - now.getTime() >= RESCHEDULE_WINDOW_MS

  const upcomingBooked = appointments
    .filter((appt) => appt.status === "Booked" && new Date(appt.start).getTime() > now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  const nextAppointment = upcomingBooked[0]
  const remainingAppointments = upcomingBooked.slice(1)

  useEffect(() => {
    if (!selectedAppointment) return
    const start = new Date(selectedAppointment.start)
    setNewDate(start)
    setNewTime(start.toTimeString().slice(0, 5))
    setNote(selectedAppointment.notes ?? "")
  }, [selectedAppointment])

  const openReschedule = (appt: Appointment) => {
    if (!isReschedulable(appt)) {
      toast({
        title: "Reschedule not available",
        description: "Rescheduling is allowed only 24 hours before the visit.",
        variant: "destructive",
      })
      return
    }
    setSelectedAppointment(appt)
    setRescheduleOpen(true)
  }

  const handleReschedule = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedAppointment || !newDate || !newTime) return

    const isoDate = newDate.toISOString().slice(0, 10)
    const formatted = new Date(`${isoDate}T${newTime}`)
    toast({
      title: "Reschedule requested",
      description: `${selectedAppointment.doctor} · ${formatted.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}`,
    })

    setRescheduleOpen(false)
  }

  const formatICSDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  const handleAddToApple = () => {
    if (!upcomingBooked.length) return
    const origin =
      typeof window !== "undefined"
        ? window.location.origin.replace(/^https?:\/\//, "")
        : "localhost:3000"
    const webcalUrl = `webcal://${origin}/api/appointments/ics`
    window.open(webcalUrl, "_blank", "noopener")
  }

  const buildOutlookUrl = (appt: Appointment) => {
    const start = new Date(appt.start)
    const end = new Date(start.getTime() + appt.durationMinutes * 60 * 1000)
    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: `${appt.doctor} · ${appt.specialty}`,
      body: [appt.notes, "Telehealth visit"].filter(Boolean).join("\n"),
      startdt: start.toISOString(),
      enddt: end.toISOString(),
      location: "Video visit",
    })
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
  }

  const handleAddToOutlook = () => {
    const appt = upcomingBooked[0]
    if (!appt) return
    window.open(buildOutlookUrl(appt), "_blank", "noopener")
  }

  const buildYahooUrl = (appt: Appointment) => {
    const start = new Date(appt.start)
    const end = new Date(start.getTime() + appt.durationMinutes * 60 * 1000)
    const format = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const params = new URLSearchParams({
      v: "60",
      title: `${appt.doctor} · ${appt.specialty}`,
      desc: [appt.notes, "Telehealth visit"].filter(Boolean).join("\n"),
      st: format(start),
      et: format(end),
      in_loc: "Video visit",
      type: "20",
    })
    return `https://calendar.yahoo.com/?${params.toString()}`
  }

  const handleAddToYahoo = () => {
    const appt = upcomingBooked[0]
    if (!appt) return
    window.open(buildYahooUrl(appt), "_blank", "noopener")
  }

  const buildGoogleCalendarUrl = (appt: Appointment) => {
    const start = new Date(appt.start)
    const end = new Date(start.getTime() + appt.durationMinutes * 60 * 1000)
    const format = (d: Date) => formatICSDate(d)
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${appt.doctor} · ${appt.specialty}`,
      details: [appt.notes, "Telehealth visit"].filter(Boolean).join("\n"),
      dates: `${format(start)}/${format(end)}`,
      location: "Video visit",
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const handleAddToGoogle = () => {
    const appt = upcomingBooked[0]
    if (!appt) return
    const url = buildGoogleCalendarUrl(appt)
    window.open(url, "_blank", "noopener")
  }

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden border-primary/10 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="pointer-events-none absolute -left-12 -top-20 size-52 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-10 size-40 rounded-full bg-primary/10 blur-3xl" />
        <CardHeader className="relative">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="border-primary/30 bg-primary/10 text-primary">
              Upcoming
            </Badge>
          </div>
          <CardTitle className="text-2xl">Your next appointment</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          {nextAppointment ? (
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCalendar className="size-4 text-primary" />
                  {formatDateTime(nextAppointment.start)}
                  <span className="text-muted-foreground">•</span>
                  {formatTimeRange(nextAppointment.start, nextAppointment.durationMinutes)}
                </div>
                <div className="flex items-center gap-2">
                  <IconUser className="size-5 text-primary" />
                  <p className="text-lg font-semibold leading-tight">{nextAppointment.doctor}</p>
                  <Badge variant="outline" className="text-xs">
                    {nextAppointment.specialty}
                  </Badge>
                </div>
                {nextAppointment.notes && (
                  <p className="text-sm text-muted-foreground">Note: {nextAppointment.notes}</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" className="shadow-sm">
                  {nextAppointment.type === "Video" ? (
                    <>
                      <IconVideo className="mr-2 size-4" />
                      Join
                    </>
                  ) : (
                    <>
                      <IconPhone className="mr-2 size-4" />
                      Check in
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openReschedule(nextAppointment)}
                  disabled={!isReschedulable(nextAppointment)}
                >
                  Reschedule
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed bg-background/60 p-6 text-center">
              <p className="text-sm text-muted-foreground">No booked visits yet. Once you book, they will appear here.</p>
              <Button className="mt-3" variant="outline">
                <IconArrowRight className="mr-2 size-4" />
                Browse doctors
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Upcoming appointments</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs inline-flex items-center gap-1.5"
                  disabled={!upcomingBooked.length}
                >
                  <span>Add to calendar</span>
                  <IconChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleAddToGoogle}>Google Calendar</DropdownMenuItem>
                <DropdownMenuItem onClick={handleAddToApple}>Apple Calendar</DropdownMenuItem>
                <DropdownMenuItem onClick={handleAddToOutlook}>Outlook Calendar</DropdownMenuItem>
                <DropdownMenuItem onClick={handleAddToYahoo}>Yahoo Calendar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {remainingAppointments.length ? (
            remainingAppointments.map((appt, index) => (
              <div
                key={appt.id}
                className="relative flex gap-3 rounded-xl border bg-muted/10 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex flex-col items-center">
                  <span className="mt-1 size-2.5 rounded-full bg-primary" />
                  {index !== remainingAppointments.length - 1 && <span className="mt-1 h-full w-px bg-border" />}
                </div>
                <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <IconUser className="size-4 text-primary" />
                      <p className="font-semibold leading-none">{appt.doctor}</p>
                      <Badge variant="outline" className="text-[11px]">
                        {appt.specialty}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <IconCalendar className="size-4" />
                        {formatDateTime(appt.start)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <IconClock className="size-4" />
                        {formatTimeRange(appt.start, appt.durationMinutes)}
                      </span>
                    </div>
                    {appt.notes && <p className="text-sm text-muted-foreground">Note: {appt.notes}</p>}
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <div className="flex flex-wrap gap-2"></div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReschedule(appt)}
                        disabled={!isReschedulable(appt)}
                      >
                        Reschedule
                      </Button>
                      <Button size="sm">
                        {appt.type === "Video" ? (
                          <>
                            <IconVideo className="mr-2 size-4" />
                            Join
                          </>
                        ) : (
                          <>
                            <IconPhone className="mr-2 size-4" />
                            Check in
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed bg-muted/10 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No other upcoming appointments. Once scheduled, they will appear here.
              </p>
              <Button variant="outline" className="mt-2">
                <IconArrowRight className="mr-2 size-4" />
                Book a visit
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Reschedule appointment</DialogTitle>
            <DialogDescription>Pick a new time and we’ll notify your doctor.</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="rounded-lg border bg-muted/10 p-3 text-sm">
              <div className="flex items-center gap-2">
                <IconUser className="size-4 text-primary" />
                <span className="font-medium">{selectedAppointment.doctor}</span>
                <Badge variant="outline" className="text-[11px]">
                  {selectedAppointment.specialty}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <IconCalendar className="size-4" />
                  {formatDateTime(selectedAppointment.start)}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconClock className="size-4" />
                  {formatTimeRange(selectedAppointment.start, selectedAppointment.durationMinutes)}
                </span>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleReschedule}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="reschedule-date">New date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between text-left font-normal"
                      id="reschedule-date"
                    >
                      <span>{formatDateLabel(newDate)}</span>
                      <IconCalendar className="size-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newDate ?? undefined}
                      onSelect={(date) => setNewDate(date ?? null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reschedule-time">New time</Label>
                <Select value={newTime} onValueChange={(val) => setNewTime(val)}>
                  <SelectTrigger id="reschedule-time" className="w-full">
                    <SelectValue placeholder="Pick a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {formatTimeLabel(time)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reschedule-note">Optional note</Label>
              <Textarea
                id="reschedule-note"
                placeholder="Share any context for the doctor"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!newDate || !newTime}>
                Send request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
