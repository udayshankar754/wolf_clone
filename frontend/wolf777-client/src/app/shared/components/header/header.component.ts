import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: User | null = null;
  @Input() isMobileMenuOpen = false;
  @Output() toggleMenu = new EventEmitter<void>();

  sportsCategories = [
    { name: 'Cricket', icon: 'sports_cricket', link: '/sports/cricket' },
    { name: 'Football', icon: 'sports_soccer', link: '/sports/football' },
    { name: 'Tennis', icon: 'sports_tennis', link: '/sports/tennis' },
    { name: 'Basketball', icon: 'sports_basketball', link: '/sports/basketball' },
    { name: 'Horse Racing', icon: 'sports', link: '/sports/horse-racing' },
    { name: 'Volleyball', icon: 'sports_volleyball', link: '/sports/volleyball' }
  ];

  casinoCategories = [
    { name: 'Slots', icon: 'casino', link: '/casino/slots' },
    { name: 'Live Casino', icon: 'live_tv', link: '/casino/live' },
    { name: 'Table Games', icon: 'table_chart', link: '/casino/table-games' },
    { name: 'Indian Games', icon: 'emoji_events', link: '/casino/indian-games' },
    { name: 'Crash Games', icon: 'trending_down', link: '/casino/crash' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onToggleMenu(): void {
    this.toggleMenu.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToWallet(): void {
    this.router.navigate(['/wallet']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}