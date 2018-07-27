import { Component, OnInit, Inject } from '@angular/core';
import { BarradevidaService } from '../../_services/BarraDeVida/barradevida.service';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { Router } from '@angular/router';
import * as anime from 'animejs';
import * as $ from "jquery";
import Swiper from 'swiper';
import { JogadorPlacar } from '../../_models/jogador/jogador-placar';
import { Jogador } from '../../_models/jogador/jogadores';
import { ItemRoleta } from '../../_models/roleta/item-roleta';
import { ControleJogosService } from '../../_services/ControleJogos/controle-jogos.service';
import { TipoItemRoleta } from '../../_models/roleta/tipo-item-roleta';
import { TipoTimeRoleta } from '../../_models/roleta/tipo-time-roleta';
import { CategoriaJogo } from '../../_models/roleta/categoria-jogo';
import { slideInOutAnimation } from '../../_animations';
import { EventService } from '../../_services/Event/event.service';
import { TipoEvento } from '../../_models/evento/tipo-evento';

@Component({
  selector: 'app-vez',
  templateUrl: './vez.component.html',
  styleUrls: ['./vez.component.css'],
  animations: [slideInOutAnimation],
})
export class VezComponent implements OnInit {

  public jogadorPlacarDaVez:JogadorPlacar;
  public jogadorVez:Jogador;
  public posicao:number;
  public CategoriasRoleta:Array<CategoriaJogo>;
  public timeJogador:TipoTimeRoleta;

  constructor(@Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
  @Inject(ControledevezService) private _controledevezService :ControledevezService,
  @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
  @Inject(ControleJogosService) private _controlejogosService :ControleJogosService,
  @Inject(EventService) private _eventService :EventService,
  private router: Router
  ) {
    this.jogadorVez = this._controledevezService.jogadorVez();
    this.jogadorPlacarDaVez = this._controlepontosService.getPlacarJogador(this.jogadorVez.id);
    this.posicao = this._controlepontosService.getPosJogador(this.jogadorVez.id) + 1;
    this.timeJogador = this.jogadorPlacarDaVez.pontosBar >= this.jogadorPlacarDaVez.pontosTrabalho ? TipoTimeRoleta.Bar : TipoTimeRoleta.Trabalho;
    this.CategoriasRoleta = this._controlejogosService.gerarBoxJogosRoleta();
  }

  ngOnInit() {
    if(this.jogadorPlacarDaVez.nivelBarra<50){
      $("#iconetrb").show();
    }else if(this.jogadorPlacarDaVez.nivelBarra>50){
      $("#iconebar").show();
    }
    setTimeout(() => {this.InitAnimation();},200)
    setTimeout(() => {this.InitElements();},3000);
    setTimeout(() =>{
      if( window.localStorage.getItem("primeirarodada") == "1"){
        if(this._controledevezService.getIndex() % 2 == 0){
          this._controlepontosService.AlterarPontosBarra(this.jogadorVez.id,20);
          this._eventService.emitirEvento(this.jogadorVez,TipoEvento.PontoBarraBar,20).then(()=>{
          })
        }else{
          this._controlepontosService.AlterarPontosBarra(this.jogadorVez.id,-20);
          this._eventService.emitirEvento(this.jogadorVez,TipoEvento.PontoBarraEmprego,20).then(()=>{
          })
        }
      }
    },4000);
  }

  InitAnimation(){
    var Timeline = anime.timeline();
    Timeline.add({
      targets: '.vezde',
      scale:[0,1],
      opacity:[0,1],
      duration: 500,
      easing: 'easeInOutQuad'
     })
     .add({
      targets: '.vezde',
      scale:[1,1.5],
      opacity:[1,0],
      duration: 1000,
      offset: '-=200',
      easing: 'easeInOutQuad'
     });
    Timeline.complete = () =>{
      $('.vezde').css("display","none");
      $('.nomejogador').css("display","block");
      var Timeline2 = anime.timeline();
      Timeline2.add({
        targets: '.nomejogador',
        scale:[0,1],
        opacity:[0,1],
        duration: 500,
        easing: 'easeInOutQuad'
       })
       .add({
        targets: '.nomejogador',
        scale:[1,1.5],
        opacity:[1,0],
        duration: 2000,
        offset: '-=200',
        easing: 'easeInOutQuad'
       });
    };
  }

  InitElements(){
    this.setSwiper();
    $("#swipper").hide();
    $("#girarRoleta").show();
    $("#girarRoleta").addClass("bounceInLeft animated");
    $('#apresentacao-vez').addClass("bounceOutDown animated");
    setTimeout(() => {
      $('#nomej').addClass("bounceInRight animated");
      $('#pontosj').addClass("bounceInLeft animated");
      $('#nomep').addClass("bounceInUp animated");
      $('#imgp').addClass("bounceInDown animated");
      $('.personagemb').addClass("bounceInDown animated");
    },500);
    setTimeout(()=>{
      this._barradevidaService.mostrarBarraDeVidaAlterandoLabel(this.jogadorVez.nome);
      setTimeout(() => {this._barradevidaService.atualizarVida(this.jogadorPlacarDaVez.nivelBarra)},300);   
    },1200)
  }

  setSwiper(){
    //TODO validar com o gu qual a melhor animcao
    var swiper = new Swiper('.swiper-container', {
      effect: 'cube',
      direction: 'vertical',
      simulateTouch:false,
      grabCursor: false,
      centeredSlides: true,
      slidesPerView: 1,
      freeMode: true,
      loop:true
    });
  }
  girarRoleta(){
    $("#girarRoleta").addClass("bounceOutDown animated");
    setTimeout(() =>{
      $("#girarRoleta").hide();
      $("#swipper").show();
      $("#swipper").addClass("bounceInUp animated");
      setTimeout(() => {
        this.sortearJogoRoleta();
      },700);
    },500);
  }

  sortearJogoRoleta():Promise<number>{
    return new Promise((resolve,reject) =>{
      var mySwiper = document.querySelector('.swiper-container') as any;
      //TODO trocar para tamanho da lista e jogos
      var tamanho = this.CategoriasRoleta.length;
      var voltas = (this.getRandomInt(0,tamanho + 1) + tamanho*10);
      var i = 0;
      var velocidade = 100;
      this.sortearId(mySwiper.swiper,voltas,i,velocidade)
      .then((val) => {
        this._barradevidaService.esconderBarraDeVida();
        setTimeout(() => {this.redirectGame(val)},2000);
      });

    });  
  }
  sortearId(swiper:any,voltas,i,velocidade):Promise<TipoItemRoleta>{
    return new Promise((resolve) => {
      setTimeout(() => {
        swiper.slidePrev(velocidade,false);
        if(i == voltas){
          //TODO pegar id do jogo escondido na div
          var container = document.querySelector(".swiper-container");
          var slide = document.querySelector(".swiper-slide-active");
          container.classList.remove("bounceInUp");
          setTimeout(()=>{container.classList.add("tada")},velocidade);
          var element = document.querySelector(".swiper-slide-active input") as HTMLInputElement;
          var result = parseInt(element.value) as TipoItemRoleta; 
          resolve(result);
        }else{
          i++;
          if(i > voltas*(2/3)){
            velocidade = velocidade*1.09;
          }
          resolve(this.sortearId(swiper,voltas,i,velocidade));
        }
      },velocidade + 35);
    });
  }
  getRandomInt(min, max):number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  redirectGame(tipo:TipoItemRoleta){
    switch(tipo){
      case TipoItemRoleta.SorteOuReves:
        this.router.navigate(['/sorteoureves']);
      break;
      case TipoItemRoleta.Jogo:
        this.router.navigate(['/habilidade']);
      break;
      case TipoItemRoleta.Desafio:
        this.router.navigate(['/desafio']);
      break;
      case TipoItemRoleta.QI:
        this.router.navigate(['/qi']);
      break;
    }
  }

}
