import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Calendar,
  FileText,
  FileCheck,
  Bed,
  Pill,
  Stethoscope,
  DollarSign,
} from "lucide-react";

interface QuickActionProps {
  actions?: Array<{
    icon: React.ReactNode;
    label: string;
    description?: string;
    onClick?: () => void;
  }>;
}

const QuickActions = ({
  actions = [
    {
      icon: <UserPlus className="h-5 w-5" />,
      label: "Register Patient",
      description: "Add a new patient to the system",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule Appointment",
      description: "Book a new appointment",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Create Invoice",
      description: "Generate a new billing invoice",
    },
    {
      icon: <FileCheck className="h-5 w-5" />,
      label: "Medical Records",
      description: "Access patient medical files",
    },
    {
      icon: <Bed className="h-5 w-5" />,
      label: "Bed Management",
      description: "Manage hospital bed allocation",
    },
    {
      icon: <Pill className="h-5 w-5" />,
      label: "Pharmacy",
      description: "Access medication inventory",
    },
    {
      icon: <Stethoscope className="h-5 w-5" />,
      label: "Doctor Schedule",
      description: "View doctor availability",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Financial Reports",
      description: "View financial summaries",
    },
  ],
}: QuickActionProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center gap-2 p-4 hover:bg-primary/5 transition-colors"
              onClick={action.onClick}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {action.icon}
              </div>
              <span className="font-medium text-sm">{action.label}</span>
              {action.description && (
                <span className="text-xs text-muted-foreground text-center">
                  {action.description}
                </span>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
