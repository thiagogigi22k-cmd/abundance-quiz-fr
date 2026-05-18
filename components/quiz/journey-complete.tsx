"use client"

import Image from "next/image"
import { categories, getBalance } from "@/lib/quiz-data"
import { quizSteps } from "@/lib/quiz-data"

interface JourneyCompleteProps {
  name: string
}

export function JourneyComplete({ name }: JourneyCompleteProps) {
  const balance = getBalance(quizSteps.length - 1)
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(balance)

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-6">
      {/* Logo */}
      <div className="mb-6">
        <div className="w-28 h-28 relative mx-auto">
          <Image
            src="/images/logo.png"
            alt="The Age of Abundance"
            width={112}
            height={112}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-[#D4AF37] mb-2">
        Congratulations!
      </h1>
      <h2 className="text-xl font-bold text-[#f5f5f5] mb-6">
        {name}, your journey is complete
      </h2>

      {/* Final Balance */}
      <div className="bg-[#1a1a1a]/80 border-2 border-[#D4AF37]/50 rounded-xl p-6 mb-6 w-full max-w-sm">
        <p className="text-xs text-[#aaa] mb-1 uppercase tracking-wider">Final Balance</p>
        <p className="text-3xl font-black text-[#D4AF37]">{formattedBalance}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="h-0.5 w-12 bg-[#D4AF37]/30" />
          <span className="text-xs text-[#D4AF37]">100% Complete</span>
          <div className="h-0.5 w-12 bg-[#D4AF37]/30" />
        </div>
      </div>

      {/* All categories unlocked */}
      <p className="text-sm text-[#aaa] mb-4">All blessings unlocked:</p>
      <div className="grid grid-cols-5 gap-2 mb-8 w-full">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-[#1a1a1a]/60 border border-[#D4AF37]/40"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden relative">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="text-[9px] text-center leading-tight text-[#D4AF37] line-clamp-2">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#1a1a1a]/60 border border-[#D4AF37]/30 rounded-lg p-6 mb-6 w-full max-w-sm">
        <p className="text-base text-[#f5f5f5] mb-2 font-semibold">
          Your abundance is ready.
        </p>
        <p className="text-sm text-[#D4AF37] leading-relaxed">
          God has prepared something extraordinary for you. The door is open. Are you ready to walk through it?
        </p>
      </div>

      <a
        href="#"
        className="w-full max-w-xs bg-[#F9D423] text-[#1a1a1a] font-bold py-4 px-6 rounded-lg text-lg hover:bg-[#E5C31F] transition-colors border-2 border-[#D4AF37] flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
        Claim My Abundance
      </a>
    </div>
  )
}
