"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  IconSearch,
  IconMessageCircle,
  IconPhone,
  IconMail,
  IconChevronDown,
  IconChevronUp,
  IconSparkles,
  IconCalendar,
  IconFileText,
  IconShieldLock,
  IconCreditCard,
  IconUser,
  IconHelp,
} from "@tabler/icons-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqCategories = [
  {
    title: "Getting Started",
    icon: IconSparkles,
    faqs: [
      {
        q: "How do I start using TeleHealth AI?",
        a: "Simply click on 'Start AI Chat' in the sidebar to begin a conversation with our AI doctor. You can describe your symptoms, ask health questions, or request a consultation.",
      },
      {
        q: "Do I need to create an account?",
        a: "Yes, you need to create an account to access all features including consultations, prescriptions, and medical records. Your account is free to create.",
      },
      {
        q: "Is TeleHealth AI available 24/7?",
        a: "Yes, our AI doctor is available 24 hours a day, 7 days a week to assess your symptoms and provide guidance. However, live consultations with human doctors are scheduled during business hours.",
      },
      {
        q: "What devices can I use?",
        a: "TeleHealth AI works on any device with a web browser - desktop computers, laptops, tablets, and smartphones. We recommend using the latest version of Chrome, Safari, Firefox, or Edge.",
      },
    ],
  },
  {
    title: "AI Doctor & Consultations",
    icon: IconUser,
    faqs: [
      {
        q: "How accurate is the AI doctor?",
        a: "Our AI doctor uses advanced medical knowledge and follows evidence-based guidelines. However, it's designed to assist and provide initial assessments. For serious conditions, you'll be connected with a licensed AHPRA-registered doctor.",
      },
      {
        q: "Can I get a prescription from the AI?",
        a: "The AI can recommend treatments, but prescriptions require approval from a licensed AHPRA-registered doctor. If a prescription is needed, you'll be connected with a doctor for review.",
      },
      {
        q: "How do I book an appointment?",
        a: "Navigate to 'Appointments' in the sidebar, then click 'Book Appointment'. Select your preferred date and time, and choose between a video consultation or AI chat session.",
      },
      {
        q: "Can I reschedule or cancel appointments?",
        a: "Yes, you can reschedule appointments up to 24 hours before the scheduled time. Cancellations can be made at any time through the Appointments page.",
      },
      {
        q: "What happens during a video consultation?",
        a: "During a video consultation, you'll be connected with a licensed doctor via secure video call. The doctor will review your symptoms, ask questions, provide diagnosis, and prescribe medications if needed.",
      },
    ],
  },
  {
    title: "Prescriptions & Medications",
    icon: IconFileText,
    faqs: [
      {
        q: "How do I view my prescriptions?",
        a: "All your active and past prescriptions are available in the 'Prescriptions' section. You can see medication details, refill status, and expiration dates.",
      },
      {
        q: "Can I get prescription refills?",
        a: "Yes, you can request refills through the Prescriptions page. The request will be reviewed by a doctor, and you'll be notified once approved.",
      },
      {
        q: "How are prescriptions delivered?",
        a: "Prescriptions are sent electronically to your preferred pharmacy. You can pick them up in person, or arrange for home delivery through the pharmacy.",
      },
      {
        q: "What if I have questions about my medication?",
        a: "You can chat with the AI doctor about medication questions, or schedule a follow-up consultation with your prescribing doctor.",
      },
    ],
  },
  {
    title: "Medical Records & Privacy",
    icon: IconShieldLock,
    faqs: [
      {
        q: "How is my health data protected?",
        a: "All your health information is encrypted and stored securely in compliance with Australian privacy laws, AHPRA regulations, and HIPAA standards. We use industry-leading security measures to protect your data.",
      },
      {
        q: "Can I download my medical records?",
        a: "Yes, you can download your medical records, prescriptions, and consultation history from the Medical Records section. All documents are available in PDF format.",
      },
      {
        q: "Who can access my medical information?",
        a: "Only you and authorized healthcare providers involved in your care can access your medical information. We never share your data with third parties without your explicit consent.",
      },
      {
        q: "How long are my records kept?",
        a: "Medical records are retained in accordance with Australian health record retention requirements, typically for 7 years after your last consultation or until you request deletion.",
      },
    ],
  },
  {
    title: "Billing & Payments",
    icon: IconCreditCard,
    faqs: [
      {
        q: "How much does a consultation cost?",
        a: "Consultation fees vary depending on the type of consultation. AI chat sessions may be free or low-cost, while video consultations with doctors are billed according to Medicare or private health insurance rates.",
      },
      {
        q: "Can I claim through Medicare?",
        a: "Yes, if you have a valid Medicare number and it's verified, you can claim consultation fees through Medicare. Make sure your Medicare number is verified in your Settings.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept credit cards, debit cards, and Medicare claims. Payment is processed securely through our encrypted payment gateway.",
      },
      {
        q: "Can I get a receipt?",
        a: "Yes, receipts are automatically generated for all consultations and are available in your account under Medical Records.",
      },
    ],
  },
  {
    title: "Account & Settings",
    icon: IconUser,
    faqs: [
      {
        q: "How do I update my personal information?",
        a: "Go to Settings and update your profile information, including name, email, phone number, and date of birth. Changes are saved immediately.",
      },
      {
        q: "How do I verify my Medicare number?",
        a: "In Settings, enter your Medicare number and click 'Verify Medicare'. The system will check the authenticity of your Medicare number through OPV (Online Patient Verification).",
      },
      {
        q: "Can I change my notification preferences?",
        a: "Yes, you can customize all notification preferences in Settings. Choose to receive reminders via SMS, email, or both.",
      },
      {
        q: "How do I delete my account?",
        a: "You can delete your account from the Account & Privacy section in Settings. Note that this action is permanent and will delete all your medical records and data.",
      },
    ],
  },
]

const supportOptions = [
  {
    title: "Phone Support",
    description: "Speak directly with a support representative",
    icon: IconPhone,
    action: "Call Now",
    available: "Mon-Fri 9am-5pm AEST",
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: IconMail,
    action: "Send Email",
    available: "Response within 24 hours",
  },
]

export default function PatientHelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  })

  const filteredFAQs = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.faqs.length > 0)

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for contacting us! We'll get back to you soon.")
    setShowContactForm(false)
    setContactForm({ subject: "", message: "" })
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      {/* Search Bar */}
      <Card className="py-2">
        <CardContent className="px-4 py-2 sm:px-5 sm:py-2">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid gap-2 md:grid-cols-3">
        {supportOptions.map((option) => (
          <Card key={option.title} className="py-2">
            <CardContent className="px-4 py-3 sm:px-5 sm:py-3">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <option.icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1">{option.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full rounded-lg text-xs"
                    onClick={() => {
                      if (option.title === "Email Support") {
                        setShowContactForm(true)
                      }
                    }}
                  >
                    {option.action}
                  </Button>
                  <p className="text-[10px] text-muted-foreground mt-1.5">{option.available}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <Card className="py-2">
          <CardHeader className="px-4 py-2 sm:px-5 sm:py-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Contact Support</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactForm(false)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0 sm:px-5 sm:pb-3 sm:pt-0">
            <form onSubmit={handleSubmitContact} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What can we help you with?"
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your issue..."
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="min-h-[100px] resize-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowContactForm(false)}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="rounded-lg">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* FAQs Section */}
      <div className="space-y-3 flex-1 min-h-0 overflow-auto thin-scrollbar">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category) => (
            <Card key={category.title} className="py-2">
              <CardHeader className="px-4 py-2 sm:px-5 sm:py-2">
                <div className="flex items-center gap-2">
                  <category.icon className="size-5 text-primary" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3 pt-0 sm:px-5 sm:pb-3 sm:pt-0">
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.title}-${index}`}
                      className="border-b last:border-b-0"
                    >
                      <AccordionTrigger className="text-left py-3 hover:no-underline">
                        <span className="font-medium text-sm">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-3">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="py-4">
            <CardContent className="px-4 pb-3 pt-0 sm:px-5 sm:pb-3 sm:pt-0 text-center py-8">
              <IconHelp className="size-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No results found for "{searchQuery}". Try a different search term or contact
                support for assistance.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
