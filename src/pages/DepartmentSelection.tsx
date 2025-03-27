import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  CreditCard,
  FileText,
  Pill,
  FlaskConical,
  Activity,
} from "lucide-react";

const DepartmentSelection = () => {
  const navigate = useNavigate();

  const departments = [
    {
      id: "patients",
      name: "Patient Management",
      description:
        "Register, search and manage patient profiles and medical history",
      icon: <Users className="h-12 w-12 mb-4 text-primary" />,
      path: "/patients",
    },
    {
      id: "appointments",
      name: "Appointment System",
      description: "Schedule, reschedule and manage patient appointments",
      icon: <Calendar className="h-12 w-12 mb-4 text-primary" />,
      path: "/appointments",
    },
    {
      id: "billing",
      name: "Billing Module",
      description:
        "Generate invoices, process payments and financial reporting",
      icon: <CreditCard className="h-12 w-12 mb-4 text-primary" />,
      path: "/billing",
    },
    {
      id: "records",
      name: "Medical Records",
      description: "Access and manage patient medical records and history",
      icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
      path: "/records",
    },
    {
      id: "pharmacy",
      name: "Pharmacy",
      description: "Manage medications, prescriptions and inventory",
      icon: <Pill className="h-12 w-12 mb-4 text-primary" />,
      path: "/pharmacy",
    },
    {
      id: "laboratory",
      name: "Laboratory",
      description: "Order and track lab tests, manage results",
      icon: <FlaskConical className="h-12 w-12 mb-4 text-primary" />,
      path: "/laboratory",
    },
    {
      id: "vitals",
      name: "Vitals",
      description: "Record and monitor patient vital signs",
      icon: <Activity className="h-12 w-12 mb-4 text-primary" />,
      path: "/vitals",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Hospital Management System
        </h1>
        <p className="text-muted-foreground">
          Please select a department to continue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary"
          >
            <CardHeader className="text-center">
              <div className="flex justify-center">{dept.icon}</div>
              <CardTitle>{dept.name}</CardTitle>
              <CardDescription>{dept.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate(dept.path)}>
                Access {dept.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSelection;
