import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitsceneComponent } from './initscene/initscene.component';

const routes: Routes = [
    { path: '', component:  InitsceneComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})



export class AppRoutingModule { }
