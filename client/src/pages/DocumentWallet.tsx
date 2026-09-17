import { useEffect, useState } from "react";
import { Upload, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { DOCUMENT_ICONS, DOCUMENT_LABELS } from "@/data/documentIcons";
import type { DocumentItem, DocumentType } from "@/types";

const UPLOAD_TYPES: DocumentType[] = ["BONAFIDE_CERTIFICATE", "DISABILITY_CERTIFICATE", "ADMIT_CARD"];

function DocumentWalletContent() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const { toast } = useToast();

  const load = () => api.get<DocumentItem[]>("/documents").then(setDocuments).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (type: DocumentType) => {
    setBusyId(type);
    try {
      await api.post("/documents", { type, fileName: `${DOCUMENT_LABELS[type].toLowerCase().replace(/\s+/g, "_")}.pdf` });
      toast({ title: "Document uploaded", description: "It has been queued for government verification.", variant: "info" });
      await load();
    } finally {
      setBusyId(null);
    }
  };

  const handleVerify = async (doc: DocumentItem) => {
    setBusyId(doc.id);
    try {
      const updated = await api.post<DocumentItem>(`/documents/${doc.id}/verify`);
      setDocuments((prev) => prev.map((d) => (d.id === doc.id ? updated : d)));
      toast({ title: "Verification complete", description: `${DOCUMENT_LABELS[doc.type]} is now ${updated.status.toLowerCase()}.`, variant: "success" });
    } finally {
      setBusyId(null);
    }
  };

  const missingTypes = UPLOAD_TYPES.filter((t) => !documents.some((d) => d.type === t));

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-extrabold text-navy dark:text-navy-100">Document Wallet</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your digitally verified documents, linked directly with DigiLocker and government databases.
      </p>

      {!loading && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {documents.map((doc) => {
            const Icon = DOCUMENT_ICONS[doc.type];
            return (
              <Card key={doc.id} className="flex items-start gap-3 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-gov bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{DOCUMENT_LABELS[doc.type]}</p>
                    <StatusBadge status={doc.status} />
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{doc.fileName}</p>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    Uploaded {formatDate(doc.uploadedAt)}
                    {doc.verifiedSource && ` · Verified via ${doc.verifiedSource}`}
                  </p>
                  {doc.status === "PENDING" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => handleVerify(doc)}
                      disabled={busyId === doc.id}
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {busyId === doc.id ? "Verifying…" : "Run Verification"}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {missingTypes.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-bold text-navy dark:text-navy-200">Add More Documents</h2>
          <div className="flex flex-wrap gap-3">
            {missingTypes.map((type) => (
              <Button key={type} variant="outline" size="sm" onClick={() => handleUpload(type)} disabled={busyId === type}>
                <Upload className="h-3.5 w-3.5" />
                {busyId === type ? "Uploading…" : `Upload ${DOCUMENT_LABELS[type]}`}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function DocumentWallet() {
  return (
    <>
      <Breadcrumb items={[{ label: "Document Wallet" }]} />
      <RequireAuth>
        <DocumentWalletContent />
      </RequireAuth>
    </>
  );
}
