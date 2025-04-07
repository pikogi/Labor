"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Images } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui-skeleton"

// Datos de ejemplo para las promociones de ropa de trabajo
const promoSlides = [
  {
    id: 1,
    title: "Uniformes Corporativos",
    description: "Viste a tu equipo con nuestra línea de uniformes profesionales.",
    buttonText: "Ver Catálogo",
    Images: "/images/foto6.jpg?height=400&width=400",
    buttonLink: "#",
    bgColor: "bg-blue-100",
    textColor: "text-blue-900",
  },
  {
    id: 2,
    title: "Personalización Total",
    description: "Estampados, bordados y diseños personalizados para tu empresa.",
    buttonText: "Cotizar Ahora",
    buttonLink: "#",
    bgColor: "bg-slate-100",
    textColor: "text-slate-900",
  },
  {
    id: 3,
    title: "Packs Promocionales",
    description: "Descuentos especiales para pedidos al por mayor.",
    buttonText: "Ver Ofertas",
    buttonLink: "#",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
  },
]

export default function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Cambiar automáticamente de slide cada 5 segundos
  useEffect(() => {
    if (loading) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [loading])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1))
  }

  if (loading) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg mb-8">
        <Skeleton className="aspect-[3/1] w-full" />
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-8">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promoSlides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full flex-shrink-0 ${slide.bgColor} ${slide.textColor} p-8 md:p-12 flex flex-col md:flex-row items-center justify-between`}
          >
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="mb-4">{slide.description}</p>
              <Button variant="outline" className={`${slide.textColor} border-current`}>
                {slide.buttonText}
              </Button>
            </div>
            <div className="relative w-40 h-40 md:w-60 md:h-60">
              <Image src="/images/foto1.jpg?height=240&width=240" alt={slide.title} fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {promoSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-blue-600" : "bg-gray-300"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

