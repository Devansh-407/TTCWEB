import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithLoadingProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  quality?: number
  priority?: boolean
  loading?: "lazy" | "eager"
}

export function ImageWithLoading({ 
  src, 
  alt, 
  fill = false, 
  className = "", 
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 75,
  priority = false,
  loading = "lazy"
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {fill ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={hasError ? "/placeholder.svg" : src}
            alt={alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            sizes={sizes}
            quality={quality}
            priority={priority}
            loading={loading}
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
          />
        </>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={hasError ? "/placeholder.svg" : src}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
          />
        </>
      )}
    </div>
  )
}
