import { Component, OnInit, Inject } from '@angular/core';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { ControleJogosService } from '../../_services/ControleJogos/controle-jogos.service';
import { EventService } from '../../_services/Event/event.service';
import { AnimarValores } from '../../_animations/animejs/animar-valores';
import { slideInOutAnimation } from '../../_animations';
import * as $ from "jquery";
import { JogadorPlacar } from '../../_models/jogador/jogador-placar';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-placar',
  templateUrl: './placar.component.html',
  styleUrls: ['./placar.component.css'],
  animations: [slideInOutAnimation],
})
export class PlacarComponent implements OnInit {
  
  private _animarvalores:AnimarValores
  
  public round:number;
  public roundLimit: number;
  pontosbar: number;
  pontostrab: number;
  public vencedor:any;
  public jogadoresbeber:Array<JogadorPlacar>;
  constructor(
    @Inject(ControledevezService) private _controledevezService :ControledevezService,
    @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
    @Inject(ControleJogosService) private _controlejogosService :ControleJogosService,
    @Inject(EventService) private _eventService :EventService,
    private router:Router
  ) {
    this._animarvalores = new AnimarValores();
    this.jogadoresbeber = new Array<JogadorPlacar>();
  }
  
  ngOnInit() {
    this.iniciarTelaTimes().then(() =>{
      setTimeout(() =>{
        var btncontinuar = document.querySelector("#continuarplacartimes") as HTMLElement;
        btncontinuar.style.display = "flex";
        $(btncontinuar).addClass("bounceInUp animated");
      },500);
    });
  }
  
  iniciarTelaTimes():Promise<void>{
    return new Promise((resolve) => {
      setTimeout(() =>{
        this.pontosbar = this._controlepontosService.getPontosBar();
        this.pontostrab = this._controlepontosService.getPontosTrabalho();
        this._animarvalores.AnimarValor([this.pontosbar,this.pontostrab],["pontosbar","pontostrabalho"]);
        this.round = this._controledevezService.getIndex() + 1;
        this.roundLimit = this._controledevezService.getJogadores().length;
        var rodadas = document.querySelector("#rodadas") as HTMLElement;
        rodadas.style.display = "block";
        $(rodadas).addClass("bounceInUp animated");
        resolve();
      },500);
    });
  }
  
  continuarPlacarTime(){
    if(this.round >= this.roundLimit){
      window.localStorage.setItem("primeirarodada",JSON.stringify(0));
      this.vencedorRodadaTime();
    }else{
      this.router.navigate(['/placargeral']);
    }
  }

  redirect(){
    this.router.navigate(['/placargeral']);
  }
  
  vencedorRodadaTime():any{
    $(".placar-times").hide();
    $(".time-vencedor-rodada").show();
    if(this.pontosbar > this.pontostrab){
      this.vencedor = {
        nome:"Bar",
        imagem:"/assets/images/icones/BAR.png"
      }
      this.jogadoresbeber = this._controlepontosService.getTimeTrabalho();
    }else if(this.pontostrab > this.pontosbar){
      this.vencedor = {
        nome:"Trabalho",
        imagem:"/assets/images/icones/EMPREGO.png"
      }
      this.jogadoresbeber = this._controlepontosService.getTimeBar();
    }
  }
}
