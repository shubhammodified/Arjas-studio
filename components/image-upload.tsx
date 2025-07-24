"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"
import imageCompression from "browser-image-compression"

interface ImageUploadProps {
  onImageUpload?: (file: File) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export function ImageUpload({
  onImageUpload,
  maxFiles = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Change handleFiles to async and compress images before reading
  const handleFiles = async (files: FileList) => {
    for (const file of Array.from(files)) {
      if (acceptedTypes.includes(file.type) && uploadedImages.length < maxFiles) {
        // Compress the image before reading
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Target max size in MB
          maxWidthOrHeight: 1024, // Resize if larger than this
          useWebWorker: true,
        })
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setUploadedImages((prev) => [...prev, result])
          onImageUpload?.(compressedFile)
        }
        reader.readAsDataURL(compressedFile)
      }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Update all calls to handleFiles to use await and async
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      await handleFiles(e.target.files)
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-amber-500 bg-amber-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(",")}
              onChange={handleChange}
              className="hidden"
            />

            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Upload Product Images</h3>
                <p className="text-gray-600">Drag and drop your images here, or click to browse</p>
                <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP (Max {maxFiles} files)</p>
              </div>

              <Button onClick={openFileDialog} className="bg-amber-600 hover:bg-amber-700">
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose Images
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Grid */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
