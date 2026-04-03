import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset className="flex w-full flex-col h-screen overflow-hidden">
        <SiteHeader basePath="doctor" />
        <div className="flex-1 min-h-0 flex flex-col @container/main">
          <div className="w-full px-4 pt-2 pb-2 lg:px-6 flex-1 min-h-0 overflow-auto">
            {children}
          </div>
        </div>
      </SidebarInset>
    </>
  )
}