"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { getTestimonials } from "@/lib/data-loader"
import { useState, useEffect } from "react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = getTestimonials()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Customer Love Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories of love, connection and joy through our handcrafted gifts
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  "{testimonials[currentIndex].comment}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-600">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-purple-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
