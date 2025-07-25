"use client"

import { Button } from "@/components/ui/button"

interface FilterProps {
  selected: string
  onFilter: (category: string) => void
}

const categories = [
  "All",
  "Ring",
  "Necklace",
  "Earrings",
  "Bracelet",
  "Studs",
  "Earcuff",
]

export const ProductFilter = ({ selected, onFilter }: FilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((cat) => (
        <Button
          key={cat}
          onClick={() => onFilter(cat)}
          className={`px-4 py-2 rounded-full text-sm lg:text-base border border-amber-500 transition-all duration-300 ${
            selected === cat
              ? "bg-amber-600 text-white"
              : "bg-[#f8e6c0] text-gray-800 hover:bg-amber-500 hover:text-white"
          }`}
        >
          {cat}
        </Button>
      ))}
    </div>
  )
}
