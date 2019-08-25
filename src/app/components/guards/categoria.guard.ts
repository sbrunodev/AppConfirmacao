import { AuthService } from '../login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriaGuard implements CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        boolean | Observable<boolean>  {
        return true;
    }

   

  

}
