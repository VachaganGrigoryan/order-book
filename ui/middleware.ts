import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(request) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/protected") && token === null) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/"],
};
