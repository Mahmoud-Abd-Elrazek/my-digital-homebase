
import React from 'react';
import { Card } from "@/components/ui/card";

interface SiteStats {
  label: string;
  value: number | string;
}

interface DashboardOverviewProps {
  siteStats: SiteStats[];
}

const DashboardOverview = ({ siteStats }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {siteStats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-medium text-muted-foreground">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <p className="text-muted-foreground">
          Your website is running smoothly. Use the dashboard to manage your content and settings.
        </p>
      </div>
    </div>
  );
};

export default DashboardOverview;
