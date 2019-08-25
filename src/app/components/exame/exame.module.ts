import { ExameCreateeditComponent } from './exame-createedit/exame-createedit.component';
import { ExameRoutingModule } from './exame.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExameListComponent } from './exame-list/exame-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ExameRoutingModule
  ],
  declarations: [
    ExameCreateeditComponent,
    ExameListComponent
  ],
  providers:[
    //CategoriaDeactivateGuard
  ]
})
export class ExameModule { }
