"use client"

import { getCategories } from "@/lib/data-loader"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export function ShopByCategoriesSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const shopCategories = getCategories()

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Shop by Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of handcrafted gift categories, each designed to bring joy and create lasting memories.
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
            {shopCategories.map((category, index) => (
              <div key={index} className="flex-none w-80">
                <Link href={category.href} className="group block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Hide scrollbar CSS */}
          <style jsx>{`
            #categories-container::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
