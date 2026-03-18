"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getProducts } from "@/lib/data-loader"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

// Truncate text to specified number of lines
function truncateText(text: string, maxLines: number = 3): { text: string; isTruncated: boolean } {
  if (!text) return { text: '', isTruncated: false }
  
  // Approximate characters per line (adjust based on your design)
  const charsPerLine = 80
  const maxChars = maxLines * charsPerLine
  
  if (text.length <= maxChars) {
    return { text, isTruncated: false }
  }
  
  const truncated = text.substring(0, maxChars).trim()
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  return {
    text: lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) : truncated,
    isTruncated: true
  }
}

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

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const products = getProducts()
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId && product.category === category)
    .slice(0, 3)

  // State for tracking expanded descriptions
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())

  const toggleDescription = (productId: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">You Might Also Like</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Discover more handcrafted treasures in this collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images?.[0] || product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={60}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/bAARCAAIBBQAAAAAAAAAAAAAAAAECAwQREhMVFBYf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwA/wA=="
                />
                {product.originalPrice && (
                  <Badge className="absolute top-3 left-3 bg-purple-500 text-white">
                    Save {formatPrice(product.originalPrice - getProductPrice(product))}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {(() => {
                      const isExpanded = expandedDescriptions.has(product.id)
                      const description = product.description || ''
                      
                      if (isExpanded) {
                        return (
                          <>
                            <p>{description}</p>
                            <button
                              onClick={() => toggleDescription(product.id)}
                              className="text-purple-600 hover:text-purple-800 text-xs font-medium mt-1 transition-colors"
                            >
                              Read Less
                            </button>
                          </>
                        )
                      } else {
                        const { text: truncatedText, isTruncated } = truncateText(description, 3)
                        return (
                          <>
                            <p>{truncatedText}</p>
                            {isTruncated && (
                              <button
                                onClick={() => toggleDescription(product.id)}
                                className="text-purple-600 hover:text-purple-800 text-xs font-medium mt-1 transition-colors"
                              >
                                Read More
                              </button>
                            )}
                          </>
                        )
                      }
                    })()}
                  </div>
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
                  <span className="text-sm text-gray-600">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{formatPrice(getProductPrice(product))}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.customizationLevel} customization
                    </Badge>
                  </div>
                </div>

                <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  <Link href={`/gifts/${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
