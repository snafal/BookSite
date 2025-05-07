import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBookById, getRelatedBooks } from "@/lib/books"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { BookCard } from "@/components/book-card"

interface BookPageProps {
  params: {
    id: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex justify-center">
          <img
            src={book.imageUrl || "/placeholder.svg?height=600&width=400"}
            alt={book.title}
            className="rounded-lg object-cover max-h-[600px]"
            width={400}
            height={600}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-lg text-muted-foreground">by {book.authors?.join(", ")}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">${book.price.toFixed(2)}</div>
            {book.originalPrice && book.originalPrice > book.price && (
              <div className="text-lg text-muted-foreground line-through">${book.originalPrice.toFixed(2)}</div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="font-medium">Description</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-medium">Details</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <span className="font-medium">Publisher:</span> {book.publisher}
              </li>
              <li>
                <span className="font-medium">Published Date:</span> {book.publishedDate}
              </li>
              <li>
                <span className="font-medium">ISBN:</span> {book.isbn}
              </li>
              <li>
                <span className="font-medium">Pages:</span> {book.pageCount}
              </li>
              <li>
                <span className="font-medium">Categories:</span> {book.categories?.join(", ")}
              </li>
            </ul>
          </div>

          <AddToCartButton book={book} />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <Suspense fallback={<div>Loading related books...</div>}>
          <RelatedBooks bookId={params.id} />
        </Suspense>
      </div>
    </main>
  )
}

async function RelatedBooks({ bookId }: { bookId: string }) {
  const relatedBooks = await getRelatedBooks(bookId)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {relatedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
