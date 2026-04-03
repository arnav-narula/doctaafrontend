"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Conversation } from "@/components/doctor/ai-assistant/types"
import { ChatPane } from "@/components/doctor/ai-assistant/chat-pane"
import { PATIENT_INITIAL_CONVERSATIONS } from "@/components/patient/ai-assistant/mock-data"

export default function PatientChatDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const chatId = params?.id

  const [conversations, setConversations] = useState<Conversation[]>(PATIENT_INITIAL_CONVERSATIONS)

  const selectedConversation = useMemo(() => {
    if (!chatId || chatId === "new") {
      return {
        id: "new",
        title: "New chat",
        updatedAt: new Date().toISOString(),
        messageCount: 0,
        preview: "Describe your symptoms to get started...",
        pinned: false,
        folder: "My chats",
        messages: [],
      } as Conversation
    }
    return conversations.find((conversation) => conversation.id === chatId) ?? null
  }, [chatId, conversations])

  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return
    const now = new Date().toISOString()
    const userMessage = { id: Math.random().toString(36).slice(2), role: "user" as const, content, createdAt: now }

    setConversations((prev) => {
      const existing = prev.find((conv) => conv.id === conversationId)
      // If this is a new chat, add it to the list.
      if (!existing) {
        return [
          {
            id: conversationId,
            title: "New chat",
            updatedAt: now,
            messageCount: 1,
            preview: content.slice(0, 80),
            pinned: false,
            folder: "My chats",
            messages: [userMessage],
          },
          ...prev,
        ]
      }

      return prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, userMessage],
              updatedAt: now,
              messageCount: conversation.messages.length + 1,
              preview: content.slice(0, 80),
            }
          : conversation,
      )
    })

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  {
                    id: Math.random().toString(36).slice(2),
                    role: "assistant" as const,
                    content:
                      "Thanks for sharing. Based on what you described, here are next steps. If you notice worsening symptoms, contact a clinician.",
                    createdAt: new Date().toISOString(),
                  },
                ],
                updatedAt: new Date().toISOString(),
                messageCount: conversation.messages.length + 2,
                preview: "Thanks for sharing...",
              }
            : conversation,
        ),
      )
    }, 2000)
  }

  const editMessage = (conversationId: string, messageId: string, newContent: string) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== conversationId) return conversation
        const updatedMessages = conversation.messages.map((message) =>
          message.id === messageId ? { ...message, content: newContent, editedAt: new Date().toISOString() } : message,
        )
        return {
          ...conversation,
          messages: updatedMessages,
          preview: updatedMessages.at(-1)?.content.slice(0, 80) ?? conversation.preview,
        }
      }),
    )
  }

  const resendMessage = (conversationId: string, messageId: string) => {
    const conversation = conversations.find((conv) => conv.id === conversationId)
    const message = conversation?.messages.find((msg) => msg.id === messageId)
    if (!conversation || !message) return

    const now = new Date().toISOString()

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== conversationId) return conv
        const messages = conv.messages ?? []
        const index = messages.findIndex((m) => m.id === messageId)
        if (index === -1) return conv
        const trimmed = messages.slice(0, index + 1)
        return {
          ...conv,
          messages: trimmed,
          updatedAt: now,
          messageCount: trimmed.length,
          preview: trimmed.at(-1)?.content.slice(0, 80) ?? conv.preview,
        }
      }),
    )

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== conversationId) return conv
          const messages = conv.messages ?? []
          const assistantMessage = {
            id: Math.random().toString(36).slice(2),
            role: "assistant" as const,
            content:
              "Here's an updated suggestion based on your edits. Reach out to a clinician if you need more help.",
            createdAt: new Date().toISOString(),
          }
          return {
            ...conv,
            messages: [...messages, assistantMessage],
            updatedAt: new Date().toISOString(),
            messageCount: messages.length + 1,
            preview: "Here's an updated suggestion...",
          }
        }),
      )
    }, 2000)
  }

  return (
    <div className="flex h-full min-h-[600px] flex-1 flex-col overflow-hidden">
      <ChatPane
        conversation={selectedConversation}
        onSend={(content) => selectedConversation && sendMessage(selectedConversation.id, content)}
        onEditMessage={(messageId, content) =>
          selectedConversation && editMessage(selectedConversation.id, messageId, content)
        }
        onResendMessage={(messageId) => selectedConversation && resendMessage(selectedConversation.id, messageId)}
        assistantThinkingLabel="AI doctor is responding..."
      />
    </div>
  )
}

