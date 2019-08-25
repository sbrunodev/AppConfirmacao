import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../../class/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) {
   }

  fazerLogin(formulario) {
    this.http
      .post('http://localhost/bdevApi/api/index/login', JSON.stringify(formulario))
      .subscribe( 
        dados => this.afterAcess(dados), 
        (error: any) => console.log(error)
      );
  }

  afterAcess(dados) {
    
    if (dados.message) {
      this.usuarioAutenticado = true;
      Auth.token = dados.message; // Guarda o Token de acesso
      
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(["/home"]);      
    }
    else {
      alert(dados.result);
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}
