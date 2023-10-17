import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.routeConfig?.path === 'view-all-feedback' && this.userService?.userVal?.user?.role !== 'ADMIN') {
        this.router.navigate(['/login']); 
        return false;
      }
    if (this.userService?.userVal?.token) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
