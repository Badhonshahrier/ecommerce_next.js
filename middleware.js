import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log("[v0] Middleware triggered for:", req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard")
        const hasToken = !!token

        console.log("[v0] Authorization check:", {
          path: req.nextUrl.pathname,
          isProtectedRoute,
          hasToken,
        })

        if (isProtectedRoute) {
          return hasToken
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*"],
}
