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
            <div className="text-2xl font-bold text-green-600">{campaign.successfulLeads}</div>
            <div className="text-sm text-muted-foreground">Successful</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{campaign.responseRate}%</div>
            <div className="text-sm text-muted-foreground">Response Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((campaign.successfulLeads / campaign.totalLeads) * 100) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{campaign.responseRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(campaign.responseRate, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

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

  const renderLeads = () => (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Leads</CardTitle>
        <CardDescription>All leads associated with this campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Leads management interface coming soon...</p>
        </div>
      </CardContent>
    </Card>
  );

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
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Campaign
          </Button>
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
