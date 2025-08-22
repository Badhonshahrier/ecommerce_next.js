"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation",
    price: 299.99,
    image: "/wireless-headphones.png",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health and fitness goals",
    price: 199.99,
    image: "/fitness-smartwatch.png",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    description: "Crystal clear sound anywhere you go",
    price: 89.99,
    image: "/bluetooth-speaker.png",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    description: "Fast and efficient wireless charging",
    price: 49.99,
    image: "/wireless-charging-pad.png",
    rating: 4.5,
  },
]

export default function ProductHighlights() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular items, carefully selected for quality and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-semibold">
                  New
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">${product.price}</span>
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition-colors duration-200"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary transition-colors duration-200"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
