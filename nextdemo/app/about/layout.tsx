export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="about-layout-demo">{children}</div>
  );
}
