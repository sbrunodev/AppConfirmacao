import { CategoriaDeactivateGuard } from '../guards/categoria-deactivate.guard';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';

const Categoriasroutes: Routes = [
  { path: '', component: CategoriaListComponent },
  { path: 'novo', component: CategoriaComponent },//{ path: 'categoria', component: CategoriaComponent },
  { path: ':id', component: CategoriaComponent, canDeactivate: [CategoriaDeactivateGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(Categoriasroutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
