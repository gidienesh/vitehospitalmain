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
  Pill,
  Package,
} from "lucide-react";

const Pharmacy = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  // Mock data for medications
  const medications = [
    {
      id: 1,
      name: "Amoxicillin",
      category: "Antibiotic",
      stock: 120,
      unit: "Tablets",
      expiry: "2024-12-31",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Lisinopril",
      category: "Antihypertensive",
      stock: 85,
      unit: "Tablets",
      expiry: "2024-10-15",
      status: "In Stock",
    },
    {
      id: 3,
      name: "Ibuprofen",
      category: "NSAID",
      stock: 200,
      unit: "Tablets",
      expiry: "2025-03-20",
      status: "In Stock",
    },
    {
      id: 4,
      name: "Salbutamol",
      category: "Bronchodilator",
      stock: 15,
      unit: "Inhalers",
      expiry: "2024-08-10",
      status: "Low Stock",
    },
    {
      id: 5,
      name: "Metformin",
      category: "Antidiabetic",
      stock: 150,
      unit: "Tablets",
      expiry: "2024-11-30",
      status: "In Stock",
    },
    {
      id: 6,
      name: "Atorvastatin",
      category: "Statin",
      stock: 10,
      unit: "Tablets",
      expiry: "2024-07-15",
      status: "Low Stock",
    },
  ];

  // Mock data for prescriptions
  const prescriptions = [
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      medications: "Amoxicillin 500mg",
      instructions: "1 tablet 3 times daily for 7 days",
      date: "2023-06-15",
      status: "Dispensed",
    },
    {
      id: 2,
      patient: "Emily Davis",
      doctor: "Dr. Michael Brown",
      medications: "Lisinopril 10mg",
      instructions: "1 tablet daily",
      date: "2023-06-14",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Robert Wilson",
      doctor: "Dr. John Doe",
      medications: "Ibuprofen 400mg",
      instructions: "1 tablet every 6 hours as needed for pain",
      date: "2023-06-14",
      status: "Dispensed",
    },
    {
      id: 4,
      patient: "Jennifer Lee",
      doctor: "Dr. Sarah Johnson",
      medications: "Salbutamol Inhaler",
      instructions: "2 puffs every 4-6 hours as needed",
      date: "2023-06-13",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pharmacy Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Medication
        </Button>
      </div>

      <Tabs
        defaultValue="inventory"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">
            <Package className="mr-2 h-4 w-4" /> Inventory
          </TabsTrigger>
          <TabsTrigger value="prescriptions">
            <FileText className="mr-2 h-4 w-4" /> Prescriptions
          </TabsTrigger>
          <TabsTrigger value="dispensing">
            <Pill className="mr-2 h-4 w-4" /> Dispensing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Medication Inventory</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search medications..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.category}</TableCell>
                      <TableCell>{med.stock}</TableCell>
                      <TableCell>{med.unit}</TableCell>
                      <TableCell>{med.expiry}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            med.status === "Low Stock"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {med.status}
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

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Prescription Management</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prescriptions..."
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Medications</TableHead>
                    <TableHead>Instructions</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">
                        {prescription.patient}
                      </TableCell>
                      <TableCell>{prescription.doctor}</TableCell>
                      <TableCell>{prescription.medications}</TableCell>
                      <TableCell>{prescription.instructions}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            prescription.status === "Pending"
                              ? "secondary"
                              : "success"
                          }
                        >
                          {prescription.status}
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

        <TabsContent value="dispensing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medication Dispensing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient</label>
                    <Input placeholder="Search patient..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prescription</label>
                    <Input placeholder="Prescription ID..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Medications</label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Instructions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="Select medication..." />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Dosage..." />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Quantity..." type="number" />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Instructions..." />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Another Medication
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Input placeholder="Additional notes..." />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Dispense Medication</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pharmacy;
