"use client";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
import { BarChart, Compass, Layout, List } from "lucide-react";
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "مسارات التعلم",
    href: "/search",
  },
];
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "analytics",
    href: "/teacher/analytics",
  },
];
const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherMode = pathname.startsWith("/teacher");

  const routes = isTeacherMode ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;