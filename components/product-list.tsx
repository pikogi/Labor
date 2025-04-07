"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CartDrawer from "@/components/cart-drawer"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-context"

// Mock product data
const products = [
  {
    id: 1,
    name: "Camiseta Básica",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Negro", "Blanco", "Gris", "Azul"],
    description: "Camiseta de algodón 100% de alta calidad, perfecta para el uso diario.",
  },
  {
    id: 2,
    name: "Pantalón Casual",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Negro", "Azul", "Caqui"],
    description: "Pantalón casual cómodo y duradero, ideal para cualquier ocasión.",
  },
  {
    id: 3,
    name: "Zapatillas Deportivas",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Negro", "Blanco", "Rojo"],
    description: "Zapatillas deportivas con gran amortiguación y soporte para tus actividades diarias.",
  },
  {
    id: 4,
    name: "Chaqueta Ligera",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    colors: ["Negro", "Azul Marino", "Verde"],
    description: "Chaqueta ligera resistente al agua, perfecta para días frescos y lluviosos.",
  },
]

export default function ProductList() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button variant="outline" className="relative" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          Ver Carrito
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="block">
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.description.substring(0, 60)}...</p>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Ver Detalles</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </div>
  )
}

