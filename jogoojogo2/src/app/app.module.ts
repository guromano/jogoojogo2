import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InitsceneComponent } from './initscene/initscene.component';
import { FalasService } from '../_services/Falas/falas.service';
import { MenuComponent } from './menu/menu.component';
import { PersonagensComponent } from './personagens/personagens.component';


@NgModule({
  declarations: [
    AppComponent,
    InitsceneComponent,
    MenuComponent,
    PersonagensComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [
    FalasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
