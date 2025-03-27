import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  FileText,
  FilePlus,
  Clock,
  User,
  MoreVertical,
} from "lucide-react";

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  recordType: string;
  date: string;
  doctor: string;
  description: string;
  attachments?: string[];
}

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null,
  );
  const navigate = useNavigate();

  // Sample medical records data
  const records: MedicalRecord[] = [
    {
      id: "MR001",
      patientName: "John Smith",
      patientId: "P001",
      recordType: "Consultation",
      date: "2023-08-01",
      doctor: "Dr. Sarah Wilson",
      description:
        "Patient presented with flu-like symptoms. Prescribed antibiotics and rest for 5 days.",
      attachments: ["prescription.pdf", "lab_results.pdf"],
    },
    {
      id: "MR002",
      patientName: "Sarah Johnson",
      patientId: "P002",
      recordType: "Dental Examination",
      date: "2023-07-22",
      doctor: "Dr. Michael Johnson",
      description:
        "Routine dental checkup. No cavities found. Recommended regular flossing.",
    },
    {
      id: "MR003",
      patientName: "Michael Brown",
      patientId: "P003",
      recordType: "Surgery",
      date: "2023-06-15",
      doctor: "Dr. Lisa Brown",
      description:
        "Appendectomy performed. Surgery went well without complications. Patient to return for follow-up in 2 weeks.",
      attachments: ["surgery_notes.pdf", "post_op_instructions.pdf"],
    },
    {
      id: "MR004",
      patientName: "Emily Davis",
      patientId: "P004",
      recordType: "Vaccination",
      date: "2023-08-05",
      doctor: "Dr. Sarah Wilson",
      description:
        "Administered annual flu vaccine. No adverse reactions observed.",
    },
    {
      id: "MR005",
      patientName: "John Smith",
      patientId: "P001",
      recordType: "Lab Test",
      date: "2023-07-28",
      doctor: "Dr. Sarah Wilson",
      description:
        "Complete blood count and metabolic panel. Results within normal range.",
      attachments: ["lab_results.pdf"],
    },
  ];

  const filteredRecords = records.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const viewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const closeRecordView = () => {
    setSelectedRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <p className="text-gray-500 mt-1">
            View and manage patient medical records
          </p>
        </div>

        <button
          onClick={() => navigate("/medical-record-form")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <FilePlus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {selectedRecord ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Medical Record Details</h2>
            <button
              onClick={closeRecordView}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Record Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Record ID:</span>{" "}
                    {selectedRecord.id}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {selectedRecord.recordType}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {selectedRecord.date}
                  </p>
                  <p>
                    <span className="font-medium">Doctor:</span>{" "}
                    {selectedRecord.doctor}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Patient Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Patient Name:</span>{" "}
                    {selectedRecord.patientName}
                  </p>
                  <p>
                    <span className="font-medium">Patient ID:</span>{" "}
                    {selectedRecord.patientId}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Description
              </h3>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm">{selectedRecord.description}</p>
              </div>
            </div>

            {selectedRecord.attachments &&
              selectedRecord.attachments.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Attachments
                  </h3>
                  <div className="space-y-2">
                    {selectedRecord.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-md"
                      >
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-sm">{attachment}</span>
                        <button className="ml-auto text-primary text-sm hover:underline">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search records..."
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
                    Record ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {record.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>{record.patientName}</div>
                      <div className="text-gray-500">{record.patientId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.recordType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <button
                        onClick={() => viewRecord(record)}
                        className="text-primary hover:underline mr-3"
                      >
                        View
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredRecords.length}</span> of{" "}
              <span className="font-medium">{records.length}</span> records
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
      )}
    </div>
  );
};

export default MedicalRecords;
