"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { StatsCards } from "@/components/stats-cards";
import { MembersList } from "@/components/members-list";
import { PayoutSchedule } from "@/components/payout-schedule";
import { TransactionHistory } from "@/components/transaction-history";
import { CircleActions } from "@/components/circle-actions";
import { CreateCircleDialog } from "@/components/create-circle-dialog";
import { DemoBanner } from "@/components/demo-banner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoCircle, demoTransactions } from "@/lib/store";
import type { Circle, Transaction, Member, Payment } from "@/lib/types";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [circle, setCircle] = useState<Circle | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [demoStep, setDemoStep] = useState(0);

  const connectWallet = useCallback(() => {
    // Simulate wallet connection
    setWalletConnected(true);
    setWalletAddress("GBRPYHIL2CI3JHWU5WJHJ7UXRB5NKPCKJ7QWBMDRK3DTQE6WUPVZWLE5");
  }, []);

  const startDemo = useCallback(() => {
    setDemoStep(1);
    // Initialize with demo data - members joining
    const initialCircle: Circle = {
      ...demoCircle,
      currentWeek: 1,
      status: "active",
      totalPool: 15, // Just deposits
      members: demoCircle.members.map((m) => ({
        ...m,
        status: "active" as const,
        totalContributed: 0,
        payoutReceived: false,
      })),
      payments: [],
    };
    setCircle(initialCircle);
    setTransactions(demoTransactions.slice(0, 3)); // Just deposits
  }, []);

  const resetDemo = useCallback(() => {
    setDemoStep(0);
    setCircle(null);
    setTransactions([]);
  }, []);

  const handleContribute = useCallback(async (): Promise<void> => {
    if (!circle) return;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (demoStep === 1) {
      // Week 1 contributions
      setDemoStep(2);
      const updatedMembers = circle.members.map((m) => ({
        ...m,
        totalContributed: 10,
      }));
      // Alice gets payout
      updatedMembers[0].payoutReceived = true;

      setCircle({
        ...circle,
        currentWeek: 1,
        totalPool: 45,
        members: updatedMembers,
      });
      setTransactions(demoTransactions.slice(0, 7)); // Deposits + Week 1 contributions + payout
    } else if (demoStep === 2) {
      // Week 2 - Bob will miss
      setDemoStep(3);
      const updatedMembers = circle.members.map((m) => {
        if (m.name === "Bob Smith") {
          return { ...m, status: "ejected" as const };
        }
        return { ...m, totalContributed: m.totalContributed + 10 };
      });

      setCircle({
        ...circle,
        currentWeek: 2,
        totalPool: 40,
        members: updatedMembers,
      });
      setTransactions(demoTransactions.slice(0, 10)); // All transactions
    }
  }, [circle, demoStep]);

  const handleMissPayment = useCallback(
    async (memberId: string): Promise<void> => {
      if (!circle) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedMembers = circle.members.map((m) =>
        m.id === memberId ? { ...m, status: "ejected" as const } : m
      );

      setCircle({
        ...circle,
        members: updatedMembers,
        totalPool: circle.totalPool - 5, // Deposit slashed
      });

      const penaltyTx: Transaction = {
        id: `penalty-${Date.now()}`,
        type: "penalty",
        amount: 5,
        from: "Bob Smith (deposit)",
        to: "Active Members",
        timestamp: new Date(),
        txHash: `0x${Date.now().toString(16)}`,
        status: "confirmed",
        description: "Deposit slashed for missed payment",
      };

      setTransactions((prev) => [penaltyTx, ...prev]);
      setDemoStep(3);
    },
    [circle]
  );

  const handleTriggerPayout = useCallback(async (): Promise<void> => {
    if (!circle) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentRecipient = circle.members.find(
      (m) => m.payoutWeek === circle.currentWeek && m.status === "active"
    );

    if (currentRecipient) {
      const payoutTx: Transaction = {
        id: `payout-${Date.now()}`,
        type: "payout",
        amount: circle.contributionAmount * circle.members.filter((m) => m.status === "active").length - 0.5,
        from: "Contract",
        to: currentRecipient.name,
        timestamp: new Date(),
        txHash: `0x${Date.now().toString(16)}`,
        status: "confirmed",
        description: `Week ${circle.currentWeek} payout`,
      };

      setTransactions((prev) => [payoutTx, ...prev]);

      const updatedMembers = circle.members.map((m) =>
        m.id === currentRecipient.id ? { ...m, payoutReceived: true } : m
      );

      setCircle({
        ...circle,
        members: updatedMembers,
        currentWeek: circle.currentWeek + 1,
        totalPool: circle.totalPool - payoutTx.amount,
      });
    }

    if (demoStep === 3) {
      setDemoStep(4);
    }
  }, [circle, demoStep]);

  const handleCreateCircle = useCallback(
    async (data: {
      name: string;
      contributionAmount: number;
      depositAmount: number;
      totalMembers: number;
      cycleLength: number;
    }): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCircle: Circle = {
        id: `circle-${Date.now()}`,
        name: data.name,
        contributionAmount: data.contributionAmount,
        depositAmount: data.depositAmount,
        totalMembers: data.totalMembers,
        cycleLength: data.cycleLength,
        currentWeek: 0,
        status: "pending",
        members: [],
        payments: [],
        totalPool: 0,
        nextPayoutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      };

      setCircle(newCircle);
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        walletConnected={walletConnected}
        onConnectWallet={connectWallet}
        walletAddress={walletAddress}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!circle && !walletConnected && (
          <div className="mb-12 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Finance without the middleman.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              Join trusted savings circles with your community. Cross-border remittances
              and rotating payouts powered by Stellar blockchain.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CreateCircleDialog onCreateCircle={handleCreateCircle} />
              <span className="text-muted-foreground">or connect wallet to join</span>
            </div>
          </div>
        )}

        {/* Demo Banner */}
        <div className="mb-6">
          <DemoBanner
            onStartDemo={startDemo}
            onResetDemo={resetDemo}
            demoStep={demoStep}
          />
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsCards circle={circle} />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="mb-4 w-full justify-start bg-secondary">
                <TabsTrigger value="members" className="data-[state=active]:bg-card">
                  Members
                </TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-card">
                  Payout Schedule
                </TabsTrigger>
                <TabsTrigger value="transactions" className="data-[state=active]:bg-card">
                  Transactions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="members">
                <MembersList circle={circle} />
              </TabsContent>

              <TabsContent value="schedule">
                <PayoutSchedule circle={circle} />
              </TabsContent>

              <TabsContent value="transactions">
                <TransactionHistory transactions={transactions} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <CircleActions
              circle={circle}
              onContribute={handleContribute}
              onMissPayment={handleMissPayment}
              onTriggerPayout={handleTriggerPayout}
            />

            {!circle && (
              <div className="rounded-lg border border-dashed border-border p-6 text-center">
                <p className="text-muted-foreground">
                  Start the demo or create a circle to see actions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        {!circle && (
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Default Protection</h3>
              <p className="text-sm text-muted-foreground">
                Good faith deposits protect members. Miss a payment and your deposit is
                redistributed to active members.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Cross-Border</h3>
              <p className="text-sm text-muted-foreground">
                Send money across borders using Stellar path payments. Convert to local
                currencies automatically.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Community Trust</h3>
              <p className="text-sm text-muted-foreground">
                Build savings circles with people you trust. Smart contracts ensure
                fairness for everyone.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Built on Stellar / Soroban for the Hackathon</p>
          <p className="mt-2">
            Financial inclusion without banks. Peer-to-peer trust for the global diaspora.
          </p>
        </footer>
      </main>
    </div>
  );
}
