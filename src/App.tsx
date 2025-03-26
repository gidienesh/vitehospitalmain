import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import PatientManagement from "./pages/PatientManagement";
import AppointmentSystem from "./pages/AppointmentSystem";
import BillingModule from "./pages/BillingModule";
import MedicalRecords from "./pages/MedicalRecords";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<PatientManagement />} />
            <Route path="appointments" element={<AppointmentSystem />} />
            <Route path="billing" element={<BillingModule />} />
            <Route path="records" element={<MedicalRecords />} />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
