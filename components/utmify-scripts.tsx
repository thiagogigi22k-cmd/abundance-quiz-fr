"use client"

import { useEffect, useState } from "react"

export default function UtmifyScripts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      // UTM capture script
      const utmScript = document.createElement("script")
      utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js"
      utmScript.setAttribute("data-utmify-prevent-xcod-sck", "")
      utmScript.setAttribute("data-utmify-prevent-subids", "")
      utmScript.async = true
      utmScript.defer = true
      document.body.appendChild(utmScript)

      // Pixel script
      ;(window as unknown as Record<string, string>).pixelId = "69653c39ed15a37051cf203d"
      const pixelScript = document.createElement("script")
      pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js"
      pixelScript.async = true
      pixelScript.defer = true
      document.body.appendChild(pixelScript)
    } catch (e) {
      // silently fail in preview
    }
  }, [mounted])

  return null
}
