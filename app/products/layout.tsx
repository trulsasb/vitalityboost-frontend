import PageShell from "@/components/layout/PageShell";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}
