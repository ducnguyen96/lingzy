import DictSearch from "@/components/dictionary/search";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:px-8 lg:px-32 2xl:px-60">
      <DictSearch />
      {children}
    </div>
  );
}
