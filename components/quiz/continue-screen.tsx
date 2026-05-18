"use client"

import Image from "next/image"
import { images } from "@/lib/images"

interface ContinueScreenProps {
  name: string
  onContinue: () => void
}

export function ContinueScreen({ name, onContinue }: ContinueScreenProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-8">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src={images.logo}
          alt="The Age of Abundance"
          width={160}
          height={160}
          className="object-contain mx-auto"
          priority
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-[#12122a]/90 border-2 border-[#D4AF37] rounded-2xl p-6">
        {/* Header with name and spinning heart */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#f5f5f5] text-left">
            {name}, avant de continuer...
          </h2>
          <span className="text-2xl animate-spin-y inline-block" style={{ perspective: "100px" }}>
            {"💛"}
          </span>
        </div>

        {/* Inner quote box */}
        <div className="border border-[#D4AF37] rounded-xl p-5 mb-5">
          <p className="text-base text-[#D4AF37] font-semibold mb-3">
            Repete cette phrase a voix haute :
          </p>
          <p className="text-lg text-[#f5f5f5] italic leading-relaxed">
            {'"La vie de mes reves commence avec mon choix."'}
          </p>
        </div>

        {/* Instruction text */}
        <p className="text-sm text-[#888] mb-5">
          Clique sur continuer seulement apres l'avoir repetee a voix haute.
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-[#F9D423] text-[#1a1a1a] font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-[#E5C31F] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Continuer le Voyage
        </button>
      </div>
    </div>
  )
}
