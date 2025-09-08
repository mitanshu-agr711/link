import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { CampaignsStats } from "@/components/campaigns/campaigns-stats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600">
            Create and manage your outreach campaigns
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>
      
      <CampaignsStats />
      <CampaignsTable />
    </div>
  );
}
