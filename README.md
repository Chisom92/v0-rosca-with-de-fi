# TrustLoop — Credit-Scored DeFi Savings on Stellar

> Decentralized rotating savings circles with on-chain credit scoring and default protection, built on the Stellar / Soroban smart contract platform.

[![Built on Stellar](https://img.shields.io/badge/Built%20on-Stellar-7B2FBE?style=flat-square&logo=stellar)](https://stellar.org)
[![Soroban Smart Contracts](https://img.shields.io/badge/Smart%20Contracts-Soroban-blueviolet?style=flat-square)](https://soroban.stellar.org)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![USDC](https://img.shields.io/badge/Asset-USDC%20on%20Stellar-2775CA?style=flat-square)](https://www.circle.com/usdc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## What is TrustLoop?

TrustLoop brings the centuries-old community savings model — known as ROSCA (Rotating Savings and Credit Association), *susu*, *chit fund*, or *tontine* — onto the Stellar blockchain. It enables diaspora communities and the unbanked to pool savings, access lump-sum payouts in rotation, and build verifiable on-chain credit history, all without a bank or intermediary.

Each member contributes a fixed amount every cycle. One member receives the full pool each round. The order rotates until everyone has received a payout. Smart contracts on Soroban enforce the rules, hold funds in escrow, and slash deposits from members who default.

---

## Why Stellar?

TrustLoop is purpose-built for Stellar because of three core capabilities:

**1. Stellar Path Payments for Cross-Border Remittances**
Members across different countries can contribute in their local currency. Stellar's built-in DEX and path payment operations automatically convert to USDC at the time of contribution, enabling truly borderless savings circles with near-zero fees and 3–5 second settlement.

**2. Soroban Smart Contracts for Trustless Escrow**
All circle funds are held in a Soroban smart contract. Contributions, payouts, and deposit slashing are executed on-chain with full transparency. No admin can rug the pool. The contract enforces payout rotation and ejects defaulting members automatically.

**3. USDC as the Settlement Asset**
Payouts are denominated in USDC on Stellar, giving recipients a stable, dollar-pegged asset they can hold, spend, or off-ramp locally. This is critical for diaspora use cases where currency volatility is a real concern.

---

## Credit Scoring & Creditworthiness

A core feature of TrustLoop is its **on-chain credit scoring system**. Traditional ROSCAs rely entirely on social trust. TrustLoop makes that trust machine-readable and portable.

### How Credit Score is Determined

Every member's creditworthiness is derived from their on-chain ROSCA participation history:

| Signal | Impact |
|---|---|
| Consecutive on-time contributions | Positive — increases score |
| Receiving a payout and continuing to contribute | Strong positive signal |
| Missed payment (deposit slashed) | Negative — score drops, member ejected |
| Completing a full circle cycle | Significant positive boost |
| Early deposit payment | Minor positive signal |

### Credit Score Use Cases

- **Circle admission gating** — Circle creators can set a minimum credit score threshold. Members below the threshold cannot join, reducing default risk.
- **Deposit sizing** — Higher-risk members (lower scores) are required to post a larger good-faith deposit before joining.
- **Payout order priority** — Members with strong credit history can be assigned earlier payout slots as a reward for reliability.
- **Cross-platform portability** — Because the score is derived from on-chain Stellar transactions, it is verifiable by any third party without relying on a centralized credit bureau.

### Default Protection Mechanism

Every member posts a **good-faith deposit** (e.g., 5 USDC) before joining a circle. If a member misses a contribution:

1. Their deposit is immediately slashed by the Soroban contract.
2. The slashed amount is redistributed proportionally to active members.
3. The defaulting member is ejected and their credit score is penalized.
4. The circle continues with remaining members — no one is left holding the bag.

This deposit-slash mechanism is the blockchain equivalent of a credit default swap at the community level.

---

## Key Features

- **Wallet connection** via Stellar-compatible wallets (Freighter, LOBSTR)
- **Circle creation** — configure contribution amount, deposit size, member count, and cycle length
- **Weekly contribution flow** — members submit USDC contributions each cycle
- **Automated payout rotation** — Soroban contract triggers payouts to the designated recipient each week
- **Missed payment simulation** — demonstrates deposit slashing and member ejection in real time
- **Transaction history** — full on-chain audit trail of deposits, contributions, payouts, and penalties
- **Payout schedule** — visual timeline showing each member's assigned payout week and status
- **Stellar Testnet** — all demo interactions run on Stellar Testnet for safe exploration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Stellar (Testnet / Mainnet) |
| Smart Contracts | Soroban (Rust) |
| Settlement Asset | USDC on Stellar |
| Frontend | Next.js 15, React, TypeScript |
| UI Components | shadcn/ui, Tailwind CSS |
| Wallet Integration | Stellar Wallet SDK (Freighter) |
| Analytics | Vercel Analytics |

---

## Project Structure

```
trustloop/
├── app/
│   ├── globals.css          # Global styles + Tailwind base
│   ├── layout.tsx           # Root layout, metadata, Vercel Analytics
│   └── page.tsx             # Main app shell — wallet, circle state, demo flow
│
├── components/
│   ├── circle-actions.tsx   # Contribute, trigger payout, simulate missed payment
│   ├── create-circle-dialog.tsx  # Form to create a new savings circle
│   ├── demo-banner.tsx      # Step-by-step demo walkthrough banner
│   ├── header.tsx           # Nav bar with Stellar wallet connect
│   ├── members-list.tsx     # Member cards with status badges + credit signals
│   ├── payout-schedule.tsx  # Visual payout rotation timeline
│   ├── stats-cards.tsx      # Pool balance, active members, cycle progress
│   ├── transaction-history.tsx  # On-chain tx log (deposits, payouts, penalties)
│   └── ui/                  # shadcn/ui primitives (57 components)
│
├── lib/
│   ├── store.ts             # Demo data + helper functions (payout schedule, totals)
│   ├── types.ts             # TypeScript interfaces: Circle, Member, Transaction, Payment
│   └── utils.ts             # Tailwind class utilities
│
├── hooks/
│   ├── use-mobile.ts        # Responsive breakpoint hook
│   └── use-toast.ts         # Toast notification hook
│
├── public/                  # Static assets and icons
├── next.config.mjs
├── tailwind.config (via postcss.config.mjs)
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- A Stellar-compatible wallet (e.g., [Freighter](https://freighter.app)) for live interaction

### Install & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Scripts

```bash
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### Try the Demo

Click "Start Demo" on the landing page to walk through a full ROSCA cycle:

1. Three members join the "Lagos Diaspora Circle" and post deposits
2. Week 1 — all members contribute, Alice receives the payout
3. Week 2 — Bob misses his contribution, his deposit is slashed, he is ejected
4. Remaining members continue the circle; Carol receives the next payout

No wallet required for the demo — all interactions are simulated with realistic Stellar transaction hashes.

---

## Core Data Models

The app's type system maps directly to on-chain Soroban contract state:

```typescript
// lib/types.ts

export interface Member {
  id: string;
  name: string;
  walletAddress: string;        // Stellar G-address
  status: "active" | "pending" | "ejected";
  depositPaid: boolean;         // Good-faith deposit posted to contract
  totalContributed: number;     // Cumulative USDC contributed (credit signal)
  payoutReceived: boolean;      // Has this member received their rotation payout
  payoutWeek: number;           // Assigned payout slot in the cycle
}

export interface Circle {
  id: string;
  name: string;
  contributionAmount: number;   // Weekly USDC contribution per member
  depositAmount: number;        // Good-faith deposit (slashed on default)
  totalMembers: number;
  cycleLength: number;          // Total weeks in the rotation
  currentWeek: number;
  status: "active" | "completed" | "pending";
  members: Member[];
  payments: Payment[];
  totalPool: number;            // Current USDC held in contract escrow
  nextPayoutDate: Date;
}

export interface Transaction {
  id: string;
  type: "deposit" | "contribution" | "payout" | "penalty" | "refund";
  amount: number;
  from: string;
  to: string;
  txHash: string;               // Stellar transaction hash
  status: "confirmed" | "pending" | "failed";
  description: string;
}
```

---

## Credit Score Logic

Credit scoring is computed from a member's on-chain payment history. Here's the core scoring function that will back the Soroban contract:

```typescript
// lib/credit.ts (planned Soroban integration)

export function computeCreditScore(member: Member, payments: Payment[]): number {
  const memberPayments = payments.filter((p) => p.memberId === member.id);
  let score = 500; // baseline

  for (const payment of memberPayments) {
    if (payment.status === "paid") {
      score += 20;                          // on-time contribution
    } else if (payment.status === "missed") {
      score -= 150;                         // missed payment penalty
    }
  }

  if (member.payoutReceived && member.status === "active") {
    score += 50;                            // continued contributing post-payout
  }

  if (member.status === "ejected") {
    score = Math.min(score, 300);           // hard cap for defaulters
  }

  return Math.max(0, Math.min(850, score)); // clamp to 0–850 range
}

// Circle admission gate — enforced by Soroban contract
export function isEligibleToJoin(score: number, minScore: number): boolean {
  return score >= minScore;
}

// Deposit multiplier — higher risk = larger deposit required
export function requiredDeposit(baseDeposit: number, score: number): number {
  if (score >= 700) return baseDeposit;
  if (score >= 550) return baseDeposit * 1.5;
  return baseDeposit * 2;
}
```

---

## Soroban Contract Interface (Planned)

The Soroban smart contract exposes these entry points, which the frontend will call via `@stellar/stellar-sdk`:

```rust
// contracts/rosca/src/lib.rs (Soroban contract — Rust)

#[contract]
pub struct RoscaCircle;

#[contractimpl]
impl RoscaCircle {
    /// Member posts good-faith deposit to join the circle
    pub fn join_circle(env: Env, member: Address, deposit: i128) -> Result<(), Error> { ... }

    /// Member submits weekly USDC contribution
    pub fn contribute(env: Env, member: Address, amount: i128, week: u32) -> Result<(), Error> { ... }

    /// Contract distributes pool to the designated payout recipient for this week
    pub fn trigger_payout(env: Env, week: u32) -> Result<(), Error> { ... }

    /// Called when deadline passes without contribution — slashes deposit
    pub fn slash_deposit(env: Env, member: Address) -> Result<(), Error> { ... }

    /// Returns the on-chain credit score for a given Stellar address
    pub fn get_credit_score(env: Env, member: Address) -> u32 { ... }
}
```

Frontend invocation via `stellar-sdk`:

```typescript
// lib/stellar.ts (planned)
import { Contract, SorobanRpc, TransactionBuilder, Networks } from "@stellar/stellar-sdk";

const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
const contract = new Contract(ROSCA_CONTRACT_ID);

export async function contributeToCircle(
  sourceKeypair: Keypair,
  amount: number,
  week: number
) {
  const account = await server.getAccount(sourceKeypair.publicKey());
  const tx = new TransactionBuilder(account, { fee: "100", networkPassphrase: Networks.TESTNET })
    .addOperation(contract.call("contribute", ...[amount, week]))
    .setTimeout(30)
    .build();

  const preparedTx = await server.prepareTransaction(tx);
  preparedTx.sign(sourceKeypair);
  return server.sendTransaction(preparedTx);
}
```

---

## Stellar / Soroban Integration Points

The following flows map directly to Stellar network operations:

```
Member joins circle
  → Stellar payment (USDC) to Soroban contract address (deposit)

Weekly contribution
  → Stellar payment (USDC) to contract pool
  → Soroban contract records contribution, updates credit score

Payout trigger
  → Soroban contract executes payment to recipient wallet address
  → Contract advances cycle week

Missed payment / default
  → Soroban contract detects missed deadline
  → Slashes deposit, distributes to active members via contract-initiated payments
  → Updates member credit score on-chain
  → Emits ejection event

Cross-border contribution
  → Stellar path payment operation
  → Source currency → USDC via Stellar DEX → contract pool
```

---

## Target Users

- **Diaspora communities** sending remittances home (West Africa, South Asia, Latin America)
- **Unbanked / underbanked individuals** who participate in informal savings groups
- **Migrant workers** who need access to lump-sum capital without bank credit
- **Community organizers** running susu, chit funds, or tontines who want trustless enforcement

---

## Roadmap

- [ ] Deploy Soroban contract to Stellar Testnet
- [ ] Freighter wallet integration (live signing)
- [ ] On-chain credit score storage and retrieval via Soroban contract storage
- [ ] Circle discovery and public invite links
- [ ] Multi-currency path payment support (NGN, GHS, INR, MXN → USDC)
- [ ] Mobile-responsive PWA for low-bandwidth environments
- [ ] Stellar Mainnet deployment

---

## License

MIT

---

> Built on Stellar / Soroban. Financial inclusion without banks. Peer-to-peer trust for the global diaspora.


