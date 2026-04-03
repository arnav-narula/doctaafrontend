"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  IconBell,
  IconGlobe,
  IconLock,
  IconShieldLock,
  IconUser,
  IconLogout,
  IconSparkles,
} from "@tabler/icons-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState, useEffect } from "react"

const formatDate = (value: Date | null) =>
  value
    ? value.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Select date"

export default function PatientSettingsPage() {
  // Profile & Contact form state
  const initialProfileData = {
    name: "Alex Johnson",
    dob: new Date("1990-05-15"),
    email: "alex.johnson@email.com",
    phone: "+61 2 XXXX XXXX",
    conditions: "",
    allergies: "",
    medicare: "",
  }

  const [profileData, setProfileData] = useState(initialProfileData)
  const [dob, setDob] = useState<Date | null>(initialProfileData.dob)

  // AI Personalisation form state
  const initialAIData = ""
  const [aiData, setAiData] = useState(initialAIData)

  // Check if Profile & Contact has changes
  const hasProfileChanges =
    profileData.name !== initialProfileData.name ||
    dob?.getTime() !== initialProfileData.dob.getTime() ||
    profileData.email !== initialProfileData.email ||
    profileData.phone !== initialProfileData.phone ||
    profileData.conditions !== initialProfileData.conditions ||
    profileData.allergies !== initialProfileData.allergies ||
    profileData.medicare !== initialProfileData.medicare

  // Check if AI Personalisation has changes
  const hasAIChanges = aiData !== initialAIData

  // Reset Profile & Contact form
  const resetProfileForm = () => {
    setProfileData(initialProfileData)
    setDob(initialProfileData.dob)
  }

  // Reset AI Personalisation form
  const resetAIForm = () => {
    setAiData(initialAIData)
  }

  // Update dob when it changes
  useEffect(() => {
    setProfileData((prev) => ({ ...prev, dob: dob ?? new Date() }))
  }, [dob])

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden">
      <div className="grid gap-2 md:grid-cols-1">
        <Card className="relative overflow-hidden border-primary/10 bg-gradient-to-br from-slate-50 via-white to-stone-100 py-2">
          <div className="pointer-events-none absolute -left-12 -top-16 size-44 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-6 size-36 rounded-full bg-stone-200/60 blur-3xl" />
          <CardHeader className="relative flex flex-row items-start justify-between space-y-0 px-4 py-1 sm:px-5 sm:py-1">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                AJ
              </div>
              <div>
                <CardTitle className="text-lg">Alex Johnson</CardTitle>
                <CardDescription>Telehealth member · Joined 2024</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Patient
            </Badge>
          </CardHeader>
          <CardContent className="relative grid gap-0.5 md:grid-cols-2 px-4 pb-2 pt-1 sm:px-5 sm:pb-2 sm:pt-1">
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">alex.johnson@email.com</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">+61 2 XXXX XXXX</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">Preferred contact</p>
              <p className="font-medium">SMS & Email</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">Medicare</p>
              <p className="font-medium">Not verified</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-2 lg:grid-cols-3 items-start">
        <Card className="lg:col-span-2 py-4">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 py-2 sm:px-5 sm:py-2">
            <div className="flex items-center gap-2">
              <IconUser className="size-5 text-primary" />
              <div>
                <CardTitle>Profile & contact</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-3 pt-2 sm:px-5 sm:pb-3 sm:pt-2">
            <div className="grid gap-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dob"
                      variant="outline"
                      className="w-full justify-between rounded-lg text-left font-normal"
                    >
                      {formatDate(dob)}
                      <IconUser className="size-4 opacity-60" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dob ?? undefined}
                      onSelect={(date) => setDob(date ?? null)}
                      fromYear={1940}
                      toYear={2030}
                      captionLayout="dropdown"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Chronic conditions</Label>
                <Input
                  id="conditions"
                  placeholder="e.g., Diabetes, Hypertension"
                  value={profileData.conditions}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, conditions: e.target.value }))}
                  className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="e.g., Penicillin, Pollen"
                  value={profileData.allergies}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, allergies: e.target.value }))}
                  className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="medicare">Medicare number</Label>
                  <Badge variant="secondary" className="text-[11px]">Not verified</Badge>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                  <Input
                    id="medicare"
                    placeholder="e.g., 1234 56789 1"
                    value={profileData.medicare}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, medicare: e.target.value }))}
                    className="sm:flex-1 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                  />
                  <Button id="opv" variant="outline" size="sm" className="gap-1 rounded-lg">
                    Verify Medicare
                  </Button>
                </div>
              </div>
            </div>
            {hasProfileChanges && (
              <div className="flex flex-wrap gap-1.5 justify-end">
                <Button size="sm" className="rounded-lg">Save changes</Button>
                <Button size="sm" variant="outline" className="rounded-lg" onClick={resetProfileForm}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex h-full flex-col gap-2">
          <Card className="self-stretch flex-1 py-4">
            <CardHeader className="flex flex-col space-y-1.5 px-4 py-2 sm:px-5 sm:py-2">
              <div className="flex items-center gap-2">
                <IconBell className="size-5 text-primary" />
                <div>
                  <CardTitle>Notifications</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2 px-4 pb-3 pt-2 sm:px-5 sm:pb-3 sm:pt-2">
              {[
                {
                  title: "Appointment reminders",
                  desc: "SMS & email 24h before",
                  checked: true,
                },
                {
                  title: "Prescription alerts",
                  desc: "Refill reminders and ready-for-pickup",
                  checked: true,
                },
                {
                  title: "AI chat updates",
                  desc: "Follow-up summaries and actions",
                  checked: false,
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="self-stretch py-4">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 py-2 sm:px-5 sm:py-2">
              <div className="flex items-center gap-2">
                <IconShieldLock className="size-5 text-primary" />
                <CardTitle>Account &amp; Privacy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-3 pt-2 sm:px-5 sm:pb-3 sm:pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Language</span>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full justify-center gap-2">
                <IconLock className="size-4" />
                Reset password
              </Button>
              <Button variant="destructive" className="w-full justify-center gap-2">
                <IconLock className="size-4" />
                Delete account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-2 lg:grid-cols-1">
        <Card className="py-4">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 py-2 sm:px-5 sm:py-2">
            <div className="flex items-center gap-2">
              <IconSparkles className="size-5 text-primary" />
              <CardTitle>AI Personalisation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-3 pt-2 sm:px-5 sm:pb-3 sm:pt-2">
            <Textarea
              placeholder="Share any overall health context to help the AI doctor know you better."
              className="min-h-[80px] resize-none"
              value={aiData}
              onChange={(e) => setAiData(e.target.value)}
            />
            {hasAIChanges && (
              <div className="flex flex-wrap gap-1.5 justify-end">
                <Button size="sm" className="rounded-lg">Save changes</Button>
                <Button size="sm" variant="outline" className="rounded-lg" onClick={resetAIForm}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
