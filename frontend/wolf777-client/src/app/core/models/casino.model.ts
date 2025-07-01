// Casino game models
export interface CasinoGame {
  id: string;
  name: string;
  provider: string;
  type: 'slots' | 'table_games' | 'live_casino' | 'indian_games' | 'crash' | 'scratch';
  thumbnail: string;
  images?: string[];
  description?: string;
  rtp?: number;
  volatility?: 'low' | 'medium' | 'high';
  minBet?: number;
  maxBet?: number;
  features?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  rating?: number;
  theme?: string[];
}

export interface GameCategory {
  id: string;
  name: string;
  count: number;
  icon?: string;
  priority: number;
}

export interface GameProvider {
  id: string;
  name: string;
  logo: string;
  gameCount: number;
}

export interface GameLaunchRequest {
  gameId: string;
  mode?: 'real' | 'demo';
  device?: 'desktop' | 'mobile';
}

export interface GameLaunchResponse {
  url: string;
  gameId: string;
  token: string;
  provider: string;
}

export interface RecentGame {
  gameId: string;
  name: string;
  provider: string;
  thumbnail: string;
  lastPlayed: Date;
}

export interface CasinoFilter {
  categories?: string[];
  providers?: string[];
  features?: string[];
  search?: string;
  sortBy?: 'popularity' | 'name' | 'newest';
  minRTP?: number;
}