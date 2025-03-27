import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, FileText, Save } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  patientId: z.string().min(1, { message: "Please select a patient." }),
  doctorId: z.string().min(1, { message: "Please select a doctor." }),
  recordDate: z.date({ required_error: "Record date is required." }),
  recordType: z.string().min(1, { message: "Please select a record type." }),
  chiefComplaint: z
    .string()
    .min(5, { message: "Chief complaint must be at least 5 characters." }),
  historyOfPresentIllness: z
    .string()
    .min(5, {
      message: "History of present illness must be at least 5 characters.",
    }),
  vitalSigns: z.object({
    temperature: z.string().optional(),
    heartRate: z.string().optional(),
    respiratoryRate: z.string().optional(),
    bloodPressure: z.string().optional(),
    oxygenSaturation: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
  }),
  physicalExamination: z.string().optional(),
  assessment: z
    .string()
    .min(5, { message: "Assessment must be at least 5 characters." }),
  plan: z.string().min(5, { message: "Plan must be at least 5 characters." }),
  medications: z.string().optional(),
  labOrders: z.string().optional(),
  followUp: z.string().optional(),
  isConfidential: z.boolean().default(false),
});

type MedicalRecordFormValues = z.infer<typeof formSchema>;

// Mock data for dropdowns
const patients = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Emily Davis" },
  { id: "3", name: "Robert Wilson" },
  { id: "4", name: "Jennifer Lee" },
  { id: "5", name: "Michael Johnson" },
];

const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiology" },
  { id: "2", name: "Dr. Michael Brown", specialty: "Neurology" },
  { id: "3", name: "Dr. Emily White", specialty: "Pediatrics" },
  { id: "4", name: "Dr. John Doe", specialty: "Orthopedics" },
  { id: "5", name: "Dr. Lisa Chen", specialty: "Dermatology" },
];

const recordTypes = [
  "Initial Consultation",
  "Follow-up Visit",
  "Annual Physical",
  "Emergency Visit",
  "Specialist Consultation",
  "Surgical Report",
  "Diagnostic Test Results",
  "Vaccination Record",
  "Telemedicine Visit",
];

const MedicalRecordForm = () => {
  const form = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      recordType: "",
      chiefComplaint: "",
      historyOfPresentIllness: "",
      vitalSigns: {
        temperature: "",
        heartRate: "",
        respiratoryRate: "",
        bloodPressure: "",
        oxygenSaturation: "",
        height: "",
        weight: "",
      },
      physicalExamination: "",
      assessment: "",
      plan: "",
      medications: "",
      labOrders: "",
      followUp: "",
      isConfidential: false,
    },
  });

  function onSubmit(values: MedicalRecordFormValues) {
    console.log(values);
    // Here you would typically send the data to your backend
    alert("Medical record created successfully!");
    form.reset();
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-primary/20">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <CardTitle>Medical Record Entry</CardTitle>
        </div>
        <CardDescription>
          Create a new medical record for a patient. All fields marked with *
          are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient, Doctor, and Record Information */}
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recordDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Record Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recordType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select record type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {recordTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Chief Complaint and History */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="chiefComplaint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chief Complaint *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Patient's primary reason for visit"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="historyOfPresentIllness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>History of Present Illness *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the development of the patient's illness"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Vital Signs */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">
                  Vital Signs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="vitalSigns.temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature (°F)</FormLabel>
                        <FormControl>
                          <Input placeholder="98.6" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vitalSigns.heartRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heart Rate (bpm)</FormLabel>
                        <FormControl>
                          <Input placeholder="72" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vitalSigns.respiratoryRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Respiratory Rate (bpm)</FormLabel>
                        <FormControl>
                          <Input placeholder="16" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vitalSigns.bloodPressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Pressure (mmHg)</FormLabel>
                        <FormControl>
                          <Input placeholder="120/80" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vitalSigns.oxygenSaturation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Oxygen Saturation (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="98" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vitalSigns.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="175" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vitalSigns.weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Physical Examination */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="physicalExamination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physical Examination</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Findings from physical examination"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Assessment and Plan */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="assessment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment/Diagnosis *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Clinical assessment and diagnosis"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Treatment Plan *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed treatment plan and recommendations"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Medications and Lab Orders */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medications</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Prescribed medications, dosage, and instructions"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="labOrders"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lab/Diagnostic Orders</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ordered laboratory tests or diagnostic procedures"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Follow-up and Confidentiality */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="followUp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Follow-up Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Follow-up appointment recommendations and instructions"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="isConfidential"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Mark as Confidential</FormLabel>
                        <FormDescription>
                          This record contains sensitive information and should
                          have restricted access.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <CardFooter className="flex justify-end px-0 pb-0">
              <Button type="submit" className="w-full md:w-auto" size="lg">
                <Save className="mr-2 h-4 w-4" />
                Save Medical Record
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordForm;
