import HeaderButtons from "@/components/layout/header-buttons";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mb-4 flex justify-end">
        <HeaderButtons />
      </div>
      {children}
    </>
  );
}
