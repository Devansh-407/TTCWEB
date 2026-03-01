import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { getProducts, getProductById } from "@/lib/data-loader"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return {
      title: "Product Not Found - The Tohfa Creations",
    }
  }

  return {
    title: `${product.name} - The Tohfa Creations`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <ProductDetails product={product} />
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  )
}
