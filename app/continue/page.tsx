import { Suspense } from "react"
import ContinueContent from "./continue-content"

export default function ContinuePage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0a0a0a]" />}>
      <ContinueContent />
    </Suspense>
  )
}
