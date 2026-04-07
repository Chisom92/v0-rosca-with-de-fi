"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle as CircleIcon, Clock } from "lucide-react";
import type { Circle } from "@/lib/types";
import { getPayoutSchedule } from "@/lib/store";

interface PayoutScheduleProps {
  circle: Circle | null;
}

export function PayoutSchedule({ circle }: PayoutScheduleProps) {
  if (!circle) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Payout Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No circle selected</p>
        </CardContent>
      </Card>
    );
  }

  const schedule = getPayoutSchedule(circle);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Payout Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />

          <div className="space-y-6">
            {schedule.map((item, index) => (
              <div key={item.member.id} className="relative flex items-center gap-4 pl-10">
                {/* Timeline dot */}
                <div className="absolute left-0">
                  {item.status === "completed" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    </div>
                  ) : item.status === "current" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning">
                      <Clock className="h-4 w-4 text-warning-foreground" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-secondary">
                      <CircleIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div
                  className={`flex-1 rounded-lg border border-border p-4 ${
                    item.status === "current"
                      ? "bg-warning/10 border-warning/50"
                      : item.status === "completed"
                        ? "bg-primary/10 border-primary/50"
                        : "bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Week {item.week}: {item.member.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.status === "completed"
                          ? "Payout completed"
                          : item.status === "current"
                            ? "Payout pending"
                            : "Scheduled"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {circle.contributionAmount * circle.totalMembers - 0.5} USDC
                      </p>
                      <p className="text-xs text-muted-foreground">
                        (minus 0.5 fee)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
