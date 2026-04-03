"use client"

import { DataTable } from "@/components/data-table"
import data from "@/app/dashboard/data.json"

export default function MedicalRecordsPage() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="queue-scroll flex-1 overflow-y-auto">
        <div className="space-y-6">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  )
}
