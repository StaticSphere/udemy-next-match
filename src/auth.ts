import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // jwt: async ({ token }) => {
    //   console.log({ token });
    //   return token;
    // },
    // session: async ({ token, session }) => {
    //   console.log(token);
    //   console.log(session);
    //   return session;
    // },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
