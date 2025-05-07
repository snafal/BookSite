"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
}

export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category === selectedCategory) {
      // If clicking the already selected category, remove the filter
      params.delete("category")
    } else {
      params.set("category", category)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm cursor-pointer",
          !selectedCategory ? "bg-primary/10 text-primary" : "hover:bg-muted",
        )}
        onClick={() => handleCategoryChange("")}
      >
        <span>All Categories</span>
        {!selectedCategory && <CheckIcon className="h-4 w-4" />}
      </div>

      {categories.map((category) => (
        <div
          key={category}
          className={cn(
            "flex items-center justify-between rounded-md px-3 py-2 text-sm cursor-pointer",
            selectedCategory === category ? "bg-primary/10 text-primary" : "hover:bg-muted",
          )}
          onClick={() => handleCategoryChange(category)}
        >
          <span>{category}</span>
          {selectedCategory === category && <CheckIcon className="h-4 w-4" />}
        </div>
      ))}
    </div>
  )
}
