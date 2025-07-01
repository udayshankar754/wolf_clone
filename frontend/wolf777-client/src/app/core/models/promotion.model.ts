// Promotion model for bonuses and offers
export interface Promotion {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  bannerImage?: string;
  startDate: Date;
  endDate: Date;
  category: 'deposit' | 'sports' | 'casino' | 'loyalty' | 'referral';
  isActive: boolean;
  isFeatured: boolean;
  sportId?: string;
  leagueId?: string;
  gameId?: string;
  termsAndConditions: string[];
  howToClaim: string;
  priority?: number;
}

export interface ClaimedPromotion {
  id: string;
  userId: string;
  promotionId: string;
  claimedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
  bonusAmount?: number;
  wageringRequired?: number;
  wageringCompleted?: number;
  bonusCode?: string;
  isFreeBet?: boolean;
}

export interface PromotionClaim {
  promotionId: string;
  bonusCode?: string;
}

export interface Referral {
  id: string;
  userId: string;
  referralCode: string;
  referredUsers: number;
  totalEarnings: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  commission: {
    sportsCommission: number;
    casinoCommission: number;
  };
}

export interface LoyaltyProgram {
  currentTier: {
    name: string;
    level: number;
    icon?: string;
  };
  points: number;
  pointsToNextTier: number;
  nextTier: {
    name: string;
    level: number;
    icon?: string;
  };
  tierBenefits: {
    name: string;
    value: string;
    icon?: string;
  }[];
  nextTierBenefits: {
    name: string;
    value: string;
    icon?: string;
  }[];
}

export interface PointsHistory {
  id: string;
  userId: string;
  points: number;
  type: 'earned' | 'redeemed';
  source: 'sports_bet' | 'casino_wager' | 'deposit' | 'reward_redemption' | 'tier_upgrade';
  description: string;
  timestamp: Date;
  referenceId?: string;
}