"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"

export default function AnalyticsPage() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="queue-scroll flex-1 space-y-6 overflow-y-auto">
        <SectionCards />
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Consultation Trends</h2>
            <p className="text-muted-foreground text-sm">Monthly consultation volume and completion rates</p>
          </div>
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  )
}
