import { images } from "@/lib/images"

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
    name: "Je Choisis Mon Avenir",
    image: images.manSilhouetteStars,
    unlockedAt: 2,
    unlockMessage: "Tu as le pouvoir de choisir ton avenir !",
  },
  {
    id: "100x-multiplication",
    name: "Multiplication 100x",
    image: images.goldenTree,
    unlockedAt: 4,
    unlockMessage: "Tes benedictions seront multipliees 100 fois !",
  },
  {
    id: "faith-decision",
    name: "Decision de Foi",
    image: images.prayingHands,
    unlockedAt: 8,
    unlockMessage: "Ta foi a ouvert les portes de l'abondance !",
  },
  {
    id: "dream-home",
    name: "Maison de Reve",
    image: images.dreamHome,
    unlockedAt: 11,
    unlockMessage: "Ta maison de reve est en preparation pour toi !",
  },
  {
    id: "dream-car",
    name: "Voiture de Reve",
    image: images.dreamCar,
    unlockedAt: 14,
    unlockMessage: "La voiture de tes reves est en chemin !",
  },
  {
    id: "happy-family",
    name: "Famille Heureuse",
    image: images.happyFamily,
    unlockedAt: 17,
    unlockMessage: "La Famille Heureuse Que Tu Merites",
    unlockEmoji: "family",
  },
  {
    id: "perfect-health",
    name: "Sante Parfaite",
    image: images.perfectHealth,
    unlockedAt: 19,
    unlockMessage: "La sante parfaite coule dans ton corps !",
  },
  {
    id: "abundance",
    name: "Abondance",
    image: images.abundance,
    unlockedAt: 21,
    unlockMessage: "Imagine... 277 000 $ deposes sur ton compte en ce moment !",
  },
  {
    id: "100x-boost",
    name: "Boost 100x",
    image: images.boost100x,
    unlockedAt: 23,
    unlockMessage: "Ton abondance a ete multipliee 100x !",
  },
  {
    id: "blocks-broken",
    name: "Blocages Brises",
    image: images.blocksBroken,
    unlockedAt: 27,
    unlockMessage: "Tous les blocages spirituels ont ete brises !",
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
    category: "Eveil Financier",
    question: "{name}, si tu regardais ton compte bancaire aujourd'hui, combien aurais-tu de disponible ?",
    inputType: "number",
    inputPlaceholder: "Entre des chiffres seulement (ex: 1500)",
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
    category: "Eveil Financier",
    question: "Te sens-tu coince dans les memes cycles negatifs depuis des annees ?",
    options: ["Oui, c'est comme une boucle", "Parfois je ressens cela", "Je ne suis pas sur"],
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
    category: "Eveil Financier",
    question: "Si Dieu te promettait un miracle financier dans les 7 prochains jours, le croirais-tu ?",
    options: ["Oui, completement", "J'essaierais d'y croire", "J'ai beaucoup de doutes"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 7 (index 6) - Question
  {
    type: "question",
    category: "Foi & Mission Spirituelle",
    question: "Sens-tu que quelque chose de puissant t'a amene ici aujourd'hui ?",
    options: ["Oui, je sens la main de Dieu", "Peut-etre, je suis curieux", "Je ne sais pas encore"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 8 (index 7) - Question
  {
    type: "question",
    category: "Foi & Mission Spirituelle",
    question: "Crois-tu que Dieu peut transformer ta vie avec une seule decision de ta part ?",
    options: ["Oui, absolument", "J'ai des doutes", "Je ne sais pas"],
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
    category: "Foi & Mission Spirituelle",
    question: "Es-tu pret a faire d'AUJOURD'HUI ton jour de foi et de responsabilite pour ta nouvelle vie ?",
    options: ["Oui, je suis pret", "J'ai besoin d'un signe plus clair", "Non"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 11 (index 10) - Question
  {
    type: "question",
    category: "Maison de Reve",
    question: "As-tu deja visualise que tu vivais dans ta maison de reve ?",
    options: ["Oui, tous les jours", "Parfois", "Pas vraiment"],
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
    category: "Maison de Reve",
    question: "Crois-tu que tu merites de vivre dans l'abondance et le confort ?",
    options: ["Oui, je sais que je le merite", "Je commence a y croire", "J'ai du mal avec ca"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 14 (index 13) - Question
  {
    type: "question",
    category: "Voiture de Reve",
    question: "Si la voiture de tes reves apparaissait devant toi maintenant, l'accepterais-tu ?",
    options: ["Oui, sans hesitation !", "Je serais surpris mais oui", "Je me demanderais si je le merite"],
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
    category: "Famille Heureuse",
    question: "Reves-tu de donner a ta famille la meilleure vie possible ?",
    options: ["Oui, c'est ma plus grande motivation", "J'y pense souvent", "Je me concentre d'abord sur moi"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 17 (index 16) - Question
  {
    type: "question",
    category: "Famille Heureuse",
    question: "Crois-tu que le bonheur de ta famille est lie a ton abondance spirituelle ?",
    options: ["Oui, completement", "Je commence a le voir", "Je ne suis pas sur"],
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
    category: "Sante Parfaite",
    question: "Crois-tu que la sante divine fait partie de la promesse de Dieu pour toi ?",
    options: ["Oui, je la reclame", "Je l'espere", "J'ai du mal a y croire"],
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
    category: "Visualisation du Futur",
    question: "Si tu recevais une grosse somme d'argent aujourd'hui... que ferais-tu en premier ?",
    options: ["Rembourser mes dettes", "Acheter une maison", "Realiser le reve de ma famille", "Investir dans mon avenir"],
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
    category: "Activation de l'Abondance",
    question: "Es-tu pret a recevoir plus que tu n'as jamais imagine ?",
    options: ["OUI ! Je suis pret", "Je veux etre pret", "J'ai besoin de plus de foi"],
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
    category: "Briser les Blocages",
    question: "Sens-tu qu'il y a quelque chose de spirituel ou emotionnel qui te bloque ?",
    options: ["Oui, un poids que je ne peux pas expliquer", "Parfois je ressens cela", "Non"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 26 (index 25) - Question
  {
    type: "question",
    category: "Briser les Blocages",
    question: "Es-tu pret a liberer toute energie negative et a embrasser ton nouveau depart ?",
    options: ["Oui, je libere tout maintenant", "Je veux essayer", "J'ai peur de lacher prise"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 27 (index 26) - Question
  {
    type: "question",
    category: "Briser les Blocages",
    question: "Crois-tu que les chaines du passe peuvent etre brisees aujourd'hui ?",
    options: ["Oui, je les brise maintenant !", "Je l'espere", "Je ne suis pas sur"],
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
    category: "Choix Final",
    question: "Acceptes-tu de faire partie d'un groupe de personnes qui ont decide de creer leur vie de reve par le pouvoir de la foi ?",
    options: ["Oui, j'accepte", "Je ne suis pas sur", "J'ai besoin d'y reflechir"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 30 (index 29) - Question
  {
    type: "question",
    category: "Engagement Final",
    question: "Es-tu pret a faire le dernier pas vers ta vie d'abondance ?",
    options: ["Oui, je suis totalement engage !", "Presque la", "J'ai besoin de plus de guidance"],
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
