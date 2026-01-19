import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user || !account) return false;

      // Check if user exists
      const existingUser = await db.user.findUnique({
        where: { email: user.email! },
      });

      // If login from GitHub
      if (account.provider === "github") {
        const username = typeof profile?.login === "string" ? profile.login : null;

        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image ?? null,
              githubUsername: username,
              accounts: {
                create: {
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  accessToken: account.access_token,
                },
              },
            },
          });
        } else {
          if (!existingUser.githubUsername && username) {
            await db.user.update({
              where: { id: existingUser.id },
              data: { githubUsername: username },
            });
          }
        }
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (user) {
        token.githubUsername = user.githubUsername;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
        session.user.githubUsername = (token.githubUsername as string | null) ?? null;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
