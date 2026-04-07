"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownLeft,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import type { Transaction } from "@/lib/types";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
      case "contribution":
        return <ArrowDownLeft className="h-4 w-4 text-primary" />;
      case "payout":
      case "refund":
        return <ArrowUpRight className="h-4 w-4 text-primary" />;
      case "penalty":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const getTypeBadge = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
            Deposit
          </Badge>
        );
      case "contribution":
        return (
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            Contribution
          </Badge>
        );
      case "payout":
        return (
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            Payout
          </Badge>
        );
      case "penalty":
        return (
          <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">
            Penalty
          </Badge>
        );
      case "refund":
        return (
          <Badge className="bg-warning/20 text-warning hover:bg-warning/30">
            Refund
          </Badge>
        );
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No transactions yet
            </p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{tx.description}</p>
                      {getTypeBadge(tx.type)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        {tx.from} → {tx.to}
                      </span>
                      <span>•</span>
                      <span>
                        {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        tx.type === "penalty" ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {tx.type === "payout" || tx.type === "refund" ? "+" : "-"}
                      {tx.amount} USDC
                    </p>
                    <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      {getStatusIcon(tx.status)}
                      <span className="capitalize">{tx.status}</span>
                    </div>
                  </div>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
