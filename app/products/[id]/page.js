"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Star, ShoppingCart, ArrowLeft, Heart, Share2, Loader2, CheckCircle, XCircle } from "lucide-react"
import Navbar from "../../../components/navbar"
import Footer from "../../../components/footer"
import { api } from "../../../lib/api"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await api.getProduct(params.id)
        setProduct(data.product)
      } catch (err) {
        setError("Product not found or failed to load.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <button
              onClick={() => router.push("/products")}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  const images = [product.image, product.image, product.image] // Mock multiple images

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </button>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-semibold">
                      {product.category}
                    </span>
                    {product.tags?.map((tag) => (
                      <span key={tag} className="bg-accent/10 text-accent px-2 py-1 rounded-full text-sm font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-bold text-accent">${product.price}</span>
                    <div className="flex items-center gap-2">
                      {product.inStock ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-500 font-semibold">In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="text-destructive font-semibold">Out of Stock</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.fullDescription || product.description}
                  </p>
                </div>

                {product.specifications && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Key Features</h3>
                    <ul className="space-y-2">
                      {product.specifications.map((spec, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-foreground font-semibold">Quantity:</label>
                    <div className="flex items-center border border-input rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-muted transition-colors"
                        disabled={!product.inStock}
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-input">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-muted transition-colors"
                        disabled={!product.inStock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      disabled={!product.inStock}
                      className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
