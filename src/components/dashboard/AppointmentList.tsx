import { Calendar, Clock, MoreVertical } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar?: string;
  time: string;
  date: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled";
}

interface AppointmentListProps {
  appointments: Appointment[];
  className?: string;
}

const AppointmentList = ({
  appointments,
  className = "",
}: AppointmentListProps) => {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {appointments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No appointments scheduled
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {appointment.patientAvatar ? (
                    <img
                      src={appointment.patientAvatar}
                      alt={appointment.patientName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-medium">
                      {appointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-medium">{appointment.patientName}</h4>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </span>

                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {appointments.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button className="w-full py-2 text-sm text-primary font-medium hover:underline">
            View All Appointments
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
