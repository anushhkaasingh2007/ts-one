import type { NotificationItem } from "@/types";

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Income certificate verified",
    message: "Your income certificate was successfully verified via State e-District services.",
    category: "VERIFICATION",
    read: false,
    createdAt: "2025-09-14T09:20:00.000Z",
  },
  {
    id: "n2",
    title: "Application moved to institute verification",
    message: "Your Post-Matric Scholarship application has been forwarded to your institute for verification.",
    category: "APPLICATION",
    read: false,
    createdAt: "2025-09-10T14:05:00.000Z",
  },
  {
    id: "n3",
    title: "Scholarship sanctioned",
    message: "Congratulations! Your Post-Matric Scholarship of ₹48,000 has been sanctioned.",
    category: "SANCTION",
    read: true,
    createdAt: "2025-08-14T11:45:00.000Z",
  },
  {
    id: "n4",
    title: "DBT credited",
    message: "₹48,000 has been credited to your Aadhaar-linked bank account via Direct Benefit Transfer.",
    category: "DBT",
    read: true,
    createdAt: "2025-08-18T16:30:00.000Z",
  },
  {
    id: "n5",
    title: "Document reminder",
    message: "Please upload your latest bonafide certificate to avoid delay in Top Class Education Scheme processing.",
    category: "GENERAL",
    read: true,
    createdAt: "2025-08-02T10:00:00.000Z",
  },
];
