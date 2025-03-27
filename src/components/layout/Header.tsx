import React from "react";
import {
  Bell,
  Search,
  Menu,
  Settings,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface HeaderProps {
  toggleSidebar?: () => void;
  pageTitle?: string;
  notificationCount?: number;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Header = ({
  toggleSidebar = () => {},
  pageTitle,
  notificationCount = 3,
  userName = "Dr. John Doe",
  userEmail = "doctor@hospital.com",
  userAvatar = "",
}: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine page title based on current route if not provided
  const getPageTitle = () => {
    if (pageTitle) return pageTitle;

    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/patients") return "Patient Management";
    if (path === "/appointments") return "Appointment System";
    if (path === "/billing") return "Billing Module";
    if (path === "/records") return "Medical Records";
    if (path === "/pharmacy") return "Pharmacy";
    if (path === "/laboratory") return "Laboratory";
    if (path === "/vitals") return "Vitals";
    if (path === "/settings") return "Settings";

    return "Dashboard";
  };

  return (
    <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-xl font-semibold hidden md:block">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search patients, appointments, etc..."
            className="pl-10 w-full bg-gray-50 dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <p className="font-medium">New appointment scheduled</p>
                <p className="text-xs text-gray-500">
                  Patient: Sarah Johnson - 10:30 AM
                </p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <p className="font-medium">Lab results available</p>
                <p className="text-xs text-gray-500">
                  Patient: Michael Brown - Blood Test
                </p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <p className="font-medium">Medication reminder</p>
                <p className="text-xs text-gray-500">
                  Patient: Emily Wilson - Prescription refill
                </p>
                <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-primary justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-1 md:p-2 h-auto"
            >
              <Avatar className="h-8 w-8 border border-gray-200">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-primary text-white">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs text-gray-500 mt-1">{userEmail}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
