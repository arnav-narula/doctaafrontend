"use client"

import * as React from "react"
import {
  IconAlertCircle,
  IconCalendar,
  IconCheck,
  IconCloudUpload,
  IconDownload,
  IconFileText,
  IconShieldLock,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

type UploadItem = {
  id: string
  name: string
  size: number
  progress: number
  status: "uploading" | "completed"
}

const documents = [
  {
    name: "Blood Test Results",
    date: "2024-11-10",
    type: "Lab Report",
    summary: "CBC within normal range, ferritin slightly low (recommend iron supplement).",
  },
  {
    name: "Thoracic X-Ray Imaging",
    date: "2024-11-05",
    type: "Imaging",
    summary: "Clear lungs, no fractures detected. Radiologist noted mild scoliosis.",
  },
  {
    name: "Vaccination Certificate",
    date: "2024-09-20",
    type: "Certificate",
    summary: "Up-to-date on COVID, Influenza, and Tetanus boosters.",
  },
  {
    name: "Allergy Panel",
    date: "2024-08-15",
    type: "Assessment",
    summary: "Moderate reaction to pollen and dust mites; antihistamine plan in place.",
  },
]

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / Math.pow(1024, i)
  return `${value.toFixed(1)} ${units[i]}`
}

export default function PatientMedicalRecordsPage() {
  const [uploads, setUploads] = React.useState<UploadItem[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [selectedDoc, setSelectedDoc] = React.useState(documents[0])
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const uploadTimers = React.useRef<Record<string, NodeJS.Timeout>>({})
  const dismissalTimer = React.useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const addUpload = React.useCallback((file: File) => {
    const id = crypto.randomUUID?.() ?? `${Date.now()}-${file.name}`
    const newUpload: UploadItem = {
      id,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
    }

    setUploads((prev) => [...prev, newUpload])

    const timer = setInterval(() => {
      setUploads((prev) =>
        prev.map((upload) => {
          if (upload.id !== id) return upload
          const nextProgress = Math.min(upload.progress + 10 + Math.random() * 20, 100)
          const status = nextProgress >= 100 ? "completed" : "uploading"
          if (status === "completed" && uploadTimers.current[id]) {
            clearInterval(uploadTimers.current[id])
            delete uploadTimers.current[id]
          }
          return { ...upload, progress: nextProgress, status }
        }),
      )
    }, 500)

    uploadTimers.current[id] = timer
  }, [])

  const handleFiles = React.useCallback(
    (files: FileList | null) => {
      if (!files || !files.length) return
      Array.from(files).forEach(addUpload)
    },
    [addUpload],
  )

  const onDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(false)
      handleFiles(event.dataTransfer.files)
    },
    [handleFiles],
  )

  React.useEffect(() => {
    return () => {
      Object.values(uploadTimers.current).forEach(clearInterval)
      if (dismissalTimer.current) {
        clearTimeout(dismissalTimer.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (uploads.length > 0 && uploads.every((upload) => upload.status === "completed")) {
      dismissalTimer.current = setTimeout(() => {
        setUploads([])
        dismissalTimer.current = null
      }, 1000) // auto-close 1s after reaching 100%
    } else if (dismissalTimer.current) {
      clearTimeout(dismissalTimer.current)
      dismissalTimer.current = null
    }
  }, [uploads])

  return (
    <>
      <div className="space-y-4">
        <Card className="border-primary/20 bg-primary/5 py-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-0.5">
            <div>
              <CardTitle>AI Summary</CardTitle>
              <CardDescription>Snapshot of insights from your latest uploads</CardDescription>
            </div>
            <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
              <IconShieldLock className="size-3" />
              Secure
            </Badge>
          </CardHeader>
          <CardContent className="space-y-1.5 px-4 pb-0 text-sm leading-tight">
            <p className="text-[13px]">
              Your recent labs remain stable—with the exception of marginal iron depletion. Imaging and allergy
              assessments confirm ongoing musculoskeletal and seasonal allergy management. No urgent alerts detected.
            </p>
          </CardContent>
        </Card>

        <Card className="gap-2 py-2">
          <CardHeader className="px-4 py-2">
            <CardTitle>Upload more documents</CardTitle>
            <CardDescription>Drag & drop or browse files to keep everything in one place</CardDescription>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <div
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`flex min-h-[120px] flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed px-3 py-4 text-center transition ${
                isDragging ? "border-primary bg-primary/5" : "border-muted"
              }`}
            >
              <IconCloudUpload className="size-10 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Drop your files here</p>
                <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 25MB each</p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                  Browse files
                </Button>
                <Button variant="ghost" size="sm">
                  Use camera
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={(event) => handleFiles(event.target.files)}
              />
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <IconAlertCircle className="size-3.5" />
              <p>Uploads are encrypted in transit and automatically classified for the AI summary above.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2">
          <CardHeader className="px-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Uploaded Files</CardTitle>
                <CardDescription>Click to preview document on the right</CardDescription>
              </div>
              <Badge variant="outline">{documents.length} files</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-4 pt-0">
            <div className="h-[280px] overflow-y-auto pr-2">
              {documents.map((doc) => (
                <button
                  key={doc.name}
                  onClick={() => {
                    setSelectedDoc(doc)
                    setIsPreviewOpen(true)
                  }}
                  className="flex w-full items-center gap-3 border-b px-4 py-2 text-left transition hover:bg-muted/30"
                >
                  <IconFileText className="size-4 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{doc.name}</p>
                      <Badge variant="secondary">{doc.type}</Badge>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <IconCalendar className="size-3" />
                      {formatDate(doc.date)}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{doc.summary}</p>
                  </div>
                  <IconDownload className="size-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl sm:max-h-[80vh] sm:overflow-hidden">
          <DialogHeader>
            <DialogTitle>{selectedDoc.name}</DialogTitle>
            <DialogDescription>
              {selectedDoc.type} • {formatDate(selectedDoc.date)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/40 p-4 text-sm leading-relaxed">{selectedDoc.summary}</div>
            <div className="rounded-xl border border-dashed bg-background/70 p-10 text-center text-sm text-muted-foreground">
              Document preview placeholder – embed PDF/image viewer here.
            </div>
            <div className="flex justify-end">
              <Button size="sm" className="gap-1">
                <IconDownload className="size-4" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {uploads.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 w-[320px] rounded-2xl border bg-background/95 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Uploading</p>
              <p className="text-xs text-muted-foreground">
                {uploads.filter((item) => item.status === "completed").length}/{uploads.length} files completed
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              {uploads.length} files
            </Badge>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
            {uploads.map((upload) => (
              <div key={upload.id} className="space-y-1 rounded-xl border px-3 py-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="truncate font-medium">{upload.name}</p>
                  <span className="text-xs text-muted-foreground">{formatFileSize(upload.size)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {upload.status === "completed" ? (
                      <>
                        <IconCheck className="size-3 text-green-500" />
                        Completed
                      </>
                    ) : (
                      <>
                        <IconCloudUpload className="size-3" />
                        Uploading
                      </>
                    )}
                  </div>
                  <div className="relative h-10 w-10">
                    <svg className="h-10 w-10 -rotate-90" viewBox="0 0 40 40">
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
                        strokeDasharray={2 * Math.PI * 18}
                        strokeDashoffset={(1 - upload.progress / 100) * (2 * Math.PI * 18)}
                        className="text-primary transition-all"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                      {Math.round(upload.progress)}%
                    </div>
                  </div>
                </div>
                <Progress value={upload.progress} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
