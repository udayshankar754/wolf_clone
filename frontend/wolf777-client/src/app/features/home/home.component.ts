import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  featuredEvents = [
    {
      id: '1',
      title: 'IPL 2023: Mumbai Indians vs Chennai Super Kings',
      image: 'assets/images/events/ipl-mi-csk.jpg',
      startTime: new Date('2023-05-12T19:30:00'),
      sportType: 'cricket',
      odds: { home: 1.92, draw: 3.5, away: 2.1 }
    },
    {
      id: '2',
      title: 'Premier League: Manchester United vs Liverpool',
      image: 'assets/images/events/man-utd-liverpool.jpg',
      startTime: new Date('2023-05-10T20:00:00'),
      sportType: 'football',
      odds: { home: 2.5, draw: 3.2, away: 1.7 }
    },
    {
      id: '3',
      title: 'IPL 2023: Royal Challengers Bangalore vs Rajasthan Royals',
      image: 'assets/images/events/ipl-rcb-rr.jpg',
      startTime: new Date('2023-05-13T15:30:00'),
      sportType: 'cricket',
      odds: { home: 1.85, draw: 3.5, away: 2.2 }
    },
    {
      id: '4',
      title: 'French Open 2023: Djokovic vs Nadal',
      image: 'assets/images/events/djokovic-nadal.jpg',
      startTime: new Date('2023-06-01T14:00:00'),
      sportType: 'tennis',
      odds: { home: 1.95, away: 1.85 }
    }
  ];

  popularCasinoGames = [
    {
      id: '101',
      name: 'Teen Patti Master',
      provider: 'Evolution Gaming',
      image: 'assets/images/games/teen-patti.jpg',
      category: 'indian_games',
      isNew: false,
      isPopular: true,
      rtp: 97.3,
      playersNow: 1248
    },
    {
      id: '102',
      name: 'Crazy Time',
      provider: 'Evolution Gaming',
      image: 'assets/images/games/crazy-time.jpg',
      category: 'live_casino',
      isNew: false,
      isPopular: true,
      rtp: 96.8,
      playersNow: 3105
    },
    {
      id: '103',
      name: 'Sweet Bonanza',
      provider: 'Pragmatic Play',
      image: 'assets/images/games/sweet-bonanza.jpg',
      category: 'slots',
      isNew: false,
      isPopular: true,
      rtp: 96.5,
      playersNow: 876
    },
    {
      id: '104',
      name: 'Andar Bahar',
      provider: 'Ezugi',
      image: 'assets/images/games/andar-bahar.jpg',
      category: 'indian_games',
      isNew: false,
      isPopular: true,
      rtp: 97.5,
      playersNow: 954
    }
  ];

  promotions = [
    {
      id: '201',
      title: 'Welcome Bonus: 100% up to ₹10,000',
      description: 'New users get a 100% match on their first deposit!',
      image: 'assets/images/promotions/welcome-bonus.jpg',
      category: 'deposit'
    },
    {
      id: '202',
      title: 'IPL Special: ₹1,000 Free Bet',
      description: 'Place a bet on any IPL match and get a free bet!',
      image: 'assets/images/promotions/ipl-bonus.jpg',
      category: 'sports'
    },
    {
      id: '203',
      title: 'Casino Cashback: 10% up to ₹5,000',
      description: 'Get 10% cashback on all casino losses every week!',
      image: 'assets/images/promotions/casino-cashback.jpg',
      category: 'casino'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  navigateToEvent(eventId: string, sportType: string): void {
    this.router.navigate(['/sports', sportType, 'event', eventId]);
  }

  navigateToGame(gameId: string): void {
    this.router.navigate(['/casino', 'game', gameId]);
  }

  navigateToPromotion(promoId: string): void {
    this.router.navigate(['/promotions', promoId]);
  }

  register(): void {
    this.router.navigate(['/auth/register']);
  }
}