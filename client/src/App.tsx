import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { Schemes } from "@/pages/Schemes";
import { ScholarshipDetails } from "@/pages/ScholarshipDetails";
import { TrackApplication } from "@/pages/TrackApplication";
import { Chatbot } from "@/pages/Chatbot";
import { DocumentWallet } from "@/pages/DocumentWallet";
import { EligibilityChecker } from "@/pages/EligibilityChecker";
import { Notifications } from "@/pages/Notifications";
import { HelpCenter } from "@/pages/HelpCenter";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/schemes/:id" element={<ScholarshipDetails />} />
        <Route path="/eligibility" element={<EligibilityChecker />} />
        <Route path="/track" element={<TrackApplication />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/documents" element={<DocumentWallet />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
