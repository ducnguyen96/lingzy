import HeaderButtons from "./header-buttons";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 pt-10 md:p-12 lg:px-28 xl:px-52 2xl:px-80">
      <Nav />
      <HeaderButtons />
    </header>
  );
}
