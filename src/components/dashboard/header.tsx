"use client";

import { Bell, Search, Sun, Moon, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
}

interface DashboardHeaderProps {
  user: User;
}

const getBreadcrumbs = (pathname: string) => {
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ name: "Dashboard", href: "/dashboard" }];
  
  if (paths.length > 1) {
    const currentPage = paths[paths.length - 1];
    const pageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    breadcrumbs.push({
      name: pageName,
      href: pathname,
    });
  }
  
  return breadcrumbs;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "text-gray-900 font-medium"
                    : "text-gray-500"
                }
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>

        

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {user.name?.charAt(0) || user.email.charAt(0)}
                </span>
              </div>
            )}
            <button className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
