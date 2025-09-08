"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Target, Users, TrendingUp, DollarSign, ChevronDown, Filter } from "lucide-react";

const allStats = [
  {
    title: "Total Campaigns",
    value: "12",
    change: "+2.1%",
    icon: Target,
    color: "text-blue-600",
    type: "all"
  },
  {
    title: "Active Leads",
    value: "1,247",
    change: "+12.5%", 
    icon: Users,
    color: "text-green-600",
    type: "all"
  },
  {
    title: "Success Rate",
    value: "18.2%",
    change: "+3.2%",
    icon: TrendingUp,
    color: "text-purple-600",
    type: "all"
  },
  {
    title: "Revenue Generated",
    value: "$47,200",
    change: "+8.1%",
    icon: DollarSign,
    color: "text-orange-600",
    type: "all"
  }
];

const activeStats = [
  {
    title: "Active Campaigns",
    value: "8",
    change: "+1.5%",
    icon: Target,
    color: "text-blue-600",
    type: "active"
  },
  {
    title: "Active Leads",
    value: "982",
    change: "+18.2%", 
    icon: Users,
    color: "text-green-600",
    type: "active"
  },
  {
    title: "Success Rate",
    value: "22.4%",
    change: "+5.1%",
    icon: TrendingUp,
    color: "text-purple-600",
    type: "active"
  },
  {
    title: "Revenue Generated",
    value: "$38,400",
    change: "+12.3%",
    icon: DollarSign,
    color: "text-orange-600",
    type: "active"
  }
];

const inactiveStats = [
  {
    title: "Inactive Campaigns",
    value: "4",
    change: "-1.2%",
    icon: Target,
    color: "text-gray-600",
    type: "inactive"
  },
  {
    title: "Paused Leads",
    value: "265",
    change: "-8.5%", 
    icon: Users,
    color: "text-gray-600",
    type: "inactive"
  },
  {
    title: "Previous Success Rate",
    value: "14.8%",
    change: "-2.1%",
    icon: TrendingUp,
    color: "text-gray-600",
    type: "inactive"
  },
  {
    title: "Lost Revenue",
    value: "$8,800",
    change: "-15.2%",
    icon: DollarSign,
    color: "text-gray-600",
    type: "inactive"
  }
];

export function CampaignsStats() {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  
  const getStats = () => {
    switch (filter) {
      case "active":
        return activeStats;
      case "inactive":
        return inactiveStats;
      default:
        return allStats;
    }
  };
  
  const getFilterLabel = () => {
    switch (filter) {
      case "active":
        return "Active Campaigns";
      case "inactive":
        return "Inactive Campaigns";
      default:
        return "All Campaigns";
    }
  };

  const stats = getStats();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Campaign Overview</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              {getFilterLabel()}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem 
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-accent" : ""}
            >
              All Campaigns
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setFilter("active")}
              className={filter === "active" ? "bg-accent" : ""}
            >
              Active
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setFilter("inactive")}
              className={filter === "inactive" ? "bg-accent" : ""}
            >
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
