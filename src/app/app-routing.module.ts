import { EnviaremailListComponent } from './components/enviaremail/enviaremail-list/enviaremail-list.component';
import { PacienteModule } from './components/paciente/paciente.module';
import { ExameModule } from './components/exame/exame.module';
import { CategoriaGuard } from './components/guards/categoria.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaModule } from './components/categoria/categoria.module';
import { AuthGuard } from './components/guards/auth.guard';
import { EnviaremailComponent } from './components/enviaremail/enviaremail/enviaremail.component';
import { EnviaremailDetalhadaComponent } from './components/enviaremail/enviaremail-detalhada/enviaremail-detalhada.component';

const routes: Routes = [
  {
    path: 'categoria',
    loadChildren: () => CategoriaModule,
    canActivate: [AuthGuard],
    canActivateChild: [CategoriaGuard]
  },
  {
    path: 'paciente',
    loadChildren: () => PacienteModule,
    canActivate: [AuthGuard],
    //canActivateChild: [CategoriaGuard]
  },
  {
    path: 'notificacao',
    component: EnviaremailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notificacoes',
    component: EnviaremailListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notificacoes/detalhada/:id',
    component: EnviaremailDetalhadaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exame',
    loadChildren: () => ExameModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
