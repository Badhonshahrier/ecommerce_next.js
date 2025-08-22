"use client"

import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Plus, Package, BarChart3, Loader2 } from "lucide-react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null // Will redirect via useEffect
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-muted-foreground">Please log in to access the dashboard.</p>
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
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Dashboard</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Welcome back, {session?.user?.name || session?.user?.email}! Manage your products and store.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Add Product Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link
                  href="/dashboard/add-product"
                  className="block bg-card rounded-lg shadow-lg border border-border p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">Add Product</h3>
                    <p className="text-muted-foreground">Add new products to your store inventory</p>
                  </div>
                </Link>
              </motion.div>

              {/* Manage Products Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  href="/products"
                  className="block bg-card rounded-lg shadow-lg border border-border p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-center">
                    <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">View Products</h3>
                    <p className="text-muted-foreground">Browse and manage your product catalog</p>
                  </div>
                </Link>
              </motion.div>

              {/* Analytics Card (Placeholder) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-card rounded-lg shadow-lg border border-border p-8 opacity-50">
                  <div className="text-center">
                    <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">Analytics</h3>
                    <p className="text-muted-foreground">Coming soon - View sales and performance metrics</p>
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
