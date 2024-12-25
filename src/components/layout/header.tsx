import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import UserButton from "../user-button";

const { SITE_NAME } = process.env;

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 md:px-16 md:py-12 xl:py-16 lg:px-28 xl:px-52">
      <Link href="/" prefetch={true}>
        <div className="font-bold text-xl text-blue-500">{SITE_NAME}</div>
      </Link>
      <SidebarTrigger className="md:hidden" />
      <div className="hidden md:block">
        <UserButton />
      </div>
    </header>
  );
}
