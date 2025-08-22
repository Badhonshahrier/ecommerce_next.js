import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "./providers/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Product Store",
  description: "A modern product store with authentication",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div id="toast-root"></div>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
