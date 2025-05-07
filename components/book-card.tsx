"use client"

import { useState } from "react"
import Link from "next/link"
import type { Book } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart()
  const [imgError, setImgError] = useState(false)

  const handleImageError = () => {
    setImgError(true)
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/4] relative">
        <img
          src={
            imgError
              ? "https://via.placeholder.com/300x400?text=Book+Cover"
              : book.imageUrl || "https://via.placeholder.com/300x400?text=Book+Cover"
          }
          alt={book.title}
          className="object-cover w-full h-full"
          width={300}
          height={400}
          onError={handleImageError}
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium leading-none line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.authors?.join(", ")}</p>
          <p className="font-medium">${book.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/books/${book.id}`}>Details</Link>
        </Button>
        <Button size="sm" className="w-full" onClick={() => addToCart(book)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
