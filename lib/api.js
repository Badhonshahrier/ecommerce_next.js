// API configuration and helper functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const USE_MOCK_DATA = !API_BASE_URL || API_BASE_URL.includes("localhost:5000")

export const api = {
  // Get all products
  getProducts: async () => {
    if (USE_MOCK_DATA) {
      return getMockProducts()
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching products:", error)
      return getMockProducts()
    }
  },

  // Get single product by ID
  getProduct: async (id) => {
    if (USE_MOCK_DATA) {
      return getMockProduct(id)
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching product:", error)
      return getMockProduct(id)
    }
  },

  // Add new product (CREATE)
  addProduct: async (productData) => {
    if (USE_MOCK_DATA) {
      return {
        success: true,
        message: "Product added successfully (mock)",
        product: { _id: Date.now().toString(), ...productData },
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
      if (!response.ok) {
        throw new Error("Failed to add product")
      }
      return await response.json()
    } catch (error) {
      console.error("Error adding product:", error)
      throw error
    }
  },

  // Update existing product (UPDATE)
  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
      if (!response.ok) {
        throw new Error("Failed to update product")
      }
      return await response.json()
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  },

  // Delete product (DELETE)
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete product")
      }
      return await response.json()
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  },

  // Search products by query and category
  searchProducts: async (query, category = "") => {
    if (USE_MOCK_DATA) {
      return getFilteredMockProducts(query, category)
    }

    try {
      const params = new URLSearchParams()
      if (query) params.append("search", query)
      if (category) params.append("category", category)

      const response = await fetch(`${API_BASE_URL}/products/search?${params}`)
      if (!response.ok) {
        throw new Error("Failed to search products")
      }
      return await response.json()
    } catch (error) {
      console.error("Error searching products:", error)
      return getFilteredMockProducts(query, category)
    }
  },

  // Get all categories
  getCategories: async () => {
    if (USE_MOCK_DATA) {
      return getMockCategories()
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories`)
      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching categories:", error)
      return getMockCategories()
    }
  },
}

// Mock data for development/fallback
const getMockProducts = () => {
  return {
    products: [
      {
        _id: "1",
        name: "Premium Wireless Headphones",
        description: "High-quality sound with active noise cancellation technology",
        price: 299.99,
        image: "/wireless-headphones.png",
        category: "Electronics",
        inStock: true,
        rating: 4.8,
        reviews: 124,
      },
      {
        _id: "2",
        name: "Smart Fitness Watch",
        description: "Track your health and fitness goals with advanced sensors",
        price: 199.99,
        image: "/fitness-smartwatch.png",
        category: "Wearables",
        inStock: true,
        rating: 4.6,
        reviews: 89,
      },
      {
        _id: "3",
        name: "Portable Bluetooth Speaker",
        description: "Crystal clear sound with 360-degree audio experience",
        price: 89.99,
        image: "/bluetooth-speaker.png",
        category: "Audio",
        inStock: true,
        rating: 4.7,
        reviews: 156,
      },
      {
        _id: "4",
        name: "Wireless Charging Pad",
        description: "Fast and efficient wireless charging for all compatible devices",
        price: 49.99,
        image: "/wireless-charging-pad.png",
        category: "Accessories",
        inStock: true,
        rating: 4.5,
        reviews: 73,
      },
      {
        _id: "5",
        name: "4K Webcam",
        description: "Professional quality video calls with 4K resolution",
        price: 129.99,
        image: "/professional-4k-webcam.png",
        category: "Electronics",
        inStock: true,
        rating: 4.4,
        reviews: 92,
      },
      {
        _id: "6",
        name: "Ergonomic Keyboard",
        description: "Comfortable typing experience with mechanical switches",
        price: 159.99,
        image: "/ergonomic-mechanical-keyboard.png",
        category: "Accessories",
        inStock: false,
        rating: 4.9,
        reviews: 201,
      },
    ],
  }
}

const getMockProduct = (id) => {
  const products = getMockProducts().products
  const product = products.find((p) => p._id === id)

  if (!product) {
    throw new Error("Product not found")
  }

  return {
    product: {
      ...product,
      fullDescription: `${product.description}. This premium product offers exceptional quality and performance. Built with the latest technology and designed for modern users who demand the best. Features include advanced functionality, durable construction, and sleek design that fits perfectly into your lifestyle.`,
      specifications: [
        "Premium build quality",
        "Latest technology integration",
        "User-friendly design",
        "Warranty included",
        "Fast shipping available",
      ],
      tags: ["Popular", "New Arrival", "Best Seller"],
    },
  }
}

// Helper function for filtered mock data
const getFilteredMockProducts = (query = "", category = "") => {
  const allProducts = getMockProducts().products
  let filtered = allProducts

  if (query) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()),
    )
  }

  if (category) {
    filtered = filtered.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  return { products: filtered }
}

// Mock categories data
const getMockCategories = () => {
  return {
    categories: [
      { _id: "1", name: "Electronics", count: 3 },
      { _id: "2", name: "Wearables", count: 1 },
      { _id: "3", name: "Audio", count: 1 },
      { _id: "4", name: "Accessories", count: 2 },
    ],
  }
}
