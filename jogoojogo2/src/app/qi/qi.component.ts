import { Component, OnInit, Inject } from '@angular/core';
import { ItemQI } from '../../_models/roleta/QI/item-qi';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { ControleJogosService } from '../../_services/ControleJogos/controle-jogos.service';
import { EventService } from '../../_services/Event/event.service';
import { Jogador } from '../../_models/jogador/jogadores';
import * as $ from "jquery";
import { TipoEvento } from '../../_models/evento/tipo-evento';
import { slideInOutAnimation } from '../../_animations';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-qi',
  templateUrl: './qi.component.html',
  styleUrls: ['./qi.component.css'],
  animations: [slideInOutAnimation],
})
export class QiComponent implements OnInit {

  constructor(
    @Inject(ControledevezService) private _controledevezService :ControledevezService,
    @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
    @Inject(ControleJogosService) private _controlejogosService :ControleJogosService,
    @Inject(EventService) private _eventService :EventService,
    private router:Router
  ) { 
    this.jogadorVez = _controledevezService.jogadorVez();
    this.jogo = _controlejogosService.getRandomQI();
    this.jogadores = _controledevezService.getJogadores();
  }

  public jogo: ItemQI;
  public jogadorVez: Jogador;
  public jogadores: Array<Jogador>;
  public desafiador: Jogador;

  ngOnInit() {
    $(".titulo").addClass("bounceInDown animated");
    setTimeout(() => this.sortearJogador().then(() => {
      this.aparecerOpcoes();
    }),500);
  }

  errou(){
    this._controlepontosService.AlterarPontosGeral(this.desafiador.id,this.jogo.pontosGeral);
    this._eventService.emitirEvento(this.desafiador,TipoEvento.PontoLitrao,this.jogo.pontosGeral).then(()=>{
      this.router.navigate(['/placar']);
    })
  }

  acertou(){
    this._controlepontosService.AlterarPontosGeral(this.jogadorVez.id,this.jogo.pontosGeral);
    this._eventService.emitirEvento(this.jogadorVez,TipoEvento.PontoLitrao,this.jogo.pontosGeral).then(()=>{
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
          this.desafiador = this.jogadores[this.sortearValor()];
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
