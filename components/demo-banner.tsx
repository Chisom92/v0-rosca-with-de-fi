"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Info } from "lucide-react";

interface DemoBannerProps {
  onStartDemo: () => void;
  onResetDemo: () => void;
  demoStep: number;
}

export function DemoBanner({ onStartDemo, onResetDemo, demoStep }: DemoBannerProps) {
  const steps = [
    "3 members join circle with 10 USDC contribution + 5 USDC deposit each",
    "Week 1: All members contribute, Alice receives 29.5 USDC payout",
    "Week 2: Bob misses payment, deposit slashed and distributed",
    "Remaining balances returned at end of cycle",
  ];

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Hackathon Demo Mode</h3>
              <p className="text-sm text-muted-foreground">
                {demoStep === 0
                  ? "Click 'Start Demo' to walk through the ROSCA flow"
                  : `Step ${demoStep}/4: ${steps[demoStep - 1]}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {demoStep === 0 ? (
              <Button onClick={onStartDemo} className="gap-2">
                <Play className="h-4 w-4" />
                Start Demo
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onResetDemo}
                className="gap-2 border-border text-foreground hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Demo
              </Button>
            )}
          </div>
        </div>

        {demoStep > 0 && (
          <div className="mt-4 flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full ${
                  index < demoStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
