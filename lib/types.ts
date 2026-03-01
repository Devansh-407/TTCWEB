export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string // Backward compatibility
  images?: string[] // New field - array of images
  category: string
  occasion: string
  rating: number
  reviewCount: number
  customizationLevel: "basic" | "standard" | "premium"
  inStock: boolean
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  customization?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  image?: string
}

export interface CustomOrderRequest {
  name: string
  email: string
  phone: string
  giftType: string
  customInstructions: string
  budget: string
  timeline: string
  referenceImages?: File[]
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
