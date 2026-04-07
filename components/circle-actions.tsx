"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Coins, UserMinus, Send, Loader2 } from "lucide-react";
import type { Circle } from "@/lib/types";

interface CircleActionsProps {
  circle: Circle | null;
  onContribute: () => Promise<void>;
  onMissPayment: (memberId: string) => Promise<void>;
  onTriggerPayout: () => Promise<void>;
}

export function CircleActions({
  circle,
  onContribute,
  onMissPayment,
  onTriggerPayout,
}: CircleActionsProps) {
  const [contributing, setContributing] = useState(false);
  const [missLoading, setMissLoading] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);

  if (!circle) {
    return null;
  }

  const handleContribute = async () => {
    setContributing(true);
    try {
      await onContribute();
    } finally {
      setContributing(false);
    }
  };

  const handleMissPayment = async () => {
    setMissLoading(true);
    try {
      // Simulate Bob missing payment
      const bob = circle.members.find((m) => m.name === "Bob Smith");
      if (bob) {
        await onMissPayment(bob.id);
      }
    } finally {
      setMissLoading(false);
    }
  };

  const handlePayout = async () => {
    setPayoutLoading(true);
    try {
      await onTriggerPayout();
    } finally {
      setPayoutLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          className="w-full justify-start gap-3"
          onClick={handleContribute}
          disabled={contributing}
        >
          {contributing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Coins className="h-4 w-4" />
          )}
          Make Weekly Contribution ({circle.contributionAmount} USDC)
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-3 border-border text-foreground hover:bg-secondary"
          onClick={handlePayout}
          disabled={payoutLoading}
        >
          {payoutLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Trigger Weekly Payout
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <UserMinus className="h-4 w-4" />
              Simulate Missed Payment (Demo)
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="border-border bg-card">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">Simulate Missed Payment?</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                This will simulate Bob Smith missing a payment. His deposit will be
                slashed and distributed to other members. He will be ejected from
                the circle.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-border text-foreground hover:bg-secondary">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleMissPayment}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {missLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Missed Payment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="mt-4 rounded-lg border border-border bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Circle Status:</strong> Week{" "}
            {circle.currentWeek} of {circle.cycleLength}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            <strong className="text-foreground">Next Payout:</strong>{" "}
            {circle.nextPayoutDate.toLocaleDateString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            <strong className="text-foreground">Pool Balance:</strong>{" "}
            {circle.totalPool} USDC
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
