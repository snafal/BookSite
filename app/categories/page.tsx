import type React from "react"
import Link from "next/link"
import { getAllCategories } from "@/lib/categories"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  BookType,
  Coffee,
  Compass,
  Heart,
  History,
  Lightbulb,
  Microscope,
  Palette,
  Rocket,
  Utensils,
} from "lucide-react"

// Map of category icons
const categoryIcons: Record<string, React.ReactNode> = {
  Fiction: <BookOpen className="h-8 w-8" />,
  "Non-Fiction": <BookType className="h-8 w-8" />,
  "Science Fiction": <Rocket className="h-8 w-8" />,
  Fantasy: <Compass className="h-8 w-8" />,
  Mystery: <Lightbulb className="h-8 w-8" />,
  Thriller: <Lightbulb className="h-8 w-8" />,
  Romance: <Heart className="h-8 w-8" />,
  Biography: <Coffee className="h-8 w-8" />,
  History: <History className="h-8 w-8" />,
  "Self-Help": <Coffee className="h-8 w-8" />,
  Business: <BookType className="h-8 w-8" />,
  "Children's": <BookOpen className="h-8 w-8" />,
  "Young Adult": <BookOpen className="h-8 w-8" />,
  Science: <Microscope className="h-8 w-8" />,
  Technology: <Rocket className="h-8 w-8" />,
  Art: <Palette className="h-8 w-8" />,
  Cooking: <Utensils className="h-8 w-8" />,
  Travel: <Compass className="h-8 w-8" />,
  Religion: <BookType className="h-8 w-8" />,
  Philosophy: <Lightbulb className="h-8 w-8" />,
}

// Background colors for categories
const categoryColors = [
  "bg-red-100 dark:bg-red-900/20",
  "bg-blue-100 dark:bg-blue-900/20",
  "bg-green-100 dark:bg-green-900/20",
  "bg-yellow-100 dark:bg-yellow-900/20",
  "bg-purple-100 dark:bg-purple-900/20",
  "bg-pink-100 dark:bg-pink-900/20",
  "bg-indigo-100 dark:bg-indigo-900/20",
  "bg-orange-100 dark:bg-orange-900/20",
]

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Book Categories</h1>
        <p className="mt-4 text-lg text-muted-foreground">Browse our extensive collection of books by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link key={category} href={`/books?category=${encodeURIComponent(category)}`}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`p-4 rounded-full ${categoryColors[index % categoryColors.length]} mb-4`}>
                  {categoryIcons[category] || <BookOpen className="h-8 w-8" />}
                </div>
                <h2 className="text-xl font-semibold">{category}</h2>
                <p className="text-sm text-muted-foreground mt-2">Explore our {category.toLowerCase()} collection</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
