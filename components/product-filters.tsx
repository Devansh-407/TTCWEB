"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCategories, getOccasions } from "@/lib/data-loader"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [occasion, setOccasion] = useState("all")
  const [category, setCategory] = useState("all")
  const [categories, setCategories] = useState<any[]>([])
  const [occasions, setOccasions] = useState<any[]>([])

  // Load categories and occasions from data
  useEffect(() => {
    setCategories(getCategories())
    setOccasions(getOccasions())
  }, [])

  // Initialize filters from URL params
  useEffect(() => {
    const urlOccasion = searchParams?.get('occasion') || 'all'
    const urlCategory = searchParams?.get('category') || 'all'
    setOccasion(urlOccasion)
    setCategory(urlCategory)
  }, [searchParams])

  const updateFilters = (newOccasion: string, newCategory: string) => {
    const params = new URLSearchParams()
    
    if (newOccasion !== 'all') {
      params.set('occasion', newOccasion)
    }
    
    if (newCategory !== 'all') {
      params.set('category', newCategory)
    }
    
    const queryString = params.toString()
    const url = queryString ? `/gifts?${queryString}` : '/gifts'
    
    router.push(url)
  }

  const handleOccasionChange = (value: string) => {
    setOccasion(value)
    updateFilters(value, category)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    updateFilters(occasion, value)
  }

  const clearFilters = () => {
    setOccasion("all")
    setCategory("all")
    router.push('/gifts')
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <label htmlFor="occasion" className="text-gray-700 font-medium">Occasion:</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => handleOccasionChange(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white min-w-[180px]"
        >
          <option value="all">All Occasions</option>
          {occasions.map((occ) => (
            <option key={occ.name} value={occ.name.toLowerCase()}>
              {occ.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="category" className="text-gray-700 font-medium">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white min-w-[180px]"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.href.split('=')[1]}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Clear Filters
      </Button>
    </div>
  )
}
