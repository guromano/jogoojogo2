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
import { reject } from 'q';

@Component({
  selector: 'app-vez',
  templateUrl: './vez.component.html',
  styleUrls: ['./vez.component.css']
})
export class VezComponent implements OnInit {

  public jogadorPlacarDaVez:JogadorPlacar;
  public jogadorVez:Jogador;
  public posicao:number;

  constructor(@Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
  @Inject(ControledevezService) private _controledevezService :ControledevezService,
  @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
  private router: Router) {
    this.jogadorVez = this._controledevezService.jogadorVez();
    this.jogadorPlacarDaVez = this._controlepontosService.getPlacarJogador(this.jogadorVez.id);
    this.posicao = this._controlepontosService.getPosJogador(this.jogadorVez.id) + 1;
  }

  ngOnInit() {
    setTimeout(() => {this.InitAnimation();},200)
    setTimeout(() => {this.InitElements();},3000);
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
      setTimeout(() => {this._barradevidaService.atualizarVida(this.jogadorPlacarDaVez.nivelBar)},300);     
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
      var tamanho = 6;
      var voltas = (this.getRandomInt(0,tamanho + 1) + tamanho*10);
      var i = 0;
      var velocidade = 100;
      this.sortearId(mySwiper.swiper,voltas,i,velocidade)
      .then((val) => {
        console.log(val)
      });

    });  
  }
  sortearId(swiper:any,voltas,i,velocidade):Promise<number>{
    return new Promise((resolve) => {
      setTimeout(() => {
        swiper.slidePrev(velocidade,false);
        if(i == voltas){
          //TODO pegar id do jogo escondido na div
          var container = document.querySelector(".swiper-container");
          var slide = document.querySelector(".swiper-slide-active");
          container.classList.remove("bounceInUp");
          setTimeout(()=>{container.classList.add("tada")},velocidade);
          resolve(1);
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
}
