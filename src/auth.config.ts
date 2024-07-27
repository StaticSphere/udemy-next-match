import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./app/actions/auth-actions";
import { loginSchema } from "./lib/schemas/loginSchema";

export default {
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (creds) => {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);

          if (!user || !(await compare(password, user.passwordHash))) {
            return null;
          }

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
