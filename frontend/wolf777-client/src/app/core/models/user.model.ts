// User model with authentication, profile, and preferences
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  emailVerified: boolean;
  kycVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  oddsFormat: 'decimal' | 'fractional' | 'american';
  timezone: string;
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  themeMode: 'light' | 'dark' | 'system';
  language: string;
}

export interface UserDocument {
  id: string;
  type: 'id_proof' | 'address_proof' | 'bank_proof' | 'selfie';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  rejectionReason?: string;
  fileUrl: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  referralCode?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}