import { Injectable } from '@angular/core';

import { Jogador } from '../../_models/jogador/jogadores';
import { OrdemJogador } from '../../_models/jogador/ordemJogador';

@Injectable()
export class ControledevezService {

  private OrdemJogadores: Array<OrdemJogador>;
  private vezIndex: number;

  constructor() {
    this.OrdemJogadores = this.verificarOrdem();
    this.vezIndex = this.verificarIndex();
  }

  public getOrdemJogadores():Array<OrdemJogador>{
    return this.OrdemJogadores;
  }
  
  public jogadorVez():Jogador{
    return this.OrdemJogadores[this.vezIndex].jogador;
  }
  
  public PassarVez():void{
    this.vezIndex++;
    if(this.vezIndex >= this.OrdemJogadores.length){
      this.vezIndex = 0;
    }
    window.localStorage.setItem("vezIndex",this.vezIndex.toString());
  }

  private verificarIndex():number{
    var lcvez = window.localStorage.getItem("vezIndex");
    var vez = Number();
    if(lcvez == null){
      vez = 0;
      window.localStorage.setItem("vezIndex",vez.toString());
    }else{
      vez = Number.parseInt( window.localStorage.getItem("vezIndex"));
    }
    return vez;
  }
  private verificarOrdem():Array<OrdemJogador>{
    var ordem = new Array<OrdemJogador>();
    var ls_ordem = window.localStorage.getItem("ordem_jogadores");

    if(ls_ordem == null){
      var jogadores = JSON.parse(window.localStorage.getItem("jogadores")) as Array<Jogador>;
      ordem = this.sortearOrdem(jogadores);
      window.localStorage.setItem("ordem_jogadores",JSON.stringify(ordem));
    }else{
      ordem = JSON.parse(ls_ordem) as Array<OrdemJogador>;
    }
    return ordem;
  }

  private sortearOrdem(jogadores:Array<Jogador>):Array<OrdemJogador>{
      var currentIndex = jogadores.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = jogadores[currentIndex];
      jogadores[currentIndex] = jogadores[randomIndex];
      jogadores[randomIndex] = temporaryValue;
    }
    var retorno = new Array<OrdemJogador>();
    jogadores.forEach((jogador,i) => {
      var oj = new OrdemJogador();
      oj.pos = i;
      oj.jogador = jogador;
      retorno.push(oj);
    });

    return retorno;
  }

}
