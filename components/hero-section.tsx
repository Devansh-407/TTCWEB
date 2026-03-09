import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Star, Gift } from "lucide-react"
import { getSiteConfig } from "@/lib/data-loader"

export function HeroSection() {
  const siteConfig = getSiteConfig()
  const hero = siteConfig.hero
  return (
    <section className="relative bg-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url("${hero.backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-linear-to-l from-black/60 via-black/30 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-center min-h-150 py-16">
          <div className="text-center space-y-8 max-w-4xl">
            <div className="space-y-4">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
                {hero.title}
              </h3>
              <h4 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-xl">{hero.subtitle}</h4>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto mt-6 drop-shadow-lg">
                {hero.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link href="/gifts">{hero.browseGiftsText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
