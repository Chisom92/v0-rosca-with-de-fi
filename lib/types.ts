export type MemberStatus = "active" | "pending" | "ejected";
export type PaymentStatus = "paid" | "pending" | "missed";
export type CircleStatus = "active" | "completed" | "pending";

export interface Member {
  id: string;
  name: string;
  walletAddress: string;
  avatar?: string;
  status: MemberStatus;
  depositPaid: boolean;
  totalContributed: number;
  payoutReceived: boolean;
  payoutWeek: number;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  week: number;
  amount: number;
  status: PaymentStatus;
  timestamp: Date;
  txHash?: string;
}

export interface Circle {
  id: string;
  name: string;
  contributionAmount: number;
  depositAmount: number;
  totalMembers: number;
  cycleLength: number;
  currentWeek: number;
  status: CircleStatus;
  members: Member[];
  payments: Payment[];
  totalPool: number;
  nextPayoutDate: Date;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: "deposit" | "contribution" | "payout" | "penalty" | "refund";
  amount: number;
  from: string;
  to: string;
  timestamp: Date;
  txHash: string;
  status: "confirmed" | "pending" | "failed";
  description: string;
}
