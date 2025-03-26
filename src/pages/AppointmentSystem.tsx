import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  User,
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  duration: string;
  type: string;
  doctor: string;
  status: "scheduled" | "completed" | "cancelled";
}

const AppointmentSystem = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week">("day");

  // Sample appointment data
  const appointments: Appointment[] = [
    {
      id: "A001",
      patientName: "John Smith",
      patientId: "P001",
      time: "09:00 AM",
      duration: "30 min",
      type: "General Checkup",
      doctor: "Dr. Sarah Wilson",
      status: "scheduled",
    },
    {
      id: "A002",
      patientName: "Emily Davis",
      patientId: "P004",
      time: "10:30 AM",
      duration: "45 min",
      type: "Dental Cleaning",
      doctor: "Dr. Michael Johnson",
      status: "scheduled",
    },
    {
      id: "A003",
      patientName: "Robert Wilson",
      patientId: "P005",
      time: "01:15 PM",
      duration: "60 min",
      type: "Physical Therapy",
      doctor: "Dr. Lisa Brown",
      status: "scheduled",
    },
    {
      id: "A004",
      patientName: "Sarah Johnson",
      patientId: "P002",
      time: "03:00 PM",
      duration: "30 min",
      type: "Follow-up",
      doctor: "Dr. Sarah Wilson",
      status: "scheduled",
    },
  ];

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Navigate to previous day/week
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next day/week
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate time slots for the calendar
  const timeSlots = [];
  for (let hour = 8; hour < 18; hour++) {
    const hourFormatted = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
    timeSlots.push(hourFormatted);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Appointment System</h1>
          <p className="text-gray-500 mt-1">
            Manage and schedule patient appointments
          </p>
        </div>

        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold">{formatDate(currentDate)}</h2>

            <button
              onClick={goToNext}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={goToToday}
              className="ml-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setView("day")}
              className={`px-4 py-2 text-sm ${view === "day" ? "bg-primary text-white" : "hover:bg-gray-50"}`}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 text-sm ${view === "week" ? "bg-primary text-white" : "hover:bg-gray-50"}`}
            >
              Week
            </button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Calendar header */}
            <div className="grid grid-cols-[100px_1fr] border-b border-gray-200">
              <div className="p-3 text-sm font-medium text-gray-500">Time</div>
              <div className="p-3 text-sm font-medium text-gray-500">
                {view === "day" ? "Appointments" : "Week View"}
              </div>
            </div>

            {/* Calendar body */}
            <div className="divide-y divide-gray-200">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[100px_1fr] min-h-[100px]"
                >
                  <div className="p-3 text-sm text-gray-500 border-r border-gray-200">
                    {time}
                  </div>
                  <div className="p-3 relative">
                    {/* Render appointments that match this time slot */}
                    {appointments
                      .filter((app) => app.time === time)
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="absolute top-2 left-2 right-2 p-3 rounded-md bg-blue-50 border-l-4 border-blue-500"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">
                                {appointment.patientName}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {appointment.time} ({appointment.duration})
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <User className="w-3 h-3" />
                                <span>{appointment.doctor}</span>
                              </div>
                            </div>

                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSystem;
