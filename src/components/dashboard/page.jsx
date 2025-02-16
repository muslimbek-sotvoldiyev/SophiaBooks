"use client";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ModeToggle } from "@/components/theame-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Dashboard({ children }) {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter((segment) => segment);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;

      const text = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const isLast = index === segments.length - 1;

      return {
        text,
        path,
        isLast,
      };
    });
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex w-full justify-between">
            <BreadcrumbList className="flex gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.path} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {breadcrumb.isLast ? (
                      <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={breadcrumb.path}>
                        {breadcrumb.text}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
            <ModeToggle className="mr-6" />
          </div>
        </header>

        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
