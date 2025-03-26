import { Activity, Calendar, DollarSign, Users } from "lucide-react";
import StatCard from "./StatCard";

interface MetricsOverviewProps {
  metrics?: {
    totalPatients: number;
    appointmentsToday: number;
    revenueThisMonth: number;
    bedOccupancyRate: number;
    patientTrend: { value: number; positive: boolean };
    appointmentTrend: { value: number; positive: boolean };
    revenueTrend: { value: number; positive: boolean };
    occupancyTrend: { value: number; positive: boolean };
  };
}

const MetricsOverview = ({
  metrics = {
    totalPatients: 2547,
    appointmentsToday: 48,
    revenueThisMonth: 125600,
    bedOccupancyRate: 76,
    patientTrend: { value: 12.5, positive: true },
    appointmentTrend: { value: 8.3, positive: true },
    revenueTrend: { value: 15.2, positive: true },
    occupancyTrend: { value: 3.7, positive: false },
  },
}: MetricsOverviewProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Hospital Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={metrics.totalPatients.toLocaleString()}
          icon={<Users size={20} />}
          trend={metrics.patientTrend}
        />

        <StatCard
          title="Appointments Today"
          value={metrics.appointmentsToday}
          icon={<Calendar size={20} />}
          trend={metrics.appointmentTrend}
        />

        <StatCard
          title="Revenue This Month"
          value={`$${metrics.revenueThisMonth.toLocaleString()}`}
          icon={<DollarSign size={20} />}
          trend={metrics.revenueTrend}
        />

        <StatCard
          title="Bed Occupancy Rate"
          value={`${metrics.bedOccupancyRate}%`}
          icon={<Activity size={20} />}
          trend={metrics.occupancyTrend}
        />
      </div>
    </div>
  );
};

export default MetricsOverview;
