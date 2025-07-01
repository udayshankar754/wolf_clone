import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { User, LoginRequest, RegisterRequest, LoginResponse } from '../models/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private userSubject = new BehaviorSubject<User | null>(null);
  private authTokenSubject = new BehaviorSubject<string | null>(null);
  private refreshTokenTimeout: any;

  public user$: Observable<User | null> = this.userSubject.asObservable();
  public authToken$: Observable<string | null> = this.authTokenSubject.asObservable();
  public isAuthenticated$: Observable<boolean> = this.authToken$.pipe(map(token => !!token));

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  /**
   * Initialize authentication state from stored tokens
   */
  private initializeAuth(): void {
    const token = this.storageService.getAuthToken();
    const refreshToken = this.storageService.getRefreshToken();

    if (token) {
      if (this.isTokenValid(token)) {
        this.setSession(token, refreshToken);
        this.loadUserProfile().subscribe();
      } else if (refreshToken) {
        this.refreshToken().subscribe();
      } else {
        this.logout();
      }
    }
  }

  /**
   * Registers a new user
   * @param credentials User registration data
   * @returns Observable with registration response
   */
  register(credentials: RegisterRequest): Observable<User> {
    return this.apiService.post<LoginResponse>('/auth/register', credentials).pipe(
      tap(response => this.setSession(response.token, response.refreshToken)),
      map(response => response.user),
      catchError(this.handleAuthError)
    );
  }

  /**
   * Logs in a user
   * @param credentials User login credentials
   * @returns Observable with login response
   */
  login(credentials: LoginRequest): Observable<User> {
    return this.apiService.post<LoginResponse>('/auth/login', credentials).pipe(
      tap(response => this.setSession(response.token, response.refreshToken)),
      map(response => response.user),
      catchError(this.handleAuthError)
    );
  }

  /**
   * Logs out the current user
   */
  logout(): void {
    this.storageService.removeAuthToken();
    this.storageService.removeRefreshToken();
    this.userSubject.next(null);
    this.authTokenSubject.next(null);
    this.stopRefreshTokenTimer();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Refreshes the authentication token
   * @returns Observable with new auth token
   */
  refreshToken(): Observable<string> {
    const refreshToken = this.storageService.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.apiService.post<{ token: string, refreshToken: string }>('/auth/refresh-token', { refreshToken }).pipe(
      tap(response => this.setSession(response.token, response.refreshToken)),
      map(response => response.token),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Loads the current user profile
   * @returns Observable with User object
   */
  loadUserProfile(): Observable<User> {
    if (!this.authTokenSubject.value) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.apiService.get<User>('/users/profile').pipe(
      tap(user => this.userSubject.next(user)),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.refreshToken().pipe(
            switchMap(() => this.apiService.get<User>('/users/profile')),
            tap(user => this.userSubject.next(user))
          );
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Updates the user profile
   * @param userData Updated user data
   * @returns Observable with updated User
   */
  updateProfile(userData: Partial<User>): Observable<User> {
    return this.apiService.put<User>('/users/profile', userData).pipe(
      tap(user => this.userSubject.next(user)),
      catchError(this.handleAuthError)
    );
  }

  /**
   * Change user password
   * @param currentPassword Current password
   * @param newPassword New password
   * @returns Observable with success message
   */
  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword
    }).pipe(
      catchError(this.handleAuthError)
    );
  }

  /**
   * Request password reset
   * @param email User's email
   * @returns Observable with success message
   */
  requestPasswordReset(email: string): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }>('/auth/forgot-password', { email }).pipe(
      catchError(this.handleAuthError)
    );
  }

  /**
   * Reset password with token
   * @param token Reset token
   * @param newPassword New password
   * @returns Observable with success message
   */
  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword
    }).pipe(
      catchError(this.handleAuthError)
    );
  }

  /**
   * Verify user's email with token
   * @param token Email verification token
   * @returns Observable with success message
   */
  verifyEmail(token: string): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }>('/auth/verify-email', { token }).pipe(
      catchError(this.handleAuthError)
    );
  }

  /**
   * Set authentication session data
   * @param token Auth token
   * @param refreshToken Refresh token
   */
  private setSession(token: string, refreshToken: string | null): void {
    this.storageService.setAuthToken(token);
    if (refreshToken) {
      this.storageService.setRefreshToken(refreshToken);
    }
    this.authTokenSubject.next(token);

    // Start refresh token timer
    this.startRefreshTokenTimer(token);
  }

  /**
   * Start the refresh token timer
   * @param token Current auth token
   */
  private startRefreshTokenTimer(token: string): void {
    this.stopRefreshTokenTimer();

    // Decode token to get expiration time
    const decoded = this.jwtHelper.decodeToken(token);
    const expires = new Date(decoded.exp * 1000);
    
    // Set timer to refresh 1 minute before token expires
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    if (timeout > 0) {
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, timeout);
    }
  }

  /**
   * Stop the refresh token timer
   */
  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  /**
   * Check if a token is valid and not expired
   * @param token Auth token to check
   * @returns Boolean indicating if token is valid
   */
  private isTokenValid(token: string): boolean {
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  /**
   * Handle authentication errors
   * @param error Error object
   * @returns Observable with error
   */
  private handleAuthError(error: any) {
    let errorMessage = 'Authentication failed';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get current authentication token
   * @returns Current auth token or null
   */
  getToken(): string | null {
    return this.authTokenSubject.value;
  }

  /**
   * Get current user
   * @returns Current user or null
   */
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}