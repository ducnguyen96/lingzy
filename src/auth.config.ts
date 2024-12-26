import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  trustHost: true,
  providers: [Google],
} satisfies NextAuthConfig;
