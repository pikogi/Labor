import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CartItem } from "@/components/cart-context"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type CustomerInfo = {
  name: string
  phone?: string
  address?: string
}

export function formatWhatsAppMessage(items: CartItem[], totalPrice: number, customerInfo: CustomerInfo): string {
  // Format the header with customer information
  let message = `🛒 *NUEVO PEDIDO*\n\n`
  message += `*Cliente:* ${customerInfo.name}\n`

  if (customerInfo.phone) {
    message += `*Teléfono:* ${customerInfo.phone}\n`
  }

  if (customerInfo.address) {
    message += `*Dirección:* ${customerInfo.address}\n`
  }

  message += `\n*PRODUCTOS:*\n`

  // Add each item in the cart
  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* (${item.color})\n`
    message += `   Cantidad: ${item.quantity}\n`
    message += `   Precio unitario: $${item.price.toFixed(2)}\n`
    message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`
  })

  // Add the total price
  message += `*TOTAL: $${totalPrice.toFixed(2)}*\n\n`

  // Add a thank you message
  message += `Gracias por tu pedido. Nos pondremos en contacto contigo pronto para confirmar los detalles.`

  return message
}

