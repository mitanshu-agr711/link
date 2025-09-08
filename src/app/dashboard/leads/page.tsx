import { LeadsTable } from "@/components/leads/leads-table";
import { LeadsFilters } from "@/components/leads/leads-filters";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600">
            Manage and track your potential customers
          </p>
        </div>
      </div> */}
      
      {/* <LeadsFilters /> */}
      <LeadsTable />
    </div>
  );
}
