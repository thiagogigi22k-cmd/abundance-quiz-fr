"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { images } from "@/lib/images"

export default function ContinueContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get("name") || "Friend"

  const handleContinue = () => {
    router.push(`/journey?name=${encodeURIComponent(name)}`, { scroll: false })
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={images.background}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-sm px-4 flex flex-col items-center">
        <div className="mb-4 flex justify-center">
          <div className="w-28 h-28 relative">
            <Image
              src={images.logo}
              alt="The Age of Abundance"
              width={112}
              height={112}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-full bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-5">
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-xl font-bold text-[#f5f5f5] leading-tight">{name}, avant de continuer...</h2>
            <svg
              className="w-5 h-5 text-[#D4AF37] flex-shrink-0 ml-2 animate-spin"
              style={{ animationDuration: "2s" }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
            </svg>
          </div>

          <div className="w-full bg-transparent rounded-lg border border-[#D4AF37] p-4 mb-5">
            <p className="text-[#D4AF37] font-semibold text-center mb-3 text-sm">Repete cette phrase a voix haute :</p>
            <p className="text-[#f5f5f5] italic text-center text-base leading-relaxed">
              {'"La vie de mes reves commence'}
              <br />
              {'avec mon choix."'}
            </p>
          </div>

          <p className="text-gray-500 text-xs text-center mb-5">Clique sur continuer seulement apres l'avoir repetee a voix haute.</p>

          <button
            onClick={handleContinue}
            className="w-full bg-[#F9D423] text-[#1a1a1a] font-bold py-3.5 px-6 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-[#E5C31F] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Continuer le Voyage
          </button>
        </div>
      </div>
    </div>
  )
}
