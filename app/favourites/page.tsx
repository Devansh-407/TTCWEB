"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useFavourites } from '@/lib/favourites-store'
import { useCart } from '@/lib/cart-store'
import { Heart, ShoppingCart } from 'lucide-react'

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

export default function FavouritesPage() {
  const { items, removeItem, isFavourite, clearFavourites } = useFavourites()
  const { addItem } = useCart()

  // Debug: Log current favorites items
  console.log('Current favorites items:', items)

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: getCategoryName(item.category) || item.category
    })
  }

  const handleToggleFavourite = (item: any) => {
    if (isFavourite(item.id)) {
      removeItem(item.id)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">No favourites yet</h2>
            <p className="mt-2 text-gray-600">Start adding items to your favourites to see them here</p>
            <Link href="/gifts">
              <Button className="mt-6">
                Browse Gifts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Favourites</h1>
          <p className="mt-2 text-gray-600">Items you've saved for later</p>
          
          {/* Debug Section - Remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2">Debug Info</h3>
              <p className="text-xs text-yellow-700 mb-2">Favorites count: {items.length}</p>
              {items.length > 0 && (
                <div className="text-xs text-yellow-700 mb-2">
                  <p>First item image path: {items[0]?.image}</p>
                  <p>First item name: {items[0]?.name}</p>
                </div>
              )}
              <Button
                onClick={clearFavourites}
                size="sm"
                variant="outline"
                className="text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-100"
              >
                Clear All Favorites (Debug)
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative aspect-square">
                  <Image
                    src={
                      item.image && item.image !== 'undefined' && item.image !== '' 
                        ? item.image 
                        : "/placeholder.svg"
                    }
                    alt={item.name || 'Favorite item'}
                    fill
                    className="w-full h-full object-cover rounded-lg mb-4"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={75}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      console.log('Image failed to load, using placeholder:', item.image)
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                    onLoadingComplete={() => {
                      console.log('Image loaded successfully:', item.image)
                    }}
                    unoptimized={
                      !item.image || 
                      item.image === 'undefined' || 
                      item.image === '' ||
                      item.image.includes('imghippo.com')
                    }
                  />
                  <button
                    onClick={() => handleToggleFavourite(item)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 ease-out group"
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-current transition-all duration-200 group-hover:scale-110" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  {item.category && (
                    <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                      {getCategoryName(item.category) || item.category}
                    </span>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.price}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      size="sm"
                      className="flex-1"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
