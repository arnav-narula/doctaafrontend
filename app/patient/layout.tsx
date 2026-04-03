import type React from "react"
import { AppSidebarPatient } from "@/components/app-sidebar-patient"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebarPatient variant="inset" />
      <SidebarInset className="flex w-full flex-col h-screen overflow-hidden">
        <SiteHeader basePath="patient" />
        <div className="flex-1 min-h-0 flex flex-col @container/main">
          <div className="w-full px-4 pb-2 lg:px-6 flex-1 min-h-0 overflow-auto">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
