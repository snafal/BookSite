import { Suspense } from "react"
import { BookList } from "@/components/book-list"
import { CategoryFilter } from "@/components/category-filter"
import { PriceFilter } from "@/components/price-filter"
import { Pagination } from "@/components/pagination"
import { getAllCategories } from "@/lib/categories"

interface BooksPageProps {
  searchParams: {
    category?: string
    minPrice?: string
    maxPrice?: string
    page?: string
    limit?: string
  }
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const category = searchParams.category
  const minPrice = searchParams.minPrice ? Number.parseFloat(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number.parseFloat(searchParams.maxPrice) : undefined
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? Number.parseInt(searchParams.limit) : 12

  const categories = await getAllCategories()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="space-y-6">
          <div>
            <h2 className="font-medium mb-3">Categories</h2>
            <CategoryFilter categories={categories} selectedCategory={category} />
          </div>
          <div>
            <h2 className="font-medium mb-3">Price Range</h2>
            <PriceFilter minPrice={minPrice} maxPrice={maxPrice} />
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Suspense fallback={<div>Loading books...</div>}>
            <BookList category={category} minPrice={minPrice} maxPrice={maxPrice} page={page} limit={limit} />
          </Suspense>

          <Pagination
            currentPage={page}
            totalPages={10} // This would be calculated based on total books
          />
        </div>
      </div>
    </main>
  )
}
