export interface QuizCategory {
  id: string
  name: string
  shortName?: string
  image: string
  unlockedAt: number // step index where it gets unlocked
  unlockMessage: string
  unlockEmoji?: string
}

export interface QuizStep {
  type: "question" | "unlocked" | "continue" | "journey"
  category?: string
  question?: string
  options?: string[]
  inputType?: "number" | "text"
  inputPlaceholder?: string
  balanceAdd?: number
  progressAdd?: number
  // For unlocked type
  unlockedCategory?: string
}

export const categories: QuizCategory[] = [
  {
    id: "i-choose-my-future",
    name: "I Choose My Future",
    image: "/images/man-silhouette-stars.jpg",
    unlockedAt: 2,
    unlockMessage: "You have the power to choose your future!",
  },
  {
    id: "100x-multiplication",
    name: "100x Multiplication",
    image: "/images/golden-tree.png",
    unlockedAt: 4,
    unlockMessage: "Your blessings will multiply 100 times!",
  },
  {
    id: "faith-decision",
    name: "Faith Decision",
    image: "/images/praying-hands.jpg",
    unlockedAt: 8,
    unlockMessage: "Your faith has opened the doors of abundance!",
  },
  {
    id: "dream-home",
    name: "Dream Home",
    image: "/images/dream-home.jpg",
    unlockedAt: 11,
    unlockMessage: "Your dream home is being prepared for you!",
  },
  {
    id: "dream-car",
    name: "Dream Car",
    image: "/images/dream-car.jpg",
    unlockedAt: 14,
    unlockMessage: "The car of your dreams is on its way!",
  },
  {
    id: "happy-family",
    name: "Happy Family",
    image: "/images/happy-family.jpg",
    unlockedAt: 17,
    unlockMessage: "The Happy Family You Deserve",
    unlockEmoji: "family",
  },
  {
    id: "perfect-health",
    name: "Perfect Health",
    image: "/images/perfect-health.jpg",
    unlockedAt: 19,
    unlockMessage: "Perfect health flows through your body!",
  },
  {
    id: "abundance",
    name: "Abundance",
    image: "/images/abundance.jpg",
    unlockedAt: 21,
    unlockMessage: "Imagine... $277,000 being deposited into your account right now!",
  },
  {
    id: "100x-boost",
    name: "100x Boost",
    image: "/images/100x-boost.jpg",
    unlockedAt: 23,
    unlockMessage: "Your abundance has been multiplied 100x!",
  },
  {
    id: "blocks-broken",
    name: "Blocks Broken",
    image: "/images/blocks-broken.jpg",
    unlockedAt: 27,
    unlockMessage: "All spiritual blocks have been broken!",
  },
]

export const quizSteps: QuizStep[] = [
  // Step 1 (index 0) - Quiz start / Continue page
  {
    type: "continue",
  },
  // Step 2 (index 1) - Question: Financial Awakening (number input)
  {
    type: "question",
    category: "Financial Awakening",
    question: "{name}, if you looked at your bank account today, how much would you have available?",
    inputType: "number",
    inputPlaceholder: "Enter numbers only (e.g. 1500)",
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 3 (index 2) - Unlocked: I Choose My Future
  {
    type: "unlocked",
    unlockedCategory: "i-choose-my-future",
  },
  // Step 4 (index 3) - Question: Financial Awakening
  {
    type: "question",
    category: "Financial Awakening",
    question: "Do you feel stuck in the same negative cycles for years?",
    options: ["Yes, it feels like a loop", "Sometimes I feel this", "I'm not sure"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 5 (index 4) - Unlocked: 100x Multiplication
  {
    type: "unlocked",
    unlockedCategory: "100x-multiplication",
  },
  // Step 6 (index 5) - Question
  {
    type: "question",
    category: "Financial Awakening",
    question: "If God promised you a financial miracle in the next 7 days, would you believe it?",
    options: ["Yes, completely", "I would try to believe", "I have many doubts"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 7 (index 6) - Question
  {
    type: "question",
    category: "Faith & Spiritual Purpose",
    question: "Do you feel something powerful brought you here today?",
    options: ["Yes, I feel God's hand in this", "Maybe, I'm curious", "I don't know yet"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 8 (index 7) - Question
  {
    type: "question",
    category: "Faith & Spiritual Purpose",
    question: "Do you believe God can transform your life with just one single decision from you?",
    options: ["Yes, absolutely", "I have doubts", "I don't know"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 9 (index 8) - Unlocked: Faith Decision
  {
    type: "unlocked",
    unlockedCategory: "faith-decision",
  },
  // Step 10 (index 9) - Question
  {
    type: "question",
    category: "Faith & Spiritual Purpose",
    question: "Are you willing to make TODAY your day of faith and responsibility for your new life?",
    options: ["Yes, I'm ready", "I need a clearer sign", "No"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 11 (index 10) - Question
  {
    type: "question",
    category: "Dream Home",
    question: "Have you ever visualized yourself living in your dream home?",
    options: ["Yes, every day", "Sometimes", "Not really"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 12 (index 11) - Unlocked: Dream Home
  {
    type: "unlocked",
    unlockedCategory: "dream-home",
  },
  // Step 13 (index 12) - Question
  {
    type: "question",
    category: "Dream Home",
    question: "Do you believe you deserve to live in abundance and comfort?",
    options: ["Yes, I know I deserve it", "I'm starting to believe", "I struggle with this"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 14 (index 13) - Question
  {
    type: "question",
    category: "Dream Car",
    question: "If the car of your dreams appeared in front of you right now, would you accept it?",
    options: ["Yes, without hesitation!", "I would be surprised but yes", "I'd wonder if I deserve it"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 15 (index 14) - Unlocked: Dream Car
  {
    type: "unlocked",
    unlockedCategory: "dream-car",
  },
  // Step 16 (index 15) - Question
  {
    type: "question",
    category: "Happy Family",
    question: "Do you dream of giving your family the best life possible?",
    options: ["Yes, it's my biggest motivation", "I think about it often", "I focus on myself first"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 17 (index 16) - Question
  {
    type: "question",
    category: "Happy Family",
    question: "Do you believe your family's happiness is connected to your spiritual abundance?",
    options: ["Yes, completely", "I'm starting to see that", "I'm not sure"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 18 (index 17) - Unlocked: Happy Family
  {
    type: "unlocked",
    unlockedCategory: "happy-family",
  },
  // Step 19 (index 18) - Question
  {
    type: "question",
    category: "Perfect Health",
    question: "Do you believe divine health is part of God's promise to you?",
    options: ["Yes, I claim it", "I hope so", "I struggle to believe"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 20 (index 19) - Unlocked: Perfect Health
  {
    type: "unlocked",
    unlockedCategory: "perfect-health",
  },
  // Step 21 (index 20) - Question: Future Visualization
  {
    type: "question",
    category: "Future Visualization",
    question: "If you received a large sum of money today... what would you do first?",
    options: ["Pay off my debts", "Buy a house", "Fulfill my family's dream", "Invest in my future"],
    balanceAdd: 2000000,
    progressAdd: 4,
  },
  // Step 22 (index 21) - Unlocked: Abundance
  {
    type: "unlocked",
    unlockedCategory: "abundance",
  },
  // Step 23 (index 22) - Question
  {
    type: "question",
    category: "Abundance Activation",
    question: "Are you ready to receive more than you ever imagined?",
    options: ["YES! I am ready", "I want to be ready", "I need more faith"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 24 (index 23) - Unlocked: 100x Boost
  {
    type: "unlocked",
    unlockedCategory: "100x-boost",
  },
  // Step 25 (index 24) - Question
  {
    type: "question",
    category: "Breaking Blocks",
    question: "Do you feel there's something spiritual or emotional blocking you?",
    options: ["Yes, a weight I can't explain", "Sometimes I feel this", "No"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 26 (index 25) - Question
  {
    type: "question",
    category: "Breaking Blocks",
    question: "Are you willing to release all negative energy and embrace your new beginning?",
    options: ["Yes, I release it all now", "I want to try", "I'm afraid to let go"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 27 (index 26) - Question
  {
    type: "question",
    category: "Breaking Blocks",
    question: "Do you believe that the chains of the past can be broken today?",
    options: ["Yes, I break them now!", "I hope so", "I'm not sure"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 28 (index 27) - Unlocked: Blocks Broken
  {
    type: "unlocked",
    unlockedCategory: "blocks-broken",
  },
  // Step 29 (index 28) - Question: Final Choice
  {
    type: "question",
    category: "Final Choice",
    question: "Do you accept to be part of a group of people who decided to create their dream life through the power of faith?",
    options: ["Yes, I accept", "I'm not sure", "I need to think about it"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 30 (index 29) - Question
  {
    type: "question",
    category: "Final Commitment",
    question: "Are you ready to take the final step toward your abundant life?",
    options: ["Yes, I'm fully committed!", "Almost there", "I need more guidance"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 31 (index 30) - Journey complete
  {
    type: "journey",
  },
]

export function getUnlockedCategories(currentStepIndex: number): string[] {
  return categories
    .filter((cat) => currentStepIndex >= cat.unlockedAt)
    .map((cat) => cat.id)
}

export function getBalance(currentStepIndex: number): number {
  let balance = 101
  for (let i = 0; i <= currentStepIndex; i++) {
    if (quizSteps[i]?.balanceAdd) {
      balance += quizSteps[i].balanceAdd!
    }
  }
  return balance
}

export function getProgress(currentStepIndex: number): number {
  const totalSteps = quizSteps.length
  const progress = Math.min(Math.round(((currentStepIndex + 1) / totalSteps) * 100), 100)
  return progress
}
