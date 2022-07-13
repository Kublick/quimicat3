import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { dbUser } from "../../../db";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Usuario",
          type: "text",
          placeholder: "Ingresa tu usuario",
        },
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, _req) {
        const user = await dbUser.checkUserPassword(
          credentials!.username,
          credentials!.password
        );

        if (!user) return null;
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 1000 * 60 * 60 * 1,
    strategy: "jwt",
  },
  jwt: {
    // set maxage to 1 hours
    maxAge: 1000 * 60 * 60 * 1,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
