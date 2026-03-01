import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { getTopSellingProducts } from "@/lib/data-loader"
import Link from "next/link"

export function FeaturedProducts() {
  const featuredProducts = getTopSellingProducts().slice(0, 6)

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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-3 left-3 bg-purple-500 text-white">
                    Save ₹{product.originalPrice - product.price}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </div>

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
                      <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
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
