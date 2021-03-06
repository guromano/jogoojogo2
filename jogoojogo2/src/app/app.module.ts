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
import { PersonagensService } from '../_services/Personagens/personagens.service';
import { FormsModule } from '@angular/forms';
import { IniciojogoComponent } from './iniciojogo/iniciojogo.component';
import { PrejogoComponent } from './prejogo/prejogo.component';
import { VezComponent } from './vez/vez.component';
import { BarradevidaService } from '../_services/BarraDeVida/barradevida.service';
import { ControledevezService } from '../_services/ControleDeVez/controledevez.service';
import { PlacarService } from '../_services/Placar/placar.service';
import { ControlePontosService } from '../_services/ContolePontos/controle-pontos.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ControleJogosService } from '../_services/ControleJogos/controle-jogos.service';
import { SorteourevesComponent } from './sorteoureves/sorteoureves.component';
import { EventService } from '../_services/Event/event.service';
import { DesafioComponent } from './desafio/desafio.component';
import { QiComponent } from './qi/qi.component';
import { HabilidadeComponent } from './habilidade/habilidade.component';
import { PlacarComponent } from './placar/placar.component';
import { PlacarGeralComponent } from './placar-geral/placar-geral.component';


@NgModule({
  declarations: [
    AppComponent,
    InitsceneComponent,
    MenuComponent,
    PersonagensComponent,
    IniciojogoComponent,
    PrejogoComponent,
    VezComponent,
    SorteourevesComponent,
    DesafioComponent,
    QiComponent,
    HabilidadeComponent,
    PlacarComponent,
    PlacarGeralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    FalasService,
    PersonagensService,
    BarradevidaService,
    ControledevezService,
    PlacarService,
    ControlePontosService,
    HttpModule,
    ControleJogosService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
