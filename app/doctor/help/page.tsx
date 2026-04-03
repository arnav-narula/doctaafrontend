"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { IconSearch, IconMessageCircle, IconBook, IconPhone } from "@tabler/icons-react"

export default function DoctorHelpPage() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="queue-scroll flex-1 space-y-6 overflow-y-auto">
        <Card>
        <CardHeader>
          <CardTitle>Search Documentation</CardTitle>
          <CardDescription>Find answers in our knowledge base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Search for help topics..." />
            <Button>
              <IconSearch className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 @md/main:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconBook className="size-5 text-primary" />
              <CardTitle>Documentation</CardTitle>
            </div>
            <CardDescription>Learn how to use the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a href="#" className="flex items-center justify-between p-2 rounded hover:bg-muted">
                <span className="text-sm">Getting Started Guide</span>
                <Badge variant="outline">New</Badge>
              </a>
              <a href="#" className="block p-2 rounded hover:bg-muted text-sm">
                Managing Patients
              </a>
              <a href="#" className="block p-2 rounded hover:bg-muted text-sm">
                AI Escalation Process
              </a>
              <a href="#" className="block p-2 rounded hover:bg-muted text-sm">
                HIPAA Compliance
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconMessageCircle className="size-5 text-primary" />
              <CardTitle>Contact Support</CardTitle>
            </div>
            <CardDescription>Reach out to our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                <IconMessageCircle className="mr-2 size-4" />
                Live Chat
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <IconPhone className="mr-2 size-4" />
                Call Support
              </Button>
              <p className="text-xs text-muted-foreground text-center">Support available 24/7</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                q: "How do I escalate a case to another doctor?",
                a: "You can escalate cases through the patient consultation page by clicking the 'Escalate' button.",
              },
              {
                q: "What should I do if the AI makes an incorrect assessment?",
                a: "You can review and override any AI assessment. Report significant errors through the feedback system.",
              },
              {
                q: "How do I manage prescription refills?",
                a: "Refill requests appear in your 'Prescriptions' dashboard. Review and approve or deny from there.",
              },
              {
                q: "Is my data HIPAA compliant?",
                a: "Yes, all patient data is encrypted and stored in HIPAA-compliant facilities. See our compliance documentation for details.",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0">
                <p className="font-medium">{item.q}</p>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
