import { CampaignDetails } from "@/components/campaigns/campaign-details";

// This would typically get the campaign data from an API or database
// For now, we'll use mock data that matches the campaign ID
const getCampaignById = (id: string) => {
  const mockCampaigns = [
    {
      id: "1",
      name: "Q4 Enterprise Outreach",
      status: "active",
      totalLeads: 145,
      successfulLeads: 23,
      responseRate: 15.8,
      createdDate: "2024-01-01",
      description: "Targeting enterprise clients for Q4 sales push"
    },
    {
      id: "2",
      name: "Holiday Season Campaign",
      status: "paused",
      totalLeads: 89,
      successfulLeads: 12,
      responseRate: 13.5,
      createdDate: "2023-12-15",
      description: "Holiday-themed outreach campaign"
    },
    {
      id: "3",
      name: "New Year 2024 Push",
      status: "completed",
      totalLeads: 200,
      successfulLeads: 45,
      responseRate: 22.5,
      createdDate: "2023-12-28",
      description: "New Year business development campaign"
    },
    {
      id: "4",
      name: "Industry Conference Follow-up",
      status: "draft",
      totalLeads: 67,
      successfulLeads: 0,
      responseRate: 0,
      createdDate: "2024-01-10",
      description: "Following up with conference attendees"
    },
    {
      id: "5",
      name: "Spring Product Launch",
      status: "active",
      totalLeads: 178,
      successfulLeads: 31,
      responseRate: 17.4,
      createdDate: "2024-02-01",
      description: "Promoting new product features to prospects"
    },
    {
      id: "6",
      name: "LinkedIn Outreach Series",
      status: "active",
      totalLeads: 234,
      successfulLeads: 42,
      responseRate: 18.9,
      createdDate: "2024-01-15",
      description: "Targeted LinkedIn messaging campaign"
    },
    {
      id: "7",
      name: "Email Marketing Blast",
      status: "completed",
      totalLeads: 156,
      successfulLeads: 28,
      responseRate: 17.9,
      createdDate: "2023-11-20",
      description: "Monthly newsletter and product updates"
    },
    {
      id: "8",
      name: "Webinar Follow-up",
      status: "paused",
      totalLeads: 98,
      successfulLeads: 15,
      responseRate: 15.3,
      createdDate: "2024-01-05",
      description: "Following up with webinar attendees"
    },
    {
      id: "9",
      name: "Cold Email Outreach",
      status: "active",
      totalLeads: 312,
      successfulLeads: 48,
      responseRate: 15.4,
      createdDate: "2024-02-10",
      description: "Cold outreach to potential customers"
    },
    {
      id: "10",
      name: "Partner Referral Campaign",
      status: "draft",
      totalLeads: 45,
      successfulLeads: 0,
      responseRate: 0,
      createdDate: "2024-02-15",
      description: "Campaign targeting partner referrals"
    }
  ];

  return mockCampaigns.find(campaign => campaign.id === id);
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function CampaignDetailsPage({ params }: PageProps) {
  const campaign = getCampaignById(params.id);

  if (!campaign) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Campaign Not Found</h1>
          <p className="text-muted-foreground">The campaign you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <CampaignDetails campaign={campaign} />;
}
