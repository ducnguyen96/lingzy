export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex-1 p-4 max-w-[100vw]">{children}</div>
    </>
  );
}
