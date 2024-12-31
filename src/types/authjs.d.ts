import { DBUser } from "@/lib/server/services/user";

declare module "next-auth" {
  interface Session extends DefaultSessionefaultSession {
    user?: DBUser;
  }
}
