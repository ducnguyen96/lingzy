import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex-1 p-4 max-w-[100vw]">{children}</div>
    </>
  );
}
