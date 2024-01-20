import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NEXT_API_URL } from "@/config";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Login",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // "https://dummyjson.com/auth/login"
          const res = await fetch(`${NEXT_API_URL}/login/`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            // credentials are invalid
            return null;
          }

          const parsedResponse = await res.json();
          // accessing the jwt returned by server
          const jwt = parsedResponse.access;

          // You can make more request to get other information about the user eg. Profile details
          const userRes = await fetch(`${NEXT_API_URL}/users/me/`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          });

          if (userRes.status !== 200) {
            return null;
          }

          // return user credentials together with jwt
          return {
            ...credentials,
            user: userRes.data,
            jwt,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  // debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      // user is only available the first time a user signs in authorized
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
          user: user.user,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
        session.jwt = token.jwt;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
