"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChatListView } from "@/components/doctor/ai-assistant/chat-list-view"
import { PATIENT_INITIAL_CONVERSATIONS } from "@/components/patient/ai-assistant/mock-data"
import type { Conversation } from "@/components/doctor/ai-assistant/types"

export default function PatientChatsPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>(PATIENT_INITIAL_CONVERSATIONS)

  const sortedConversations = useMemo(
    () =>
      [...conversations].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    [conversations],
  )

  return (
    <div className="flex h-full min-h-[600px] flex-1 flex-col overflow-hidden">
      <ChatListView
        conversations={sortedConversations}
        onSelectChat={(id) => router.push(`/patient/ai-chat/${id}`)}
        onCreateChat={() => router.push("/patient/ai-chat/new")}
        consultCtaLabel="Book consult ($49)"
        onBookConsult={() => router.push("/patient/appointments")}
        onTogglePin={(id) =>
          setConversations((prev) =>
            prev.map((conversation) =>
              conversation.id === id ? { ...conversation, pinned: !conversation.pinned } : conversation,
            ),
          )
        }
      />
    </div>
  )
}
