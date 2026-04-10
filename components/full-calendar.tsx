"use client"

import type { EventInput, EventClickArg } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

interface FullCalendarComponentProps {
  events?: EventInput[]
  initialView?: string
  height?: number | string
  onEventClick?: (arg: EventClickArg) => void
}

export function FullCalendarComponent({
  events = [],
  initialView = "timeGridWeek",
  height = 500,
  onEventClick,
}: FullCalendarComponentProps) {
  return (
    <div className="fullcalendar-wrapper h-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        events={events}
        eventClick={onEventClick}
        height={height}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        nowIndicator
        editable={false}
        selectable={false}
      />
    </div>
  )
}
