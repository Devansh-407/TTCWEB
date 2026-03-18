"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, MessageCircle } from "lucide-react"
import type { Product } from "@/lib/types"
import { useState } from "react"
import Image from "next/image"

// Format price in INR
function formatPrice(price: number | undefined) {
  if (!price || typeof price !== 'number') return '₹0'
  return `₹${price.toLocaleString('en-IN')}`
}

// Get the default price from product (either direct price or first size)
function getProductPrice(product: any): number {
  // If product has sizes array, return the first size price
  if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
    return product.sizes[0].price || 0
  }
  // Otherwise return direct price
  return product.price || 0
}

// Safe helper functions to handle missing data
function safeGet(product: any, path: string, defaultValue: any = '') {
  const keys = path.split('.')
  let current = product
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return defaultValue
    }
  }
  
  return current || defaultValue
}

function safeArrayGet(product: any, path: string, defaultValue: any[] = []) {
  const result = safeGet(product, path, defaultValue)
  return Array.isArray(result) ? result : defaultValue
}

interface ProductDetailsProps {
  product: any // Using any to support new product structure with sizes, features, etc.
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Safe initialization with fallbacks
  const sizes = safeArrayGet(product, 'sizes', [])
  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0].id : "")

  // Safe image handling
  const images = safeArrayGet(product, 'images', 
    safeGet(product, 'image') ? [safeGet(product, 'image')] : ["/placeholder.svg"]
  )
  
  // Debug: Log images to see what we're getting
  console.log('Product images:', images)
  console.log('Product data:', product)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    // Safe data extraction with fallbacks
    const size = selectedSize || (sizes.length > 0 ? sizes[0]?.id : "")
    const sizeName = selectedSize ? sizes.find((s: any) => s.id === selectedSize)?.size || "" : ""
    const sizePrice = selectedSize 
      ? sizes.find((s: any) => s.id === selectedSize)?.price || getProductPrice(product)
      : getProductPrice(product)
    
    // Safe product data
    const productName = safeGet(product, 'name', 'Unknown Product')
    const productDescription = safeGet(product, 'description', 'No description available')
    
    // Create WhatsApp message with product details
    const message = `Hello! I'm interested in this product:\n\n🎁 *${productName}*\n💰 Price: ${formatPrice(sizePrice)}\n📝 ${productDescription}\n🔢 Quantity: ${quantity}\n${sizeName ? `📏 Size: ${sizeName}\n` : ''}${customization ? `✏️ Customization: ${customization}` : ''}\n\nCan you provide more details about customization options?`
    
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
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={safeGet(product, 'name', 'Product')}
                width={600}
                height={600}
                className="w-full h-full object-contain"
                priority={selectedImage === 0}
                quality={60}
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
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${safeGet(product, 'name', 'Product')} view ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain"
                    quality={50}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {safeGet(product, 'category') && <Badge variant="secondary">{safeGet(product, 'category')}</Badge>}
                {safeGet(product, 'customizationLevel') && <Badge className="bg-purple-500 text-white">{safeGet(product, 'customizationLevel')} customization</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{safeGet(product, 'name', 'Unknown Product')}</h1>

              {safeGet(product, 'rating') && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(safeGet(product, 'rating', 0)) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {safeGet(product, 'reviewCount') && <span className="text-gray-600">({safeGet(product, 'reviewCount')} reviews)</span>}
                </div>
              )}

              <p className="text-gray-700 leading-relaxed">{safeGet(product, 'description', 'No description available')}</p>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedSize ? formatPrice(sizes.find((s: any) => s.id === selectedSize)?.price || 0) : formatPrice(getProductPrice(product))}
                </span>
                {selectedSize && sizes.find((s: any) => s.id === selectedSize)?.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(sizes.find((s: any) => s.id === selectedSize)?.originalPrice)}
                  </span>
                )}
                {!selectedSize && safeGet(product, 'originalPrice') && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(safeGet(product, 'originalPrice'))}</span>
                )}
                {selectedSize && sizes.find((s: any) => s.id === selectedSize)?.originalPrice && (
                  <Badge className="bg-green-500 text-white">
                    Save {formatPrice((sizes.find((s: any) => s.id === selectedSize)?.originalPrice || 0) - (sizes.find((s: any) => s.id === selectedSize)?.price || 0))}
                  </Badge>
                )}
                {!selectedSize && safeGet(product, 'originalPrice') && (
                  <Badge className="bg-green-500 text-white">Save {formatPrice(safeGet(product, 'originalPrice') - getProductPrice(product))}</Badge>
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

            {/* Size Selector */}
            {sizes.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
                  <div className="space-y-3">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    >
                      {sizes.map((size: any) => (
                        <option key={size.id} value={size.id}>
                          {size.size} - {formatPrice(size.price)}
                          {!size.inStock && ' (Out of Stock)'}
                        </option>
                      ))}
                    </select>
                    
                    {/* Selected Size Details */}
                    {selectedSize && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        {(() => {
                          const selectedSizeData = sizes.find((s: any) => s.id === selectedSize)
                          if (!selectedSizeData) return null
                          
                          return (
                            <div className="space-y-2">
                              <div className="text-sm text-gray-600">
                                {selectedSizeData.description || 'Standard size option'}
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-lg font-bold text-purple-600">
                                    {formatPrice(selectedSizeData.price)}
                                  </span>
                                  {selectedSizeData.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through ml-2">
                                      {formatPrice(selectedSizeData.originalPrice)}
                                    </span>
                                  )}
                                </div>
                                {!selectedSizeData.inStock && (
                                  <span className="text-red-500 font-medium">Out of Stock</span>
                                )}
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <ul className="space-y-2 text-gray-700">
                  {safeArrayGet(product, 'features').map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                  {safeGet(product, 'specifications') && Object.keys(safeGet(product, 'specifications')).length > 0 && (
                    <>
                      <li className="font-semibold mt-3">Specifications:</li>
                      {Object.entries(safeGet(product, 'specifications')).map(([key, value]: [string, any], index: number) => (
                        <li key={index} className="ml-4">• {key}: {value || 'N/A'}</li>
                      ))}
                    </>
                  )}
                  {safeGet(product, 'shipping') && Object.keys(safeGet(product, 'shipping')).length > 0 && (
                    <>
                      <li className="font-semibold mt-3">Shipping:</li>
                      {Object.entries(safeGet(product, 'shipping')).map(([key, value]: [string, any], index: number) => (
                        <li key={index} className="ml-4">• {key}: {value || 'N/A'}</li>
                      ))}
                    </>
                  )}
                  {safeGet(product, 'careInstructions') && (
                    <>
                      <li className="font-semibold mt-3">Care Instructions:</li>
                      <li className="ml-4">• {safeGet(product, 'careInstructions')}</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
