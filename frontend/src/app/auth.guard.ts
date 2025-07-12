// src/app/auth.guard.ts (Versão Essencial)
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data.roles as Array<string>;
    const userString = localStorage.getItem('currentUser');

    if (!userString) {
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userString);
    const hasPermission = allowedRoles.includes(user.role);

    if (hasPermission) {
      return true;
    } else {
      console.error(`ACESSO NEGADO: Role "${user.role}" não permitida.`);
      this.router.navigate(['/home']);
      return false;
    }
  }
}