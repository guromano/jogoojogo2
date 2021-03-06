import { Component, OnInit, Inject } from '@angular/core';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { ControleJogosService } from '../../_services/ControleJogos/controle-jogos.service';
import { EventService } from '../../_services/Event/event.service';
import { Jogador } from '../../_models/jogador/jogadores';
import { ItemDesafio } from '../../_models/roleta/Desafio/item-desafio';
import * as $ from "jquery";
import { resolve } from '../../../node_modules/@types/q';
import { TipoEvento } from '../../_models/evento/tipo-evento';
import { slideInOutAnimation } from '../../_animations';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-desafio',
  templateUrl: './desafio.component.html',
  styleUrls: ['./desafio.component.css'],
  animations: [slideInOutAnimation],
})
export class DesafioComponent implements OnInit {

  public jogadorVez:Jogador;
  public desafio:ItemDesafio;
  public jogadores:Array<Jogador>;
  public desafiador:Jogador;

  constructor(
    @Inject(ControledevezService) private _controledevezService :ControledevezService,
    @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
    @Inject(ControleJogosService) private _controlejogosService :ControleJogosService,
    @Inject(EventService) private _eventService :EventService,
    private router: Router
  ) {
    this.jogadorVez = _controledevezService.jogadorVez();
    this.desafio = _controlejogosService.getRandomDesafio();
    this.jogadores = _controledevezService.getJogadores();
   }

  ngOnInit() {
    $(".titulo").addClass("bounceInDown animated");
    if(this.desafio.sortearDesafiador){
      setTimeout(() => this.sortearJogador().then(() => {
        this.aparecerOpcoes();
      }),500);
    }else{
      this.aparecerOpcoes();
    }
  }

  arregar(){
    this.router.navigate(['/placar']);
  }

  encarar(){
    this._controlepontosService.AlterarPontosGeral(this.jogadorVez.id,this.desafio.pontosGeral);
    this._eventService.emitirEvento(this.jogadorVez,TipoEvento.PontoLitrao,this.desafio.pontosGeral).then(()=>{
      this.router.navigate(['/placar']);
    })
  }
  aparecerOpcoes(){
    $(".opcoes").show();
    $(".opcoes").addClass("bounceInUp animated");
  }

  sortearJogador():Promise<void>{
    var i = 0;
    var timer = 0;
    return new Promise((resolve) =>{
      var interval = setInterval(() =>{
        this.desafiador = this.jogadores[i];
        i++;
        timer += 200;
        if(i >= this.jogadores.length){
          i = 0;
        };
        if(timer >= (5000)){
          clearInterval(interval);
          this.desafiador = this.jogadores.filter(x => x.id != this.jogadorVez.id)[this.sortearValor()];
          resolve();
        }
      },100);
    });
  }

  sortearValor(){
    var random = Math.floor(Math.random() * this.jogadores.length);
    while(random == this.jogadorVez.id){
      random = Math.floor(Math.random() * this.jogadores.length);
    }
    return random;
  }
}
