"use client"

import { Suspense } from "react"
import UnifiedQuiz from "@/components/unified-quiz"

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <UnifiedQuiz />
    </Suspense>
  )
}
