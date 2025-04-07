"use client"

import { useState, useEffect } from "react"
import PromoSlider from "@/components/promo-slider"
import CategoryGrid from "@/components/category-grid"
import AboutSection from "@/components/about-section"
import SiteFooter from "@/components/site-footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Simular tiempo de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="container mx-auto px-4 py-8 mt-16">
        <PromoSlider />
        <h1 className="text-3xl font-bold my-8 text-center">Ropa Laboral Personalizada</h1>
        <CategoryGrid />
      </div>

      <AboutSection />
      <SiteFooter />
    </div>
  )
}

