"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  House,
  Logs,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "grkndev",
    email: "admin@grkn.dev",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "GrknDev LLC",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: House,
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Logs",
      url: "/dashboard/logs",
      icon: Logs,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
      
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
