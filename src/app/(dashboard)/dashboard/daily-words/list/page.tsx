import { redirect } from "next/navigation";

export default function DemoPage() {
  redirect("/dashboard/daily-words/list/all");
}
