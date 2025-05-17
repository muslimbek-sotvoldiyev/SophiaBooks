"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  Mars,
  MarsIcon,
  PieChart,
  SaveAll,
  Settings2,
  Sparkles,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "BookLand",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Bayon",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Bookify  ",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Tovarlar",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Katalog",
          url: "/products/catalog",
        }
      ],
    },
    {
      title: "Sotuvlar",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Yangi sotuv",
          url: "/order/new-order",
        },
        {
          title: "Barcha sotuvlar ",
          url: "/order/all",
        },
        {
          title: "Kassani almashtirish",
          url: "/order/cash-shifts",
        },

        {
          title: "Naqd pul operatsiyalar",
          url: "/order/cashbox-operations",
        },
      ],
    },
    {
      title: "Mijozlar",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Barcha mijozlar",
          url: "#",
        },
        {
          title: "Mijozlar guruhi",
          url: "#",
        },
        {
          title: "Sodiqlik dasturi",
          url: "#",
        },
        {
          title: "Mijozlar qarzdorligi",
          url: "#",
        },
      ],
    },
    {
      title: "Marketing",
      url: '#',
      icon: SaveAll,
      items: [
        {
          title: "Promo kodlar",
          url: "#"
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profil",
          url: "/profile",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
