"use client"

import Image from "next/image"
import { categories } from "@/lib/quiz-data"

interface UnlockedScreenProps {
  categoryId: string
  onContinue: () => void
}

export function UnlockedScreen({ categoryId, onContinue }: UnlockedScreenProps) {
  const category = categories.find((c) => c.id === categoryId)

  if (!category) return null

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-8 animate-in fade-in duration-500">
      {/* UNLOCKED title */}
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-black text-[#D4AF37] tracking-wider">
          UNLOCKED!
        </h1>
        <div className="h-1 w-24 bg-[#D4AF37] mx-auto mt-2 rounded-full" />
      </div>

      {/* Category Image */}
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden relative mb-6 border-2 border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/20">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="224px"
        />
      </div>

      {/* Category Name */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-3">
        {category.name}
      </h2>

      {/* Unlock Message */}
      <p className="text-base md:text-lg text-[#D4AF37] mb-8 max-w-sm leading-relaxed">
        {category.unlockMessage}
      </p>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full max-w-xs bg-[#F9D423] text-[#1a1a1a] font-bold py-4 px-6 rounded-lg text-lg hover:bg-[#E5C31F] transition-colors border-2 border-[#D4AF37]"
      >
        {categoryId === "abundance"
          ? "YES! I believe, I receive!"
          : "Continue Evolution"}
      </button>
    </div>
  )
}
