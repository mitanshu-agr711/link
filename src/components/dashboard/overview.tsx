"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, TrendingUp, Users, Target, MessageSquare, MoreVertical, ChevronDown, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

const recentActivities = [
  {
    id: "1",
    leadName: "John Smith",
    email: "john.smith@techcorp.com",
    company: "TechCorp Inc.",
    campaignName: "Q4 Enterprise Outreach",
    status: "Converted",
    lastContactDate: "2025-09-06"
  },
  {
    id: "2",
    leadName: "Sarah Johnson",
    email: "sarah.j@innovate.co",
    company: "Innovate Solutions",
    campaignName: "Holiday Season Campaign", 
    status: "Responded",
    lastContactDate: "2025-09-05"
  },
  {
    id: "3",
    leadName: "Mike Chen",
    email: "mike.chen@startup.io",
    company: "StartupLab",
    campaignName: "LinkedIn Outreach Series",
    status: "Contacted",
    lastContactDate: "2025-09-04"
  },
  {
    id: "4",
    leadName: "Emily Davis",
    email: "e.davis@enterprise.com",
    company: "Enterprise Solutions",
    campaignName: "New Year 2024 Push",
    status: "Pending",
    lastContactDate: "2025-09-03"
  },
  {
    id: "5",
    leadName: "Robert Wilson",
    email: "r.wilson@consulting.biz",
    company: "Wilson Consulting",
    campaignName: "Spring Product Launch",
    status: "Responded",
    lastContactDate: "2025-09-02"
  },
  {
    id: "6",
    leadName: "Lisa Anderson",
    email: "lisa@marketing.pro",
    company: "Marketing Pro",
    campaignName: "Email Marketing Blast",
    status: "Contacted",
    lastContactDate: "2025-09-01"
  }
];

const allCampaigns = [
  { name: "Q4 Enterprise Outreach", status: "active" },
  { name: "Holiday Season Campaign", status: "active" },
  { name: "New Year 2024 Push", status: "active" },
  { name: "Spring Product Launch", status: "active" },
  { name: "LinkedIn Outreach Series", status: "active" },
  { name: "Email Marketing Blast", status: "inactive" },
  { name: "Webinar Follow-up", status: "inactive" },
  { name: "Cold Email Outreach", status: "active" },
  { name: "Partner Referral Campaign", status: "inactive" },
  { name: "Summer Sale Campaign", status: "inactive" },
  { name: "Back to School Outreach", status: "active" },
  { name: "Black Friday Campaign", status: "inactive" },
  { name: "Industry Conference Follow-up", status: "inactive" },
  { name: "Social Media Campaign", status: "active" },
  { name: "Customer Retention Drive", status: "inactive" }
];

const linkedinAccounts = [
  {
    id: "1",
    username: "john_marketing",
    email: "john.doe@company.com",
    status: "completed",
    requestsSent: 85
  },
  {
    id: "2", 
    username: "sarah_sales",
    email: "sarah.wilson@bizdev.co",
    status: "pending",
    requestsSent: 42
  },
  {
    id: "3",
    username: "mike_outreach",
    email: "mike.chen@growth.io",
    status: "following",
    requestsSent: 67
  },
  {
    id: "4",
    username: "lisa_connect",
    email: "lisa.jones@network.biz",
    status: "completed",
    requestsSent: 93
  },
  {
    id: "5",
    username: "robert_lead",
    email: "rob.smith@leads.com",
    status: "pending",
    requestsSent: 28
  }
];

export function DashboardOverview() {
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activityFilter, setActivityFilter] = useState("recent");
  const itemsPerPage = 4;

  const getFilteredCampaigns = () => {
    if (campaignFilter === "active") {
      return allCampaigns.filter(campaign => campaign.status === "active");
    } else if (campaignFilter === "inactive") {
      return allCampaigns.filter(campaign => campaign.status === "inactive");
    }
    return allCampaigns;
  };

  const getFilteredActivities = () => {
    if (activityFilter === "recent") {
      return recentActivities.slice(0, 7); // Show only first 3 for recent
    }
    return recentActivities; // Show all for other functions
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Converted": return "success";
      case "Responded": return "default";
      case "Contacted": return "warning";
      case "Pending": return "secondary";
      default: return "secondary";
    }
  };

  const getLinkedInStatusVariant = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "following": return "default";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  const filteredCampaigns = getFilteredCampaigns();
  const filteredActivities = getFilteredActivities();
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  const handleFilterChange = (filter: string) => {
    setCampaignFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Campaigns and LinkedIn Account */}
        <div className="space-y-6">
          {/* Campaigns Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Campaigns</span>
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      {campaignFilter === "all" ? "All Campaigns" : 
                       campaignFilter === "active" ? "Active" : "Inactive"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                      All Campaigns
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("active")}>
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("inactive")}>
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentCampaigns.map((campaign, index) => (
                  <div key={campaign.name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                        {startIndex + index + 1}
                      </div>
                      <p className="text-sm font-medium">{campaign.name}</p>
                    </div>
                    <Badge variant={campaign.status === "active" ? "success" : "secondary" as any}>
                      {campaign.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn Account Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Requests</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {linkedinAccounts.slice(0, 4).map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{account.username}</div>
                            <div className="text-xs text-muted-foreground">{account.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getLinkedInStatusVariant(account.status) as any} className="text-xs">
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{account.requestsSent}/100</div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${account.requestsSent}%` }}
                            ></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      {activityFilter === "recent" ? "Recent" : "Other Functions"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActivityFilter("recent")}>
                      Recent
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActivityFilter("other")}>
                      Other Functions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{activity.leadName}</div>
                            <div className="text-xs text-muted-foreground">{activity.email}</div>
                            <div className="text-xs text-muted-foreground">{activity.company}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Last contact: {activity.lastContactDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{activity.campaignName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(activity.status) as any}>
                            {activity.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
