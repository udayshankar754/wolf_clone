// Sports related models including events, leagues, teams, and betting markets
export interface Sport {
  id: string;
  name: string;
  popular: boolean;
  icon?: string;
  activeEvents?: number;
}

export interface League {
  id: string;
  sportId: string;
  name: string;
  country: string;
  logo?: string;
  priority?: number;
}

export interface Event {
  id: string;
  sportId: string;
  leagueId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: Date;
  status: 'upcoming' | 'live' | 'finished' | 'cancelled';
  score?: {
    home?: string | number;
    away?: string | number;
  };
  isFeatured?: boolean;
  markets?: Market[];
  venue?: string;
  statisticsUrl?: string;
  streamingUrl?: string;
  scoreboardUrl?: string;
}

export interface Market {
  id: string;
  eventId: string;
  name: string;
  status: 'open' | 'suspended' | 'closed' | 'settled';
  selections: Selection[];
  marketType: string;
  sortPriority?: number;
}

export interface Selection {
  id: string;
  marketId: string;
  name: string;
  odds: {
    decimal: number;
    fractional: string;
    american: string;
  };
  status: 'active' | 'suspended' | 'settled';
  outcome?: 'win' | 'lose' | 'void';
}

export interface LiveEvent extends Event {
  currentPeriod?: string;
  elapsedTime?: string;
  statistics?: {
    [key: string]: any;
  };
  inPlayStats?: {
    possession?: string;
    dangerousAttack?: {
      home: number;
      away: number;
    };
    corners?: {
      home: number;
      away: number;
    };
    yellowCards?: {
      home: number;
      away: number;
    };
    redCards?: {
      home: number;
      away: number;
    };
  };
  commentary?: string[];
}