"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PriceFilterProps {
  minPrice?: number
  maxPrice?: number
}

export function PriceFilter({ minPrice, maxPrice }: PriceFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [min, setMin] = useState<string>(minPrice?.toString() || "")
  const [max, setMax] = useState<string>(maxPrice?.toString() || "")

  useEffect(() => {
    setMin(minPrice?.toString() || "")
    setMax(maxPrice?.toString() || "")
  }, [minPrice, maxPrice])

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (min) {
      params.set("minPrice", min)
    } else {
      params.delete("minPrice")
    }

    if (max) {
      params.set("maxPrice", max)
    } else {
      params.delete("maxPrice")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("minPrice")
    params.delete("maxPrice")

    setMin("")
    setMax("")

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-muted-foreground">Min ($)</label>
          <Input type="number" min="0" placeholder="0" value={min} onChange={(e) => setMin(e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Max ($)</label>
          <Input type="number" min="0" placeholder="100" value={max} onChange={(e) => setMax(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="w-full" onClick={handleApplyFilter}>
          Apply
        </Button>
        <Button variant="ghost" size="sm" className="w-full" onClick={handleClearFilter}>
          Clear
        </Button>
      </div>
    </div>
  )
}
