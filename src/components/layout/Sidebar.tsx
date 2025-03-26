import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Pill,
  FlaskConical,
  Activity,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      name: "Patient Management",
      icon: <Users className="w-5 h-5" />,
      path: "/patient-management",
    },
    {
      name: "Appointment System",
      icon: <Calendar className="w-5 h-5" />,
      path: "/appointment-system",
    },
    {
      name: "Billing Module",
      icon: <CreditCard className="w-5 h-5" />,
      path: "/billing-module",
    },
    {
      name: "Medical Records",
      icon: <FileText className="w-5 h-5" />,
      path: "/medical-records",
    },
    { name: "Pharmacy", icon: <Pill className="w-5 h-5" />, path: "/pharmacy" },
    {
      name: "Laboratory",
      icon: <FlaskConical className="w-5 h-5" />,
      path: "/laboratory",
    },
    { name: "Vitals", icon: <Activity className="w-5 h-5" />, path: "/vitals" },
  ];

  return (
    <div
      className="h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? "80px" : "280px" }}
    >
      {/* Hospital Logo and Name */}
      <div className="p-4 border-b border-gray-200">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">HMS</h1>
              <p className="text-xs text-gray-500">Hospital Management</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-primary transition-colors`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Link */}
      <div className="px-3 py-2">
        <Link
          to="/settings"
          className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} p-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-primary transition-colors`}
        >
          <span className="flex-shrink-0">
            <Settings className="w-5 h-5" />
          </span>
          {!collapsed && <span className="ml-3">Settings</span>}
        </Link>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        {collapsed ? (
          <div className="flex justify-center">
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start p-2 hover:bg-gray-100 rounded-md"
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Dr. Admin</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
