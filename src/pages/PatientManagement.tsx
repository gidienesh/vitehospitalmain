import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  status: "active" | "inactive";
}

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Sample patient data
  const patients: Patient[] = [
    {
      id: "P001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "(555) 123-4567",
      email: "john.smith@example.com",
      lastVisit: "2023-06-15",
      status: "active",
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      phone: "(555) 987-6543",
      email: "sarah.j@example.com",
      lastVisit: "2023-07-22",
      status: "active",
    },
    {
      id: "P003",
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      phone: "(555) 456-7890",
      email: "m.brown@example.com",
      lastVisit: "2023-05-10",
      status: "inactive",
    },
    {
      id: "P004",
      name: "Emily Davis",
      age: 27,
      gender: "Female",
      phone: "(555) 789-0123",
      email: "emily.d@example.com",
      lastVisit: "2023-08-05",
      status: "active",
    },
    {
      id: "P005",
      name: "Robert Wilson",
      age: 62,
      gender: "Male",
      phone: "(555) 234-5678",
      email: "r.wilson@example.com",
      lastVisit: "2023-04-18",
      status: "active",
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <p className="text-gray-500 mt-1">
            Manage patient records and information
          </p>
        </div>

        <button
          onClick={() => navigate("/patient-registration")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {patient.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>{patient.phone}</div>
                    <div className="text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${patient.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {patient.status.charAt(0).toUpperCase() +
                        patient.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="View Patient"
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="Edit Patient"
                      >
                        <Edit className="w-4 h-4 text-amber-500" />
                      </button>
                      <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="Delete Patient"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">{filteredPatients.length}</span> of{" "}
            <span className="font-medium">{patients.length}</span> patients
          </div>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;
