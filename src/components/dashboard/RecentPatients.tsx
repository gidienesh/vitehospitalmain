import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  admissionDate: string;
  department: string;
  status: "active" | "discharged" | "critical" | "pending";
}

interface RecentPatientsProps {
  patients?: Patient[];
  onView?: (patientId: string) => void;
  onEdit?: (patientId: string) => void;
  onDelete?: (patientId: string) => void;
}

const RecentPatients = ({
  patients = [
    {
      id: "P-1001",
      name: "John Smith",
      admissionDate: "2023-06-15",
      department: "Cardiology",
      status: "active",
    },
    {
      id: "P-1002",
      name: "Sarah Johnson",
      admissionDate: "2023-06-14",
      department: "Neurology",
      status: "critical",
    },
    {
      id: "P-1003",
      name: "Michael Brown",
      admissionDate: "2023-06-12",
      department: "Orthopedics",
      status: "discharged",
    },
    {
      id: "P-1004",
      name: "Emily Davis",
      admissionDate: "2023-06-10",
      department: "Pediatrics",
      status: "active",
    },
    {
      id: "P-1005",
      name: "Robert Wilson",
      admissionDate: "2023-06-09",
      department: "Oncology",
      status: "pending",
    },
  ],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: RecentPatientsProps) => {
  const getStatusBadge = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary">Active</Badge>;
      case "discharged":
        return <Badge variant="outline">Discharged</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "pending":
        return <Badge variant="default">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{formatDate(patient.admissionDate)}</TableCell>
                <TableCell>{patient.department}</TableCell>
                <TableCell>{getStatusBadge(patient.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(patient.id)}
                      title="View patient details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(patient.id)}
                      title="Edit patient"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(patient.id)}
                      title="Delete patient"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {patients.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No recent patients found
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div>Showing {patients.length} patients</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentPatients;
