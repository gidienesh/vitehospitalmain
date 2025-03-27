import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  CreditCard,
  FileText,
  ArrowRight,
  Pill,
  FlaskConical,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Patient Management",
      description:
        "Register and manage patient information, medical history, and personal details.",
      icon: <Users className="w-10 h-10 text-primary" />,
      path: "/patients",
    },
    {
      title: "Appointment System",
      description:
        "Schedule and manage appointments with interactive calendar and reminders.",
      icon: <Calendar className="w-10 h-10 text-primary" />,
      path: "/appointments",
    },
    {
      title: "Billing Module",
      description:
        "Generate invoices, process payments, and manage financial reporting.",
      icon: <CreditCard className="w-10 h-10 text-primary" />,
      path: "/billing",
    },
    {
      title: "Medical Records",
      description:
        "Secure storage for patient histories, test results, and treatment plans.",
      icon: <FileText className="w-10 h-10 text-primary" />,
      path: "/records",
    },
    {
      title: "Pharmacy",
      description: "Manage medications, prescriptions, and inventory tracking.",
      icon: <Pill className="w-10 h-10 text-primary" />,
      path: "/pharmacy",
    },
    {
      title: "Laboratory",
      description: "Order and track lab tests, manage results and templates.",
      icon: <FlaskConical className="w-10 h-10 text-primary" />,
      path: "/laboratory",
    },
    {
      title: "Vitals Monitoring",
      description:
        "Record and monitor patient vital signs with trend analysis.",
      icon: <Activity className="w-10 h-10 text-primary" />,
      path: "/vitals",
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-md bg-primary flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
            H
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Hospital Management System
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A comprehensive solution that streamlines hospital operations by
            integrating patient management, appointment scheduling, billing, and
            medical records.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              onClick={() => navigate("/departments")}
              className="w-full sm:w-auto"
            >
              Select Department
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card hover:bg-card/90 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-border"
              onClick={() => navigate(feature.path)}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <div className="bg-muted/50 px-4 py-4 sm:px-6 flex justify-end">
                <div className="text-sm flex items-center text-primary font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
