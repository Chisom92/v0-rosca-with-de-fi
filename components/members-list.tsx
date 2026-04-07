"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, Clock, Trophy } from "lucide-react";
import type { Circle } from "@/lib/types";

interface MembersListProps {
  circle: Circle | null;
}

export function MembersList({ circle }: MembersListProps) {
  if (!circle) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Circle Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No circle selected</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "ejected":
        return (
          <Badge variant="destructive" className="bg-destructive/20 text-destructive hover:bg-destructive/30">
            <XCircle className="mr-1 h-3 w-3" />
            Ejected
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-warning/20 text-warning hover:bg-warning/30">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Circle Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {circle.members.map((member, index) => (
          <div
            key={member.id}
            className={`flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4 ${
              member.status === "ejected" ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{member.name}</p>
                  {member.payoutWeek === circle.currentWeek && member.status === "active" && (
                    <Trophy className="h-4 w-4 text-warning" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {member.walletAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {member.totalContributed} USDC
                </p>
                <p className="text-xs text-muted-foreground">
                  Payout Week {member.payoutWeek}
                </p>
              </div>
              {getStatusBadge(member.status)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
