"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Search } from "lucide-react"
import { getProducts } from "@/lib/data-loader"
import { useState } from "react"
import Link from "next/link"

const categories = ["All Products", "Jewelry Boxes", "Photo Albums", "Custom Projects", "Personalized items"]

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortBy, setSortBy] = useState("latest")
  const [searchQuery, setSearchQuery] = useState("")
  const [displayCount, setDisplayCount] = useState(6)
  const products = getProducts()

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "All Products") {
      const categoryMap: Record<string, string> = {
        "Jewelry Boxes": "jewelry",
        "Photo Albums": "photo",
        "Custom Projects": "custom",
        "Personalized items": "personalized",
      }
      if (product.category !== categoryMap[selectedCategory]) return false
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const displayedProducts = sortedProducts.slice(0, displayCount)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white"
          >
            <option value="latest">Sort by Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images?.[0] || product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-500 uppercase mb-2">{product.category}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  <Link href={`/gifts/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedProducts.length < sortedProducts.length && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setDisplayCount(displayCount + 6)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
