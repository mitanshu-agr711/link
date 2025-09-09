"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Edit, BarChart3, Users, MessageSquare, Settings, ChevronRight } from "lucide-react";

interface CampaignDetailsProps {
  campaign: any;
}

export function CampaignDetails({ campaign }: CampaignDetailsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "leads", label: "Leads", icon: Users },
    { id: "sequence", label: "Sequence", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "paused": return "warning"; 
      case "completed": return "default";
      case "draft": return "secondary";
      default: return "secondary";
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{campaign.totalLeads}</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{Math.round(campaign.totalLeads * 0.85)}</div>
            <div className="text-sm text-muted-foreground">Request Sent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{campaign.responseRate}%</div>
            <div className="text-sm text-muted-foreground">Request Accept</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((campaign.successfulLeads / campaign.totalLeads) * 100) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Request Replied</div>
          </CardContent>
        </Card>
      </div>

      {/* Two Horizontal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Campaign Progress</span>
                <span className="text-sm text-muted-foreground">{campaign.responseRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(campaign.responseRate, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Lead Connected</span>
                <span className="text-sm text-muted-foreground">{Math.round(campaign.totalLeads * 0.65)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(65, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Acceptance Rate</span>
                <span className="text-sm text-muted-foreground">{campaign.responseRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(campaign.responseRate, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Reply Rate</span>
                <span className="text-sm text-muted-foreground">{Math.round((campaign.successfulLeads / campaign.totalLeads) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((campaign.successfulLeads / campaign.totalLeads) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Start Date</span>
              <span className="text-sm text-muted-foreground">{campaign.createdDate}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={getStatusVariant(campaign.status) as any} className="text-xs">
                {campaign.status === 'active' && <Play className="w-3 h-3 mr-1" />}
                {campaign.status === 'paused' && <Pause className="w-3 h-3 mr-1" />}
                {campaign.status === 'completed' && <BarChart3 className="w-3 h-3 mr-1" />}
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Conversion Ratio</span>
              <span className="text-sm text-muted-foreground">
                {campaign.successfulLeads}:{campaign.totalLeads} 
                <span className="ml-2 text-blue-600">
                  ({Math.round((campaign.successfulLeads / campaign.totalLeads) * 100)}%)
                </span>
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Total Contacts</span>
              <span className="text-sm text-muted-foreground">{campaign.totalLeads}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Successful Conversions</span>
              <span className="text-sm text-blue-600 font-medium">{campaign.successfulLeads}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Campaign Type</span>
              <span className="text-sm text-muted-foreground">Outreach Campaign</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Email sent to 15 leads</div>
                <div className="text-sm text-muted-foreground">2 hours ago</div>
              </div>
              <Badge variant="outline">Email</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">3 new responses received</div>
                <div className="text-sm text-muted-foreground">4 hours ago</div>
              </div>
              <Badge variant="default">Response</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Campaign status updated</div>
                <div className="text-sm text-muted-foreground">1 day ago</div>
              </div>
              <Badge variant="secondary">Update</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLeads = () => {
    // Mock leads data for the campaign
    const leads = [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        company: "Tech Corp",
        status: "responded",
        responseDate: "2024-01-15",
        connectionStatus: "connected"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@business.com",
        company: "Business Inc",
        status: "pending",
        responseDate: null,
        connectionStatus: "pending"
      },
      {
        id: 3,
        name: "Mike Wilson",
        email: "mike.wilson@startup.io",
        company: "Startup Solutions",
        status: "accepted",
        responseDate: "2024-01-14",
        connectionStatus: "connected"
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@enterprise.com",
        company: "Enterprise LLC",
        status: "declined",
        responseDate: "2024-01-13",
        connectionStatus: "declined"
      },
      {
        id: 5,
        name: "Alex Chen",
        email: "alex.chen@innovation.co",
        company: "Innovation Co",
        status: "responded",
        responseDate: "2024-01-16",
        connectionStatus: "connected"
      }
    ];

    const getStatusBadge = (status: string) => {
      switch (status) {
        case "responded":
          return <Badge variant="default" className="bg-blue-100 text-blue-700">Responded</Badge>;
        case "accepted":
          return <Badge variant="default" className="bg-green-100 text-green-700">Accepted</Badge>;
        case "pending":
          return <Badge variant="secondary">Pending</Badge>;
        case "declined":
          return <Badge variant="destructive">Declined</Badge>;
        default:
          return <Badge variant="secondary">{status}</Badge>;
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Leads</CardTitle>
          <CardDescription>All leads associated with this campaign ({leads.length} total)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Leads Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
                <div className="text-sm text-muted-foreground">Total Leads</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {leads.filter(lead => lead.status === 'responded' || lead.status === 'accepted').length}
                </div>
                <div className="text-sm text-muted-foreground">Responded</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {leads.filter(lead => lead.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {leads.filter(lead => lead.status === 'declined').length}
                </div>
                <div className="text-sm text-muted-foreground">Declined</div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b">
                <h3 className="font-medium">Leads List</h3>
              </div>
              <div className="divide-y">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{lead.name}</h4>
                            <p className="text-sm text-muted-foreground">{lead.email}</p>
                            <p className="text-sm text-muted-foreground">{lead.company}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Status</div>
                          {getStatusBadge(lead.status)}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Response Date</div>
                          <div className="text-sm text-muted-foreground">
                            {lead.responseDate || 'No response'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Connection</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {lead.connectionStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSequence = () => (
    <Card>
      <CardHeader>
        <CardTitle>Email Sequence</CardTitle>
        <CardDescription>Manage your automated email sequence</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Email sequence builder coming soon...</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Settings</CardTitle>
        <CardDescription>Configure campaign parameters and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Campaign Name</label>
            <div className="mt-1 p-3 border rounded-md bg-muted">{campaign.name}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <div className="mt-1 p-3 border rounded-md bg-muted">{campaign.description}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <div className="mt-1">
              <Badge variant={getStatusVariant(campaign.status) as any}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Created Date</label>
            <div className="mt-1 p-3 border rounded-md bg-muted">{campaign.createdDate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "leads": return renderLeads();
      case "sequence": return renderSequence();
      case "settings": return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <div>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <button 
              onClick={() => router.push('/dashboard')}
              className="hover:text-foreground cursor-pointer transition-colors"
            >
              Dashboard
            </button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => router.push('/dashboard/campaigns')}
              className="text-foreground font-medium hover:text-primary cursor-pointer transition-colors"
            >
              Campaigns
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            <p className="text-muted-foreground">Manage and track your campaign performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusVariant(campaign.status) as any} className="px-3 py-1">
            {campaign.status === 'active' && <Play className="w-3 h-3 mr-1" />}
            {campaign.status === 'paused' && <Pause className="w-3 h-3 mr-1" />}
            {campaign.status === 'completed' && <BarChart3 className="w-3 h-3 mr-1" />}
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
