import {
  CanActivate,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isUserAuthenticated = this.authService.isUserAuthenticated();

    if (!isUserAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isUserAuthenticated;
  }
}
