import { Injectable } from '@angular/core';
import { JogadorPlacar } from '../../_models/jogador-placar';

@Injectable()
export class ControlePontosService {

  constructor() { }


  public saveNewGame(placarJogadores:Array<JogadorPlacar>){
    window.localStorage.setItem("placar",JSON.stringify(placarJogadores));
  }

  public getPlacarJogador(id:number):JogadorPlacar{
    var listaPlacarJogadores = JSON.parse(window.localStorage.getItem("placar")) as Array<JogadorPlacar>;
    return listaPlacarJogadores.find(x => x.id === id);
  }

  public getPosJogador(id:number):number{
    var listaPlacarJogadores = JSON.parse(window.localStorage.getItem("placar")) as Array<JogadorPlacar>;
    return listaPlacarJogadores.findIndex(x => x.id === id);
  }

}
