import HeaderButtons from "@/components/layout/header-buttons";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="p-4 flex justify-end">
        <HeaderButtons />
      </div>
      {children}
    </>
  );
}
