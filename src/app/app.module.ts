import { CategoriaService } from './model/categoria.service';
import { CategoriaGuard } from './components/guards/categoria.guard';
import { AuthGuard } from './components/guards/auth.guard';
import { AuthService } from './components/login/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { LoginModule } from './components/login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ExameService } from './model/exame.service';
import { EnviaremailComponent } from './components/enviaremail/enviaremail/enviaremail.component';
import { EnviaremailListComponent } from './components/enviaremail/enviaremail-list/enviaremail-list.component';
import { EnviaremailDetalhadaComponent } from './components/enviaremail/enviaremail-detalhada/enviaremail-detalhada.component';
//import { PacienteComponent } from './components/paciente/paciente/paciente.component';
//import { ExameCreateeditComponent } from './components/exame/exame-createedit/exame-createedit.component';
//import { ExameListComponent } from './components/exame/exame-list/exame-list.component';
//import { CategoriaModule } from './components/categoria/categoria.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnviaremailComponent,
    EnviaremailListComponent,
    EnviaremailDetalhadaComponent
    //PacienteComponent,
    //ExameCreateeditComponent,
    //ExameListComponent,
    //LoginComponent,
    //CategoriaComponent
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    LoginModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, CategoriaGuard, CategoriaService, ExameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
