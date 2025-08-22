import Navbar from "../components/navbar"
import Hero from "../components/hero"
import ProductHighlights from "../components/product-highlights"
import Footer from "../components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductHighlights />
      <Footer />
    </main>
  )
}
