"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

export default function JourneyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get("name") || "Friend"
  const [amount, setAmount] = useState("")

  const handleContinue = () => {
    if (amount) {
      router.push(`/unlocked?name=${encodeURIComponent(name)}&amount=${encodeURIComponent(amount)}`, { scroll: false })
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
      {/* Background - positioned at bottom */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt=""
          fill
          className="object-cover object-bottom"
          priority
        />
        {/* Dark overlay for top section */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent"
          style={{ height: "60%" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 pt-6 pb-8">
        {/* Logo - small */}
        <div className="mb-4">
          <Image
            src="/images/logo.png"
            alt="The Age of Abundance"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Greeting */}
        <h1 className="text-[#D4AF37] text-xl font-bold text-center mb-4">Hello, {name} Your Journey has begun...</h1>

        {/* Account Balance */}
        <p className="text-gray-400 text-sm tracking-wider mb-1">ACCOUNT BALANCE</p>
        <p className="text-3xl font-bold animate-pulse-gold mb-4">$0.00</p>

        {/* Progress bar section */}
        <div className="w-full max-w-sm mb-4">
          <p className="text-[#D4AF37] text-sm italic animate-pulse-gold mb-2">
            Your energy is aligning with the divine...
          </p>
          <div className="flex justify-end mb-2">
            <span className="text-gray-400 text-sm">5%</span>
          </div>
          <div className="w-full h-[6px] bg-[#0d1829] rounded-full relative overflow-hidden">
            {/* Yellow oval indicator - fixed on the left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[10px] bg-[#F9D423] rounded-full z-10" />
            {/* Yellow progress fill - extends from the yellow indicator */}
            <div className="absolute left-3 top-0 h-full bg-[#F9D423] rounded-r-full" style={{ width: "5%" }} />
          </div>
        </div>

        {/* Financial Awakening Card */}
        <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-6 mt-2">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="bg-[#2a2a3e] text-gray-300 text-sm px-4 py-1.5 rounded-full">Financial Awakening</span>
          </div>

          {/* Question */}
          <h2 className="text-white text-lg font-bold text-center mb-6 leading-relaxed">
            {name}, if you looked at your bank account today, how much would you have available?
          </h2>

          {/* Input */}
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter numbers only (e.g. 1500)"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
            className="w-full bg-white border-2 border-[#D4AF37] rounded-lg py-3.5 px-4 text-black text-center placeholder-gray-500 focus:outline-none focus:border-[#F9D423] mb-4"
          />

          <button
            onClick={handleContinue}
            disabled={!amount}
            className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-[#E5C31F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Custom CSS for pulsing gold animation */}
      <style jsx>{`
        @keyframes pulseGold {
          0%, 100% {
            color: #D4AF37;
          }
          50% {
            color: #8B7520;
          }
        }
        .animate-pulse-gold {
          animation: pulseGold 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
