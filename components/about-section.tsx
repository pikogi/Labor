"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui-skeleton"

export default function AboutSection() {
  const [loading, setLoading] = useState(true)

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Skeleton className="aspect-video md:aspect-square rounded-lg" />

            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />

              <div className="grid grid-cols-2 gap-4 my-6">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>

              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Quiénes Somos</h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
            <Image
              src="/images/foto4.jpg?height=500&width=500"
              alt="Nuestro taller de producción"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Expertos en Ropa Laboral Personalizada</h3>
            <p className="text-gray-700 mb-4">
              Desde 2010, nos especializamos en la confección de ropa de trabajo y prendas personalizadas para empresas,
              negocios y emprendimientos de todos los tamaños. Nuestro compromiso es ofrecer productos de alta calidad
              que representen profesionalmente la imagen de tu marca.
            </p>
            <p className="text-gray-700 mb-6">
              Contamos con tecnología de vanguardia para estampados, bordados y sublimación, lo que nos permite ofrecer
              acabados duraderos y de excelente calidad. Trabajamos con los mejores materiales para garantizar prendas
              cómodas y resistentes al uso diario.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="font-semibold mb-2">Personalización</h4>
                <p className="text-sm text-gray-600">
                  Adaptamos cada prenda a las necesidades específicas de tu empresa, desde el diseño hasta los detalles
                  de acabado.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="font-semibold mb-2">Calidad Garantizada</h4>
                <p className="text-sm text-gray-600">
                  Utilizamos materiales premium y técnicas avanzadas para asegurar la durabilidad de nuestros productos.
                </p>
              </div>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">Solicitar Presupuesto</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

