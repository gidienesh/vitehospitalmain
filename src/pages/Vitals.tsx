import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Activity, LineChart, Clock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Vitals = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedPatient, setSelectedPatient] = useState("John Smith");

  // Mock data for vitals
  const vitalsData = [
    {
      id: 1,
      patient: "John Smith",
      date: "2023-06-15 09:30",
      bp: "120/80",
      pulse: 72,
      temp: 98.6,
      respRate: 16,
      spo2: 98,
      weight: 70,
      height: 175,
    },
    {
      id: 2,
      patient: "Emily Davis",
      date: "2023-06-15 10:15",
      bp: "118/76",
      pulse: 68,
      temp: 98.4,
      respRate: 14,
      spo2: 99,
      weight: 65,
      height: 165,
    },
    {
      id: 3,
      patient: "Robert Wilson",
      date: "2023-06-15 11:00",
      bp: "135/85",
      pulse: 76,
      temp: 99.1,
      respRate: 18,
      spo2: 97,
      weight: 80,
      height: 180,
    },
    {
      id: 4,
      patient: "Jennifer Lee",
      date: "2023-06-15 11:45",
      bp: "110/70",
      pulse: 64,
      temp: 98.2,
      respRate: 15,
      spo2: 98,
      weight: 58,
      height: 160,
    },
    {
      id: 5,
      patient: "John Smith",
      date: "2023-06-14 09:15",
      bp: "122/82",
      pulse: 74,
      temp: 98.8,
      respRate: 16,
      spo2: 97,
      weight: 70,
      height: 175,
    },
  ];

  // Mock data for trends
  const trendData = [
    {
      date: "Jun 10",
      bp: "122/82",
      pulse: 74,
      temp: 98.8,
      systolic: 122,
      diastolic: 82,
    },
    {
      date: "Jun 11",
      bp: "124/80",
      pulse: 72,
      temp: 98.6,
      systolic: 124,
      diastolic: 80,
    },
    {
      date: "Jun 12",
      bp: "118/78",
      pulse: 70,
      temp: 98.4,
      systolic: 118,
      diastolic: 78,
    },
    {
      date: "Jun 13",
      bp: "120/80",
      pulse: 72,
      temp: 98.6,
      systolic: 120,
      diastolic: 80,
    },
    {
      date: "Jun 14",
      bp: "122/82",
      pulse: 74,
      temp: 98.8,
      systolic: 122,
      diastolic: 82,
    },
    {
      date: "Jun 15",
      bp: "120/80",
      pulse: 72,
      temp: 98.6,
      systolic: 120,
      diastolic: 80,
    },
  ];

  // Filter vitals for the selected patient
  const patientVitals = vitalsData.filter(
    (vital) => vital.patient === selectedPatient,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vitals Monitoring</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Record New Vitals
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Patient</label>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger>
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="John Smith">John Smith</SelectItem>
              <SelectItem value="Emily Davis">Emily Davis</SelectItem>
              <SelectItem value="Robert Wilson">Robert Wilson</SelectItem>
              <SelectItem value="Jennifer Lee">Jennifer Lee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue="current"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">
            <Activity className="mr-2 h-4 w-4" /> Current Vitals
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" /> Vitals History
          </TabsTrigger>
          <TabsTrigger value="trends">
            <LineChart className="mr-2 h-4 w-4" /> Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {selectedPatient}'s Current Vitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patientVitals.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {patientVitals[0].bp}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Blood Pressure
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {patientVitals[0].pulse}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Pulse (bpm)
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {patientVitals[0].temp}°F
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Temperature
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {patientVitals[0].respRate}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Respiratory Rate
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {patientVitals[0].spo2}%
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">SpO2</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {patientVitals[0].weight} kg
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Weight
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {patientVitals[0].height} cm
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Height
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {(
                          patientVitals[0].weight /
                          (patientVitals[0].height / 100) ** 2
                        ).toFixed(1)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">BMI</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No vitals recorded for this patient
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Vitals History</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by date..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Pulse</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Resp. Rate</TableHead>
                    <TableHead>SpO2</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Height</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientVitals.map((vital) => (
                    <TableRow key={vital.id}>
                      <TableCell className="font-medium">
                        {vital.date}
                      </TableCell>
                      <TableCell>{vital.bp}</TableCell>
                      <TableCell>{vital.pulse}</TableCell>
                      <TableCell>{vital.temp}°F</TableCell>
                      <TableCell>{vital.respRate}</TableCell>
                      <TableCell>{vital.spo2}%</TableCell>
                      <TableCell>{vital.weight} kg</TableCell>
                      <TableCell>{vital.height} cm</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Blood Pressure</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="systolic"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                          name="Systolic"
                        />
                        <Area
                          type="monotone"
                          dataKey="diastolic"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.3}
                          name="Diastolic"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Pulse Rate</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="pulse"
                          stroke="#ff8042"
                          fill="#ff8042"
                          fillOpacity={0.3}
                          name="Pulse"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Temperature</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[98, 100]} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="temp"
                          stroke="#ff0000"
                          fill="#ff0000"
                          fillOpacity={0.3}
                          name="Temperature"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vitals;
