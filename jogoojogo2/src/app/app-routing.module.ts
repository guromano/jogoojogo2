import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitsceneComponent } from './initscene/initscene.component';
import { MenuComponent } from './menu/menu.component';
import { PersonagensComponent } from './personagens/personagens.component';
import { IniciojogoComponent } from './iniciojogo/iniciojogo.component';

const routes: Routes = [
    { path: '', component:  InitsceneComponent },
    { path: 'menu', component:  MenuComponent },
    { path: 'personagens', component:  PersonagensComponent },
    { path: 'iniciojogo', component:  IniciojogoComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})



export class AppRoutingModule { }
