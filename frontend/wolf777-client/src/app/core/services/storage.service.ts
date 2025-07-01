import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly AUTH_TOKEN_KEY = 'wolf777_auth_token';
  private readonly REFRESH_TOKEN_KEY = 'wolf777_refresh_token';
  private readonly USER_PREFERENCES_KEY = 'wolf777_user_preferences';
  private readonly BET_SLIP_KEY = 'wolf777_bet_slip';
  private readonly RECENT_GAMES_KEY = 'wolf777_recent_games';

  constructor() {}

  /**
   * Get authentication token from storage
   * @returns Authentication token or null
   */
  getAuthToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Set authentication token in storage
   * @param token Authentication token
   */
  setAuthToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  /**
   * Remove authentication token from storage
   */
  removeAuthToken(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Get refresh token from storage
   * @returns Refresh token or null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Set refresh token in storage
   * @param token Refresh token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Remove refresh token from storage
   */
  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Get user preferences from storage
   * @returns User preferences object or default preferences
   */
  getUserPreferences<T>(): T | null {
    const preferences = localStorage.getItem(this.USER_PREFERENCES_KEY);
    return preferences ? JSON.parse(preferences) : null;
  }

  /**
   * Set user preferences in storage
   * @param preferences User preferences object
   */
  setUserPreferences(preferences: any): void {
    localStorage.setItem(this.USER_PREFERENCES_KEY, JSON.stringify(preferences));
  }

  /**
   * Get bet slip from storage
   * @returns Bet slip object or null
   */
  getBetSlip<T>(): T | null {
    const betSlip = localStorage.getItem(this.BET_SLIP_KEY);
    return betSlip ? JSON.parse(betSlip) : null;
  }

  /**
   * Set bet slip in storage
   * @param betSlip Bet slip object
   */
  setBetSlip(betSlip: any): void {
    localStorage.setItem(this.BET_SLIP_KEY, JSON.stringify(betSlip));
  }

  /**
   * Get recent games from storage
   * @returns Recent games array or empty array
   */
  getRecentGames<T>(): T[] {
    const recentGames = localStorage.getItem(this.RECENT_GAMES_KEY);
    return recentGames ? JSON.parse(recentGames) : [];
  }

  /**
   * Set recent games in storage
   * @param games Recent games array
   */
  setRecentGames(games: any[]): void {
    localStorage.setItem(this.RECENT_GAMES_KEY, JSON.stringify(games));
  }

  /**
   * Store a value in local storage
   * @param key Storage key
   * @param value Value to store
   */
  setItem(key: string, value: any): void {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Get a value from local storage
   * @param key Storage key
   * @returns Stored value or null
   */
  getItem<T>(key: string, parse: boolean = true): T | null {
    const item = localStorage.getItem(key);
    
    if (item === null) {
      return null;
    }
    
    if (parse) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item as unknown as T;
      }
    }
    
    return item as unknown as T;
  }

  /**
   * Remove item from local storage
   * @param key Storage key
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  
  /**
   * Clear all storage
   */
  clear(): void {
    localStorage.clear();
  }
}