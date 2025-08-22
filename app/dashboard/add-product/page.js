"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Package, DollarSign, FileText, ImageIcon, Save, Loader2, ArrowLeft, Upload, Eye } from "lucide-react"
import Navbar from "../../../components/navbar"
import Footer from "../../../components/footer"
import { api } from "../../../lib/api"
import { showToast } from "../../../lib/toast"

export default function AddProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  })

  const [errors, setErrors] = useState({})

  const categories = [
    "Electronics",
    "Wearables",
    "Audio",
    "Accessories",
    "Computing",
    "Gaming",
    "Home & Garden",
    "Sports & Fitness",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }

    // Update preview image
    if (name === "imageUrl") {
      setPreviewImage(value)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required"
    }

    if (!formData.price || isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error")
      return
    }

    setIsLoading(true)

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        image: formData.imageUrl.trim(),
        category: formData.category,
        inStock: true,
        rating: 0,
        reviews: 0,
      }

      await api.addProduct(productData)

      showToast("Product added successfully!", "success")

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
      })
      setPreviewImage("")

      // Redirect to products page after a short delay
      setTimeout(() => {
        router.push("/products")
      }, 2000)
    } catch (error) {
      console.error("Error adding product:", error)
      showToast("Failed to add product. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <button
                onClick={() => router.push("/products")}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </button>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Add New Product</h1>
              <p className="text-muted-foreground">
                Welcome back, {session?.user?.name || session?.user?.email}! Add a new product to the store.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-card rounded-lg shadow-lg border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Form Fields */}
                    <div className="space-y-6">
                      {/* Product Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                          Product Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                              errors.name ? "border-destructive" : "border-input"
                            }`}
                            placeholder="Enter product name"
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                      </div>

                      {/* Category */}
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-card-foreground mb-2">
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`block w-full px-3 py-3 border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                            errors.category ? "border-destructive" : "border-input"
                          }`}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-destructive">{errors.category}</p>}
                      </div>

                      {/* Price */}
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-card-foreground mb-2">
                          Price (USD) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                              errors.price ? "border-destructive" : "border-input"
                            }`}
                            placeholder="0.00"
                          />
                        </div>
                        {errors.price && <p className="mt-1 text-sm text-destructive">{errors.price}</p>}
                      </div>

                      {/* Image URL */}
                      <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-card-foreground mb-2">
                          Image URL *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                              errors.imageUrl ? "border-destructive" : "border-input"
                            }`}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        {errors.imageUrl && <p className="mt-1 text-sm text-destructive">{errors.imageUrl}</p>}
                      </div>
                    </div>

                    {/* Right Column - Description and Preview */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-2">
                          Description *
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={6}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none ${
                              errors.description ? "border-destructive" : "border-input"
                            }`}
                            placeholder="Enter product description..."
                          />
                        </div>
                        {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description}</p>}
                      </div>

                      {/* Image Preview */}
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          <Eye className="inline h-4 w-4 mr-1" />
                          Image Preview
                        </label>
                        <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center overflow-hidden">
                          {previewImage ? (
                            <img
                              src={previewImage || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={() => setPreviewImage("")}
                            />
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <Upload className="h-12 w-12 mx-auto mb-2" />
                              <p>Image preview will appear here</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-border">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Adding Product...
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          Add Product
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
