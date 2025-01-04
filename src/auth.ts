import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./lib/server/db";
import authConfig from "./auth.config";
import { users } from "./lib/server/schemas";
import { userAccounts } from "./lib/server/schemas/user/user-accounts";
import { getUserByEmail, loginUser } from "./lib/server/services/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: userAccounts,
  }),
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ user, token, trigger }) => {
      if (trigger === "update") {
        const dbUser = await getUserByEmail(token.email!);
        if (!dbUser) return token;
        return dbUser;
      }
      if (!user) return token;

      const dbUser = await loginUser(user.id!);
      if (!dbUser) return token;
      return dbUser;
    },
    session({ session, token }) {
      // @ts-expect-error refer to the dbUser on jwt callback above
      session.user = token;
      return session;
    },
  },
  ...authConfig,
});
