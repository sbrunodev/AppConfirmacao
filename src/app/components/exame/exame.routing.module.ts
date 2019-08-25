
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExameListComponent } from './exame-list/exame-list.component';
import { ExameCreateeditComponent } from './exame-createedit/exame-createedit.component';

const Examesroutes: Routes = [
  { path: '', component: ExameListComponent },
  { path: 'novo', component: ExameCreateeditComponent },//{ path: 'categoria', component: CategoriaComponent },
  { path: ':id/editar', component: ExameCreateeditComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(Examesroutes)],
  exports: [RouterModule]
})
export class ExameRoutingModule { }
