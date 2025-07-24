"use client"

import { useState } from "react"
import { PriceEditor } from "@/components/price-editor"
import { ImageUpload } from "@/components/image-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
  })

  const handleProductSave = () => {
    console.log("Saving product:", productData)
    // Here you would typically save to your database
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Add and manage your jewelry collection</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={productData.name}
                  onChange={(e) => setProductData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  value={productData.description}
                  onChange={(e) => setProductData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter product description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Input
                  id="product-category"
                  value={productData.category}
                  onChange={(e) => setProductData((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Rings, Necklaces, Earrings"
                />
              </div>

              <Button onClick={handleProductSave} className="w-full bg-amber-600 hover:bg-amber-700">
                Save Product
              </Button>
            </CardContent>
          </Card>

          {/* Price Editor */}
          <PriceEditor onPriceChange={(price) => setProductData((prev) => ({ ...prev, price }))} />
        </div>

        {/* Image Upload */}
        <div className="mt-8">
          <ImageUpload onImageUpload={(file) => console.log("Image uploaded:", file.name)} maxFiles={8} />
        </div>
      </div>
    </div>
  )
}
