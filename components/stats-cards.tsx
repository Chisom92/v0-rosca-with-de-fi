"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Coins, Calendar, TrendingUp } from "lucide-react";
import type { Circle } from "@/lib/types";

interface StatsCardsProps {
  circle: Circle | null;
}

export function StatsCards({ circle }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Pool",
      value: circle ? `${circle.totalPool} USDC` : "0 USDC",
      icon: Coins,
      description: "Current balance",
    },
    {
      label: "Members",
      value: circle ? `${circle.members.filter(m => m.status === "active").length}/${circle.totalMembers}` : "0/0",
      icon: Users,
      description: "Active participants",
    },
    {
      label: "Current Week",
      value: circle ? `${circle.currentWeek}/${circle.cycleLength}` : "0/0",
      icon: Calendar,
      description: "Cycle progress",
    },
    {
      label: "Weekly Contribution",
      value: circle ? `${circle.contributionAmount} USDC` : "0 USDC",
      icon: TrendingUp,
      description: "Per member",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
