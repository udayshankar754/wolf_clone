import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'sports',
    loadChildren: () => import('./features/sports/sports.module').then(m => m.SportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'casino',
    loadChildren: () => import('./features/casino/casino.module').then(m => m.CasinoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./features/wallet/wallet.module').then(m => m.WalletModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'promotions',
    loadChildren: () => import('./features/promotions/promotions.module').then(m => m.PromotionsModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }