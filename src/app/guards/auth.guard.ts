import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.getCurrentUser();
    const roles = route.data['roles'] as string[];

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!roles.includes(user.role)) {
      this.router.navigate(['/inventory']);
      return false;
    }

    return true;
  }
}