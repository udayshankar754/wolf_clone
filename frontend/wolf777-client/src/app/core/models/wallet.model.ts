// Wallet model for financial transactions
export interface Wallet {
  id: string;
  userId: string;
  totalBalance: number;
  withdrawableBalance: number;
  bonusBalance: number;
  currency: string;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'bet_settlement' | 'bonus' | 'cashout' | 'adjustment';
  amount: number;
  balance: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  method?: string;
  referenceId?: string;
  description?: string;
  timestamp: Date;
  processingFee?: number;
  bonusCode?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'deposit' | 'withdrawal' | 'both';
  logo?: string;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  fee: number;
  isPopular: boolean;
  instructions?: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select';
    required: boolean;
    options?: string[];
    validation?: any;
  }[];
}

export interface DepositRequest {
  amount: number;
  method: string;
  currency?: string;
  bonusCode?: string;
  redirectUrl?: string;
  fields?: {
    [key: string]: string;
  };
}

export interface WithdrawalRequest {
  amount: number;
  method: string;
  fields?: {
    [key: string]: string;
  };
}

export interface TransactionFilter {
  startDate?: Date;
  endDate?: Date;
  type?: string[];
  status?: string[];
  minAmount?: number;
  maxAmount?: number;
}