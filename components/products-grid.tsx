"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { Star, Heart, MessageCircle } from "lucide-react"

import { getProducts } from "@/lib/data-loader"
import { Product } from "@/lib/data-loader"

import Link from "next/link"

import Image from "next/image"

import { useCart } from "@/lib/cart-store"

import { useFavourites } from "@/lib/favourites-store"

import { useSearchParams } from "next/navigation"



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



// Get category display name

function getCategoryName(category: string) {

  const categoryMap: { [key: string]: string } = {

    "gift-hamper": "Gift Hamper",

    "gift-box": "Gift Box", 

    "bouquet": "Bouquet",

    "miniature": "Miniature",

    "frame": "Frame"

  }

  return categoryMap[category] || "Gift Box"

}



interface ProductsGridProps {

  occasion?: string

  category?: string

}



export function ProductsGrid({ occasion, category }: ProductsGridProps) {

  const searchParams = useSearchParams()

  const { addItem } = useCart()

  const { addItem: addToFavourites, isFavourite, removeItem } = useFavourites()

  const products = getProducts()

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



  // Get filter values from props or URL params

  const selectedOccasion = occasion || searchParams?.get('occasion') || 'all'

  const selectedCategory = category || searchParams?.get('category') || 'all'



  // Filter products based on occasion and category

  const filteredProducts = products.filter(product => {

    // Filter by occasion

    if (selectedOccasion !== 'all' && product.occasion !== selectedOccasion) {

      return false

    }

    

    // Filter by category

    if (selectedCategory !== 'all' && product.category !== selectedCategory) {

      return false

    }

    

    return true

  })



  const handleAddToCart = (product: typeof products[0]) => {

    // Create WhatsApp message with product details

    const message = `Hello! I'm interested in this product:\n\n🎁 *${product.name}*\n💰 Price: ${formatPrice(getProductPrice(product))}\n📝 ${product.description}\n\nCan you provide more details about customization options?`

    

    // Open WhatsApp with product details

    const whatsappUrl = `https://wa.me/6396202262?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')

  }



  const handleToggleFavourite = (e: React.MouseEvent, product: typeof products[0]) => {

    e.preventDefault()

    e.stopPropagation()

    

    // Add immediate visual feedback

    const button = e.currentTarget as HTMLButtonElement

    button.style.transform = 'scale(0.9)'

    setTimeout(() => {

      button.style.transform = ''

    }, 100)

    

    try {

      if (isFavourite(product.id)) {

        removeItem(product.id)

      } else {

        addToFavourites({

          id: product.id,

          name: product.name,

          price: getProductPrice(product),

          image: product.images?.[0] || product.image || "/placeholder.svg",

          category: getCategoryName(product.category)

        })

      }

    } catch (error) {

      console.error('Error toggling favourite:', error)

    }

  }



  // Show filtered products or all if no filters

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products



  return (

    <div>

      {/* Show filter status */}

      {(selectedOccasion !== 'all' || selectedCategory !== 'all') && (

        <div className="mb-6 p-4 bg-purple-50 rounded-lg">

          <p className="text-purple-800">

            Showing {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''} 

            {selectedOccasion !== 'all' && ` for ${selectedOccasion}`}

            {selectedCategory !== 'all' && ` in ${getCategoryName(selectedCategory)}`}

          </p>

        </div>

      )}



      {/* Products Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {displayProducts.map((product) => (

          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">

            <div className="relative aspect-square overflow-hidden">

              <Image

                src={product.images?.[0] || product.image || "/placeholder.svg"}

                alt={product.name}

                fill

                className="w-full h-full object-cover"

                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                quality={75}

                loading="lazy"

              />

              <button

                onClick={(e) => handleToggleFavourite(e, product)}

                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 ease-out group"

              >

                <Heart 

                  className={`h-4 w-4 transition-all duration-200 ${

                    isFavourite(product.id) 

                      ? 'text-red-500 fill-current scale-110' 

                      : 'text-gray-400 hover:text-red-400 group-hover:scale-110'

                  }`} 

                />

              </button>

            </div>



            <div className="p-6 space-y-4">

              <div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>

                <div className="text-gray-600 text-sm leading-relaxed mb-3">
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

                <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>

              </div>



              <div className="space-y-2">

                <p className="text-lg font-bold text-gray-900">{formatPrice(getProductPrice(product))}</p>

                <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">

                  {getCategoryName(product.category)}

                </span>

              </div>



              <div className="flex space-x-2 pt-2">

                <Button 

                  onClick={() => handleAddToCart(product)}

                  className="bg-green-600 hover:bg-green-700 text-white flex-1"

                >

                  Proceed

                </Button>

                <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">

                  <Link href={`/gifts/${product.id}`}>View</Link>

                </Button>

              </div>

            </div>

          </div>

        ))}

      </div>



      {/* No products found */}

      {displayProducts.length === 0 && (

        <div className="text-center py-12">

          <p className="text-gray-500 text-lg mb-4">No products found matching your filters.</p>

          <Button asChild variant="outline">

            <Link href="/gifts">Clear Filters</Link>

          </Button>

        </div>

      )}

    </div>

  )

}

