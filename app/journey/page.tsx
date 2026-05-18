import { Suspense } from "react"
import JourneyContent from "./journey-content"

export default function JourneyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-black" />}>
      <JourneyContent />
    </Suspense>
  )
}
