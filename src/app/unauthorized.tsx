import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit">Signin With Google</Button>
      </form>
    </div>
  );
}
