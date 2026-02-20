"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Brands", href: "/admin/brands" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Users", href: "/admin/users" },
  { name: "Reviews", href: "/admin/reviews" },
  { name: "Discounts", href: "/admin/discounts" },
  { name: "Subscriptions", href: "/admin/subscriptions" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
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
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}

