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
    question: "{name}, as-tu le sentiment de vivre la vie que Dieu a reve pour toi ?",
    options: ["Oui, mais je sais que je peux vivre plus", "Non, je sens que j'en suis loin", "Parfois je me pose la question..."],
    badge: "Eveil Financier",
    progress: 10,
  },
  {
    type: "question",
    question: "Combien de fois ressens-tu un vide dans ta poitrine... comme si quelque chose manquait ?",
    options: ["Tous les jours", "Quelques fois par semaine", "Rarement"],
    badge: "Eveil Financier",
    progress: 14,
  },
  {
    type: "question",
    question: "Te sens-tu coince dans les memes cycles negatifs depuis des annees ?",
    options: ["Oui, c'est comme une boucle", "Parfois je ressens cela", "Je ne suis pas sur"],
    badge: "Eveil Financier",
    progress: 19,
  },
  {
    type: "question",
    question: "Si la vie que tu vis aujourd'hui etait le resultat direct de tes propres choix... serais-tu satisfait ?",
    options: ["Non, je veux changer", "Plus ou moins", "Oui, mais je veux plus"],
    badge: "Eveil Financier",
    progress: 24,
  },
  {
    type: "unlock-screen",
    title: "Je Choisis Mon Avenir",
    description: "Le pouvoir de changer ta vie est entre tes mains !",
    image: images.manSilhouetteStars,
  },
  {
    type: "question",
    question: "Combien de fois as-tu demande a Dieu un signe pour changer ta vie ?",
    options: ["De nombreuses fois", "Quelques fois", "Je ne demande pas habituellement de signes", "C'est ma premiere fois"],
    badge: "Foi & Mission Spirituelle",
    progress: 29,
  },
  {
    type: "question",
    question: "{name}, si aujourd'hui etait ton test de foi final... que ferais-tu maintenant ?",
    options: [
      "Je passerais a l'action comme quelqu'un qui croit aux miracles",
      "Je ferais un petit pas apeure... mais je ferais quand meme un pas",
      "Je resterais fige... encore une fois... comme les autres fois ou j'ai abandonne",
    ],
    badge: "Foi & Mission Spirituelle",
    progress: 33,
  },
  {
    type: "question",
    question: "Crois-tu que Dieu peut transformer ta vie avec une seule decision de ta part ?",
    options: ["Oui, absolument", "J'ai des doutes", "Je ne sais pas"],
    badge: "Foi & Mission Spirituelle",
    progress: 38,
  },
  {
    type: "question",
    question: "Es-tu pret a faire d'AUJOURD'HUI ton jour de foi et de responsabilite pour ta nouvelle vie ?",
    options: ["Oui, je suis pret", "J'ai besoin d'un signe plus clair", "Non"],
    badge: "Foi & Mission Spirituelle",
    progress: 43,
  },
  {
    type: "unlock-screen",
    title: "Decision de Foi",
    description: "Ta Foi Deplacera des Montagnes",
    image: images.prayingHands,
  },
  {
    type: "question",
    question: "Si Dieu te donnait la chance d'obtenir la maison de tes reves... a quoi ressemblerait-elle ?",
    options: ["Grande, avec plusieurs chambres", "Un appartement moderne", "Une maison simple, mais pleine de paix", "Je n'y pense pas vraiment"],
    badge: "Visualisation du Futur",
    progress: 48,
  },
  {
    type: "unlock-screen",
    title: "Maison de Reve",
    description: "Ta Maison de Reve Est en Chemin",
    image: images.dreamHome,
  },
  {
    type: "question",
    question: "Quelle voiture imagines-tu garee devant ta maison ideale ?",
    options: ["Un SUV de luxe", "Une berline confortable", "Une voiture simple mais fiable", "Les voitures ne m'interessent pas"],
    badge: "Visualisation du Futur",
    progress: 52,
  },
  {
    type: "unlock-screen",
    title: "Voiture de Reve",
    description: "Ta Voiture de Reve Est Reservee",
    image: images.dreamCar,
  },
  {
    type: "question",
    question: "Comment est ta vie de famille aujourd'hui ?",
    options: [
      "Je sens qu'il manque de l'unite",
      "Quelqu'un de special me manque",
      "J'ai une bonne famille, mais nous pouvons etre plus heureux",
      "Je n'y pense pas vraiment",
    ],
    badge: "Visualisation du Futur",
    progress: 57,
  },
  {
    type: "unlock-screen",
    title: "Famille Heureuse",
    description: "La Famille Heureuse Que Tu Merites",
    image: images.happyFamily,
  },
  {
    type: "question",
    question: "Si tu pouvais te reveiller demain en parfaite sante... qu'est-ce qui serait different ?",
    options: [
      "Plus d'energie pour poursuivre mes reves",
      "Pouvoir faire du sport sans douleur",
      "Me sentir bien dans mon corps",
      "Ma sante est bonne, mais je veux plus de vitalite",
    ],
    badge: "Visualisation du Futur",
    progress: 62,
  },
  {
    type: "unlock-screen",
    title: "Sante Parfaite",
    description: "Ta Sante Parfaite Est Activee",
    image: images.perfectHealth,
  },
  {
    type: "question",
    question: "Si tu recevais une grosse somme d'argent aujourd'hui... que ferais-tu en premier ?",
    options: ["Rembourser mes dettes", "Acheter une maison", "Realiser le reve de ma famille", "Investir dans mon avenir"],
    badge: "Visualisation du Futur",
    progress: 67,
  },
  {
    type: "unlock-screen",
    title: "Abondance",
    description: "Imagine... 277 000 $ deposes sur ton compte en ce moment !",
    image: images.abundance,
    buttonText: "OUI ! Je crois, je recois !",
  },
  {
    type: "motivational",
    title: "{name}",
    description: "Ton potentiel de manifestation depend de ton choix, vois grand pour manifester de grandes choses, tu es a la mesure de ton courage.",
    image: images.abundance,
    buttonText: "Continuer le Voyage",
    addToBalance: 2000000,
  },
  {
    type: "question",
    question: "Imagine que dans 30 jours, ta vie est transformee a 100%. Laquelle de ces images represente ton avenir ?",
    options: [
      "Maison de luxe et liberte financiere",
      "Sante parfaite et vitalite",
      "Famille heureuse et amour",
      "Voyages et nouvelles experiences",
    ],
    badge: "Visualisation du Futur",
    progress: 71,
  },
  {
    type: "unlock-screen",
    title: "Boost 100x",
    description: "Ton Pouvoir de Manifestation Vient d'Etre Multiplie par 100x",
    image: images.boost100x,
  },
  {
    type: "question",
    question: "Sens-tu qu'il y a quelque chose de spirituel ou emotionnel qui te bloque ?",
    options: ["Oui, un poids que je ne peux pas expliquer", "Parfois je ressens cela", "Non"],
    badge: "Briser les Blocages",
    progress: 76,
  },
  {
    type: "question",
    question: "Laquelle de ces affirmations te decrit le mieux ?",
    options: [
      "Je me sens maudit, rien ne fonctionne jamais pour moi",
      "Ma vie n'a jamais ete facile",
      "Je ne me sens pas digne",
      "Je manque d'energie et de motivation",
    ],
    badge: "Briser les Blocages",
    progress: 81,
  },
  {
    type: "unlock-screen",
    title: "Blocages Brises",
    description: "Tous les Blocages Mentaux Ont Ete Supprimes",
    image: images.blocksBroken,
  },
  {
    type: "question",
    question: "Acceptes-tu de faire partie d'un groupe de personnes qui ont decide de creer leur vie de reve par le pouvoir de la foi ?",
    options: ["Oui, j'accepte", "Je ne suis pas sur", "J'ai besoin d'y reflechir"],
    badge: "Choix Final",
    progress: 86,
  },
  {
    type: "question",
    question: "Si tu pouvais changer une seule chose maintenant... ce serait quoi ?",
    options: ["Ma situation financiere", "Mes relations", "Ma sante", "Mon but dans la vie"],
    badge: "Choix Final",
    progress: 90,
  },
  {
    type: "question",
    question: "Si Dieu te donnait la chance de recommencer aujourd'hui... accepterais-tu ?",
    options: ["Oui, sans hesitation", "Oui, mais avec un peu de peur", "Je ne suis pas pret"],
    badge: "Choix Final",
    progress: 95,
  },
  {
    type: "question",
    question: 'Pour terminer... complete cette phrase :\n"A partir d\'aujourd\'hui..."',
    options: [
      "Je choisis de vivre dans l'abondance",
      "J'accepte le destin que Dieu m'a reserve",
      "Je me libere de tout ce qui me bloquait",
    ],
    badge: "Choix Final",
    progress: 100,
  },
  { type: "final" },
]

const achievements = [
  { name: "Je Choisis Mon Avenir", image: images.manSilhouetteStars, unlockedAtStep: 7 },
  { name: "Decision de Foi", image: images.prayingHands, unlockedAtStep: 12 },
  { name: "Maison de Reve", image: images.dreamHome, unlockedAtStep: 14 },
  { name: "Voiture de Reve", image: images.dreamCar, unlockedAtStep: 16 },
  { name: "Famille Heureuse", image: images.happyFamily, unlockedAtStep: 18 },
  { name: "Sante Parfaite", image: images.perfectHealth, unlockedAtStep: 20 },
  { name: "Abondance", image: images.abundance, unlockedAtStep: 22 },
  { name: "Boost 100x", image: images.boost100x, unlockedAtStep: 25 },
  { name: "Blocages Brises", image: images.blocksBroken, unlockedAtStep: 28 },
  { name: "Multiplication 100x", image: images.multiplication100x, unlockedAtStep: 2 },
]

const notifications = [
  { emoji: "\u{1F3E0}", text: "Manifestation de ta maison de reve dans le royaume spirituel..." },
  { emoji: "\u{1F697}", text: "Reservation de ta voiture ideale..." },
  { emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", text: "Alignement de ton bonheur familial..." },
  { emoji: "\u{1F497}", text: "Activation des protocoles de sante parfaite..." },
  { emoji: "\u{1F513}", text: "Brisure des blocages spirituels et emotionnels..." },
  { emoji: "\u{1F31F}", text: "Preparation de ton boost de manifestation 100x..." },
  { emoji: "\u{1F4B0}", text: "Ouverture des canaux d'abondance..." },
  { emoji: "\u2728", text: "Finalisation de ton script divin..." },
]

const portals = [
  { name: "Je Choisis Mon Avenir", image: images.manSilhouetteStars },
  { name: "Decision de Foi", image: images.prayingHands },
  { name: "Maison de Reve", image: images.dreamHome },
  { name: "Voiture de Reve", image: images.dreamCar },
  { name: "Famille Heureuse", image: images.happyFamily },
  { name: "Sante Parfaite", image: images.perfectHealth },
  { name: "Abondance", image: images.abundance },
  { name: "Boost 100x", image: images.boost100x },
  { name: "Blocages Brises", image: images.blocksBroken },
  { name: "Multiplication 100x", image: images.multiplication100x },
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
  const [statusText, setStatusText] = useState("Demarrage de la transformation...")
  const [isComplete, setIsComplete] = useState(false)
  const [visibleNotifications, setVisibleNotifications] = useState<Array<{ id: number; index: number }>>([])
  const [cardAnimationIndex, setCardAnimationIndex] = useState(-1)
  const notificationIdRef = useRef(0)
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentNotificationIndexRef = useRef(0)
  const [showOffer, setShowOffer] = useState(false)
  const vturbRef = useRef<HTMLDivElement>(null)
  const offerRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString("fr-FR", { month: "long", day: "numeric", year: "numeric" })

  const formatBalance = (value: number) => value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

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
        if (np < 20) setStatusText("Demarrage de la transformation...")
        else if (np < 40) setStatusText("Analyse de tes reponses...")
        else if (np < 60) setStatusText("Alignement des energies divines...")
        else if (np < 80) setStatusText("Preparation de ta manifestation...")
        else setStatusText("Finalisation de ton script...")
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
    const DELAY_SECONDS = 539 // 8:59
    const timer = setTimeout(() => {
      if (vturbRef.current && !vturbRef.current.querySelector("vturb-smartplayer")) {
        const player = document.createElement("vturb-smartplayer")
        player.id = "vid-6a28531a922bc23f4fef18b2"
        player.style.cssText = "display: block; margin: 0 auto; width: 100%; max-width: 400px;"
        vturbRef.current.appendChild(player)
        const s = document.createElement("script")
        s.src = "https://scripts.converteai.net/f8e465b5-f483-4d08-be19-bc14de388e59/players/6a28531a922bc23f4fef18b2/v4/player.js"
        s.async = true
        document.head.appendChild(s)

        // Listen for player ready, then watch video time to show offer at 8:59
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
            <h2 className="text-xl font-bold text-white leading-tight">{name}, avant de continuer...</h2>
            <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 ml-2 animate-spin" style={{ animationDuration: "2s" }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="w-full bg-transparent rounded-lg border border-[#D4AF37] p-4 mb-5">
            <p className="text-[#D4AF37] font-semibold text-center mb-3 text-sm">Repete cette phrase a voix haute :</p>
            <p className="text-white italic text-center text-base leading-relaxed">{"\"La vie de mes reves commence"}<br />{"avec mon choix.\""}</p>
          </div>
          <p className="text-gray-500 text-xs text-center mb-5">Clique sur continuer seulement apres l'avoir repetee a voix haute.</p>
          <button onClick={handleContinue} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-[#E5C31F] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            Continuer le Voyage
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
        <h1 className="text-[#D4AF37] text-xl font-bold text-center mb-4">Bonjour, {name} Ton Voyage a commence...</h1>
        <p className="text-gray-400 text-sm tracking-wider mb-1">SOLDE DU COMPTE</p>
        <p className="text-3xl font-bold animate-pulse-gold mb-4">0,00 €</p>
        <div className="w-full max-w-sm mb-4">
          <p className="text-[#D4AF37] text-sm italic animate-pulse-gold mb-2">Votre energie s'aligne avec le divin...</p>
          <div className="flex justify-end mb-2"><span className="text-gray-400 text-sm">5%</span></div>
          <div className="w-full h-[6px] bg-[#0d1829] rounded-full relative overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[10px] bg-[#F9D423] rounded-full z-10" />
            <div className="absolute left-3 top-0 h-full bg-[#F9D423] rounded-r-full" style={{ width: "5%" }} />
          </div>
        </div>
        <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-6 mt-2">
          <div className="flex justify-center mb-4">
            <span className="bg-[#2a2a3e] text-gray-300 text-sm px-4 py-1.5 rounded-full">Eveil Financier</span>
          </div>
          <h2 className="text-white text-lg font-bold text-center mb-6 leading-relaxed">
            {name}, si tu regardais ton compte bancaire aujourd'hui, combien aurais-tu de disponible ?
          </h2>
          <input type="text" inputMode="numeric" placeholder="Entre des chiffres seulement (ex: 1500)" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} className="w-full bg-white border-2 border-[#D4AF37] rounded-lg py-3.5 px-4 text-black text-center placeholder-gray-500 focus:outline-none focus:border-[#F9D423] mb-4" />
          <button onClick={handleJourneySubmit} disabled={!amount} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-[#E5C31F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Continuer</button>
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
              <span className="text-[#D4AF37] text-xl font-bold tracking-wide">DEBLOQUE !</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37" className="animate-spin-slow"><path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" /></svg>
            </div>
            <div className="flex justify-center mb-5">
              <div className="w-40 h-40 rounded-xl border-2 border-[#D4AF37] overflow-hidden">
                <Image src={images.multiplication100x} alt="Golden abundance" width={160} height={160} className="object-cover w-full h-full" />
              </div>
            </div>
            <h2 className="text-[#D4AF37] text-2xl font-bold text-center mb-3">Multiplication 100x</h2>
            <p className="text-white text-center text-base mb-5 leading-relaxed">{name}, aujourd'hui j'ajoute 100x de plus a ton compte {"—"} tu crois ?</p>
            <div className="bg-[#1a1a2e] rounded-lg py-3 px-4 mb-4">
              <p className="text-center"><span className="text-[#D4AF37] font-bold text-lg">Nouveau Solde : </span><span className="text-[#D4AF37] font-bold text-lg">{displayBalance} €</span></p>
            </div>
            <button onClick={handleContinue} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-[#E5C31F] transition-colors flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              OUI ! Je recois 100x de plus !
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
          <h1 className="text-[#D4AF37] text-xl font-bold text-center mb-3">Bonjour, {name} Ton Voyage a commence...</h1>
          <p className="text-gray-400 text-sm tracking-wider mb-1">SOLDE DU COMPTE</p>
          <p className="text-[#D4AF37] text-3xl font-bold mb-4 animate-pulse-gold">{formatBalance(balance)} €</p>
          <div className="w-full max-w-md mb-4">
          <p className="text-[#D4AF37] text-sm italic animate-pulse-gold mb-2">Ton energie s'aligne avec le divin...</p>
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
                    <span className="text-[#D4AF37] text-[10px] font-bold text-center leading-tight break-words w-full">{unlockedAchievements[i]?.name}</span>
                  </div>
                ) : (
                  <div key={`locked-${i}`} className="bg-[#1a1a2e] rounded-lg border border-gray-600 p-1.5 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-lg bg-[#2a2a3e] flex items-center justify-center mb-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-500"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </div>
                    <span className="text-gray-500 text-[10px] font-medium">Verrouille</span>
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
                <p className="text-[#D4AF37] text-base font-medium mb-2">Traitement de ta reponse...</p>
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
              <h1 className="text-[#D4AF37] text-2xl font-bold tracking-wide">DEBLOQUE !</h1>
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
              <span className="text-lg">{data.buttonText || "Continuer l'Evolution"}</span>
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
            {name.toLowerCase()}, tu es arrive jusque<br />la... et ce n'est pas<br />un hasard.
          </h1>
          <p className="text-[#D4AF37] text-lg text-center mb-4 leading-relaxed italic">
            Aujourd'hui c'est le {currentDate} {"–"} le premier jour<br />de ta nouvelle realite.
          </p>
          <div className="w-32 h-2 bg-[#D4AF37] rounded-full mb-8 animate-pulse-soft" />

          {/* Vturb Video Embed */}
          <h2 className="text-[#F9D423] text-xl font-bold text-center mb-4">Regarde la video ci-dessous pour reclamer ta benediction</h2>
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
                {name}, Fais ton choix maintenant !
              </h2>

              {/* Seed Cards */}
              <div className="w-full flex flex-col gap-8">
                {[
                  { price: "17 €", desc: "La vie qui commence a s'eveiller.", image: images.seedSprout, gold: true, link: "https://www.checkout-ds24.com/product/711836" },
                  { price: "27 €", desc: "La vie de pleine abondance et manifestation.", image: images.seedGolden, gold: true, link: "https://www.checkout-ds24.com/product/711835" },
                  { price: "37 €", desc: "La vie de debordement divin et de miracles.", image: images.seedDivine, gold: true, link: "https://www.checkout-ds24.com/product/711819" },
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
                      {"C'est la vie que je choisis"} {"–"} {seed.price}
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
                  <p className="text-[#1a1a00] font-bold text-xs leading-none mb-0.5">EN COURS</p>
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
        <h1 className="text-white text-[26px] font-bold text-center mb-6 leading-tight">{name.toUpperCase()}, ton Script<br />de Manifestation<br />Divine est en<br />cours de creation...</h1>
        <p className="text-[#D4AF37] text-lg text-center mb-10 leading-relaxed">Traitement de tes reponses<br />avec precision divine</p>
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
            <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">Accomplissements Debloques</p>
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
                  <span className="text-[#D4AF37] text-sm font-bold tracking-wider">DEBLOQUE</span>
                </div>
                <h3 className="text-white text-xl font-bold text-center">
                  {portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="w-full max-w-sm text-center mt-4">
          <p className="text-[#F9D423] text-lg italic leading-relaxed mb-2">{"\"Nous preparons ton Script de"}<br />{"Manifestation Divine, base"}<br />{"sur tout ce que tu nous as dit,"}<br />{name}...{"\""}</p>
          <p className="text-gray-400 text-sm mb-4">Tu seras redirige automatiquement</p>
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
