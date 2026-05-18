"use client"

import { useState } from "react"

interface QuizQuestionProps {
  category: string
  question: string
  options?: string[]
  inputType?: "number" | "text"
  inputPlaceholder?: string
  onAnswer: (answer: string) => void
  name?: string
}

export function QuizQuestion({ category, question, options, inputType, inputPlaceholder, onAnswer, name }: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const displayQuestion = question.replace("{name}", name || "Friend")

  const handleSelect = (option: string) => {
    if (isTransitioning) return
    setSelected(option)
    setIsTransitioning(true)

    setTimeout(() => {
      onAnswer(option)
      setSelected(null)
      setIsTransitioning(false)
    }, 600)
  }

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return
    setIsTransitioning(true)
    setTimeout(() => {
      onAnswer(inputValue)
      setInputValue("")
      setIsTransitioning(false)
    }, 400)
  }

  return (
    <div className="w-full">
      {/* Category badge */}
      <div className="flex justify-center mb-4">
        <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
          {category}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-lg md:text-xl font-bold text-[#f5f5f5] mb-6 leading-relaxed text-center text-balance">
        {displayQuestion}
      </h2>

      {/* Input type question */}
      {inputType && (
        <div className="flex flex-col gap-3">
          <input
            type={inputType === "number" ? "text" : "text"}
            inputMode={inputType === "number" ? "numeric" : "text"}
            value={inputValue}
            onChange={(e) => {
              if (inputType === "number") {
                const val = e.target.value.replace(/[^0-9]/g, "")
                setInputValue(val)
              } else {
                setInputValue(e.target.value)
              }
            }}
            placeholder={inputPlaceholder || "Type your answer..."}
            className="w-full bg-[#f5f5f5] border-2 border-[#D4AF37] rounded-full py-3 px-5 text-center text-base text-[#1a1a1a] placeholder-[#888] outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <button
            onClick={handleInputSubmit}
            disabled={!inputValue.trim() || isTransitioning}
            className="w-full bg-gradient-to-r from-[#8B6914] via-[#D4AF37] to-[#8B6914] text-[#1a1a1a] font-bold py-3.5 px-6 rounded-lg text-base hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {/* Options */}
      {!inputType && options && (
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={isTransitioning}
              className={`w-full text-left py-3.5 px-5 rounded-lg border-2 transition-all duration-300 font-medium text-base ${
                selected === option
                  ? "bg-[#D4AF37] border-[#D4AF37] text-[#1a1a1a] scale-[1.02]"
                  : "bg-[#1a1a1a]/60 border-[#D4AF37]/30 text-[#f5f5f5] hover:border-[#D4AF37]/60 hover:bg-[#1a1a1a]/80"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
