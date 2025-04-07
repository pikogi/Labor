"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import CategorySkeleton from "@/components/category-skeleton"

// Datos de las categorías para ropa de trabajo y personalizada
const categories = [
  {
    id: 1,
    name: "Uniformes Corporativos",
    image: "/images/foto6.jpg?height=400&width=400",
    link: "/categoria/uniformes-corporativos",
    description: "Uniformes profesionales para tu equipo",
  },
  {
    id: 2,
    name: "Remeras Personalizadas",
    image: "/images/foto6.jpg?height=400&width=400",
    link: "/categoria/remeras-personalizadas",
    description: "Estampa tu logo o diseño en nuestras remeras",
  },
  {
    id: 3,
    name: "Buzos y Camperas",
    image:  "/images/foto6.jpg?height=400&width=400",
    link: "/categoria/buzos-camperas",
    description: "Prendas de abrigo con tu marca",
  },
  {
    id: 4,
    name: "Accesorios Corporativos",
    image: "/images/foto6.jpg?height=400&width=400",
    link: "/categoria/accesorios-corporativos",
    description: "Complementa tu look con nuestros accesorios",
  },
]

export default function CategoryGrid() {
  const [loading, setLoading] = useState(true)

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <CategorySkeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link href={category.link} key={category.id}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-blue-100">
            <div className="aspect-square relative">
              <Image
                src={category.image || "/images/foto6.jpg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-white/90 text-sm">{category.description}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

