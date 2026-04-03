"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { IconUser, IconBell, IconShield, IconLogout } from "@tabler/icons-react"

export default function DoctorSettingsPage() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="queue-scroll flex-1 space-y-6 overflow-y-auto">
        <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconUser className="size-5 text-primary" />
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and professional details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Dr. Sarah Chen" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="sarah.chen@telehealthcare.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="license">Medical License Number</Label>
              <Input id="license" defaultValue="AHPRA-123456" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" defaultValue="General Practice" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconBell className="size-5 text-primary" />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Control how you receive updates and alerts</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Consultation Requests</p>
                <p className="text-sm text-muted-foreground">Get notified of new patient consultations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Prescription Refills</p>
                <p className="text-sm text-muted-foreground">Alerts for pending prescription refills</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">AI Escalations</p>
                <p className="text-sm text-muted-foreground">Notify when AI escalates cases to you</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Digests</p>
                <p className="text-sm text-muted-foreground">Daily summary of activities</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconShield className="size-5 text-primary" />
            <div>
              <CardTitle>Security & Privacy</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              View Login History
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">
            <IconLogout className="mr-2 size-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
