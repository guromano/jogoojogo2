import { Component, OnInit, Inject } from '@angular/core';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { ControleJogosService } from '../../_services/ControleJogos/controle-jogos.service';
import { EventService } from '../../_services/Event/event.service';
import * as $ from "jquery";
import { ItemJogo } from '../../_models/roleta/Jogo/item-jogo';
import { Jogador } from '../../_models/jogador/jogadores';
import { TipoTimeRoleta } from '../../_models/roleta/tipo-time-roleta';
import { JogadorPlacar } from '../../_models/jogador/jogador-placar';
import { TipoEvento } from '../../_models/evento/tipo-evento';
import { slideInOutAnimation } from '../../_animations';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-habilidade',
  templateUrl: './habilidade.component.html',
  styleUrls: ['./habilidade.component.css'],
  animations: [slideInOutAnimation],
})
export class HabilidadeComponent implements OnInit {

  constructor(
    @Inject(ControledevezService) private _controledevezService :ControledevezService,
    @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
    @Inject(ControleJogosService) private _controlejogosService :ControleJogosService,
    @Inject(EventService) private _eventService :EventService,
    private router:Router
  ) { 
    this.listaJogos = this._controlejogosService.getHabilidade();
    this.jogo = this._controlejogosService.getRandomHabilidade();
    //this.jogo = this._controlejogosService.getFlipCup();
    this.jogadorVez = this._controledevezService.jogadorVez();
    this.listaJogadores = this._controledevezService.getJogadores();
  }

  public listaJogadores: Array<Jogador>;
  public listaJogos: Array<ItemJogo>;
  public desafiador: Jogador;
  public jogo: ItemJogo;
  public jogoSortear:ItemJogo;
  public jogadorVez:Jogador;
  public timeBar:Array<Jogador>;
  public timeEmprego:Array<Jogador>;
  public eventList:Array<any>;

  ngOnInit() {
    this.sortearJogo().then(()=>{
      if(this.jogo.sorteioAdversario){
        this.desafiador = this.listaJogadores
        .filter(x => x.id != this.jogadorVez.id)[Math.floor(Math.random() * this.listaJogadores.length)];
        $(".jogador-sorteado").addClass("flash animated");
        $("#desafio").show();
        $("#desafio").addClass("bounceInUp animated");
      }else if(this.jogo.sorteioTime){
        this.tirarTimes().then(() => {
          $(".times").show();
          $("#time").show();
          $("#time").addClass("bounceInUp animated");
        });
      }else{
        $("#individual").show();
        $("#individual").addClass("bounceInUp animated");
      }
    });
  }

  perdeu(){
    this._controlepontosService.AlterarPontosGeral(this.desafiador.id,this.jogo.pontosGeral);
    this._eventService.emitirEvento(this.desafiador,TipoEvento.PontoLitrao,this.jogo.pontosGeral).then(()=>{
      this.router.navigate(['/placar']);
    })
  }

  ganhou(){
    this._controlepontosService.AlterarPontosGeral(this.jogadorVez.id,this.jogo.pontosGeral);
    this._eventService.emitirEvento(this.jogadorVez,TipoEvento.PontoLitrao,this.jogo.pontosGeral).then(()=>{
      this.router.navigate(['/placar']);
    })
  }

  arregar(){
    this.router.navigate(['/placar']);
  }

  encarar(){
    this._controlepontosService.AlterarPontosGeral(this.jogadorVez.id,this.jogo.pontosGeral);
    this._eventService.emitirEvento(this.jogadorVez,TipoEvento.PontoLitrao,this.jogo.pontosGeral).then(()=>{
      this.router.navigate(['/placar']);
    })
  }

  bar(){
    var tasklist = new Array<any>();
    this.timeBar.forEach(jogador => {
      tasklist.push({
        jogador:jogador,
        tipo:TipoEvento.PontoLitrao,
        pontos:this.jogo.pontosGeral
      });
      this._controlepontosService.AlterarPontosGeral(jogador.id,this.jogo.pontosGeral);
    });
    this.executarTaskList(tasklist).then(() =>{
      this.router.navigate(['/placar']);
    });
  }
  emprego(){
    var tasklist = new Array<any>();
    this.timeEmprego.forEach(jogador => {
      tasklist.push({
        jogador:jogador,
        tipo:TipoEvento.PontoLitrao,
        pontos:this.jogo.pontosGeral
      });
      this._controlepontosService.AlterarPontosGeral(jogador.id,this.jogo.pontosGeral);
    });
    this.executarTaskList(tasklist).then(() =>{
      this.router.navigate(['/placar']);
    });
  }

  async executarTaskList(tasklist:Array<any>):Promise<void>{
    for (let job of tasklist.map(x => () => this._eventService.emitirEvento(x.jogador,x.tipo,x.pontos))){
        await job()
    }
  }
  tirarTimes():Promise<void>{
    this.eventList = new Array<any>();
    return new Promise((resolve) => {
      this.timeBar = new Array<Jogador>();
      this.timeEmprego = new Array<Jogador>();
      if(this._controlepontosService.getTimeJogador(this.jogadorVez.id) == TipoTimeRoleta.Trabalho){
        this.aplicarJogador(this.jogadorVez,TipoTimeRoleta.Trabalho);
      }else{
        this.aplicarJogador(this.jogadorVez,TipoTimeRoleta.Bar);
      }
      this.completarTimeBar();
      this.completarTimeTrabalho();
      this.executarTaskList(this.eventList).then(() =>{
        resolve();
      })
    });
  }

  completarTimeBar(){
    var jogadoresBarDisponiveis = this._controlepontosService.getTimeBar().filter(x => x.id != this.jogadorVez.id);
    var disponiveis = jogadoresBarDisponiveis.length;
    var necessarios = 4 - this.timeBar.length;
    if(disponiveis > 0){
      while(disponiveis != 0 && necessarios != 0){
        var randomIndex = Math.floor(Math.random() * jogadoresBarDisponiveis.length);
        this.aplicarJogador(jogadoresBarDisponiveis[randomIndex], TipoTimeRoleta.Bar);
        jogadoresBarDisponiveis.splice(randomIndex, 1);
        disponiveis = jogadoresBarDisponiveis.length;
        necessarios = 4 - this.timeBar.length;
      }
    }
    if(necessarios != 0){
      var jogadoresNeutrosDisponiveis = this._controlepontosService.getTimeNeutro().filter(x => x.id != this.jogadorVez.id);
      var neutrodisponiveis = jogadoresNeutrosDisponiveis.length;
      while(neutrodisponiveis != 0 && necessarios != 0){
        var randomIndex = Math.floor(Math.random() * jogadoresNeutrosDisponiveis.length);
        this.aplicarJogador(jogadoresNeutrosDisponiveis[randomIndex], TipoTimeRoleta.Bar);
        jogadoresNeutrosDisponiveis.splice(randomIndex, 1);
        neutrodisponiveis = jogadoresNeutrosDisponiveis.length;
        necessarios = 4 - this.timeBar.length;
      }
      if(necessarios != 0){
        var JogadoresTrabalhoDisponiveis = this._controlepontosService.getTimeTrabalho().filter(x => x.id != this.jogadorVez.id);
        var trbdisponiveis = jogadoresBarDisponiveis.length;
        while(trbdisponiveis != 0 && necessarios != 0){
          var randomIndex = Math.floor(Math.random() * JogadoresTrabalhoDisponiveis.length);
          this.aplicarJogador(JogadoresTrabalhoDisponiveis[randomIndex], TipoTimeRoleta.Bar);
          JogadoresTrabalhoDisponiveis.splice(randomIndex, 1);
          trbdisponiveis = JogadoresTrabalhoDisponiveis.length;
          necessarios = 4 - this.timeBar.length;
        }
      }
    }
  }

  completarTimeTrabalho(){
    var JogadoresTrabalhoDisponiveis = this._controlepontosService.getTimeTrabalho()
    .filter(x => this.filtroTrabalho(x));
    var trbdisponiveis = JogadoresTrabalhoDisponiveis.length;
    var necessarios = 4 - this.timeEmprego.length;
    if(trbdisponiveis > 0){
      while(trbdisponiveis != 0 && necessarios != 0){
        var randomIndex = Math.floor(Math.random() * JogadoresTrabalhoDisponiveis.length);
        this.aplicarJogador(JogadoresTrabalhoDisponiveis[randomIndex], TipoTimeRoleta.Trabalho);
        JogadoresTrabalhoDisponiveis.splice(randomIndex, 1);
        trbdisponiveis = JogadoresTrabalhoDisponiveis.length;
        necessarios = 4 - this.timeEmprego.length;
      }
    }
    if(necessarios != 0){
      var jogadoresNeutrosDisponiveis = this._controlepontosService.getTimeNeutro()
      .filter(x => this.filtroTrabalho(x));
      var neutrodisponiveis = jogadoresNeutrosDisponiveis.length;
      while(neutrodisponiveis != 0 && necessarios != 0){
        var randomIndex = Math.floor(Math.random() * jogadoresNeutrosDisponiveis.length);
        this.aplicarJogador(jogadoresNeutrosDisponiveis[randomIndex], TipoTimeRoleta.Trabalho);
        jogadoresNeutrosDisponiveis.splice(randomIndex, 1);
        neutrodisponiveis = jogadoresNeutrosDisponiveis.length;
        necessarios = 4 - this.timeEmprego.length;
      }
      if(necessarios != 0){
        var jogadoresBarDisponiveis = this._controlepontosService.getTimeBar()
        .filter(x => this.filtroTrabalho(x));
        var disponiveis = jogadoresBarDisponiveis.length;
        while(disponiveis != 0 && necessarios != 0){
          var randomIndex = Math.floor(Math.random() * jogadoresBarDisponiveis.length);
          this.aplicarJogador(jogadoresBarDisponiveis[randomIndex], TipoTimeRoleta.Trabalho);
          jogadoresBarDisponiveis.splice(randomIndex, 1);
          disponiveis = jogadoresBarDisponiveis.length;
          necessarios = 4 - this.timeEmprego.length;
        }
      }
    }
  }

  filtroTrabalho(x:JogadorPlacar):boolean{
    if(this.jogadorVez.id == x.id)
      return false;
    if(this.timeBar.filter(z =>z.id == x.id).length > 0)
      return false;
    return true;
  }

  aplicarJogador(jogador:Jogador, time:TipoTimeRoleta){
    if(TipoTimeRoleta.Trabalho == time){
      this.timeEmprego.push(jogador);
    }else{
      this.timeBar.push(jogador);
    }

    if(this._controlepontosService.getTimeJogador(jogador.id) != time){
      this.eventList.push({
        jogador:jogador,
        tipo:time == TipoTimeRoleta.Bar ? TipoEvento.PontoBarraBar : TipoEvento.PontoBarraEmprego,
        pontos:20
      });
      this._controlepontosService.AlterarPontosBarra(jogador.id,time == TipoTimeRoleta.Bar ? 20 : -20);
    }
  }

  sortearJogo():Promise<void>{
    var i = 0;
    var timer = 0;
    return new Promise((resolve) =>{
      var interval = setInterval(() =>{
        this.jogoSortear = this.listaJogos[i];
        i++;
        timer += 200;
        if(i >= this.listaJogos.length){
          i = 0;
        };
        if(timer >= (6000)){
          clearInterval(interval);
          this.jogoSortear = this.jogo;
          $(".jogo").addClass("tada animated");
          resolve();
        }
      },100);
    });
  }
}
