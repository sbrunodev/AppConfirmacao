import { CategoriaComponent } from '../categoria/categoria/categoria.component';
import { AuthService } from '../login/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriaDeactivateGuard implements CanDeactivate<CategoriaComponent> {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canDeactivate(
        component: CategoriaComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | boolean {
        
        console.log('Rota de Desativação');
        return component.podeMudarRota();

    }

}
