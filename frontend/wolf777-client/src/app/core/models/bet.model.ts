// Bet model for tracking user bets and wagers
export interface Bet {
  id: string;
  userId: string;
  betType: 'single' | 'multiple' | 'system';
  selections: BetSelection[];
  stake: number;
  potentialWinnings: number;
  status: 'open' | 'won' | 'lost' | 'voided' | 'partially_won' | 'cashed_out';
  placedAt: Date;
  settledAt?: Date;
  cashoutAvailable?: boolean;
  cashoutValue?: number;
  freeBet?: boolean;
  freeBetId?: string;
  odds: number;
  bonusApplied?: number;
}

export interface BetSelection {
  eventId: string;
  eventName: string;
  marketId: string;
  marketName: string;
  selectionId: string;
  selectionName: string;
  odds: number;
  status: 'open' | 'won' | 'lost' | 'voided';
  startTime: Date;
  result?: string;
}

export interface BetSlip {
  selections: BetSlipSelection[];
  totalStake: number;
  potentialWinnings: number;
  totalOdds: number;
  betType: 'single' | 'multiple' | 'system';
  systemOptions?: {
    name: string;
    value: number;
    selected: boolean;
  }[];
  error?: string;
}

export interface BetSlipSelection {
  eventId: string;
  eventName: string;
  marketId: string;
  marketName: string;
  selectionId: string;
  selectionName: string;
  odds: number;
  status: 'active' | 'suspended' | 'removed';
  startTime: Date;
  sportId: string;
  leagueId: string;
}

export interface PlaceBetRequest {
  betType: 'single' | 'multiple' | 'system';
  selections: {
    selectionId: string;
    odds: number;
  }[];
  stake: number;
  systemOptions?: {
    value: number;
  }[];
  useFreeBet?: boolean;
  freeBetId?: string;
}

export interface CashoutResponse {
  betId: string;
  cashoutAmount: number;
  originalStake: number;
  originalPotentialWinnings: number;
  cashoutTime: Date;
  status: 'cashed_out';
}