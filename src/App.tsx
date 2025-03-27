import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import PatientManagement from "./pages/PatientManagement";
import AppointmentSystem from "./pages/AppointmentSystem";
import BillingModule from "./pages/BillingModule";
import MedicalRecords from "./pages/MedicalRecords";
import Pharmacy from "./pages/Pharmacy";
import Laboratory from "./pages/Laboratory";
import Vitals from "./pages/Vitals";
import Settings from "./pages/Settings";
import DepartmentSelection from "./pages/DepartmentSelection";
import Home from "./components/home";
import { ThemeProvider } from "./components/ui/theme-provider";
import PatientRegistrationForm from "./components/forms/PatientRegistrationForm";
import AppointmentForm from "./components/forms/AppointmentForm";
import BillingForm from "./components/forms/BillingForm";
import MedicalRecordForm from "./components/forms/MedicalRecordForm";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="hms-theme">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<PatientManagement />} />
              <Route
                path="patient-registration"
                element={<PatientRegistrationForm />}
              />
              <Route path="appointments" element={<AppointmentSystem />} />
              <Route path="appointment-form" element={<AppointmentForm />} />
              <Route path="billing" element={<BillingModule />} />
              <Route path="billing-form" element={<BillingForm />} />
              <Route path="records" element={<MedicalRecords />} />
              <Route
                path="medical-record-form"
                element={<MedicalRecordForm />}
              />
              <Route path="pharmacy" element={<Pharmacy />} />
              <Route path="laboratory" element={<Laboratory />} />
              <Route path="vitals" element={<Vitals />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/departments" element={<DepartmentSelection />} />
            <Route path="/home" element={<Home />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
