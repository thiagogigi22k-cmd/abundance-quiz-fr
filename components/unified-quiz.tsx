"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Check, Star, Sparkles } from "lucide-react"
import { images } from "@/lib/images"

// Step types
type StepType = "continue" | "journey" | "unlocked" | "question" | "unlock-screen" | "motivational" | "final"

interface QuestionStep {
  type: "question"
  question: string
  options: string[]
  badge: string
  progress: number
}

interface UnlockStep {
  type: "unlock-screen"
  title: string
  description: string
  image: string
  buttonText?: string
}

interface MotivationalStep {
  type: "motivational"
  title: string
  description: string
  image: string
  buttonText: string
  addToBalance?: number
}

// All steps data
const quizSteps: Array<QuestionStep | UnlockStep | MotivationalStep | { type: "continue" } | { type: "journey" } | { type: "unlocked" } | { type: "final" }> = [
  { type: "continue" },
  { type: "journey" },
  { type: "unlocked" },
  {
    type: "question",
    question: "{name}, do you feel like you're living the life God dreamed for you?",
    options: ["Yes, but I know I can live more", "No, I feel I'm far from it", "Sometimes I wonder about this..."],
    badge: "Financial Awakening",
    progress: 10,
  },
  {
    type: "question",
    question: "How often do you feel an emptiness in your chest... as if something is missing?",
    options: ["Every day", "A few times a week", "Rarely"],
    badge: "Financial Awakening",
    progress: 14,
  },
  {
    type: "question",
    question: "Do you feel stuck in the same negative cycles for years?",
    options: ["Yes, it feels like a loop", "Sometimes I feel this", "I'm not sure"],
    badge: "Financial Awakening",
    progress: 19,
  },
  {
    type: "question",
    question: "If the life you live today was the direct result of your own choices... would you be satisfied?",
    options: ["No, I want to change", "More or less", "Yes, but I want more"],
    badge: "Financial Awakening",
    progress: 24,
  },
  {
    type: "unlock-screen",
    title: "I Choose My Future",
    description: "The power to change your life is in your hands!",
    image: images.manSilhouetteStars,
  },
  {
    type: "question",
    question: "How many times have you asked God for a sign to change your life?",
    options: ["Many times", "A few times", "I don't usually ask for signs", "This is my first time"],
    badge: "Faith & Spiritual Purpose",
    progress: 29,
  },
  {
    type: "question",
    question: "{name}, if today were your final faith test... what would you do right now?",
    options: [
      "I would take action like someone who believes in miracles",
      "I'd take a small, scared step... but still take a step",
      "I'd stay frozen... one more time... just like the other times I gave up",
    ],
    badge: "Faith & Spiritual Purpose",
    progress: 33,
  },
  {
    type: "question",
    question: "Do you believe God can transform your life with just one single decision from you?",
    options: ["Yes, absolutely", "I have doubts", "I don't know"],
    badge: "Faith & Spiritual Purpose",
    progress: 38,
  },
  {
    type: "question",
    question: "Are you willing to make TODAY your day of faith and responsibility for your new life?",
    options: ["Yes, I'm ready", "I need a clearer sign", "No"],
    badge: "Faith & Spiritual Purpose",
    progress: 43,
  },
  {
    type: "unlock-screen",
    title: "Faith Decision",
    description: "Your Faith Will Move Mountains",
    image: images.prayingHands,
  },
  {
    type: "question",
    question: "If God gave you the chance to win your dream home... what would it look like?",
    options: ["Large, with several rooms", "A modern apartment", "A simple house, but full of peace", "I don't think much about it"],
    badge: "Future Visualization",
    progress: 48,
  },
  {
    type: "unlock-screen",
    title: "Dream Home",
    description: "Your Dream Home Is on Its Way",
    image: images.dreamHome,
  },
  {
    type: "question",
    question: "What car do you imagine parked in front of your ideal home?",
    options: ["A luxury SUV", "A comfortable sedan", "A simple but reliable car", "I don't care about cars"],
    badge: "Future Visualization",
    progress: 52,
  },
  {
    type: "unlock-screen",
    title: "Dream Car",
    description: "Your Dream Car Is Reserved",
    image: images.dreamCar,
  },
  {
    type: "question",
    question: "What is your family life like today?",
    options: [
      "I feel there's a lack of unity",
      "I miss someone special",
      "I have a good family, but we can be happier",
      "I don't think much about it",
    ],
    badge: "Future Visualization",
    progress: 57,
  },
  {
    type: "unlock-screen",
    title: "Happy Family",
    description: "The Happy Family You Deserve",
    image: images.happyFamily,
  },
  {
    type: "question",
    question: "If you could wake up tomorrow with perfect health... what would be different?",
    options: [
      "More energy to chase my dreams",
      "Being able to play sports without pain",
      "Feeling good about my body",
      "My health is good, but I want more vitality",
    ],
    badge: "Future Visualization",
    progress: 62,
  },
  {
    type: "unlock-screen",
    title: "Perfect Health",
    description: "Your Perfect Health Is Activated",
    image: images.perfectHealth,
  },
  {
    type: "question",
    question: "If you received a large sum of money today... what would you do first?",
    options: ["Pay off my debts", "Buy a house", "Fulfill my family's dream", "Invest in my future"],
    badge: "Future Visualization",
    progress: 67,
  },
  {
    type: "unlock-screen",
    title: "Abundance",
    description: "Imagine... $277,000 being deposited into your account right now!",
    image: images.abundance,
    buttonText: "YES! I believe, I receive!",
  },
  {
    type: "motivational",
    title: "{name}",
    description: "Your manifestation potential depends on your choice, think big to manifest big things, you are the size of your courage.",
    image: images.abundance,
    buttonText: "Continue Journey",
    addToBalance: 2000000,
  },
  {
    type: "question",
    question: "Imagine that 30 days from now, your life is 100% transformed. Which of these images represents your future?",
    options: [
      "Luxury home and financial freedom",
      "Perfect health and vitality",
      "Happy family and love",
      "Travel and new experiences",
    ],
    badge: "Future Visualization",
    progress: 71,
  },
  {
    type: "unlock-screen",
    title: "100x Boost",
    description: "Your Manifestation Power Just Multiplied by 100x",
    image: images.boost100x,
  },
  {
    type: "question",
    question: "Do you feel there's something spiritual or emotional blocking you?",
    options: ["Yes, a weight I can't explain", "Sometimes I feel this", "No"],
    badge: "Breaking Blocks",
    progress: 76,
  },
  {
    type: "question",
    question: "Which of these statements best describes you?",
    options: [
      "I feel cursed, nothing ever works out for me",
      "My life has never been easy",
      "I don't feel worthy",
      "I lack energy and motivation",
    ],
    badge: "Breaking Blocks",
    progress: 81,
  },
  {
    type: "unlock-screen",
    title: "Blocks Broken",
    description: "All Mental Blocks Have Been Removed",
    image: images.blocksBroken,
  },
  {
    type: "question",
    question: "Do you accept to be part of a group of people who decided to create their dream life through the power of faith?",
    options: ["Yes, I accept", "I'm not sure", "I need to think about it"],
    badge: "Final Choice",
    progress: 86,
  },
  {
    type: "question",
    question: "If you could change just one thing right now... what would it be?",
    options: ["My financial situation", "My relationships", "My health", "My purpose in life"],
    badge: "Final Choice",
    progress: 90,
  },
  {
    type: "question",
    question: "If God gave you the chance to start over today... would you accept?",
    options: ["Yes, without hesitation", "Yes, but with some fear", "I'm not ready"],
    badge: "Final Choice",
    progress: 95,
  },
  {
    type: "question",
    question: 'To finish... complete this sentence:\n"From today onwards..."',
    options: [
      "I choose to live in abundance",
      "I accept the destiny God has reserved for me",
      "I free myself from everything that was blocking me",
    ],
    badge: "Final Choice",
    progress: 100,
  },
  { type: "final" },
]

const achievements = [
  { name: "I Choose My Future", image: images.manSilhouetteStars, unlockedAtStep: 7 },
  { name: "Faith Decision", image: images.prayingHands, unlockedAtStep: 12 },
  { name: "Dream Home", image: images.dreamHome, unlockedAtStep: 14 },
  { name: "Dream Car", image: images.dreamCar, unlockedAtStep: 16 },
  { name: "Happy Family", image: images.happyFamily, unlockedAtStep: 18 },
  { name: "Perfect Health", image: images.perfectHealth, unlockedAtStep: 20 },
  { name: "Abundance", image: images.abundance, unlockedAtStep: 22 },
  { name: "100x Boost", image: images.boost100x, unlockedAtStep: 25 },
  { name: "Blocks Broken", image: images.blocksBroken, unlockedAtStep: 28 },
  { name: "100x Multiplication", image: images.multiplication100x, unlockedAtStep: 2 },
]

const notifications = [
  { emoji: "\u{1F3E0}", text: "Manifesting your dream home in the spiritual realm..." },
  { emoji: "\u{1F697}", text: "Reserving your ideal car..." },
  { emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", text: "Aligning your family happiness..." },
  { emoji: "\u{1F497}", text: "Activating perfect health protocols..." },
  { emoji: "\u{1F513}", text: "Breaking spiritual and emotional blocks..." },
  { emoji: "\u{1F31F}", text: "Preparing your 100x manifestation boost..." },
  { emoji: "\u{1F4B0}", text: "Unlocking abundance channels..." },
  { emoji: "\u2728", text: "Finalizing your divine script..." },
]

const portals = [
  { name: "I Choose My Future", image: images.manSilhouetteStars },
  { name: "Faith Decision", image: images.prayingHands },
  { name: "Dream Home", image: images.dreamHome },
  { name: "Dream Car", image: images.dreamCar },
  { name: "Happy Family", image: images.happyFamily },
  { name: "Perfect Health", image: images.perfectHealth },
  { name: "Abundance", image: images.abundance },
  { name: "100x Boost", image: images.boost100x },
  { name: "Blocks Broken", image: images.blocksBroken },
  { name: "100x Multiplication", image: images.multiplication100x },
]

export default function UnifiedQuiz() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [name, setName] = useState(searchParams.get("name") || "Friend")
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Starting transformation...")
  const [isComplete, setIsComplete] = useState(false)
  const [visibleNotifications, setVisibleNotifications] = useState<Array<{ id: number; index: number }>>([])
  const [cardAnimationIndex, setCardAnimationIndex] = useState(-1)
  const notificationIdRef = useRef(0)
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentNotificationIndexRef = useRef(0)
  const [showOffer, setShowOffer] = useState(false)
  const vturbRef = useRef<HTMLDivElement>(null)
  const offerRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  const formatBalance = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const stepData = quizSteps[currentStep]

  // Derive visible portals directly from progress (0-100 maps to 1-10 portals)
  const visiblePortalCount = stepData?.type === "final" ? Math.min(portals.length, Math.max(1, Math.ceil((progress / 100) * portals.length))) : 0

  const getUnlockedAchievements = () => achievements.filter((a) => currentStep >= a.unlockedAtStep)

  const goToNextStep = (delay = 0) => {
    if (delay > 0) {
      setIsLoading(true)
      setTimeout(() => { setIsLoading(false); setCurrentStep((prev) => prev + 1); setSelectedOption(null) }, delay)
    } else {
      setCurrentStep((prev) => prev + 1); setSelectedOption(null)
    }
  }

  const handleOptionClick = (index: number) => { setSelectedOption(index); goToNextStep(1000) }
  const handleContinue = () => goToNextStep(0)
  const handleJourneySubmit = () => { if (amount) { setBalance(Number.parseFloat(amount) * 100); goToNextStep(0) } }
  const handleMotivational = (addAmount?: number) => { if (addAmount) setBalance((prev) => prev + addAmount); goToNextStep(0) }

  const replaceNamePlaceholder = (text: string) => text.replace(/{name}/g, name)

  const getProgress = () => {
    if (stepData?.type === "question") return (stepData as QuestionStep).progress
    for (let i = currentStep - 1; i >= 0; i--) { if (quizSteps[i]?.type === "question") return (quizSteps[i] as QuestionStep).progress }
    return 5
  }

  // Preload seed card images from the very start of the quiz
  useEffect(() => {
    const seedImages = [images.seedBarren, images.seedSprout, images.seedTree, images.seedGolden, images.seedDivine]
    seedImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  // Final screen progress animation
  useEffect(() => {
    if (stepData?.type !== "final") return
    const duration = 25000; const interval = 100; const increment = 100 / (duration / interval)
    const timer = setInterval(() => {
      setProgress((prev) => {
        const np = prev + increment
        if (np < 20) setStatusText("Starting transformation...")
        else if (np < 40) setStatusText("Analyzing your answers...")
        else if (np < 60) setStatusText("Aligning divine energies...")
        else if (np < 80) setStatusText("Preparing your manifestation...")
        else setStatusText("Finalizing your script...")
        if (np >= 100) {
          clearInterval(timer); setIsComplete(true)
          setTimeout(() => { let idx = 0; const ct = setInterval(() => { setCardAnimationIndex(idx); idx++; if (idx >= portals.length) clearInterval(ct) }, 150) }, 300)
          return 100
        }
        return np
      })
    }, interval)
    return () => clearInterval(timer)
  }, [stepData?.type])



  // Final screen notifications
  useEffect(() => {
    if (stepData?.type !== "final") return
    if (isComplete) { if (notificationTimerRef.current) clearInterval(notificationTimerRef.current); setVisibleNotifications([]); return }
    const startDelay = setTimeout(() => {
      const firstId = notificationIdRef.current++
      setVisibleNotifications([{ id: firstId, index: 0 }]); currentNotificationIndexRef.current = 0
      notificationTimerRef.current = setInterval(() => {
        currentNotificationIndexRef.current = (currentNotificationIndexRef.current + 1) % notifications.length
        const newId = notificationIdRef.current++; const newIndex = currentNotificationIndexRef.current
        setVisibleNotifications((prev) => { const updated = [...prev, { id: newId, index: newIndex }]; return updated.length > 3 ? updated.slice(-3) : updated })
      }, 3000)
    }, 3000)
    return () => { clearTimeout(startDelay); if (notificationTimerRef.current) clearInterval(notificationTimerRef.current) }
  }, [stepData?.type, isComplete])

  // Load Vturb script when final screen completes
  useEffect(() => {
    if (!isComplete) return
    const DELAY_SECONDS = 448 // 7:28
    const timer = setTimeout(() => {
      if (vturbRef.current && !vturbRef.current.querySelector("vturb-smartplayer")) {
        const player = document.createElement("vturb-smartplayer")
        player.id = "vid-69990b836aee4c1df8327a79"
        player.style.cssText = "display: block; margin: 0 auto; width: 100%; max-width: 400px;"
        vturbRef.current.appendChild(player)
        const s = document.createElement("script")
        s.src = "https://scripts.converteai.net/f8e465b5-f483-4d08-be19-bc14de388e59/players/69990b836aee4c1df8327a79/v4/player.js"
        s.async = true
        document.head.appendChild(s)

        // Listen for player ready, then watch video time to show offer at 7:28
        player.addEventListener("player:ready", () => {
          const checkTime = setInterval(() => {
            try {
              const w = window as any
              if (w.smartplayer?.instances?.[0]?.video?.currentTime >= DELAY_SECONDS) {
                setShowOffer(true)
                clearInterval(checkTime)
              }
            } catch {}
          }, 1000)
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [isComplete])

  // Auto-scroll to offer when it appears
  useEffect(() => {
    if (showOffer && offerRef.current) {
      setTimeout(() => {
        const element = offerRef.current
        if (element) {
          const rect = element.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          // Scroll to offer section + extra offset to show middle cards ($47, $77)
          const extraOffset = window.innerWidth < 768 ? 600 : 400
          window.scrollTo({ top: scrollTop + rect.top + extraOffset, behavior: "smooth" })
        }
      }, 200)
    }
  }, [showOffer])

  // Render Continue screen
  const renderContinueScreen = () => (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image src={images.background} alt="Background" fill className="object-cover" priority />
      </div>
      <div className="relative z-10 w-full max-w-sm px-4 flex flex-col items-center">
        <div className="mb-4 flex justify-center">
          <Image src={images.logo} alt="Logo" width={112} height={112} className="object-contain" priority />
        </div>
        <div className="w-full bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-5">
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-xl font-bold text-white leading-tight">{name}, before we continue...</h2>
            <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 ml-2 animate-spin" style={{ animationDuration: "2s" }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="w-full bg-transparent rounded-lg border border-[#D4AF37] p-4 mb-5">
            <p className="text-[#D4AF37] font-semibold text-center mb-3 text-sm">Repeat this phrase out loud:</p>
            <p className="text-white italic text-center text-base leading-relaxed">{"\"The life of my dreams begins"}<br />{"with my choice.\""}</p>
          </div>
          <p className="text-gray-500 text-xs text-center mb-5">Only click continue after repeating it out loud.</p>
          <button onClick={handleContinue} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-[#E5C31F] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  )

  // Render Journey screen
  const renderJourneyScreen = () => (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image src={images.background} alt="Background" fill className="object-cover object-bottom" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" style={{ height: "60%" }} />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center px-4 pt-6 pb-8">
        <div className="mb-4">
          <Image src={images.logo} alt="Logo" width={80} height={80} className="object-contain" priority />
        </div>
        <h1 className="text-[#D4AF37] text-xl font-bold text-center mb-4">Hello, {name} Your Journey has begun...</h1>
        <p className="text-gray-400 text-sm tracking-wider mb-1">ACCOUNT BALANCE</p>
        <p className="text-3xl font-bold animate-pulse-gold mb-4">$0.00</p>
        <div className="w-full max-w-sm mb-4">
          <p className="text-[#D4AF37] text-sm italic animate-pulse-gold mb-2">Your energy is aligning with the divine...</p>
          <div className="flex justify-end mb-2"><span className="text-gray-400 text-sm">5%</span></div>
          <div className="w-full h-[6px] bg-[#0d1829] rounded-full relative overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[10px] bg-[#F9D423] rounded-full z-10" />
            <div className="absolute left-3 top-0 h-full bg-[#F9D423] rounded-r-full" style={{ width: "5%" }} />
          </div>
        </div>
        <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-6 mt-2">
          <div className="flex justify-center mb-4">
            <span className="bg-[#2a2a3e] text-gray-300 text-sm px-4 py-1.5 rounded-full">Financial Awakening</span>
          </div>
          <h2 className="text-white text-lg font-bold text-center mb-6 leading-relaxed">
            {name}, if you looked at your bank account today, how much would you have available?
          </h2>
          <input type="text" inputMode="numeric" placeholder="Enter numbers only (e.g. 1500)" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} className="w-full bg-white border-2 border-[#D4AF37] rounded-lg py-3.5 px-4 text-black text-center placeholder-gray-500 focus:outline-none focus:border-[#F9D423] mb-4" />
          <button onClick={handleJourneySubmit} disabled={!amount} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-[#E5C31F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Continue</button>
        </div>
      </div>
    </div>
  )

  // Render Unlocked (100x multiplication) screen
  const renderUnlockedScreen = () => {
    const displayBalance = formatBalance(balance)
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src={images.background} alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" style={{ height: "70%" }} />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center px-4 pt-8 pb-8">
          <div className="mb-6">
            <Image src={images.logo} alt="Logo" width={70} height={70} className="object-contain" priority />
          </div>
          <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-5">
            <div className="flex items-center justify-center gap-2 mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-[#D4AF37] text-xl font-bold tracking-wide">UNLOCKED!</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37" className="animate-spin-slow"><path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" /></svg>
            </div>
            <div className="flex justify-center mb-5">
              <div className="w-40 h-40 rounded-xl border-2 border-[#D4AF37] overflow-hidden">
                <Image src={images.multiplication100x} alt="Golden abundance" width={160} height={160} className="object-cover w-full h-full" />
              </div>
            </div>
            <h2 className="text-[#D4AF37] text-2xl font-bold text-center mb-3">100x Multiplication</h2>
            <p className="text-white text-center text-base mb-5 leading-relaxed">{name}, today I{"'"}m adding 100x more to your account {"—"} do you believe?</p>
            <div className="bg-[#1a1a2e] rounded-lg py-3 px-4 mb-4">
              <p className="text-center"><span className="text-[#D4AF37] font-bold text-lg">New Balance: </span><span className="text-[#D4AF37] font-bold text-lg">${displayBalance}</span></p>
            </div>
            <button onClick={handleContinue} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-[#E5C31F] transition-colors flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              YES! I receive 100x more!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Question screen
  const renderQuestionScreen = () => {
    const data = stepData as QuestionStep
    const unlockedAchievements = getUnlockedAchievements()
    const totalPortals = portals.length
    const lockedCount = totalPortals - unlockedAchievements.length
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src={images.background} alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" style={{ height: "60%" }} />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center px-4 pt-6 pb-8">
          <div className="mb-4"><Image src={images.logo} alt="Logo" width={60} height={60} className="object-contain" priority /></div>
          <h1 className="text-[#D4AF37] text-xl font-bold text-center mb-3">Hello, {name} Your Journey has begun...</h1>
          <p className="text-gray-400 text-sm tracking-wider mb-1">ACCOUNT BALANCE</p>
          <p className="text-[#D4AF37] text-3xl font-bold mb-4 animate-pulse-gold">${formatBalance(balance)}</p>
          <div className="w-full max-w-md mb-4">
            <p className="text-[#D4AF37] text-sm italic animate-pulse-gold mb-2">Your energy is aligning with the divine...</p>
            <div className="flex justify-end mb-1"><span className="text-gray-400 text-sm">{data.progress}%</span></div>
            <div className="relative w-full h-[6px] bg-[#1a2744] rounded-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-3 bg-[#F9D423] rounded-full z-10" />
              <div className="absolute left-4 top-0 h-full bg-[#F9D423] rounded-r-full" style={{ width: `${data.progress}%` }} />
            </div>
          </div>
          <div className="w-full max-w-md mb-4">
            <div className="grid grid-cols-5 gap-2">
              {portals.slice(0, Math.ceil(Math.max(unlockedAchievements.length, 1) / 5) * 5).map((portal, i) => {
                const isUnlocked = i < unlockedAchievements.length
                return isUnlocked ? (
                  <div key={i} className="bg-[#0d0d1a] rounded-lg border border-[#D4AF37] p-1.5 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden mb-1 border border-[#D4AF37]">
                      <Image src={unlockedAchievements[i]?.image || "/placeholder.svg"} alt={unlockedAchievements[i]?.name || ""} width={56} height={56} className="object-cover w-full h-full" />
                    </div>
                    <span className="text-[#D4AF37] text-[10px] font-bold text-center leading-tight">{unlockedAchievements[i]?.name.split(" ").slice(0, 2).join("\n")}</span>
                  </div>
                ) : (
                  <div key={`locked-${i}`} className="bg-[#1a1a2e] rounded-lg border border-gray-600 p-1.5 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-lg bg-[#2a2a3e] flex items-center justify-center mb-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-500"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </div>
                    <span className="text-gray-500 text-[10px] font-medium">Locked</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="w-full max-w-md bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-5">
            <div className="flex justify-center mb-4"><span className="bg-[#2a2a3e] text-gray-300 text-sm px-4 py-1.5 rounded-full">{data.badge}</span></div>
            {isLoading ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#D4AF37] text-base font-medium mb-2">Processing your answer...</p>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            ) : (
              <>
                <p className="text-white text-lg font-bold text-center mb-5 leading-relaxed whitespace-pre-line">{replaceNamePlaceholder(data.question)}</p>
                <div className="space-y-3">
                  {data.options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(index)} className={`w-full bg-[#F9D423] text-black font-medium py-3.5 px-4 rounded-lg text-left transition-all ${selectedOption === index ? "ring-4 ring-[#D4AF37] ring-offset-2 ring-offset-[#0d0d1a] scale-[1.02]" : "hover:bg-[#E5C31F]"}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render Unlock achievement screen
  const renderUnlockScreen = () => {
    const data = stepData as UnlockStep
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src={images.background} alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-2xl border-2 border-[#D4AF37] p-6 shadow-2xl shadow-[#D4AF37]/20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h1 className="text-[#D4AF37] text-2xl font-bold tracking-wide">UNLOCKED!</h1>
              <div className="animate-spin-slow">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]"><path d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L16.91 18.72L12 15.27L7.09 18.72L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 rounded-xl border-2 border-[#D4AF37] overflow-hidden bg-[#1a1a2e]">
                <Image src={data.image || "/placeholder.svg"} alt={data.title} width={144} height={144} className="object-cover w-full h-full" />
              </div>
            </div>
            <h2 className="text-[#D4AF37] text-2xl font-bold text-center mb-3">{data.title}</h2>
            <p className="text-gray-300 text-base text-center mb-6 leading-relaxed">{data.description}</p>
            <button onClick={handleContinue} className="w-full bg-[#F9D423] hover:bg-[#E5C31F] text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
              <span className="text-lg">{data.buttonText || "Continue Evolution"}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Motivational screen
  const renderMotivationalScreen = () => {
    const data = stepData as MotivationalStep
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src={images.background} alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-2xl border-2 border-[#D4AF37] p-6 shadow-2xl shadow-[#D4AF37]/20">
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 rounded-xl border-2 border-[#D4AF37] overflow-hidden bg-[#1a1a2e]">
                <Image src={data.image || "/placeholder.svg"} alt={data.title} width={160} height={160} className="object-cover w-full h-full" />
              </div>
            </div>
            <h2 className="text-[#D4AF37] text-2xl font-bold text-center mb-4">{replaceNamePlaceholder(data.title)}</h2>
            <p className="text-gray-300 text-base text-center mb-8 leading-relaxed">{data.description}</p>
            <button onClick={() => handleMotivational(data.addToBalance)} className="w-full bg-[#F9D423] hover:bg-[#E5C31F] text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
              <span className="text-lg">{data.buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Final screen
  const renderFinalScreen = () => {
    if (isComplete) {
      return (
      <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-[#1a1510] via-[#0d0d0d] to-black px-6 py-8 relative overflow-x-hidden">
          <div className="absolute top-4 right-4">
            <Star className="w-8 h-8 text-[#F9D423] animate-spin-slow" fill="#F9D423" />
          </div>
          <div className="flex flex-col items-center mb-6 mt-4 animate-pulse-soft">
            <Image src={images.logo} alt="Logo" width={80} height={80} className="object-contain" priority />
          </div>
          <h1 className="text-white text-[28px] font-bold text-center mb-6 leading-tight">
            {name.toLowerCase()}, you{"'"}ve made it this<br />far... and that{"'"}s no<br />accident.
          </h1>
          <p className="text-[#D4AF37] text-lg text-center mb-4 leading-relaxed italic">
            Today is {currentDate} {"–"} the first day<br />of your new reality.
          </p>
          <div className="w-32 h-2 bg-[#D4AF37] rounded-full mb-8 animate-pulse-soft" />

          {/* Vturb Video Embed */}
          <h2 className="text-[#F9D423] text-xl font-bold text-center mb-4">Watch the video below to claim your blessing</h2>
          <div className="w-full max-w-md">
            <div ref={vturbRef} className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.25)]" />
          </div>

          {/* Preload offer images hidden */}
          <div className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
            {[images.seedBarren, images.seedSprout, images.seedTree, images.seedGolden, images.seedDivine].map((src) => (
              <Image key={src} src={src} alt="" width={1} height={1} priority />
            ))}
          </div>

          {/* Offer Section - only visible after 7:28 of video */}
          {showOffer && (
            <div ref={offerRef} className="w-full max-w-md mt-10 flex flex-col items-center animate-fade-in-offer">
              <h2 className="text-[#F9D423] text-2xl font-bold italic text-center mb-8">
                {name}, Make your choice now!
              </h2>

              {/* Seed Cards */}
              <div className="w-full flex flex-col gap-8">
                {[
                  { price: "$0", desc: "The life that stays as it is.", image: images.seedBarren, gold: false, link: "https://v0-ichoosethislfe.vercel.app/" },
                  { price: "$27", desc: "The life that begins to awaken.", image: images.seedSprout, gold: true, link: "https://www.checkout-ds24.com/product/691574" },
                  { price: "$47", desc: "The life that grows with purpose.", image: images.seedTree, gold: true, link: "https://www.checkout-ds24.com/product/691572" },
                  { price: "$77", desc: "The life of full abundance and manifestation.", image: images.seedGolden, gold: true, link: "https://www.checkout-ds24.com/product/691571" },
                  { price: "$100", desc: "The life of divine overflow and miracles.", image: images.seedDivine, gold: true, link: "https://www.checkout-ds24.com/product/685315" },
                ].map((seed, index) => (
                  <div key={index} className="w-full flex flex-col items-center">
                    {/* Image */}
                    <div className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                      <div className="relative w-full aspect-[4/3]">
                        <Image src={seed.image} alt={seed.desc} fill className="object-cover" priority />
                      </div>
                    </div>
                    {/* Button */}
                    <a
                      href={seed.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-4 rounded-full text-center font-bold text-lg transition-all duration-300 active:scale-[0.97] block ${
                        seed.gold
                          ? "bg-[#F5A623] text-[#1a1a00] shadow-[0_0_20px_rgba(245,166,35,0.3)]"
                          : "bg-[#2a2a3a] text-[#8a8a9a] border border-[#3a3a4a]"
                      }`}
                    >
                      {"This is the life I choose"} {"–"} {seed.price}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    // Loading state
    return (
      <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-[#1a1510] via-[#0d0d0d] to-black px-6 py-8 relative overflow-x-hidden">
        {visibleNotifications.length > 0 && !isComplete && (
          <div className="fixed top-2 left-3 right-3 z-50 flex flex-col gap-2">
            {visibleNotifications.map((notif) => (
              <div key={notif.id} className="bg-gradient-to-r from-[#b8860b] to-[#d4a017] rounded-lg px-3 py-2 flex items-center gap-2 shadow-md border border-[#F9D423]/50 animate-slide-in-right">
                <div className="w-7 h-7 bg-[#F9D423] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#8B7500]" strokeWidth={3} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a1a00] font-bold text-xs leading-none mb-0.5">PROCESSING</p>
                  <p className="text-[#1a1a00] text-xs leading-tight">{notifications[notif.index].emoji} {notifications[notif.index].text}</p>
                </div>
                <Star className="w-4 h-4 text-[#8B7500] flex-shrink-0 animate-spin-slow" />
              </div>
            ))}
          </div>
        )}
        <div className="absolute top-20 left-8 w-3 h-3 bg-[#F9D423] rounded-full animate-pulse-circle" />
        <div className="absolute top-16 right-10 w-4 h-4 bg-[#F9D423] rounded-full animate-pulse-circle" style={{ animationDelay: "0.5s" }} />
        <div className="flex flex-col items-center mb-8 mt-8">
          <Image src={images.logo} alt="Logo" width={70} height={70} className="object-contain" priority />
        </div>
        <h1 className="text-white text-[26px] font-bold text-center mb-6 leading-tight">{name.toUpperCase()}, your Divine<br />Manifestation<br />Script is being<br />created...</h1>
        <p className="text-[#D4AF37] text-lg text-center mb-10 leading-relaxed">Processing your answers<br />with divine precision</p>
        <div className="w-full max-w-sm mb-3">
          <div className="relative w-full h-3 bg-[#3a3a4a] rounded-full overflow-visible">
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F9D423] rounded-full z-10 shadow-lg" style={{ left: `calc(${Math.min(progress, 100)}% - 8px)` }} />
            <div className="h-full bg-[#F9D423] rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="w-full max-w-sm flex justify-between items-center mb-10">
          <span className="text-[#D4AF37] text-sm">{statusText}</span>
          <span className="text-[#F9D423] text-3xl font-bold">{Math.round(progress)}%</span>
        </div>
        {/* Achievements Unlocked - Single Cycling Card */}
        {visiblePortalCount > 0 && (
          <div className="w-full max-w-sm mb-8 flex flex-col items-center">
            <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">Achievements Unlocked</p>
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-3">
              <Image
                key={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                src={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].image || "/placeholder.svg"}
                alt={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                fill
                className="object-cover portal-enter"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-4 px-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-[#F9D423] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-[#D4AF37] text-sm font-bold tracking-wider">UNLOCKED</span>
                </div>
                <h3 className="text-white text-xl font-bold text-center">
                  {portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="w-full max-w-sm text-center mt-4">
          <p className="text-[#F9D423] text-lg italic leading-relaxed mb-2">{"\"We're preparing your Divine"}<br />{"Manifestation Script, based"}<br />{"on everything you've told us,"}<br />{name}...{"\""}</p>
          <p className="text-gray-400 text-sm mb-4">You will be redirected automatically</p>
          <div className="flex justify-center gap-2">
            <span className="w-3 h-3 bg-[#F9D423] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-3 h-3 bg-[#F9D423] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-3 h-3 bg-[#F9D423] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div>
      {stepData?.type === "continue" && renderContinueScreen()}
      {stepData?.type === "journey" && renderJourneyScreen()}
      {stepData?.type === "unlocked" && renderUnlockedScreen()}
      {stepData?.type === "question" && renderQuestionScreen()}
      {stepData?.type === "unlock-screen" && renderUnlockScreen()}
      {stepData?.type === "motivational" && renderMotivationalScreen()}
      {stepData?.type === "final" && renderFinalScreen()}
      <style jsx global>{`
        @keyframes pulseGold { 0%, 100% { color: #d4af37; } 50% { color: #8b7520; } }
        .animate-pulse-gold { animation: pulseGold 1.5s ease-in-out infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 3s linear infinite; }
        @keyframes pulseSoft { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .animate-pulse-soft { animation: pulseSoft 2s ease-in-out infinite; }
        @keyframes cardPop { 0% { opacity: 0; transform: scale(0.5); } 60% { opacity: 1; transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        .card-pop { animation: cardPop 0.4s ease-out forwards; }
        @keyframes pulseCircle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        .animate-pulse-circle { animation: pulseCircle 2s ease-in-out infinite; }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out; }
        @keyframes portalEnter {
          0% { opacity: 0; transform: scale(0.8); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes portalExit {
          0% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.08); filter: blur(6px); }
        }
        .portal-enter { animation: portalEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .portal-exit { animation: portalExit 0.7s cubic-bezier(0.55, 0, 1, 0.45) forwards; }
        @keyframes fadeInOffer { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-offer { animation: fadeInOffer 0.8s ease-out forwards; }
      `}</style>
    </div>
  )
}
