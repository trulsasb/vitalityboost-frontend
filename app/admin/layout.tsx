"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

// Only sections with a real, working backend behind them. The rest
// (categories, brands, reviews, discounts, subscriptions, settings,
// analytics, customers, media, support) have no backend support yet —
// their routes still exist but show a "not available" placeholder rather
// than being linked here as if they worked.
const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Billing", href: "/admin/billing" },
  { name: "Users", href: "/admin/users" },
  { name: "Content", href: "/admin/content" },
  { name: "Lag hjemmeside", href: "/admin/homepage" },
  { name: "Betalingsoppsett", href: "/admin/integrations" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/auth");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <h1 className="text-xl font-semibold mb-8">Admin Panel</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 text-left"
        >
          Logg ut
        </button>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}

