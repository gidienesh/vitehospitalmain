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
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  FlaskConical,
  ClipboardList,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Laboratory = () => {
  const [activeTab, setActiveTab] = useState("tests");

  // Mock data for lab tests
  const labTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      date: "2023-06-15",
      status: "Completed",
    },
    {
      id: 2,
      name: "Lipid Panel",
      patient: "Emily Davis",
      doctor: "Dr. Michael Brown",
      date: "2023-06-14",
      status: "Pending",
    },
    {
      id: 3,
      name: "Liver Function Test",
      patient: "Robert Wilson",
      doctor: "Dr. John Doe",
      date: "2023-06-14",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Urinalysis",
      patient: "Jennifer Lee",
      doctor: "Dr. Sarah Johnson",
      date: "2023-06-13",
      status: "Completed",
    },
    {
      id: 5,
      name: "Thyroid Function Test",
      patient: "Michael Johnson",
      doctor: "Dr. Emily White",
      date: "2023-06-12",
      status: "Pending",
    },
  ];

  // Mock data for test results
  const testResults = [
    {
      id: 1,
      test: "Complete Blood Count (CBC)",
      patient: "John Smith",
      parameter: "WBC",
      result: "7.5 x 10^9/L",
      referenceRange: "4.5-11.0 x 10^9/L",
      interpretation: "Normal",
    },
    {
      id: 2,
      test: "Complete Blood Count (CBC)",
      patient: "John Smith",
      parameter: "RBC",
      result: "5.2 x 10^12/L",
      referenceRange: "4.5-5.9 x 10^12/L",
      interpretation: "Normal",
    },
    {
      id: 3,
      test: "Complete Blood Count (CBC)",
      patient: "John Smith",
      parameter: "Hemoglobin",
      result: "14.2 g/dL",
      referenceRange: "13.5-17.5 g/dL",
      interpretation: "Normal",
    },
    {
      id: 4,
      test: "Lipid Panel",
      patient: "Emily Davis",
      parameter: "Total Cholesterol",
      result: "240 mg/dL",
      referenceRange: "<200 mg/dL",
      interpretation: "High",
    },
    {
      id: 5,
      test: "Lipid Panel",
      patient: "Emily Davis",
      parameter: "LDL",
      result: "160 mg/dL",
      referenceRange: "<100 mg/dL",
      interpretation: "High",
    },
    {
      id: 6,
      test: "Urinalysis",
      patient: "Jennifer Lee",
      parameter: "pH",
      result: "6.0",
      referenceRange: "4.5-8.0",
      interpretation: "Normal",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Laboratory Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Order New Test
        </Button>
      </div>

      <Tabs
        defaultValue="tests"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tests">
            <FlaskConical className="mr-2 h-4 w-4" /> Test Orders
          </TabsTrigger>
          <TabsTrigger value="results">
            <ClipboardList className="mr-2 h-4 w-4" /> Test Results
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" /> Test Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Laboratory Test Orders</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tests..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Requesting Doctor</TableHead>
                    <TableHead>Date Ordered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell>{test.patient}</TableCell>
                      <TableCell>{test.doctor}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            test.status === "Completed"
                              ? "default"
                              : test.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Test Results</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search results..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Interpretation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">
                        {result.test}
                      </TableCell>
                      <TableCell>{result.patient}</TableCell>
                      <TableCell>{result.parameter}</TableCell>
                      <TableCell>{result.result}</TableCell>
                      <TableCell>{result.referenceRange}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            result.interpretation === "Normal"
                              ? "default"
                              : result.interpretation === "High"
                                ? "destructive"
                                : result.interpretation === "Low"
                                  ? "secondary"
                                  : "outline"
                          }
                        >
                          {result.interpretation}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template Name</label>
                    <Input placeholder="Enter template name..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hematology">Hematology</SelectItem>
                        <SelectItem value="biochemistry">
                          Biochemistry
                        </SelectItem>
                        <SelectItem value="microbiology">
                          Microbiology
                        </SelectItem>
                        <SelectItem value="immunology">Immunology</SelectItem>
                        <SelectItem value="urinalysis">Urinalysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Parameters</label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter Name</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Reference Range</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="Parameter name..." />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Unit..." />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Reference range..." />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Parameter
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Instructions</label>
                  <Input placeholder="Special instructions..." />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Laboratory;
