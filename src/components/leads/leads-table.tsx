"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Filter, Plus, Mail, Phone, Calendar, MoreHorizontal, X, User, Building, MessageSquare, Clock, Edit, Pause, Play, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

// Generate a larger dataset for infinite scrolling
const generateMockLeads = (count: number) => {
  const companies = ["TechCorp Inc.", "Innovate Co.", "Startup.io", "BigCorp", "NextGen Solutions", "Digital Dynamics", "Cloud Systems", "Data Insights", "AI Ventures", "Growth Labs"];
  const campaigns = ["Q4 Outreach", "Holiday Campaign", "New Year Push", "Spring Launch", "Summer Drive", "Enterprise Focus", "SMB Outreach", "Product Demo", "LinkedIn Campaign", "Email Series"];
  const statuses = ["pending", "contacted", "responded", "converted"];
  const positions = ["CEO", "CTO", "VP Sales", "Marketing Director", "Head of Procurement", "Product Manager", "Business Development", "Operations Manager", "Strategy Lead", "Growth Manager"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `lead-${i + 1}`,
    name: `Lead ${i + 1}`,
    email: `lead${i + 1}@${companies[i % companies.length].toLowerCase().replace(/[^a-z]/g, '')}.com`,
    company: companies[i % companies.length],
    campaign: campaigns[i % campaigns.length],
    status: statuses[i % statuses.length],
    lastContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    position: positions[i % positions.length],
    phone: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    notes: `Lead notes for ${i + 1}. This person showed interest in our product demo and requested more information about pricing.`,
    interactions: [
      {
        id: `int-${i + 1}-1`,
        type: "email",
        date: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: "Initial outreach email sent"
      },
      {
        id: `int-${i + 1}-2`,
        type: "call",
        date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: "Follow-up call scheduled"
      }
    ]
  }));
};

// Initial dataset
const allLeads = generateMockLeads(1000);

const getStatusVariant = (status: string) => {
  switch (status) {
    case "pending": return "pending";
    case "contacted": return "warning";
    case "responded": return "default";
    case "converted": return "success";
    default: return "secondary";
  }
};

export function LeadsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [displayedLeads, setDisplayedLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);
  
  const observerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 50;

  // Filter leads based on search and status
  const filteredLeads = allLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort leads based on sort configuration
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Load more leads
  const loadMoreLeads = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const startIndex = displayedLeads.length;
      const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, sortedLeads.length);
      const newLeads = sortedLeads.slice(startIndex, endIndex);
      
      setDisplayedLeads(prev => [...prev, ...newLeads]);
      setHasMore(endIndex < sortedLeads.length);
      setLoading(false);
    }, 500);
  }, [loading, hasMore, displayedLeads.length, sortedLeads]);

  // Reset displayed leads when search or status filter changes
  useEffect(() => {
    setDisplayedLeads([]);
    setHasMore(true);
  }, [searchTerm, statusFilter, sortConfig]);

  // Load initial data when displayedLeads is reset
  useEffect(() => {
    if (displayedLeads.length === 0 && hasMore) {
      loadMoreLeads();
    }
  }, [displayedLeads.length, hasMore, loadMoreLeads]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreLeads();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMoreLeads]);

  // Handle lead selection
  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };

  // Close sheet
  const closeSheet = () => {
    setIsSheetOpen(false);
    setSelectedLead(null);
  };

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSheet();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig?.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Get sort icon
  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4" />
      : <ArrowDown className="w-4 h-4" />;
  };

  // Action handlers
  const handleEdit = (lead: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Edit lead:', lead.id);
    // Add edit functionality
  };

  const handlePauseResume = (lead: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Pause/Resume lead:', lead.id);
    // Add pause/resume functionality
  };

  const handleDelete = (lead: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete lead:', lead.id);
    // Add delete functionality
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            Manage and track your potential customers ({sortedLeads.length} total leads)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="responded">Responded</option>
                <option value="converted">Converted</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Lead Name</span>
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Email</span>
                      {getSortIcon('email')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort('company')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Company</span>
                      {getSortIcon('company')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort('campaign')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Campaign</span>
                      {getSortIcon('campaign')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {getSortIcon('status')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort('lastContact')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Last Contact</span>
                      {getSortIcon('lastContact')}
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedLeads.map((lead) => (
                  <TableRow 
                    key={lead.id} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleLeadClick(lead)}
                  >
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.position}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>
                      <span className="text-sm text-blue-600">{lead.campaign}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(lead.status) as any}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{lead.lastContact}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(lead, e);
                          }}
                          className="p-1.5 hover:bg-muted rounded-md transition-colors"
                          title="Edit Lead"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(lead, e);
                          }}
                          className="p-1.5 hover:bg-muted rounded-md transition-colors"
                          title={lead.status === 'paused' ? 'Resume Lead' : 'Pause Lead'}
                        >
                          {lead.status === 'paused' ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <Pause className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(lead, e);
                          }}
                          className="p-1.5 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Loading skeleton rows */}
                {loading && Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-28" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Intersection observer target */}
          <div ref={observerRef} className="h-4" />

          {displayedLeads.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No leads found.</p>
            </div>
          )}

          {!hasMore && displayedLeads.length > 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">All leads loaded</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Detail Side Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[600px] sm:w-[700px] overflow-hidden flex flex-col">
          {selectedLead && (
            <>
              <SheetHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="text-xl">{selectedLead.name}</SheetTitle>
                    <SheetDescription>
                      {selectedLead.position} at {selectedLead.company}
                    </SheetDescription>
                  </div>
                  {/* <Button variant="ghost" size="sm" onClick={closeSheet}>
                    <X className="h-4 w-4" />
                  </Button> */}
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto mt-6 space-y-6 pr-2">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedLead.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedLead.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedLead.company}</span>
                    </div>
                  </div>
                </div>

                {/* Campaign Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Campaign Details
                  </h3>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{selectedLead.campaign}</span>
                      <Badge variant={getStatusVariant(selectedLead.status) as any}>
                        {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last contacted: {selectedLead.lastContact}
                    </div>
                  </div>
                </div>

                {/* Interaction History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Interaction History
                  </h3>
                  <div className="space-y-3">
                    {selectedLead.interactions.map((interaction: any) => (
                      <div key={interaction.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium capitalize">{interaction.type}</span>
                          <span className="text-sm text-muted-foreground">{interaction.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{interaction.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notes</h3>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm">{selectedLead.notes}</p>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                  <div className="space-y-4">
                    {/* Lead Source */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Lead Source</h4>
                      <p className="text-sm text-muted-foreground">Website contact form</p>
                    </div>
                    
                    {/* Lead Score */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Lead Score</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm font-medium">75/100</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Enterprise</Badge>
                        <Badge variant="outline">High Priority</Badge>
                        <Badge variant="outline">Decision Maker</Badge>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Timeline</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Lead Created</span>
                          <span className="text-muted-foreground">30 days ago</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>First Contact</span>
                          <span className="text-muted-foreground">25 days ago</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Activity</span>
                          <span className="text-muted-foreground">3 days ago</span>
                        </div>
                      </div>
                    </div>

                    {/* Lead Preferences */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Preferences</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Preferred Contact Method</span>
                          <span className="text-muted-foreground">Email</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best Time to Call</span>
                          <span className="text-muted-foreground">10 AM - 2 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Zone</span>
                          <span className="text-muted-foreground">Eastern Time</span>
                        </div>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Company Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Industry</span>
                          <span className="text-muted-foreground">Technology</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Company Size</span>
                          <span className="text-muted-foreground">500-1000 employees</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Revenue</span>
                          <span className="text-muted-foreground">$50M - $100M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Website</span>
                          <span className="text-muted-foreground text-blue-600">www.{selectedLead.company.toLowerCase().replace(/[^a-z]/g, '')}.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Fixed at bottom of scrollable area */}
                <div className="flex space-x-3 pt-4 border-t sticky bottom-0 bg-background">
                  <Button className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Lead
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <User className="w-4 h-4 mr-2" />
                    Update Status
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
