import { PacienteCreateeditComponent } from './paciente-createedit/paciente-createedit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';

const Pacienteroutes: Routes = [
  { path: '', component: PacienteComponent },
  { path: 'novo', component: PacienteCreateeditComponent },//{ path: 'categoria', component: CategoriaComponent },
  { path: ':id/editar', component: PacienteCreateeditComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(Pacienteroutes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
