"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, Heart } from "lucide-react"
import { AnimatedLogo } from "@/components/animated-logo"
import { useCart } from "@/lib/cart-store"
import { useFavourites } from "@/lib/favourites-store"
import { useAuth } from "@/lib/auth-store"
import { getSiteConfig } from "@/lib/data-loader"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const cart = useCart()
  const favourites = useFavourites()
  const { user, isAuthenticated, logout } = useAuth()
  const siteConfig = getSiteConfig()
  const navItems = siteConfig.navigation

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile: Hamburger Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile: Centered Logo */}
          <div className="md:hidden flex-1 flex justify-center">
            <AnimatedLogo />
          </div>

          {/* Mobile: Cart & Favourites Icons */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/favourites" className="relative">
                <Heart className="h-6 w-6" />
                {favourites.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favourites.itemCount}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          {/* Desktop: Logo */}
          <div className="hidden md:block">
            <AnimatedLogo />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-purple-500 transition-colors ${
                    isActive ? "text-purple-500" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Desktop: Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <Link href="/favourites" className="relative">
                <Heart className="h-6 w-6" />
                {favourites.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favourites.itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? "text-purple-500 bg-purple-50" 
                        : "text-gray-700 hover:text-purple-500 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
