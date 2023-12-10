"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/scanner`,
      label: "QR Scanner",
      active: pathname === `/${params.storeId}/scanner`,
    },
    {
      href: `/${params.storeId}/plans`,
      label: "Plans",
      active: pathname === `/${params.storeId}/plans`,
    },
    {
      href: `/${params.storeId}/requests`,
      label: "Requests",
      active: pathname === `/${params.storeId}/requests`,
    },
    {
      href: `/${params.storeId}/redeems`,
      label: "Redeems",
      active: pathname === `/${params.storeId}/redeems`,
    },
    {
      href: `/${params.storeId}/users`,
      label: "Users",
      active: pathname === `/${params.storeId}/users`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
