"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import type { Book } from "@/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  book: Book
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addToCart(book)
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      })
      setIsAdding(false)
    }, 500)
  }

  return (
    <Button className="w-full" onClick={handleAddToCart} disabled={isAdding}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? "Adding to Cart..." : "Add to Cart"}
    </Button>
  )
}
