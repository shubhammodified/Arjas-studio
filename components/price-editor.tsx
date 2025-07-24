"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PriceEditorProps {
  initialPrice?: number
  onPriceChange?: (price: number) => void
}

export function PriceEditor({ initialPrice = 0, onPriceChange }: PriceEditorProps) {
  const [price, setPrice] = useState(initialPrice)
  const [originalPrice, setOriginalPrice] = useState<number | undefined>()

  const handlePriceUpdate = () => {
    onPriceChange?.(price)
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Price Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-price">Current Price ($)</Label>
          <Input
            id="current-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="original-price">Original Price ($ - Optional)</Label>
          <Input
            id="original-price"
            type="number"
            value={originalPrice || ""}
            onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="Enter original price for sale items"
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">{formatPrice(price)}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-gray-500 line-through text-sm">{formatPrice(originalPrice)}</span>
              )}
            </div>
            {originalPrice && originalPrice > price && (
              <div className="text-sm text-green-600 mt-1">
                Save {formatPrice(originalPrice - price)} ({Math.round(((originalPrice - price) / originalPrice) * 100)}
                % off)
              </div>
            )}
          </div>
        </div>

        <Button onClick={handlePriceUpdate} className="w-full bg-amber-600 hover:bg-amber-700">
          Update Price
        </Button>
      </CardContent>
    </Card>
  )
}
