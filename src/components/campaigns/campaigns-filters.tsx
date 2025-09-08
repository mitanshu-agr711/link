"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, SlidersHorizontal, Calendar } from "lucide-react";

export function CampaignsFilters() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search campaigns by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-96"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Status
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Performance
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">12 campaigns</span>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
    </div>
  );
}
