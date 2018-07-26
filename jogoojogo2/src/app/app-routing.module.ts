import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitsceneComponent } from './initscene/initscene.component';
import { MenuComponent } from './menu/menu.component';
import { PersonagensComponent } from './personagens/personagens.component';
import { IniciojogoComponent } from './iniciojogo/iniciojogo.component';
import { PrejogoComponent } from './prejogo/prejogo.component';
import { VezComponent } from './vez/vez.component';
import { SorteourevesComponent } from './sorteoureves/sorteoureves.component';
import { DesafioComponent } from './desafio/desafio.component';

const routes: Routes = [
    { path: '', component:  InitsceneComponent },
    { path: 'menu', component:  MenuComponent },
    { path: 'personagens', component:  PersonagensComponent },
    { path: 'iniciojogo', component:  IniciojogoComponent },
    { path: 'prejogo', component:  PrejogoComponent },
    { path: 'vez', component:  VezComponent },
    { path: 'sorteoureves', component:  SorteourevesComponent },    
    { path: 'desafio', component:  DesafioComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})



export class AppRoutingModule { }
