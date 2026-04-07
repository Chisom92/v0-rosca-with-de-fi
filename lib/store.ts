import type { Circle, Transaction, Member, Payment } from "./types";

// Demo data for the hackathon presentation
export const demoMembers: Member[] = [
  {
    id: "m1",
    name: "Alice Johnson",
    walletAddress: "GBRPYHIL2CI...JHWU5W",
    status: "active",
    depositPaid: true,
    totalContributed: 20,
    payoutReceived: true,
    payoutWeek: 1,
  },
  {
    id: "m2",
    name: "Bob Smith",
    walletAddress: "GCEZWKCA5VL...QHFZ4A",
    status: "ejected",
    depositPaid: true,
    totalContributed: 10,
    payoutReceived: false,
    payoutWeek: 2,
  },
  {
    id: "m3",
    name: "Carol Williams",
    walletAddress: "GDRQAGJBGP...UFNP3C",
    status: "active",
    depositPaid: true,
    totalContributed: 20,
    payoutReceived: false,
    payoutWeek: 3,
  },
];

export const demoPayments: Payment[] = [
  {
    id: "p1",
    memberId: "m1",
    memberName: "Alice Johnson",
    week: 1,
    amount: 10,
    status: "paid",
    timestamp: new Date("2024-01-07"),
  },
  {
    id: "p2",
    memberId: "m2",
    memberName: "Bob Smith",
    week: 1,
    amount: 10,
    status: "paid",
    timestamp: new Date("2024-01-07"),
  },
  {
    id: "p3",
    memberId: "m3",
    memberName: "Carol Williams",
    week: 1,
    amount: 10,
    status: "paid",
    timestamp: new Date("2024-01-07"),
  },
  {
    id: "p4",
    memberId: "m1",
    memberName: "Alice Johnson",
    week: 2,
    amount: 10,
    status: "paid",
    timestamp: new Date("2024-01-14"),
  },
  {
    id: "p5",
    memberId: "m2",
    memberName: "Bob Smith",
    week: 2,
    amount: 10,
    status: "missed",
    timestamp: new Date("2024-01-14"),
  },
  {
    id: "p6",
    memberId: "m3",
    memberName: "Carol Williams",
    week: 2,
    amount: 10,
    status: "paid",
    timestamp: new Date("2024-01-14"),
  },
];

export const demoCircle: Circle = {
  id: "c1",
  name: "Lagos Diaspora Circle",
  contributionAmount: 10,
  depositAmount: 5,
  totalMembers: 3,
  cycleLength: 3,
  currentWeek: 2,
  status: "active",
  members: demoMembers,
  payments: demoPayments,
  totalPool: 45,
  nextPayoutDate: new Date("2024-01-21"),
  createdAt: new Date("2024-01-01"),
};

export const demoTransactions: Transaction[] = [
  {
    id: "t1",
    type: "deposit",
    amount: 5,
    from: "Alice Johnson",
    to: "Contract",
    timestamp: new Date("2024-01-01T10:00:00"),
    txHash: "0x1a2b...3c4d",
    status: "confirmed",
    description: "Good faith deposit",
  },
  {
    id: "t2",
    type: "deposit",
    amount: 5,
    from: "Bob Smith",
    to: "Contract",
    timestamp: new Date("2024-01-01T10:05:00"),
    txHash: "0x2b3c...4d5e",
    status: "confirmed",
    description: "Good faith deposit",
  },
  {
    id: "t3",
    type: "deposit",
    amount: 5,
    from: "Carol Williams",
    to: "Contract",
    timestamp: new Date("2024-01-01T10:10:00"),
    txHash: "0x3c4d...5e6f",
    status: "confirmed",
    description: "Good faith deposit",
  },
  {
    id: "t4",
    type: "contribution",
    amount: 10,
    from: "Alice Johnson",
    to: "Pool",
    timestamp: new Date("2024-01-07T09:00:00"),
    txHash: "0x4d5e...6f7g",
    status: "confirmed",
    description: "Week 1 contribution",
  },
  {
    id: "t5",
    type: "contribution",
    amount: 10,
    from: "Bob Smith",
    to: "Pool",
    timestamp: new Date("2024-01-07T09:15:00"),
    txHash: "0x5e6f...7g8h",
    status: "confirmed",
    description: "Week 1 contribution",
  },
  {
    id: "t6",
    type: "contribution",
    amount: 10,
    from: "Carol Williams",
    to: "Pool",
    timestamp: new Date("2024-01-07T09:30:00"),
    txHash: "0x6f7g...8h9i",
    status: "confirmed",
    description: "Week 1 contribution",
  },
  {
    id: "t7",
    type: "payout",
    amount: 29.5,
    from: "Contract",
    to: "Alice Johnson",
    timestamp: new Date("2024-01-07T12:00:00"),
    txHash: "0x7g8h...9i0j",
    status: "confirmed",
    description: "Week 1 payout (30 USDC - 0.5 fee)",
  },
  {
    id: "t8",
    type: "contribution",
    amount: 10,
    from: "Alice Johnson",
    to: "Pool",
    timestamp: new Date("2024-01-14T09:00:00"),
    txHash: "0x8h9i...0j1k",
    status: "confirmed",
    description: "Week 2 contribution",
  },
  {
    id: "t9",
    type: "contribution",
    amount: 10,
    from: "Carol Williams",
    to: "Pool",
    timestamp: new Date("2024-01-14T09:30:00"),
    txHash: "0x9i0j...1k2l",
    status: "confirmed",
    description: "Week 2 contribution",
  },
  {
    id: "t10",
    type: "penalty",
    amount: 5,
    from: "Bob Smith (deposit)",
    to: "Alice + Carol",
    timestamp: new Date("2024-01-14T23:59:00"),
    txHash: "0x0j1k...2l3m",
    status: "confirmed",
    description: "Missed payment - deposit slashed",
  },
];

// Helper functions
export function getPayoutSchedule(circle: Circle): { week: number; member: Member; status: "completed" | "current" | "upcoming" }[] {
  return circle.members
    .filter((m) => m.status !== "ejected")
    .map((member) => ({
      week: member.payoutWeek,
      member,
      status:
        member.payoutWeek < circle.currentWeek
          ? "completed"
          : member.payoutWeek === circle.currentWeek
            ? "current"
            : "upcoming",
    }))
    .sort((a, b) => a.week - b.week);
}

export function calculateTotalContributions(circle: Circle): number {
  return circle.payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
}

export function getMemberPaymentHistory(
  circle: Circle,
  memberId: string
): Payment[] {
  return circle.payments.filter((p) => p.memberId === memberId);
}
