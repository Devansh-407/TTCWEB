import { Heart, HandHeart, Clock, Leaf, Users, Ribbon } from "lucide-react"
import { getTestimonials } from "@/lib/data-loader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Why Choose Section
const whyChoose = [
  {
    icon: Heart,
    title: "Premium Quality",
    description: "We use only the finest materials and artisanal craftsmanship techniques to ensure every gift is built to last generations.",
    link: "100% Customer Satisfaction",
  },
  {
    icon: HandHeart,
    title: "Personal Touch",
    description: "Every piece is uniquely crafted to tell your personal story, making each gift as individual as the person receiving it.",
    link: "100% Personalization",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We understand the importance of special moments and guarantee your handcrafted gift will arrive exactly when you need it.",
    link: "On-Time Guarantee",
  },
]

// Values Section
const values = [
  {
    icon: Heart,
    title: "Love in Every Detail",
    description: "We pour genuine care and attention into every aspect of our craft, ensuring each gift carries the love it's meant to express.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "We are committed to environmental responsibility, using eco-friendly materials and sustainable crafting methods in all our creations.",
  },
  {
    icon: Users,
    title: "Community Connection",
    description: "We believe in supporting local artisans and giving back to our community through workshops and charitable partnerships.",
  },
  {
    icon: Ribbon,
    title: "Lasting Memories",
    description: "Our mission is to create heirloom-quality gifts that will be treasured for generations, preserving precious memories forever.",
  },
]

export function AboutValues() {
  return (
    <>
      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose The Tohfa Creations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our handcrafted gifts truly special and meaningful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <a href="#" className="text-purple-500 hover:text-purple-600 font-medium text-sm">
                  {item.link} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from families who've experienced the joy of our handcrafted gifts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getTestimonials().map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image || "/placeholder.svg"} 
                      alt={testimonial.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-purple-500 text-sm">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values & Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values & Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we create and every relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <value.icon className="h-8 w-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Create Something Special?</h2>
              <p className="text-lg text-white/90 max-w-2xl">
                Let's work together to craft a meaningful gift that will create lasting memories for your loved ones.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-purple-500 hover:bg-gray-100 px-8 py-3 rounded-md">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-purple-500 hover:bg-gray-100 px-8 py-3 rounded-md">
                <Link href="/gifts">Browse Gifts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
