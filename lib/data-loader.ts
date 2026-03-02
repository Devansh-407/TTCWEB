// Data loader for external JSON files
// This allows your sister to update content without touching code!

import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import occasionsData from '../data/occasions.json'
import topSellingData from '../data/top-selling.json'
import aboutData from '../data/about.json'
import contactData from '../data/contact.json'
import siteConfigData from '../data/site-config.json'
import testimonialsData from '../data/testimonials.json'
import aboutValuesData from '../data/about-values.json'
import contactInfoData from '../data/contact-info.json'
import navigationData from '../data/navigation.json'

// Type definitions for JSON data
interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string // Backward compatibility
  images?: string[] // New field - array of images
  gif?: string
  video?: string
  category: string
  occasion: string
  rating: number
  reviewCount: number
  customizationLevel: "basic" | "standard" | "premium"
  inStock: boolean
  specifications?: {
    material?: string
    size?: string
    weight?: string
    color?: string
    [key: string]: any
  }
  shipping?: {
    delivery?: string
    packaging?: string
    shippingCost?: string
    [key: string]: any
  }
  careInstructions?: string
  features?: string[]
}

interface Category {
  name: string
  description: string
  image: string
  href: string
}

interface Occasion {
  name: string
  description: string
  image: string
  href: string
}

interface Testimonial {
  name: string
  location: string
  rating: number
  comment: string
  image?: string
}

// Export functions to get data from JSON files
export function getProducts(): Product[] {
  return productsData.products as Product[]
}

export function getCategories(): Category[] {
  return categoriesData.categories
}

export function getOccasions(): Occasion[] {
  return occasionsData.occasions
}

export function getTopSellingProductIds(): string[] {
  return topSellingData.topSelling.productIds
}

export function getTopSellingProducts(): Product[] {
  const topIds = getTopSellingProductIds()
  const allProducts = getProducts()
  return allProducts.filter(product => topIds.includes(product.id))
}

export function getAboutData() {
  return aboutData.about
}

export function getContactData() {
  return contactData.contact
}

export function getSiteConfig() {
  return siteConfigData.siteConfig
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData.testimonials
}

// New functions for dynamic data
export function getAboutValues() {
  return aboutValuesData
}

export function getContactInfo() {
  return contactInfoData.contactItems
}

export function getNavigationItems() {
  return navigationData.navItems
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  const products = getProducts()
  return products.find(product => product.id === id)
}

// Helper function to filter products
export function filterProducts(filters: {
  category?: string
  occasion?: string
}): Product[] {
  const products = getProducts()
  
  return products.filter(product => {
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false
    }
    if (filters.occasion && filters.occasion !== 'all' && product.occasion !== filters.occasion) {
      return false
    }
    return true
  })
}
