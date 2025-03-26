import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PatientStatisticsProps {
  data?: {
    demographics: {
      male: number;
      female: number;
      other: number;
    };
    ageGroups: {
      "0-18": number;
      "19-35": number;
      "36-50": number;
      "51-65": number;
      "65+": number;
    };
    admissionTrend: {
      month: string;
      count: number;
    }[];
    departmentDistribution: {
      department: string;
      count: number;
    }[];
  };
}

const PatientStatistics = ({ data }: PatientStatisticsProps) => {
  // Default mock data if none is provided
  const defaultData = {
    demographics: {
      male: 1245,
      female: 1532,
      other: 87,
    },
    ageGroups: {
      "0-18": 487,
      "19-35": 876,
      "36-50": 743,
      "51-65": 512,
      "65+": 246,
    },
    admissionTrend: [
      { month: "Jan", count: 145 },
      { month: "Feb", count: 132 },
      { month: "Mar", count: 164 },
      { month: "Apr", count: 187 },
      { month: "May", count: 201 },
      { month: "Jun", count: 176 },
    ],
    departmentDistribution: [
      { department: "Cardiology", count: 342 },
      { department: "Neurology", count: 257 },
      { department: "Pediatrics", count: 412 },
      { department: "Orthopedics", count: 289 },
      { department: "Oncology", count: 198 },
    ],
  };

  const stats = data || defaultData;

  // Calculate total patients for demographics
  const totalPatients =
    stats.demographics.male +
    stats.demographics.female +
    stats.demographics.other;

  // Function to calculate percentage
  const calculatePercentage = (value: number, total: number) => {
    return Math.round((value / total) * 100);
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Patient Statistics
          </CardTitle>
          <Select defaultValue="sixMonths">
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="threeMonths">Last 3 Months</SelectItem>
              <SelectItem value="sixMonths">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demographics" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Gender Distribution</h4>
                <div className="h-[180px] flex flex-col justify-center space-y-2">
                  {/* Gender bars */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Male</span>
                      <span>
                        {calculatePercentage(
                          stats.demographics.male,
                          totalPatients,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{
                          width: `${calculatePercentage(stats.demographics.male, totalPatients)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Female</span>
                      <span>
                        {calculatePercentage(
                          stats.demographics.female,
                          totalPatients,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-pink-500 h-2.5 rounded-full"
                        style={{
                          width: `${calculatePercentage(stats.demographics.female, totalPatients)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Other</span>
                      <span>
                        {calculatePercentage(
                          stats.demographics.other,
                          totalPatients,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{
                          width: `${calculatePercentage(stats.demographics.other, totalPatients)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Age Distribution</h4>
                <div className="h-[180px] flex flex-col justify-center space-y-2">
                  {/* Age group bars */}
                  {Object.entries(stats.ageGroups).map(([ageGroup, count]) => (
                    <div key={ageGroup} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{ageGroup}</span>
                        <span>{count}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{
                            width: `${calculatePercentage(count, totalPatients)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admissions">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Monthly Admission Trend</h4>
              <div className="h-[220px] flex items-end justify-between gap-2 pt-6">
                {stats.admissionTrend.map((item) => {
                  const maxCount = Math.max(
                    ...stats.admissionTrend.map((i) => i.count),
                  );
                  const heightPercentage = (item.count / maxCount) * 100;

                  return (
                    <div
                      key={item.month}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="w-10 bg-blue-400 rounded-t-sm"
                        style={{ height: `${heightPercentage * 1.8}px` }}
                      ></div>
                      <span className="text-xs mt-2">{item.month}</span>
                      <span className="text-xs text-gray-500">
                        {item.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="departments">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Department Distribution</h4>
              <div className="h-[220px] space-y-3 pt-2">
                {stats.departmentDistribution.map((item) => {
                  const totalDeptPatients = stats.departmentDistribution.reduce(
                    (sum, curr) => sum + curr.count,
                    0,
                  );
                  const percentage = calculatePercentage(
                    item.count,
                    totalDeptPatients,
                  );

                  return (
                    <div key={item.department} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{item.department}</span>
                        <span>
                          {item.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                          className="bg-indigo-500 h-3 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatientStatistics;
