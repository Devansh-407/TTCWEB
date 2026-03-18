import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { getTopSelling } from "@/lib/data-loader"
import Link from "next/link"
import { useState } from "react"

// Truncate text to specific length
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

// Format price in INR
function formatPrice(price: number | undefined) {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0'
  }
  return `₹${price.toLocaleString('en-IN')}`
}

// Get correct price from product (handles size variants)
function getProductPrice(product: any) {
  if (product.sizes && product.sizes.length > 0) {
    return product.sizes[0].price
  }
  return product.price || 0
}

export function FeaturedProducts() {
  const featuredProducts = getTopSelling().slice(0, 6)
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({})
  const [showFullDescription, setShowFullDescription] = useState<{[key: string]: boolean}>({})

  const handleSizeChange = (productId: string, sizeId: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: sizeId }))
  }

  const getProductPriceWithSize = (product: any) => {
    const selectedSizeId = selectedSizes[product.id]
    if (selectedSizeId && product.sizes) {
      const selectedSize = product.sizes.find((size: any) => size.id === selectedSizeId)
      return selectedSize?.price || product.sizes[0]?.price || product.price || 0
    }
    return product.sizes?.[0]?.price || product.price || 0
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Discover Our Gift Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handcrafted with love, personalized with care. Find the perfect gift to celebrate life's most precious moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.images?.[0] || product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-3 left-3 bg-purple-500 text-white">
                    Save ₹{product.originalPrice - getProductPrice(product)}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {truncateText(product.description, 120)}
                    {product.description.length > 120 && (
                      <button 
                        onClick={() => setShowFullDescription(prev => ({ ...prev, [product.id]: !prev[product.id] }))}
                        className="text-purple-600 hover:text-purple-700 text-sm mt-2 underline"
                      >
                        {showFullDescription[product.id] ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </p>
                </div>

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Size:</label>
                    <select
                      value={selectedSizes[product.id] || product.sizes[0]?.id || ''}
                      onChange={(e) => handleSizeChange(product.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none text-sm"
                    >
                      {product.sizes.map((size: any) => (
                        <option key={size.id} value={size.id}>
                          {size.size} - {formatPrice(size.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{formatPrice(getProductPriceWithSize(product))}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.customizationLevel} customization
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/gifts/${product.id}`}>View Details</Link>
                  </Button>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-50"
          >
            <Link href="/gifts">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
