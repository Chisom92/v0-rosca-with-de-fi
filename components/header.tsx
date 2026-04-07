"use client";

import { Button } from "@/components/ui/button";
import { CircleDollarSign, Wallet } from "lucide-react";

interface HeaderProps {
  walletConnected: boolean;
  onConnectWallet: () => void;
  walletAddress?: string;
}

export function Header({ walletConnected, onConnectWallet, walletAddress }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <CircleDollarSign className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">StellarCircle</h1>
            <p className="text-xs text-muted-foreground">Cross-Border ROSCA</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Stellar Testnet</span>
          </div>
          
          {walletConnected ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-4)}
              </span>
            </div>
          ) : (
            <Button onClick={onConnectWallet} className="gap-2">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
