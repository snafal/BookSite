import { BookCard } from "@/components/book-card"
import { searchBooks } from "@/lib/books"

interface BookListProps {
  category?: string
  minPrice?: number
  maxPrice?: number
  page: number
  limit: number
}

export async function BookList({ category, minPrice, maxPrice, page, limit }: BookListProps) {
  // Build search query based on filters
  let query = ""

  if (category) {
    query += `subject:${category} `
  }

  // Fetch books
  const books = await searchBooks(query || "popular books", page, limit)

  // Apply client-side price filtering
  const filteredBooks = books.filter((book) => {
    if (minPrice !== undefined && book.price < minPrice) {
      return false
    }
    if (maxPrice !== undefined && book.price > maxPrice) {
      return false
    }
    return true
  })

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">No books found</h2>
        <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
