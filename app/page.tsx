import { HeroSection } from "@/components/hero-section"
import { TopSellingGiftsSection } from "@/components/top-selling-gifts-section"
import { CategoriesSection } from "@/components/categories-section"
import { ShopByCategoriesSection } from "@/components/shop-by-categories-section"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TopSellingGiftsSection />
      <CategoriesSection />
      <ShopByCategoriesSection />
      <TestimonialsSection />
    </div>
  )
}
