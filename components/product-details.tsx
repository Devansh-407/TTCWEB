"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, MessageCircle } from "lucide-react"
import type { Product } from "@/lib/types"
import { useState } from "react"

// Format price in INR
function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)

  const images = product.images || (product.image ? [product.image] : ["/placeholder.svg"])

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    // Create WhatsApp message with product details
    const message = `Hello! I'm interested in this product:\n\n🎁 *${product.name}*\n💰 Price: ${formatPrice(product.price)}\n📝 ${product.description}\n🔢 Quantity: ${quantity}\n${customization ? `✏️ Customization: ${customization}` : ''}\n\nCan you provide more details about customization options?`
    
    // Open WhatsApp with product details
    const whatsappUrl = `https://wa.me/6396202262?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-purple-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge className="bg-purple-500 text-white">{product.customizationLevel} customization</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-green-500 text-white">Save {formatPrice(product.originalPrice - product.price)}</Badge>
                )}
              </div>
            </div>

            {/* Customization */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personalization</h3>
                <Textarea
                  placeholder="Add your personalization details, special messages, names, dates, or any custom requirements..."
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-sm text-gray-600">
                  Our artisans will carefully incorporate your personalization into this handcrafted piece.
                </p>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
                  size="lg"
                >
                  Proceed
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Handcrafted with premium materials</li>
                  <li>• Personalized to your specifications</li>
                  <li>• Made by skilled artisans</li>
                  <li>• Carefully packaged for gifting</li>
                  <li>• 30-day satisfaction guarantee</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
