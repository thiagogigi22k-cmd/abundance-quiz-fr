"use client"

import Image from "next/image"
import { categories, getBalance, getProgress, getUnlockedCategories } from "@/lib/quiz-data"
import { Lock } from "lucide-react"

interface QuizDashboardProps {
  name: string
  stepIndex: number
}

export function QuizDashboard({ name, stepIndex }: QuizDashboardProps) {
  const balance = getBalance(stepIndex)
  const progress = getProgress(stepIndex)
  const unlockedIds = getUnlockedCategories(stepIndex)

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(balance)

  return (
    <div className="w-full mb-6">
      <h1 className="text-xl font-bold text-[#f5f5f5] mb-1">
        Hello, {name}
      </h1>
      <p className="text-sm text-[#D4AF37] mb-4">Your Journey has begun...</p>

      {/* Balance */}
      <div className="bg-[#1a1a1a]/80 border border-[#D4AF37]/30 rounded-lg p-3 mb-4">
        <p className="text-xs text-[#aaa] mb-1 uppercase tracking-wider">Account Balance</p>
        <p className="text-2xl font-bold text-[#D4AF37]">{formattedBalance}</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-[#aaa]">Your energy is aligning with the divine...</span>
          <span className="text-xs font-bold text-[#D4AF37]">{progress}%</span>
        </div>
        <div className="w-full bg-[#333] rounded-full h-2.5">
          <div
            className="bg-[#D4AF37] h-2.5 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-5 gap-2">
        {categories.map((cat) => {
          const isUnlocked = unlockedIds.includes(cat.id)
          return (
            <div
              key={cat.id}
              className={`relative flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
                isUnlocked
                  ? "bg-[#1a1a1a]/60 border border-[#D4AF37]/40"
                  : "bg-[#1a1a1a]/40 border border-[#333] opacity-50"
              }`}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                {isUnlocked ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : (
                  <div className="w-full h-full bg-[#222] flex items-center justify-center">
                    <Lock className="w-4 h-4 text-[#555]" />
                  </div>
                )}
              </div>
              <span className="text-[9px] text-center leading-tight text-[#ccc] line-clamp-2">
                {isUnlocked ? cat.name : "Locked"}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
