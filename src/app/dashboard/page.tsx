import { DashboardOverview } from "@/components/dashboard/overview";

// Force dynamic rendering since dashboard requires session data
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
    
      <DashboardOverview />
    </div>
  );
}
