"use client"

// Format price in INR
function formatPrice(price: number | undefined) {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0'
  }
  return `₹${price.toLocaleString('en-IN')}`
}

// Get correct price from product (handles size variants)
function getProductPrice(product: any) {
  if (product.sizes && product.sizes.length > 0) {
    return product.sizes[0].price
  }
  return product.price || 0
}

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Edit, Save, X } from "lucide-react"
import { Product, SizeVariant } from "@/lib/types"

export function TohfaDataManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  useEffect(() => {
    // Load products from localStorage or API
    const savedProducts = localStorage.getItem('tohfa-products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
    localStorage.setItem('tohfa-products', JSON.stringify(updatedProducts))
  }

  const handleAddSize = (product: Product) => {
    const newSize: SizeVariant = {
      id: `size_${Date.now()}`,
      name: "New Size",
      price: 0,
      inStock: true,
      description: "Size description"
    }
    
    const updatedProduct = {
      ...product,
      sizes: [...(product.sizes || []), newSize]
    }
    
    const updatedProducts = products.map(p => 
      p.id === product.id ? updatedProduct : p
    )
    saveProducts(updatedProducts)
    setEditingProduct(updatedProduct)
  }

  const handleUpdateSize = (product: Product, sizeId: string, field: keyof SizeVariant, value: any) => {
    const updatedSizes = product.sizes?.map(size => 
      size.id === sizeId ? { ...size, [field]: value } : size
    ) || []
    
    const updatedProduct = { ...product, sizes: updatedSizes }
    const updatedProducts = products.map(p => 
      p.id === product.id ? updatedProduct : p
    )
    saveProducts(updatedProducts)
    setEditingProduct(updatedProduct)
  }

  const handleDeleteSize = (product: Product, sizeId: string) => {
    const updatedSizes = product.sizes?.filter(size => size.id !== sizeId) || []
    const updatedProduct = { ...product, sizes: updatedSizes }
    const updatedProducts = products.map(p => 
      p.id === product.id ? updatedProduct : p
    )
    saveProducts(updatedProducts)
    setEditingProduct(updatedProduct)
  }

  const handleUpdateProduct = (field: keyof Product, value: any) => {
    if (!editingProduct) return
    
    const updatedProduct = { ...editingProduct, [field]: value }
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? updatedProduct : p
    )
    saveProducts(updatedProducts)
    setEditingProduct(updatedProduct)
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify({ products }, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'products.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tohfa Data Manager</h1>
          <div className="space-x-4">
            <Button onClick={exportToJSON} variant="outline">
              Export to JSON
            </Button>
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Products List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            {products.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Base Price:</span>
                      <span className="font-medium">{formatPrice(getProductPrice(product))}</span>
                    </div>
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Size Variants:</span>
                        <Badge variant="secondary">{product.sizes.length} sizes</Badge>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <Badge className={product.inStock ? "bg-green-500" : "bg-red-500"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Product Editor */}
          {editingProduct && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <Input
                      value={editingProduct.name}
                      onChange={(e) => handleUpdateProduct('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Textarea
                      value={editingProduct.description}
                      onChange={(e) => handleUpdateProduct('description', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Base Price</label>
                      <Input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => handleUpdateProduct('price', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                      <Input
                        type="number"
                        value={editingProduct.originalPrice || ''}
                        onChange={(e) => handleUpdateProduct('originalPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Size Variants */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Size Variants</CardTitle>
                    <Button size="sm" onClick={() => handleAddSize(editingProduct)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Size
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingProduct.sizes && editingProduct.sizes.length > 0 ? (
                    editingProduct.sizes.map((size) => (
                      <div key={size.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Size Variant</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteSize(editingProduct, size.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Size Name"
                            value={size.name}
                            onChange={(e) => handleUpdateSize(editingProduct, size.id, 'name', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            value={size.price}
                            onChange={(e) => handleUpdateSize(editingProduct, size.id, 'price', parseInt(e.target.value))}
                          />
                        </div>
                        <Input
                          placeholder="Description (optional)"
                          value={size.description || ''}
                          onChange={(e) => handleUpdateSize(editingProduct, size.id, 'description', e.target.value)}
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={size.inStock}
                            onChange={(e) => handleUpdateSize(editingProduct, size.id, 'inStock', e.target.checked)}
                          />
                          <label className="text-sm">In Stock</label>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No size variants added yet. Click "Add Size" to create one.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
