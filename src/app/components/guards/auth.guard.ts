import { AuthService } from '../login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    
    //console.log("Auth.Guard.Ts: "+this.authService.usuarioEstaAutenticado());
    //return true;

    //if (this.authService.usuarioEstaAutenticado())
    //  return true;

    //this.router.navigate(['/login']);
    //return false;

    return true;
  }

}
