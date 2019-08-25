import { AuthService } from './components/login/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  MenuTop:boolean = true;
  MenuFlexa:boolean = true;
  MenuOpcoes:boolean = false;

  mostrarMenu: boolean = false;
  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

  
  OpenClose(value){
    switch(value){
      case 'MenuTop': this.MenuTop = !this.MenuTop ;
      case 'MenuFlexa': this.MenuFlexa = !this.MenuFlexa ;
      case 'MenuOpcoes': this.MenuOpcoes = !this.MenuOpcoes ;
    }
  }

}
