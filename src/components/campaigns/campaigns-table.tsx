"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Filter, Plus, Calendar, MoreHorizontal, Play, Pause, BarChart3, ChevronLeft, ChevronRight, Edit, Trash2, ChevronDown } from "lucide-react";


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

const getStatusVariant = (status: string) => {
  switch (status) {
    case "active": return "success";
    case "paused": return "warning"; 
    case "completed": return "default";
    case "draft": return "secondary";
    default: return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active": return <Play className="w-3 h-3" />;
    case "paused": return <Pause className="w-3 h-3" />;
    case "completed": return <BarChart3 className="w-3 h-3" />;
    default: return null;
  }
};

export function CampaignsTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

 
  const handleEdit = (campaign: any, e: React.MouseEvent) => {
    e.stopPropagation();
    // For now, we'll simulate editing by updating the campaign name
    const newName = prompt(`Edit campaign name:`, campaign.name);
    if (newName && newName.trim() !== '') {
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id 
          ? { ...c, name: newName.trim() }
          : c
      ));
    }
  };

  const handleToggleStatus = (campaign: any, e: React.MouseEvent) => {
    e.stopPropagation();
    let newStatus: string;
    
    if (campaign.status === 'active') {
      newStatus = 'paused';
    } else if (campaign.status === 'paused') {
      newStatus = 'active';
    } else if (campaign.status === 'draft') {
      newStatus = 'active';
    } else if (campaign.status === 'completed') {
      // Can't change completed status
      alert('Completed campaigns cannot be modified');
      return;
    } else {
      newStatus = 'active';
    }

    setCampaigns(prev => prev.map(c => 
      c.id === campaign.id 
        ? { ...c, status: newStatus }
        : c
    ));
  };

  const handleDelete = (campaign: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${campaign.name}"? This action cannot be undone.`)) {
      setCampaigns(prev => prev.filter(c => c.id !== campaign.id));
      
      // Reset to first page if current page becomes empty
      const remainingCampaigns = campaigns.filter(c => c.id !== campaign.id);
      const filteredRemaining = remainingCampaigns.filter(campaign => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
      
      const newTotalPages = Math.ceil(filteredRemaining.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleAddCampaign = () => {
    const campaignName = prompt('Enter campaign name:');
    if (campaignName && campaignName.trim() !== '') {
      const newCampaign = {
        id: (campaigns.length + 1).toString(),
        name: campaignName.trim(),
        status: "draft",
        totalLeads: 0,
        successfulLeads: 0,
        responseRate: 0,
        createdDate: new Date().toISOString().split('T')[0],
        description: "New campaign created"
      };
      
      setCampaigns(prev => [...prev, newCampaign]);
    }
  };

  const handleCampaignClick = (campaign: any) => {
    router.push(`/dashboard/campaigns/${campaign.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Campaigns</CardTitle>
        <CardDescription>
          Manage your outreach campaigns and track performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
                className="pl-10 w-80"
              />
            </div>
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>
                  {statusFilter === "all" ? "All Status" : 
                   statusFilter === "active" ? "Active" :
                   statusFilter === "paused" ? "Inactive" :
                   statusFilter === "completed" ? "Completed" :
                   "Draft"}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setStatusFilter("all");
                        setShowFilterDropdown(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        statusFilter === "all" ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      🔍 All Status ({campaigns.length})
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter("active");
                        setShowFilterDropdown(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        statusFilter === "active" ? "bg-green-50 text-green-600" : ""
                      }`}
                    >
                      ▶️ Active ({campaigns.filter(c => c.status === "active").length})
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter("paused");
                        setShowFilterDropdown(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        statusFilter === "paused" ? "bg-yellow-50 text-yellow-600" : ""
                      }`}
                    >
                      ⏸️ Inactive ({campaigns.filter(c => c.status === "paused").length})
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter("completed");
                        setShowFilterDropdown(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        statusFilter === "completed" ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      ✅ Completed ({campaigns.filter(c => c.status === "completed").length})
                    </button>
                  </div>
                </div>
              )}
            </div>
           
          </div>
          <Button onClick={handleAddCampaign}>
            <Plus className="w-4 h-4 mr-2" />
            Add Campaign
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Leads</TableHead>
                <TableHead>Successful</TableHead>
                <TableHead>Response Rate</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCampaigns.map((campaign) => (
                <TableRow 
                  key={campaign.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleCampaignClick(campaign)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">{campaign.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(campaign.status) as any} className="flex items-center space-x-1 w-fit">
                      {getStatusIcon(campaign.status)}
                      <span>{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{campaign.totalLeads}</TableCell>
                  <TableCell className="text-center">{campaign.successfulLeads}</TableCell>
                  <TableCell className="text-center">{campaign.responseRate}%</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(campaign.responseRate, 100)}%` }}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{campaign.createdDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => handleEdit(campaign, e)}
                        className="p-1.5 hover:bg-muted rounded-md transition-colors"
                        title="Edit Campaign"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => handleToggleStatus(campaign, e)}
                        className="p-1.5 hover:bg-muted rounded-md transition-colors"
                        title={
                          campaign.status === 'paused' ? 'Resume Campaign' : 
                          campaign.status === 'active' ? 'Pause Campaign' :
                          campaign.status === 'draft' ? 'Activate Campaign' :
                          'Cannot modify completed campaign'
                        }
                        disabled={campaign.status === 'completed'}
                      >
                        {campaign.status === 'paused' ? (
                          <Play className="h-4 w-4" />
                        ) : campaign.status === 'completed' ? (
                          <BarChart3 className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Pause className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => handleDelete(campaign, e)}
                        className="p-1.5 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                        title="Delete Campaign"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

       
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No campaigns found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
