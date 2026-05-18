"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { quizSteps } from "@/lib/quiz-data"
import { QuizDashboard } from "@/components/quiz/quiz-dashboard"
import { QuizQuestion } from "@/components/quiz/quiz-question"
import { UnlockedScreen } from "@/components/quiz/unlocked-screen"
import { ContinueScreen } from "@/components/quiz/continue-screen"
import { JourneyComplete } from "@/components/quiz/journey-complete"

function QuizContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get("name") || "Friend"
  const [currentStep, setCurrentStep] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    if (!searchParams.get("name")) {
      router.push("/")
    }
  }, [searchParams, router])

  const handleNext = () => {
    setFadeIn(false)
    setTimeout(() => {
      if (currentStep < quizSteps.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
      setFadeIn(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 300)
  }

  const step = quizSteps[currentStep]

  const renderStepContent = () => {
    if (!step) return null

    switch (step.type) {
      case "continue":
        return <ContinueScreen name={name} onContinue={handleNext} />

      case "question":
        return (
          <>
            <QuizDashboard name={name} stepIndex={currentStep} />
            <QuizQuestion
              category={step.category!}
              question={step.question!}
              options={step.options!}
              onAnswer={handleNext}
            />
          </>
        )

      case "unlocked":
        return (
          <UnlockedScreen
            categoryId={step.unlockedCategory!}
            onContinue={handleNext}
          />
        )

      case "journey":
        return <JourneyComplete name={name} />

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-md px-4 py-6 flex flex-col items-center transition-opacity duration-300 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Logo for question pages */}
        {step?.type === "question" && (
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 relative">
              <Image
                src="/images/logo.png"
                alt="The Age of Abundance"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {renderStepContent()}
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
          <div className="text-[#D4AF37] text-lg">Loading...</div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  )
}
