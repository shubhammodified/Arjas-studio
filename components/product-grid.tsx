"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link";

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  sale?: boolean
  category: string
}

interface ProductGridProps {
  products: Product[]
  itemsPerPage?: number
}

export function ProductGrid({ products, itemsPerPage = 12 }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<number[]>([])
  const [loadingImageId, setLoadingImageId] = useState<number | null>(null)

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="space-y-12">
      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <div className="group cursor-pointer" key={product.id}>
            <div className="aspect-square overflow-hidden relative rounded-lg shadow-lg bg-white group-hover:shadow-2xl transition-shadow duration-300">
              {product.sale && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10 font-medium">
                  SALE
                </div>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors duration-300"
              >
                <Heart
                  className={`h-4 w-4 transition-colors duration-300 ${
                    favorites.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </button>

              {/* Main Product Image with Hover Zoom/Move Effect */}
              <Link href={`/products/${product.id}`}>
                <div className="w-full h-full relative">
                  {loadingImageId === product.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                      <div className="h-5 w-5 border-2 border-amber-500 border-t-transparent animate-spin rounded-full"></div>
                    </div>
                  )}
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name || "Product Image"}
                    width={500}
                    height={500}
                    loading="lazy"
                    onLoadStart={() => setLoadingImageId(product.id)}
                    onLoadingComplete={() => setLoadingImageId(null)}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
              </Link>
              {/* Category Badge on Hover */}
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium bg-amber-600 px-2 py-1 rounded">{product.category}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-sm">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="space-y-6">
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 hover:bg-amber-50 hover:border-amber-300 disabled:opacity-50"
            >
              Previous
            </Button>

            <div className="flex space-x-1">
              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-gray-500">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => goToPage(page as number)}
                      className={`w-10 h-10 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg"
                          : "hover:bg-amber-50 hover:border-amber-300"
                      }`}
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 hover:bg-amber-50 hover:border-amber-300 disabled:opacity-50"
            >
              Next
            </Button>
          </div>

          {/* Results Info */}
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-amber-600">{startIndex + 1}</span> to{" "}
              <span className="font-semibold text-amber-600">{Math.min(endIndex, products.length)}</span> of{" "}
              <span className="font-semibold text-amber-600">{products.length}</span> products
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
