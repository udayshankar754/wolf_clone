import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private userSubscription!: Subscription;
  private routerSubscription!: Subscription;
  isMobileMenuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });

    // Track router events for analytics
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Close mobile menu when route changes
        this.isMobileMenuOpen = false;
        // Could add analytics tracking here
      });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}