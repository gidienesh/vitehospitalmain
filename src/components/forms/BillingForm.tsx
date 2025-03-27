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
import { CreditCard, Plus, Save, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  patientId: z.string().min(1, { message: "Please select a patient." }),
  invoiceDate: z.string().min(1, { message: "Invoice date is required." }),
  dueDate: z.string().min(1, { message: "Due date is required." }),
  paymentMethod: z
    .string()
    .min(1, { message: "Please select a payment method." }),
  items: z
    .array(
      z.object({
        description: z.string().min(1, { message: "Description is required." }),
        quantity: z
          .number()
          .min(1, { message: "Quantity must be at least 1." }),
        unitPrice: z
          .number()
          .min(0.01, { message: "Unit price must be greater than 0." }),
        amount: z.number(),
      }),
    )
    .min(1, { message: "At least one item is required." }),
  subtotal: z.number(),
  taxRate: z.number().min(0, { message: "Tax rate cannot be negative." }),
  taxAmount: z.number(),
  discount: z.number().min(0, { message: "Discount cannot be negative." }),
  total: z.number(),
  notes: z.string().optional(),
});

type BillingFormValues = z.infer<typeof formSchema>;

// Mock data for dropdowns
const patients = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Emily Davis" },
  { id: "3", name: "Robert Wilson" },
  { id: "4", name: "Jennifer Lee" },
  { id: "5", name: "Michael Johnson" },
];

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Check",
  "Insurance",
  "Bank Transfer",
  "Mobile Payment",
];

const BillingForm = () => {
  const [items, setItems] = React.useState([
    {
      id: 1,
      description: "Consultation",
      quantity: 1,
      unitPrice: 150,
      amount: 150,
    },
  ]);

  const [subtotal, setSubtotal] = React.useState(150);
  const [taxRate, setTaxRate] = React.useState(7.5);
  const [taxAmount, setTaxAmount] = React.useState(11.25);
  const [discount, setDiscount] = React.useState(0);
  const [total, setTotal] = React.useState(161.25);

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(
        new Date(new Date().setDate(new Date().getDate() + 30)),
        "yyyy-MM-dd",
      ),
      paymentMethod: "",
      items: [
        {
          description: "Consultation",
          quantity: 1,
          unitPrice: 150,
          amount: 150,
        },
      ],
      subtotal: 150,
      taxRate: 7.5,
      taxAmount: 11.25,
      discount: 0,
      total: 161.25,
      notes: "",
    },
  });

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      description: "",
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
    recalculateTotals([...items, newItem]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      recalculateTotals(updatedItems);
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        // Recalculate amount if quantity or unitPrice changes
        if (field === "quantity" || field === "unitPrice") {
          updatedItem.amount =
            Number(updatedItem.quantity) * Number(updatedItem.unitPrice);
        }

        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
    recalculateTotals(updatedItems);
  };

  const recalculateTotals = (currentItems: any[]) => {
    const newSubtotal = currentItems.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );
    const newTaxAmount = (newSubtotal * taxRate) / 100;
    const newTotal = newSubtotal + newTaxAmount - discount;

    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
    setTotal(newTotal);

    // Update form values
    form.setValue("subtotal", newSubtotal);
    form.setValue("taxAmount", newTaxAmount);
    form.setValue("total", newTotal);
    form.setValue("items", currentItems);
  };

  const handleTaxRateChange = (value: string) => {
    const newTaxRate = Number(value);
    setTaxRate(newTaxRate);
    const newTaxAmount = (subtotal * newTaxRate) / 100;
    setTaxAmount(newTaxAmount);
    setTotal(subtotal + newTaxAmount - discount);

    // Update form values
    form.setValue("taxRate", newTaxRate);
    form.setValue("taxAmount", newTaxAmount);
    form.setValue("total", subtotal + newTaxAmount - discount);
  };

  const handleDiscountChange = (value: string) => {
    const newDiscount = Number(value);
    setDiscount(newDiscount);
    setTotal(subtotal + taxAmount - newDiscount);

    // Update form values
    form.setValue("discount", newDiscount);
    form.setValue("total", subtotal + taxAmount - newDiscount);
  };

  function onSubmit(values: BillingFormValues) {
    console.log(values);
    // Here you would typically send the data to your backend
    alert("Invoice created successfully!");
    form.reset();
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-primary/20">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <CardTitle>Create Invoice</CardTitle>
        </div>
        <CardDescription>
          Create a new invoice for a patient. All fields marked with * are
          required.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Selection and Invoice Details */}
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
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
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
                name="invoiceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Invoice Items *</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Description</TableHead>
                    <TableHead className="w-[15%]">Quantity</TableHead>
                    <TableHead className="w-[20%]">Unit Price ($)</TableHead>
                    <TableHead className="w-[20%]">Amount ($)</TableHead>
                    <TableHead className="w-[5%]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(item.id, "description", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "quantity",
                              Number(e.target.value),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "unitPrice",
                              Number(e.target.value),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          readOnly
                          value={item.amount.toFixed(2)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totals */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-end space-y-2">
                <div className="w-full md:w-1/2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <span className="font-medium">Tax Rate (%):</span>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      className="w-24"
                      value={taxRate}
                      onChange={(e) => handleTaxRateChange(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tax Amount:</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <span className="font-medium">Discount ($):</span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-24"
                      value={discount}
                      onChange={(e) => handleDiscountChange(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-lg">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes or payment instructions"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include any special instructions or notes for this invoice.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-end px-0 pb-0">
              <Button type="submit" className="w-full md:w-auto" size="lg">
                <Save className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BillingForm;
