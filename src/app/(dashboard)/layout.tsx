export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="p-4 lg:p-0 h-full">{children}</div>
    </>
  );
}
