// Image URLs mapping - using Vercel Blob URLs for all images
export const images = {
  // Background and logo
  background: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-IkFOKtxbFZPRqTnNv3mO1g0U3jCUyn.png",
  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-yIuq6D5dSQFiFWKzpLmllQzmNv3PoE.png",
  
  // Quiz unlock images
  manSilhouetteStars: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man-silhouette-stars-k81Ol4g23i0nW1EGCGmUwzucy8QMPa.jpg",
  prayingHands: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/praying-hands-NWg19g3yIJIvTA012vAOEzNI1YYe7q.jpg",
  dreamHome: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dream-home-srYj1e0JeqoJ4rcnFUYHXC4Fl1EHif.jpg",
  dreamCar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dream-car-rjLlyXkZrc3YxmILfECj0GMGrF8xlA.jpg",
  happyFamily: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/happy-family-VEO47b71D34YWbmVap1A9dbPzXkHje.jpg",
  perfectHealth: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfect-health-Y4rG8k4EpTq5DYkaM4UQz3QK8bKNe9.jpg",
  abundance: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abundance-ScOXN45uvxNmVPYpbInwyHW3ytZRx9.jpg",
  boost100x: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/100x-boost-mt6YorbT6h6W9sAKYCZ8gBlUKRsytr.jpg",
  blocksBroken: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blocks-broken-dWrxdf8CWWYU1pXLtP7ho96dvaS5P3.jpg",
  multiplication100x: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/100x-multiplication-fW2EfK4lLGZoCRx7KwmoxpNbo50Tfj.jpg",
  
  // Tree/abundance images
  goldenTree: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/golden-tree-LZPgGEZhkkPntXSYtvWbpw0JbYMLvd.png",
  fruitTree: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fruit-tree-abrOe60KyXjC6Cq7L6WfTP61HuhIEd.png",
  
  // Seed progression images
  seedBarren: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seed-barren.jpg-KkX10kRUI0pZjbBpjOATudKFiIupaN.png",
  seedSprout: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seed-sprout.jpg-oPU2ZNDM0mtvwkuwdSt2R97wcFqD0D.png",
  seedTree: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seed-tree.jpg-9l7g8BE7tDakBmVIkf9GB2eA5eegvg.png",
  seedGolden: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seed-golden.jpg-UpXb8CaVf3jkQQYFvKRVlBe2Bj6uGc.png",
  seedDivine: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seed-divine-XU5U73DLHxmCG7cIJ9qBtQZqjosbZl.jpg",
  
  // Divine/spiritual images
  divineAbundance: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/divine-abundance-zeOuMMYxB7kKaVjp7bYYU2aiRQrWON.jpg",
  
  // Testimonial images
  jamieHeavens: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jamie-heavens-jfM6ETbMEBrDa3eF47i7nQGSnW9EoG.jpg",
} as const

// Helper to get image by path (for backwards compatibility)
export function getImageUrl(path: string): string {
  const pathMap: Record<string, string> = {
    "/images/background.png": images.background,
    "/images/logo.png": images.logo,
    "/images/man-silhouette-stars.jpg": images.manSilhouetteStars,
    "/images/praying-hands.jpg": images.prayingHands,
    "/images/dream-home.jpg": images.dreamHome,
    "/images/dream-car.jpg": images.dreamCar,
    "/images/happy-family.jpg": images.happyFamily,
    "/images/perfect-health.jpg": images.perfectHealth,
    "/images/abundance.jpg": images.abundance,
    "/images/100x-boost.jpg": images.boost100x,
    "/images/blocks-broken.jpg": images.blocksBroken,
    "/images/100x-multiplication.jpg": images.multiplication100x,
    "/images/golden-tree.png": images.goldenTree,
    "/images/fruit-tree.png": images.fruitTree,
    "/images/seed-barren.jpg": images.seedBarren,
    "/images/seed-sprout.jpg": images.seedSprout,
    "/images/seed-tree.jpg": images.seedTree,
    "/images/seed-golden.jpg": images.seedGolden,
    "/images/seed-divine.jpg": images.seedDivine,
    "/images/divine-abundance.jpg": images.divineAbundance,
    "/images/jamie-heavens.jpg": images.jamieHeavens,
  }
  
  return pathMap[path] || path
}
