import * as React from "react";
import { PageShell } from "@/components/layout/PageShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageShell sidebar>
      {children}
    </PageShell>
  );
}
