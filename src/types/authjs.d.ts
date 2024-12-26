import { DBUser } from "@/lib/server/services/user/user-service";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSessionefaultSession {
    user?: DBUser;
  }
}
