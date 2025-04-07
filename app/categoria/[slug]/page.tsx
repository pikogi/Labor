"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter, ArrowUpDown, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui-skeleton"
import { useCart } from "@/components/cart-context"
import CartDrawer from "@/components/cart-drawer"
import SiteFooter from "@/components/site-footer"

// Datos de categorías
const categoriesData = {
  "uniformes-corporativos": {
    name: "Uniformes Corporativos",
    description: "Uniformes profesionales para tu equipo",
    filters: {
      tipo: ["Camisas", "Pantalones", "Chombas", "Conjuntos", "Guardapolvos"],
      color: ["Negro", "Azul Marino", "Blanco", "Gris", "Beige"],
      material: ["Algodón", "Poliéster", "Gabardina", "Piqué", "Oxford"],
    },
  },
  "remeras-personalizadas": {
    name: "Remeras Personalizadas",
    description: "Estampa tu logo o diseño en nuestras remeras",
    filters: {
      tipo: ["Cuello Redondo", "Cuello V", "Manga Larga", "Manga Corta", "Slim Fit"],
      color: ["Negro", "Blanco", "Gris", "Azul", "Rojo", "Verde"],
      material: ["Algodón", "Poliéster", "Jersey", "Piqué", "Dry Fit"],
    },
  },
  "buzos-camperas": {
    name: "Buzos y Camperas",
    description: "Prendas de abrigo con tu marca",
    filters: {
      tipo: ["Buzos", "Camperas", "Chalecos", "Polar", "Softshell"],
      color: ["Negro", "Gris", "Azul Marino", "Rojo", "Verde"],
      material: ["Algodón Frisado", "Polar", "Poliéster", "Impermeable", "Rompeviento"],
    },
  },
  "accesorios-corporativos": {
    name: "Accesorios Corporativos",
    description: "Complementa tu look con nuestros accesorios",
    filters: {
      tipo: ["Gorras", "Bolsos", "Mochilas", "Bandanas", "Lanyards"],
      color: ["Negro", "Azul", "Rojo", "Blanco", "Multicolor"],
      material: ["Algodón", "Poliéster", "Lona", "Nylon", "Microfibra"],
    },
  },
}

// Productos de ejemplo para cada categoría
const productsData = {
  "uniformes-corporativos": [
    {
      id: 101,
      name: "Camisa Corporativa Oxford",
      price: 39.99,
      image: "/images/foto5.jpg?height=300&width=300",
      colors: ["Blanco", "Celeste", "Azul Marino"],
      material: "Oxford",
      tipo: "Camisas",
      description:
        "Camisa de manga larga en tela Oxford, ideal para uniformes corporativos. Disponible para personalizar con bordado.",
    },
    {
      id: 102,
      name: "Pantalón de Vestir Corporativo",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Gris"],
      material: "Gabardina",
      tipo: "Pantalones",
      description:
        "Pantalón de vestir en gabardina de alta calidad, perfecto para uniformes de oficina o atención al público.",
    },
    {
      id: 103,
      name: "Chomba Institucional Premium",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Blanco", "Negro", "Azul Marino", "Rojo"],
      material: "Piqué",
      tipo: "Chombas",
      description:
        "Chomba en piqué de algodón peinado, ideal para personal de atención al cliente o eventos corporativos.",
    },
    {
      id: 104,
      name: "Conjunto Administrativo",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino"],
      material: "Poliéster",
      tipo: "Conjuntos",
      description:
        "Conjunto de saco y pantalón para personal administrativo. Confeccionado en materiales de alta calidad y durabilidad.",
    },
    {
      id: 105,
      name: "Guardapolvo Profesional",
      price: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Blanco", "Azul", "Verde"],
      material: "Algodón",
      tipo: "Guardapolvos",
      description:
        "Guardapolvo profesional para laboratorios, médicos o personal técnico. Incluye bolsillos frontales y espacio para bordado.",
    },
    {
      id: 106,
      name: "Camisa Manga Corta Corporativa",
      price: 36.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Blanco", "Celeste", "Beige"],
      material: "Oxford",
      tipo: "Camisas",
      description:
        "Camisa de manga corta en tela Oxford, perfecta para uniformes en temporada de calor. Diseño formal y cómodo.",
    },
  ],
  "remeras-personalizadas": [
    {
      id: 201,
      name: "Remera Básica Premium",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Blanco", "Gris", "Azul", "Rojo"],
      material: "Algodón",
      tipo: "Cuello Redondo",
      description: "Remera básica de algodón peinado, ideal para estampado o bordado. Excelente calidad y durabilidad.",
    },
    {
      id: 202,
      name: "Remera Cuello V",
      price: 26.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Blanco", "Gris", "Azul Marino"],
      material: "Jersey",
      tipo: "Cuello V",
      description:
        "Remera con cuello en V, confeccionada en jersey de alta calidad. Perfecta para estampados corporativos.",
    },
    {
      id: 203,
      name: "Remera Manga Larga",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Blanco", "Gris Melange"],
      material: "Algodón",
      tipo: "Manga Larga",
      description:
        "Remera de manga larga en algodón suave. Ideal para estampados o bordados corporativos en temporadas frescas.",
    },
    {
      id: 204,
      name: "Remera Dry Fit",
      price: 32.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Blanco", "Azul", "Rojo"],
      material: "Dry Fit",
      tipo: "Manga Corta",
      description:
        "Remera deportiva en material Dry Fit, ideal para eventos deportivos corporativos o equipos de trabajo activos.",
    },
    {
      id: 205,
      name: "Remera Slim Fit",
      price: 27.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Blanco", "Azul Marino", "Gris"],
      material: "Algodón",
      tipo: "Slim Fit",
      description:
        "Remera con corte slim fit, perfecta para un look más moderno y ajustado. Excelente para estampados corporativos.",
    },
  ],
  "buzos-camperas": [
    {
      id: 301,
      name: "Buzo Canguro Corporativo",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Gris Melange", "Azul Marino"],
      material: "Algodón Frisado",
      tipo: "Buzos",
      description:
        "Buzo canguro con capucha, ideal para personalizar con el logo de tu empresa. Confeccionado en algodón frisado de alta calidad.",
    },
    {
      id: 302,
      name: "Campera Softshell Empresarial",
      price: 69.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Rojo"],
      material: "Softshell",
      tipo: "Camperas",
      description:
        "Campera softshell resistente al agua y al viento. Perfecta para personal que trabaja al aire libre o eventos corporativos.",
    },
    {
      id: 303,
      name: "Chaleco Corporativo",
      price: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Gris"],
      material: "Poliéster",
      tipo: "Chalecos",
      description:
        "Chaleco acolchado ligero, ideal para uniformes corporativos o eventos al aire libre. Incluye espacio para bordado.",
    },
    {
      id: 304,
      name: "Polar Institucional",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Gris", "Verde"],
      material: "Polar",
      tipo: "Polar",
      description:
        "Campera de polar, cálida y cómoda. Perfecta para personalizar con el logo de tu empresa o institución.",
    },
  ],
  "accesorios-corporativos": [
    {
      id: 401,
      name: "Gorra Corporativa",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Rojo", "Blanco"],
      material: "Algodón",
      tipo: "Gorras",
      description: "Gorra de 6 paneles con cierre ajustable. Ideal para bordado con el logo de tu empresa o evento.",
    },
    {
      id: 402,
      name: "Bolso Promocional",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul", "Rojo"],
      material: "Lona",
      tipo: "Bolsos",
      description:
        "Bolso de lona resistente, perfecto para merchandising o eventos corporativos. Amplio espacio para estampado.",
    },
    {
      id: 403,
      name: "Mochila Empresarial",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Gris"],
      material: "Nylon",
      tipo: "Mochilas",
      description:
        "Mochila con compartimento para laptop, ideal para equipos de trabajo o como regalo corporativo premium.",
    },
    {
      id: 404,
      name: "Bandana Multifuncional",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul", "Rojo", "Multicolor"],
      material: "Microfibra",
      tipo: "Bandanas",
      description:
        "Bandana multifuncional con posibilidad de personalización completa. Ideal para eventos deportivos o promocionales.",
    },
    {
      id: 405,
      name: "Lanyard Personalizado",
      price: 9.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul", "Rojo", "Verde", "Multicolor"],
      material: "Poliéster",
      tipo: "Lanyards",
      description:
        "Lanyard para credenciales o llaves, completamente personalizable con el logo y colores de tu empresa.",
    },
  ],
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categoriesData[slug as keyof typeof categoriesData]
  const products = productsData[slug as keyof typeof productsData] || []

  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedFilters, setSelectedFilters] = useState<{
    tipo: string[]
    color: string[]
    material: string[]
  }>({
    tipo: [],
    color: [],
    material: [],
  })
  const [sortOrder, setSortOrder] = useState("featured")
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { getTotalItems } = useCart()

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filtrar y ordenar productos
  useEffect(() => {
    let result = [...products]

    // Aplicar filtros
    if (selectedFilters.tipo.length > 0) {
      result = result.filter((product) => selectedFilters.tipo.includes(product.tipo))
    }

    if (selectedFilters.color.length > 0) {
      result = result.filter((product) => product.colors.some((color) => selectedFilters.color.includes(color)))
    }

    if (selectedFilters.material.length > 0) {
      result = result.filter((product) => selectedFilters.material.includes(product.material))
    }

    // Aplicar ordenamiento
    switch (sortOrder) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      // Por defecto, mantener el orden original (featured)
    }

    setFilteredProducts(result)
  }, [products, selectedFilters, sortOrder])

  const handleFilterChange = (type: "tipo" | "color" | "material", value: string) => {
    setSelectedFilters((prev) => {
      const current = [...prev[type]]

      if (current.includes(value)) {
        return {
          ...prev,
          [type]: current.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [type]: [...current, value],
        }
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      tipo: [],
      color: [],
      material: [],
    })
  }

  if (!category) {
    return (
      <>
        <div className="container mx-auto px-4 py-8 mt-16">
          <h1 className="text-2xl font-bold">Categoría no encontrada</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Volver al inicio
          </Link>
        </div>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-gray-600 mt-1">{category.description}</p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>Filtra los productos según tus preferencias</SheetDescription>
                </SheetHeader>

                <div className="py-4">
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Tipo</h3>
                    <div className="space-y-2">
                      {category.filters.tipo.map((tipo) => (
                        <div key={tipo} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tipo-${tipo}`}
                            checked={selectedFilters.tipo.includes(tipo)}
                            onCheckedChange={() => handleFilterChange("tipo", tipo)}
                          />
                          <Label htmlFor={`tipo-${tipo}`}>{tipo}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Color</h3>
                    <div className="space-y-2">
                      {category.filters.color.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={selectedFilters.color.includes(color)}
                            onCheckedChange={() => handleFilterChange("color", color)}
                          />
                          <Label htmlFor={`color-${color}`}>{color}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Material</h3>
                    <div className="space-y-2">
                      {category.filters.material.map((material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox
                            id={`material-${material}`}
                            checked={selectedFilters.material.includes(material)}
                            onCheckedChange={() => handleFilterChange("material", material)}
                          />
                          <Label htmlFor={`material-${material}`}>{material}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={clearFilters}>
                      Limpiar Filtros
                    </Button>
                    <SheetClose asChild>
                      <Button>Aplicar</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Ordenar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="featured">Destacados</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-low">Precio: Menor a Mayor</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-high">Precio: Mayor a Menor</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name">Nombre</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="rounded-lg overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-4">Prueba con otros filtros o categorías</p>
                <Button onClick={clearFilters}>Limpiar Filtros</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link href={`/product/${product.id}`} className="block" key={product.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-square relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                          <span className="text-sm text-gray-500">{product.material}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Ver Detalles</Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <SiteFooter />
    </>
  )
}

