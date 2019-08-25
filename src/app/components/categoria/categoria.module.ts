import { CategoriaDeactivateGuard } from '../guards/categoria-deactivate.guard';
import { CategoriaComponent } from './categoria/categoria.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CursosRoutingModule } from './categoria.routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CursosRoutingModule
  ],
  declarations: [
    CategoriaComponent,
    CategoriaListComponent
  ],
  providers:[
    CategoriaDeactivateGuard
  ]
})
export class CategoriaModule { }
