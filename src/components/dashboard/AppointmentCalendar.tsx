import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays } from "date-fns";

type Appointment = {
  id: string;
  patientName: string;
  time: string;
  type: "checkup" | "surgery" | "consultation" | "followup";
  doctor: string;
};

type AppointmentCalendarProps = {
  appointments?: Appointment[];
  onViewAppointment?: (id: string) => void;
  onAddAppointment?: () => void;
};

const typeColors = {
  checkup: "bg-green-100 text-green-800 hover:bg-green-200",
  surgery: "bg-red-100 text-red-800 hover:bg-red-200",
  consultation: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  followup: "bg-amber-100 text-amber-800 hover:bg-amber-200",
};

const AppointmentCalendar = ({
  appointments = [
    {
      id: "1",
      patientName: "John Doe",
      time: "09:00 AM",
      type: "checkup",
      doctor: "Dr. Smith",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      time: "10:30 AM",
      type: "consultation",
      doctor: "Dr. Johnson",
    },
    {
      id: "3",
      patientName: "Robert Brown",
      time: "01:15 PM",
      type: "surgery",
      doctor: "Dr. Williams",
    },
    {
      id: "4",
      patientName: "Emily Davis",
      time: "03:45 PM",
      type: "followup",
      doctor: "Dr. Miller",
    },
  ],
  onViewAppointment = () => {},
  onAddAppointment = () => {},
}: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "day">("calendar");

  // Filter appointments for the selected date (in a real app, this would filter by actual date)
  const todaysAppointments = appointments;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setView("day");
    }
  };

  const handleBackToCalendar = () => {
    setView("calendar");
  };

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const handlePrevDay = () => {
    setSelectedDate(addDays(selectedDate, -1));
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Appointments</CardTitle>
        <Button size="sm" onClick={onAddAppointment} className="h-8 gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Appointment</span>
        </Button>
      </CardHeader>
      <CardContent>
        {view === "calendar" ? (
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={handlePrevDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-md font-medium">
                {format(selectedDate, "MMMM d, yyyy")}
              </h3>
              <Button variant="outline" size="sm" onClick={handleNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2"
              onClick={handleBackToCalendar}
            >
              Back to Calendar
            </Button>
            <div className="space-y-2">
              {todaysAppointments.length > 0 ? (
                todaysAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewAppointment(appointment.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {appointment.patientName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {appointment.time} • {appointment.doctor}
                      </span>
                    </div>
                    <Badge className={typeColors[appointment.type]}>
                      {appointment.type.charAt(0).toUpperCase() +
                        appointment.type.slice(1)}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No appointments scheduled for this day
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex flex-wrap gap-2 justify-center text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Checkup</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Consultation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Surgery</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Follow-up</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentCalendar;
