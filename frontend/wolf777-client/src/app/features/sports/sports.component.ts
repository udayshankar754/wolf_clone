import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Sport } from '../../core/models/sports.model';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  sports: Sport[] = [];
  selectedSport: Sport | null = null;
  isLoading = true;
  activeTab = 'upcoming';
  
  private router = inject(Router);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  
  ngOnInit(): void {
    this.loadSports();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadSports(): void {
    this.isLoading = true;
    this.apiService.getSports()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sports) => {
          this.sports = sports;
          this.isLoading = false;
          // Select first sport by default if available
          if (sports.length > 0) {
            this.selectSport(sports[0]);
          }
        },
        error: (err) => {
          console.error('Failed to load sports', err);
          this.isLoading = false;
        }
      });
  }
  
  selectSport(sport: Sport): void {
    this.selectedSport = sport;
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
  getIsLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}