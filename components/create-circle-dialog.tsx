"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";

interface CreateCircleDialogProps {
  onCreateCircle: (data: {
    name: string;
    contributionAmount: number;
    depositAmount: number;
    totalMembers: number;
    cycleLength: number;
  }) => Promise<void>;
}

export function CreateCircleDialog({ onCreateCircle }: CreateCircleDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contributionAmount: 10,
    depositAmount: 5,
    totalMembers: 3,
    cycleLength: 3,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreateCircle(formData);
      setOpen(false);
      setFormData({
        name: "",
        contributionAmount: 10,
        depositAmount: 5,
        totalMembers: 3,
        cycleLength: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Circle
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create New Savings Circle</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up a new ROSCA circle with your trusted community members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Circle Name</Label>
            <Input
              id="name"
              placeholder="e.g., Lagos Diaspora Circle"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contribution" className="text-foreground">
                Weekly Contribution (USDC)
              </Label>
              <Input
                id="contribution"
                type="number"
                min={1}
                value={formData.contributionAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contributionAmount: Number(e.target.value),
                  })
                }
                required
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit" className="text-foreground">
                Deposit Amount (USDC)
              </Label>
              <Input
                id="deposit"
                type="number"
                min={1}
                value={formData.depositAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    depositAmount: Number(e.target.value),
                  })
                }
                required
                className="border-border bg-secondary text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="members" className="text-foreground">Number of Members</Label>
              <Input
                id="members"
                type="number"
                min={2}
                max={10}
                value={formData.totalMembers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalMembers: Number(e.target.value),
                  })
                }
                required
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle" className="text-foreground">Cycle Length (weeks)</Label>
              <Input
                id="cycle"
                type="number"
                min={2}
                max={52}
                value={formData.cycleLength}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cycleLength: Number(e.target.value),
                  })
                }
                required
                className="border-border bg-secondary text-foreground"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Summary:</strong> Each member contributes{" "}
              <span className="text-primary font-medium">{formData.contributionAmount} USDC/week</span> +{" "}
              <span className="text-primary font-medium">{formData.depositAmount} USDC</span> deposit.
              Total payout per member:{" "}
              <span className="text-primary font-medium">
                {formData.contributionAmount * formData.totalMembers - 0.5} USDC
              </span>{" "}
              (minus 0.5 fee).
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-border text-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Circle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
