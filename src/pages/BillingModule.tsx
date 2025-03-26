import { useState } from "react";
import { Search, Plus, Filter, Download, MoreVertical } from "lucide-react";

interface Invoice {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

const BillingModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Sample invoice data
  const invoices: Invoice[] = [
    {
      id: "INV-001",
      patientName: "John Smith",
      patientId: "P001",
      date: "2023-08-01",
      dueDate: "2023-08-15",
      amount: 450.0,
      status: "paid",
      items: [
        {
          description: "General Consultation",
          quantity: 1,
          unitPrice: 150.0,
          total: 150.0,
        },
        {
          description: "Blood Test",
          quantity: 1,
          unitPrice: 200.0,
          total: 200.0,
        },
        {
          description: "Medication",
          quantity: 2,
          unitPrice: 50.0,
          total: 100.0,
        },
      ],
    },
    {
      id: "INV-002",
      patientName: "Sarah Johnson",
      patientId: "P002",
      date: "2023-08-05",
      dueDate: "2023-08-19",
      amount: 350.0,
      status: "pending",
      items: [
        {
          description: "Dental Cleaning",
          quantity: 1,
          unitPrice: 250.0,
          total: 250.0,
        },
        { description: "X-Ray", quantity: 1, unitPrice: 100.0, total: 100.0 },
      ],
    },
    {
      id: "INV-003",
      patientName: "Michael Brown",
      patientId: "P003",
      date: "2023-07-20",
      dueDate: "2023-08-03",
      amount: 750.0,
      status: "overdue",
      items: [
        {
          description: "Specialist Consultation",
          quantity: 1,
          unitPrice: 300.0,
          total: 300.0,
        },
        {
          description: "MRI Scan",
          quantity: 1,
          unitPrice: 450.0,
          total: 450.0,
        },
      ],
    },
    {
      id: "INV-004",
      patientName: "Emily Davis",
      patientId: "P004",
      date: "2023-08-10",
      dueDate: "2023-08-24",
      amount: 180.0,
      status: "pending",
      items: [
        {
          description: "Follow-up Consultation",
          quantity: 1,
          unitPrice: 100.0,
          total: 100.0,
        },
        {
          description: "Medication",
          quantity: 2,
          unitPrice: 40.0,
          total: 80.0,
        },
      ],
    },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const viewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeInvoiceView = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Billing Module</h1>
          <p className="text-gray-500 mt-1">Manage invoices and payments</p>
        </div>

        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
      </div>

      {selectedInvoice ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Invoice Details</h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={closeInvoiceView}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Invoice Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Invoice ID:</span>{" "}
                    {selectedInvoice.id}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {selectedInvoice.date}
                  </p>
                  <p>
                    <span className="font-medium">Due Date:</span>{" "}
                    {selectedInvoice.dueDate}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}
                    >
                      {selectedInvoice.status.charAt(0).toUpperCase() +
                        selectedInvoice.status.slice(1)}
                    </span>
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
                    {selectedInvoice.patientName}
                  </p>
                  <p>
                    <span className="font-medium">Patient ID:</span>{" "}
                    {selectedInvoice.patientId}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Invoice Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-sm font-medium text-right"
                    >
                      Total Amount:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                      ${selectedInvoice.amount.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
                  placeholder="Search invoices..."
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
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>{invoice.patientName}</div>
                      <div className="text-gray-500">{invoice.patientId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <button
                        onClick={() => viewInvoice(invoice)}
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
              <span className="font-medium">{filteredInvoices.length}</span> of{" "}
              <span className="font-medium">{invoices.length}</span> invoices
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

export default BillingModule;
