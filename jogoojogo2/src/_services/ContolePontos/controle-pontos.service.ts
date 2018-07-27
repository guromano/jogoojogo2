import { Injectable } from '@angular/core';
import { JogadorPlacar } from '../../_models/jogador/jogador-placar';
import { TipoTimeRoleta } from '../../_models/roleta/tipo-time-roleta';
import { Jogador } from '../../_models/jogador/jogadores';

@Injectable()
export class ControlePontosService {

  constructor() {
    this.placar = JSON.parse(window.localStorage.getItem("placar")) as Array<JogadorPlacar>;
   }

  private placar:Array<JogadorPlacar>;

  public saveNewGame(placarJogadores:Array<JogadorPlacar>){
    window.localStorage.setItem("placar",JSON.stringify(placarJogadores));
    this.placar = placarJogadores;
  }

  public AlterarPontosBarra(id:number,pontos:number){
    var jogador = this.placar.find(x => x.id === id);
    jogador.nivelBarra = jogador.nivelBarra + pontos; 
    this.saveGame();
  }

  public AlterarPontosBar(id:number,pontos:number){
    var jogador = this.placar.find(x => x.id === id);
    jogador.pontosBar = jogador.pontosBar + pontos; 
    this.saveGame();
  }

  public AlterarPontosTrabalho(id:number,pontos:number){
    var jogador = this.placar.find(x => x.id === id);
    jogador.pontosTrabalho = jogador.pontosTrabalho + pontos; 
    this.saveGame();
  }

  public AlterarPontosGeral(id:number,pontos:number){
    var jogador = this.placar.find(x => x.id === id);
    jogador.litrao = jogador.litrao + pontos; 
    this.saveGame();
  }

  public saveGame():void{
    window.localStorage.setItem("placar",JSON.stringify(this.placar));
  }

  public getPlacarJogador(id:number):JogadorPlacar{
    return this.placar.find(x => x.id === id);
  }
  public getPlacarJogadores():Array<JogadorPlacar>{
    return this.placar;
  }

  public getRanking():Array<JogadorPlacar>{
    return this.placar.sort(function ( a, b ) { return b.litrao - a.litrao; });
  }

  public getPosJogador(id:number):number{
    return this.placar.findIndex(x => x.id === id);
  }

  public getTimeJogador(id:number):TipoTimeRoleta{
    var jogador = this.placar.find(x => x.id === id);
    if(jogador.nivelBarra > 50){
      return TipoTimeRoleta.Bar;
    }else if(jogador.nivelBarra < 50){
      return TipoTimeRoleta.Trabalho;
    }else{
      return TipoTimeRoleta.Neutro;
    }
  }

  public getTimeTrabalho():JogadorPlacar[]{
    return this.placar.filter(x => x.nivelBarra < 50);
  }

  public getTimeBar():JogadorPlacar[]{
    return this.placar.filter(x => x.nivelBarra > 50);
  }

  public getTimeNeutro():JogadorPlacar[]{
    return this.placar.filter(x => x.nivelBarra == 50);
  }

  public getPontosBar():number{
    var timebar = this.getTimeBar();
    var total = 0;
    timebar.forEach(jogador => {
      total += jogador.litrao;
    });
    return total;
  }

  public getPontosTrabalho():number{
    var timetrab = this.getTimeTrabalho();
    var total = 0;
    timetrab.forEach(jogador => {
      total += jogador.litrao;
    });
    return total;
  }

}
