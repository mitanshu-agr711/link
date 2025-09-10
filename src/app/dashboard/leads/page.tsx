import { LeadsTable } from "@/components/leads/leads-table";

// Force dynamic rendering since this page may access session data
export const dynamic = 'force-dynamic';

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <LeadsTable />
    </div>
  );
}
