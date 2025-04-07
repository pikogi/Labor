"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-context"
import CartDrawer from "@/components/cart-drawer"
import SiteFooter from "@/components/site-footer"
import ProductSkeleton from "@/components/product-skeleton"

// Mock product data para ropa de trabajo
const products = [
  {
    id: 1,
    name: "Remera Corporativa",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Negro", "Blanco", "Azul Marino", "Gris"],
    description:
      "Remera de algodón peinado ideal para uniformes corporativos. Perfecta para estampar o bordar el logo de tu empresa. Disponible en varios colores y tallas. Material duradero y de alta calidad que mantiene su forma después de múltiples lavados.",
  },
  {
    id: 2,
    name: "Chomba Institucional",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Negro", "Azul Marino", "Rojo", "Verde"],
    description:
      "Chomba piqué de alta calidad para uso institucional o corporativo. Ideal para personal de atención al cliente, eventos o equipos de trabajo. Confeccionada con materiales premium que garantizan comodidad y durabilidad en el uso diario.",
  },
  {
    id: 3,
    name: "Buzo Personalizable",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Negro", "Gris Melange", "Azul Marino"],
    description:
      "Buzo de algodón frisado con capucha, ideal para personalizar con el logo de tu empresa o negocio. Perfecto para eventos corporativos, uniformes o merchandising. Su tejido de alta calidad asegura calidez y resistencia al desgaste.",
  },
  {
    id: 4,
    name: "Camisa de Trabajo",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Celeste", "Blanco", "Negro", "Gris Claro"],
    description:
      "Camisa de trabajo confeccionada en gabardina de alta resistencia, ideal para personal de mantenimiento, técnicos o supervisores. Incluye bolsillos frontales y espacio para bordado de logo corporativo. Diseñada para brindar comodidad durante largas jornadas laborales.",
  },
]

// Productos de categorías específicas
const categoryProducts = {
  "uniformes-corporativos": [
    {
      id: 101,
      name: "Camisa Corporativa Oxford",
      price: 39.99,
      image: "/images/foto5.jpg?height=300&width=300",
      colors: ["Blanco", "Celeste", "Azul Marino"],
      description:
        "Camisa de manga larga en tela Oxford, ideal para uniformes corporativos. Disponible para personalizar con bordado.",
    },
    {
      id: 102,
      name: "Pantalón de Vestir Corporativo",
      price: 49.99,
      image: "/images/foto5.jpg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Gris"],
      description:
        "Pantalón de vestir en gabardina de alta calidad, perfecto para uniformes de oficina o atención al público.",
    },
    // ... otros productos
  ],
  "remeras-personalizadas": [
    {
      id: 201,
      name: "Remera Básica Premium",
      price: 24.99,
      image: "/images/foto5.jpg?height=300&width=300",
      colors: ["Negro", "Blanco", "Gris", "Azul", "Rojo"],
      description: "Remera básica de algodón peinado, ideal para estampado o bordado. Excelente calidad y durabilidad.",
    },
    // ... otros productos
  ],
  "buzos-camperas": [
    {
      id: 301,
      name: "Buzo Canguro Corporativo",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Gris Melange", "Azul Marino"],
      description:
        "Buzo canguro con capucha, ideal para personalizar con el logo de tu empresa. Confeccionado en algodón frisado de alta calidad.",
    },
    // ... otros productos
  ],
  "accesorios-corporativos": [
    {
      id: 401,
      name: "Gorra Corporativa",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["Negro", "Azul Marino", "Rojo", "Blanco"],
      description: "Gorra de 6 paneles con cierre ajustable. Ideal para bordado con el logo de tu empresa o evento.",
    },
    // ... otros productos
  ],
}

// Combinar todos los productos en un solo array para búsqueda
const allProducts = [
  ...products,
  ...categoryProducts["uniformes-corporativos"],
  ...categoryProducts["remeras-personalizadas"],
  ...categoryProducts["buzos-camperas"],
  ...categoryProducts["accesorios-corporativos"],
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = allProducts.find((p) => p.id === productId)

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const { addToCart, getTotalItems } = useCart()

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-8 mt-16">
          <ProductSkeleton />
        </div>
        <SiteFooter />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-gray-600 mb-6">El producto que estás buscando no existe o ha sido removido.</p>
            <Link href="/" className="inline-block">
              <Button>Volver a la página principal</Button>
            </Link>
          </div>
        </div>
        <SiteFooter />
      </>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      color: selectedColor,
    })
    setIsCartOpen(true)
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a categorías
          </Link>
        </div>

        <div className="flex justify-end mb-6">
          <Button variant="outline" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            Ver Carrito
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-2">
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Cantidad</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAddToCart}>
              Agregar al Carrito
            </Button>
          </div>
        </div>

        <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      </div>

      <SiteFooter />
    </>
  )
}

