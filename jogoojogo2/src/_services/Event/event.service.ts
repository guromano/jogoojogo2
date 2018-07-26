import { Injectable } from '@angular/core';
import { Jogador } from '../../_models/jogador/jogadores';
import { TipoEvento } from '../../_models/evento/tipo-evento';
import * as $ from "jquery";


@Injectable()
export class EventService {

  private eventBox: HTMLDivElement;
  constructor() {
    this.eventBox = document.querySelector("#eventBox") as HTMLDivElement;
  }

  emitirEvento(jogador:Jogador, tipo:TipoEvento,pontos:number):Promise<void>{
    return new Promise((resolve) =>{
      if(pontos == 0){
        resolve();
      }
      this.eventBox.style.display = "flex";
      this.eventBox.style.opacity = "1";
      setTimeout(() => this.animarBoxJogador(jogador),500);
      setTimeout(() => this.animarBoxEvento(tipo,pontos),1000);
      setTimeout(() => {
        this.limparBox();
        this.eventBox.style.display = "none";
        this.eventBox.style.opacity = "0";
        resolve();
      },4000);
    })
  }


  private animarBoxJogador(jogador:Jogador){
    var nomeJogador = this.eventBox.querySelector(".jogador p");
    nomeJogador.innerHTML = jogador.nome;
    $(nomeJogador).addClass("bounceIn animated");
    var imgPersonagem = this.eventBox.querySelector(".jogador img") as HTMLImageElement;
    imgPersonagem.src = jogador.personagem.imagem;
    $(imgPersonagem).addClass("bounceIn animated");
  }

  private limparBox(){
    var nomeJogador = this.eventBox.querySelector(".jogador p");
    nomeJogador.innerHTML = "";
    $(nomeJogador).removeClass("bounceIn animated");

    var imgPersonagem = this.eventBox.querySelector(".jogador img") as HTMLImageElement;
    imgPersonagem.src = "";
    $(imgPersonagem).removeClass("bounceIn animated");

    var infoMsg = this.eventBox.querySelector(".infomsg") as HTMLDivElement;
    var sinalSpan = this.eventBox.querySelector(".infomsg .sinal") as HTMLSpanElement;   
    var pontosSpan = this.eventBox.querySelector(".infomsg .pontos") as HTMLSpanElement;
    var img = this.eventBox.querySelector(".infomsg img") as HTMLImageElement;
    sinalSpan.innerHTML = ""; 
    pontosSpan.innerHTML = "";
    $(infoMsg).removeClass("txtverde-escuro");
    $(infoMsg).removeClass("txtvermelho");
    img.src = "";
    $(img).removeClass("tada animated");
  }
  private animarBoxEvento(tipo:TipoEvento, pontos:number){
    var infoMsg = this.eventBox.querySelector(".infomsg") as HTMLDivElement;
    var sinalSpan = this.eventBox.querySelector(".infomsg .sinal") as HTMLSpanElement;   
    var pontosSpan = this.eventBox.querySelector(".infomsg .pontos") as HTMLSpanElement;
    var img = this.eventBox.querySelector(".infomsg img") as HTMLImageElement;
    if(pontos >= 0){
      sinalSpan.innerHTML = "+"; 
      $(infoMsg).addClass("txtverde-escuro");
    }else{
      sinalSpan.innerHTML = "-";
      $(infoMsg).addClass("txtvermelho");
    }
    pontosSpan.innerHTML = Math.abs(pontos).toString();
    img.src = this.nomeImgEvento(tipo);
    $(img).addClass("tada animated")
  }

  private nomeImgEvento(tipo:TipoEvento):string{
    switch(tipo){
      case TipoEvento.Mensagem:
        return "";
      case TipoEvento.PontoBar:
        return "/assets/images/pontos/Long-Neck.png";
      case TipoEvento.PontoEmprego:
        return "/assets/images/pontos/Grana.png";
      case TipoEvento.PontoBarraBar:
        return "/assets/images/icones/BAR.png";
      case TipoEvento.PontoBarraEmprego:
        return "/assets/images/icones/EMPREGO.png";
      case TipoEvento.PontoLitrao:
        return "/assets/images/crystal.png";
    }
  }
}
