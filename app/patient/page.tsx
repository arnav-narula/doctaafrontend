"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import Lottie from "lottie-react"
import healthAnimation from "@/lib/health.json"
import { 
  IconClock, 
  IconStethoscope,
  IconPill,
  IconShoppingBag,
  IconChevronRight,
  IconCalendar,
  IconCheck,
  IconUser,
  IconMessageCircle
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Toaster } from "@/components/ui/toaster"

// Mock data for the dashboard
const recentActivity = [
  { id: 1, type: "Consultation", title: "AI Consultation: Cold", time: "2h ago", status: "Completed" },
  { id: 2, type: "Prescription", title: "Prescription: Paracetamol", time: "1d ago", status: "Active" },
]

const previousConsults = [
  {
    id: 1,
    doctor: "Dr. Sarah Chen",
    date: "Jan 15",
    diagnosis: "Common Cold",
    prescription: "Paracetamol 500mg"
  },
  {
    id: 2,
    doctor: "Dr. Michael Brown",
    date: "Jan 10",
    diagnosis: "Sleep Disorder",
    prescription: "Melatonin 3mg"
  },
]

const activePrescriptions = [
  {
    id: 1,
    medication: "Paracetamol 500mg",
    doctor: "Dr. S. Chen",
    remaining: 15,
    total: 30,
    refills: 2,
  },
  {
    id: 2,
    medication: "Vitamin D3",
    doctor: "Dr. S. Chen",
    remaining: 28,
    total: 30,
    refills: 1,
  },
  {
    id: 3,
    medication: "Melatonin 3mg",
    doctor: "Dr. M. Brown",
    remaining: 10,
    total: 30,
    refills: 0,
  },
]

const healthProducts = [
  { id: 1, name: "Multivitamin", brand: "HealthPlus", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1585830812416-a6c86bb14576?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Omega-3", brand: "PureHealth", price: "$24.99", rating: 4.9, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop" },
  { id: 3, name: "Probiotic", brand: "GutWell", price: "$34.99", rating: 4.7, image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=200&h=200&fit=crop" },
]

export default function PatientDashboard() {
  const patientName = "Alex" // TODO: Get from user context/auth
  
  return (
    <div className="space-y-4">
      <Toaster />

      {/* Avatar Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 py-3">
        <div className="pointer-events-none absolute -left-12 -top-16 size-44 rounded-full bg-slate-200/60 dark:bg-slate-700/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-6 size-36 rounded-full bg-stone-200/60 dark:bg-stone-700/40 blur-3xl" />
        <CardContent className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-6">
            <div className="flex size-32 items-center justify-center rounded-full shrink-0 overflow-hidden p-0">
              <Lottie
                animationData={healthAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full scale-125 translate-y-2"
                style={{ margin: 0, padding: 0 }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-1">Your Health Companion</h2>
              <p className="text-sm text-muted-foreground">
                Track your health, manage prescriptions, and connect with care providers
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/patient/ai-chat">
                <IconMessageCircle className="h-4 w-4" />
                Chat to AI
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-lg">
              <Link href="/patient/appointments">
                <IconUser className="h-4 w-4" />
                See Doctor ($39)
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bento Box Grid - Irregular shapes with different dimensions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        
        {/* Row 1: Previous Consultations and Recent Activity */}
        {/* Previous Consults - Wide shorter box */}
        <Card className="md:col-span-3 lg:col-span-7 py-3">
          <CardHeader className="pb-2 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Previous Consultations</CardTitle>
              <IconStethoscope className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <div className="grid grid-cols-2 gap-2">
              {previousConsults.map((consult) => (
                <div key={consult.id} className="rounded-lg border p-2 hover:bg-accent transition-colors">
                  <div className="flex items-center gap-1.5 mb-1 text-xs">
                    <IconUser className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="font-semibold truncate">{consult.doctor}</span>
                    <span className="text-muted-foreground">·</span>
                    <IconCalendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{consult.date}</span>
                  </div>
                  <div className="space-y-0.5">
                    <div>
                      <p className="text-xs text-muted-foreground">Diagnosis</p>
                      <p className="text-sm font-medium">{consult.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Prescription</p>
                      <p className="text-sm truncate">{consult.prescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs h-7 mt-2" asChild>
              <Link href="/patient/consultation-history">
                View All
                <IconChevronRight className="h-2.5 w-2.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity - Medium box */}
        <Card className="md:col-span-2 lg:col-span-5 py-3">
          <CardHeader className="pb-2 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <IconClock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 px-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Badge variant="outline" className="text-xs px-1.5 py-0">{activity.type}</Badge>
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant={activity.status === "Completed" ? "default" : "secondary"} className="text-xs shrink-0">
                  {activity.status}
                </Badge>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-xs h-7 mt-2" asChild>
              <Link href="/patient/consultation-history">
                View All
                <IconChevronRight className="h-2.5 w-2.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Row 2: Active Prescriptions and Health Products */}
        {/* Active Prescriptions - Wide box */}
        <Card className="md:col-span-3 lg:col-span-6 py-3 gap-2 max-h34 overflow-hidden">
          <CardHeader className="pb-2 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Prescriptions</CardTitle>
              <IconPill className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <div className="grid grid-cols-3 gap-1.5">
              {activePrescriptions.map((prescription) => {
                const percentage = Math.round((prescription.remaining / prescription.total) * 100)
                const circumference = 2 * Math.PI * 18 // radius = 18
                const offset = circumference - (percentage / 100) * circumference
                
                return (
                  <div
                    key={prescription.id}
                    className="rounded-lg border p-2 hover:bg-accent transition-colors"
                  >
                    <p className="text-sm font-semibold mb-2 truncate">{prescription.medication}</p>
                    <div className="flex items-center gap-2 mb-2">
                      {/* Progress Ring */}
                      <div className="relative w-12 h-12 shrink-0">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
                          <circle
                            cx="20"
                            cy="20"
                            r="18"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r="18"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className="text-primary transition-all"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-semibold">{percentage}%</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">{prescription.remaining} left</p>
                        <p className="text-sm font-medium">{prescription.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge variant={prescription.refills > 0 ? "default" : "secondary"} className="text-xs">
                        {prescription.refills} refills
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-xs h-7">
                      Refill
                    </Button>
                  </div>
                )
              })}
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs h-7 mt-1.5" asChild>
              <Link href="/patient/prescriptions">
                View All
                <IconChevronRight className="h-2.5 w-2.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Health Products - Wide box */}
        <Card className="md:col-span-3 lg:col-span-6 py-3 gap-2">
          <CardHeader className="pb-2 px-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Health Products</CardTitle>
                <CardDescription className="text-xs">Recommended for you</CardDescription>
              </div>
              <IconShoppingBag className="h-4 w-4 text-muted-foreground mt-0.5" />
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <div className="grid grid-cols-3 gap-1.5">
              {healthProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border p-2 hover:bg-accent transition-colors"
                >
                  <div className="h-12 w-full rounded-md bg-muted flex items-center justify-center mb-1.5 overflow-hidden relative">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-xs font-semibold mb-0.5 truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground mb-1.5 truncate">{product.brand}</p>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-bold">{product.price}</p>
                    <div className="flex items-center gap-0.5">
                      <IconCheck className="h-3 w-3 text-green-600" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full text-xs h-7">
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs h-7 mt-1.5">
              Browse All
              <IconChevronRight className="h-2.5 w-2.5" />
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
