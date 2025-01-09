export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-4 min-h-full">{children}</div>;
}
