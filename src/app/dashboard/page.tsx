import { DashboardOverview } from "@/components/dashboard/overview";
// import { DatabaseStatus } from "@/components/database/database-status";
// import { DashboardStats } from "@/components/dashboard/stats";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Database Status for monitoring connection */}
      {/* <DatabaseStatus /> */}
      
      {/* <DashboardStats /> */}
      <DashboardOverview />
    </div>
  );
}
