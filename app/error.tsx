"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconHome, IconArrowLeft, IconRefresh } from "@tabler/icons-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white p-4">
      {/* Abstract background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-destructive/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-destructive/5 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/5 blur-[150px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center text-center">
        {/* Large 500 with glassmorphism */}
        <div className="mb-8">
          <h1 className="text-[180px] font-bold leading-none text-gray-200 backdrop-blur-sm md:text-[240px]">
            500
          </h1>
        </div>

        {/* Error text */}
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Something went wrong!
        </h2>
        <p className="mb-4 max-w-md text-sm text-muted-foreground md:text-base">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
        {error.digest && (
          <p className="mb-12 text-xs text-muted-foreground">Error ID: {error.digest}</p>
        )}
        {!error.digest && <div className="mb-12" />}

        {/* Glassmorphism buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={reset}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 px-6 py-6 text-foreground backdrop-blur-md transition-all hover:bg-white hover:border-gray-300"
            size="lg"
          >
            <div className="flex items-center gap-2 text-foreground">
              <IconRefresh className="size-5" />
              <span>Try Again</span>
            </div>
          </Button>
          <Button
            asChild
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 px-6 py-6 text-foreground backdrop-blur-md transition-all hover:bg-white hover:border-gray-300"
            size="lg"
          >
            <Link href="/patient" className="flex items-center gap-2 text-foreground">
              <IconHome className="size-5" />
              <span>Back home</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 px-6 py-6 text-foreground backdrop-blur-md transition-all hover:bg-white hover:border-gray-300"
            size="lg"
            onClick={() => window.history.back()}
          >
            <div className="flex items-center gap-2 text-foreground">
              <IconArrowLeft className="size-5" />
              <span>Go Back</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
