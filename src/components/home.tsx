import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  CreditCard,
  FileText,
  ArrowRight,
} from "lucide-react";

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
  ];

  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Hospital Management System
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A comprehensive solution that streamlines hospital operations by
            integrating patient management, appointment scheduling, billing, and
            medical records.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
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
