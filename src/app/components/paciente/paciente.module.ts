import { PacienteRoutingModule } from './paciente.routing.module';
import { PacienteComponent } from './paciente/paciente.component';
//import { CategoriaDeactivateGuard } from '../guards/categoria-deactivate.guard';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PacienteCreateeditComponent } from './paciente-createedit/paciente-createedit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PacienteRoutingModule
  ],
  declarations: [
    PacienteComponent,
    PacienteCreateeditComponent
  ],
  providers:[
    //CategoriaDeactivateGuard
  ]
})
export class PacienteModule { }
