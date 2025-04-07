"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Categorías de ropa de trabajo
const categories = [
  {
    name: "Uniformes Corporativos",
    link: "/categoria/uniformes-corporativos",
    subcategories: [
      { name: "Camisas", link: "/categoria/uniformes-corporativos" },
      { name: "Pantalones", link: "/categoria/uniformes-corporativos" },
      { name: "Chombas", link: "/categoria/uniformes-corporativos" },
      { name: "Conjuntos", link: "/categoria/uniformes-corporativos" },
      { name: "Guardapolvos", link: "/categoria/uniformes-corporativos" },
    ],
  },
  {
    name: "Prendas Personalizadas",
    link: "/categoria/remeras-personalizadas",
    subcategories: [
      { name: "Remeras", link: "/categoria/remeras-personalizadas" },
      { name: "Buzos", link: "/categoria/buzos-camperas" },
      { name: "Camperas", link: "/categoria/buzos-camperas" },
      { name: "Gorras", link: "/categoria/accesorios-corporativos" },
      { name: "Chalecos", link: "/categoria/buzos-camperas" },
    ],
  },
  {
    name: "Ropa de Seguridad",
    link: "/categoria/uniformes-corporativos",
    subcategories: [
      { name: "Chalecos Reflectivos", link: "/categoria/uniformes-corporativos" },
      { name: "Cascos", link: "/categoria/accesorios-corporativos" },
      { name: "Calzado", link: "/categoria/uniformes-corporativos" },
      { name: "Guantes", link: "/categoria/accesorios-corporativos" },
      { name: "Antiparras", link: "/categoria/accesorios-corporativos" },
    ],
  },
  {
    name: "Servicios de Personalización",
    link: "#",
    subcategories: [
      { name: "Estampado", link: "#" },
      { name: "Bordado", link: "#" },
      { name: "Sublimación", link: "#" },
      { name: "Diseño Gráfico", link: "#" },
      { name: "Muestras", link: "#" },
    ],
  },
]

export default function FixedSidebar() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll para cambiar el estilo del menú
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Categorías</h2>
                {/* Eliminamos el botón de cierre redundante aquí */}
              </div>

              <div className="space-y-4">
                {categories.map((category) => (
                  <Collapsible key={category.name}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between font-medium">
                        {category.name}
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-2 pt-2">
                      {category.subcategories.map((subcategory) => (
                        <SheetClose key={subcategory.name} asChild>
                          <Link href={subcategory.link} className="block py-2 hover:text-blue-600 transition-colors">
                            {subcategory.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className= "w-full pl-8">
        <Link href="/" className="text-xl font-bold">
          WorkWear Pro
        </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hidden md:block hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <Link
            href="/categoria/uniformes-corporativos"
            className="hidden md:block hover:text-blue-600 transition-colors"
          >
            Catálogo
          </Link>
          <Link href="#" className="hidden md:block hover:text-blue-600 transition-colors">
            Servicios
          </Link>
          <Link href="#" className="hidden md:block hover:text-blue-600 transition-colors">
            Contacto
          </Link>
        </div>
      </div>
    </div>
  )
}

