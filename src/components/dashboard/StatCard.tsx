import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  trend,
  className = "",
}: StatCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>

          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${trend.positive ? "text-green-500" : "text-red-500"}`}
              >
                {trend.positive ? "+" : ""}
                {trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
