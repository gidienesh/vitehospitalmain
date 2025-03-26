import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MetricsOverview from "@/components/dashboard/MetricsOverview";
import PatientStatistics from "@/components/dashboard/PatientStatistics";
import AppointmentCalendar from "@/components/dashboard/AppointmentCalendar";
import RecentPatients from "@/components/dashboard/RecentPatients";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle navigation to different modules
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Handle patient actions
  const handleViewPatient = (patientId: string) => {
    console.log(`Viewing patient: ${patientId}`);
    // In a real app, this would navigate to patient details
    // navigate(`/patient-management/${patientId}`);
  };

  const handleEditPatient = (patientId: string) => {
    console.log(`Editing patient: ${patientId}`);
    // In a real app, this would navigate to patient edit form
    // navigate(`/patient-management/${patientId}/edit`);
  };

  const handleDeletePatient = (patientId: string) => {
    console.log(`Deleting patient: ${patientId}`);
    // In a real app, this would show a confirmation dialog
  };

  // Handle appointment actions
  const handleViewAppointment = (appointmentId: string) => {
    console.log(`Viewing appointment: ${appointmentId}`);
    // In a real app, this would show appointment details
  };

  const handleAddAppointment = () => {
    console.log("Adding new appointment");
    // In a real app, this would navigate to appointment creation form
    // navigate('/appointment-system/new');
  };

  // Quick action handlers
  const quickActionHandlers = {
    "Register Patient": () => navigate("/patient-management/new"),
    "Schedule Appointment": () => navigate("/appointment-system/new"),
    "Create Invoice": () => navigate("/billing-module/new"),
    "Medical Records": () => navigate("/medical-records"),
    "Bed Management": () => console.log("Navigating to bed management"),
    Pharmacy: () => console.log("Navigating to pharmacy"),
    "Doctor Schedule": () => console.log("Navigating to doctor schedule"),
    "Financial Reports": () => console.log("Navigating to financial reports"),
  };

  // Map quick actions with handlers
  const quickActionsWithHandlers = [
    {
      icon: <UserPlus className="h-5 w-5" />,
      label: "Register Patient",
      description: "Add a new patient to the system",
      onClick: () => quickActionHandlers["Register Patient"](),
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule Appointment",
      description: "Book a new appointment",
      onClick: () => quickActionHandlers["Schedule Appointment"](),
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Create Invoice",
      description: "Generate a new billing invoice",
      onClick: () => quickActionHandlers["Create Invoice"](),
    },
    {
      icon: <FileCheck className="h-5 w-5" />,
      label: "Medical Records",
      description: "Access patient medical files",
      onClick: () => quickActionHandlers["Medical Records"](),
    },
    {
      icon: <Bed className="h-5 w-5" />,
      label: "Bed Management",
      description: "Manage hospital bed allocation",
      onClick: () => quickActionHandlers["Bed Management"](),
    },
    {
      icon: <Pill className="h-5 w-5" />,
      label: "Pharmacy",
      description: "Access medication inventory",
      onClick: () => quickActionHandlers["Pharmacy"](),
    },
    {
      icon: <Stethoscope className="h-5 w-5" />,
      label: "Doctor Schedule",
      description: "View doctor availability",
      onClick: () => quickActionHandlers["Doctor Schedule"](),
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Financial Reports",
      description: "View financial summaries",
      onClick: () => quickActionHandlers["Financial Reports"](),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          pageTitle="Dashboard"
          notificationCount={5}
          userName="Dr. Admin"
          userEmail="admin@hospital.com"
        />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Metrics Overview */}
            <MetricsOverview />

            {/* Middle Section - Statistics and Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatientStatistics />
              <AppointmentCalendar
                onViewAppointment={handleViewAppointment}
                onAddAppointment={handleAddAppointment}
              />
            </div>

            {/* Bottom Section - Recent Patients and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentPatients
                onView={handleViewPatient}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
              />
              <QuickActions actions={quickActionsWithHandlers} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
          <p>© 2023 Hospital Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;

// Import missing icons
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
