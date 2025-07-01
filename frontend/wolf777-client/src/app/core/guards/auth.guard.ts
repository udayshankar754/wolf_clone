import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * CanActivate method for route protection
   * @param route Route being activated
   * @param state Router state
   * @returns Boolean or redirect URL
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth(state.url);
  }

  /**
   * CanActivateChild method for child route protection
   * @param childRoute Child route being activated
   * @param state Router state
   * @returns Boolean or redirect URL
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth(state.url);
  }

  /**
   * CanMatch method for route matching
   * @param route Route to match
   * @returns Boolean indicating if the route can be matched
   */
  canMatch(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.checkAuth(route.pathFromRoot.map(r => r.url.join('/')).join('/'));
  }

  /**
   * Check authentication status and redirect if necessary
   * @param url Requested URL
   * @returns Observable resolving to boolean or redirect URL
   */
  private checkAuth(url: string): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        
        // Store the attempted URL for redirecting after login
        this.storeRedirectUrl(url);
        
        // Redirect to login page
        return this.router.createUrlTree(['/auth/login']);
      })
    );
  }

  /**
   * Store redirect URL for post-login navigation
   * @param url URL to store
   */
  private storeRedirectUrl(url: string): void {
    if (url && url !== '/' && !url.includes('/auth')) {
      sessionStorage.setItem('redirectUrl', url);
    }
  }
}