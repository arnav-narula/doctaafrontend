"use client"

import { AIAssistantUI } from "@/components/doctor/ai-assistant"

export default function AIAssistantPage() {
  return (
    <div className="flex h-full min-h-[600px] flex-1 flex-col overflow-hidden">
      <AIAssistantUI />
    </div>
  )
}