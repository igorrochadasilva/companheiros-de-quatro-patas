import Link from "next/link";

import { ADMIN_DASHBOARD_NAV_ITEMS } from "@/constants";
import messages from "@/messages/pt-br.json";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { Muted, Small, Typography } from "@/shared/ui/typography";

import { DashboardLogoutButton } from "./DashboardLogoutButton";

const dashboardMessages = messages.dashboard;

type DashboardShellProps = Readonly<{
  children: React.ReactNode;
}>;

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-3 py-4">
          <Typography
            as="p"
            variant="small"
            className="font-semibold text-foreground"
          >
            {dashboardMessages.sidebar.title}
          </Typography>
          <Small>{messages.app.name}</Small>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              {dashboardMessages.sidebar.groupLabel}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ADMIN_DASHBOARD_NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        {dashboardMessages.sidebar[item.labelKey]}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="min-h-screen bg-muted/30 text-foreground">
        <header className="flex items-center justify-between gap-2 border-b border-border bg-card px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Muted>{dashboardMessages.header.subtitle}</Muted>
          </div>
          <DashboardLogoutButton />
        </header>
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
