import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here-change-in-production",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple demo credentials - in production, verify against your database
        if (credentials?.email === "demo@example.com" && credentials?.password === "demo123") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors back to login page instead of showing error page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (url.includes("/dashboard")) return `${baseUrl}/dashboard`
      return `${baseUrl}/dashboard`
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Added explicit session max age (30 days)
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
