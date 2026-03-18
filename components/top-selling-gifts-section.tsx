"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getTopSelling } from "@/lib/data-loader"

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

// Get top selling products (highest rated/most popular)
const topSellingProducts = getTopSelling()
  .filter(product => product.rating >= 4.7)
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 8)

export function TopSellingGiftsSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const hasScrollableContent = container.scrollWidth > container.clientWidth
      setCanScrollRight(hasScrollableContent && scrollPosition < container.scrollWidth - container.clientWidth - 1)
    }
  }, [scrollPosition])

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current
    if (container) {
      const scrollAmount = 320 // Width of one card + gap
      const newPosition = direction === "left" 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)
      
      container.scrollTo({
        left: newPosition,
        behavior: "smooth"
      })
      setScrollPosition(newPosition)
    }
  }

  const canScrollLeft = scrollPosition > 0

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Top Selling Gifts</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved and highly-rated gifts that have brought joy to countless celebrations.
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {topSellingProducts.map((product, index) => (
              <div key={index} className="flex-none w-80">
                <Link href={`/gifts/${product.id}`} className="group block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={product.images?.[0] || product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice && product.originalPrice > getProductPrice(product) && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                          {Math.round(((product.originalPrice - getProductPrice(product)) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="text-gray-600 text-sm leading-relaxed mb-4">
                        {(() => {
                          const isExpanded = expandedDescriptions.has(product.id)
                          const description = product.description || ''
                          
                          if (isExpanded) {
                            return (
                              <>
                                <p>{description}</p>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    toggleDescription(product.id)
                                  }}
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
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      toggleDescription(product.id)
                                    }}
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
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">{formatPrice(getProductPrice(product))}</span>
                          {product.originalPrice && product.originalPrice > getProductPrice(product) && (
                            <span className="ml-2 text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        <span className="text-sm text-green-600 font-medium">In Stock</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Hide scrollbar CSS */}
          <style jsx>{`
            #top-selling-container::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/gifts"
            className="inline-flex items-center justify-center rounded-md bg-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-colors"
          >
            View All Gifts
          </Link>
        </div>
      </div>
    </section>
  )
}
