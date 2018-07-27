import { Injectable } from '@angular/core';
import { ItemSorteOuReves } from '../../_models/roleta/SorteOuReves/item-sorteoureves';
import { ItemQI } from '../../_models/roleta/QI/item-qi';
import { ItemDesafio } from '../../_models/roleta/Desafio/item-desafio';
import { ItemJogo } from '../../_models/roleta/Jogo/item-jogo';
import * as sortereves from '_repository/sorte-reves.json';
import * as qi from '_repository/qi.json';
import * as desafio from '_repository/desafio.json';
import * as jogo from '_repository/jogos.json';
import * as categoria from '_repository/categoria.json';
import { ItemRoleta } from '../../_models/roleta/item-roleta';
import { CategoriaJogo } from '../../_models/roleta/categoria-jogo';

@Injectable()
export class ControleJogosService {

  constructor() {
    this.jogosSorteOuRevez = new Array<ItemSorteOuReves>();
    this.jogosSorteOuRevez = <any>sortereves;

    this.jogosQi = new Array<ItemQI>();
    this.jogosQi = <any>qi;

    this.jogosDesafio = new Array<ItemDesafio>();
    this.jogosDesafio = <any>desafio;

    this.jogosJogo = new Array<ItemJogo>();
    this.jogosJogo = <any>jogo;

    this.categoriasJogos = new Array<CategoriaJogo>();
    this.categoriasJogos = <any>categoria;
  }

  private jogosSorteOuRevez: Array<ItemSorteOuReves>;
  private jogosQi: Array<ItemQI>;
  private jogosDesafio: Array<ItemDesafio>;
  private jogosJogo: Array<ItemJogo>;
  private jogosItemRoleta: Array<ItemRoleta>;
  private categoriasJogos: Array<CategoriaJogo>;

  public gerarBoxJogosRoleta():Array<CategoriaJogo>{
    return this.sortearOrdem(this.categoriasJogos);
  }

  public getRandomSorteOuReves():ItemSorteOuReves{
    return this.jogosSorteOuRevez[Math.floor(Math.random() * this.jogosSorteOuRevez.length)];
  }

  public getRandomDesafio():ItemDesafio{
    return this.jogosDesafio[Math.floor(Math.random() * this.jogosDesafio.length)];
  }

  public getRandomQI():ItemQI{
    return this.jogosQi[Math.floor(Math.random() * this.jogosQi.length)];
  }

  public getRandomHabilidade():ItemJogo{
    return this.jogosJogo[Math.floor(Math.random() * this.jogosJogo.length)];
  }

  public getFlipCup():ItemJogo{
    return this.jogosJogo.find(x => x.idJogo == 22);
  }

  public getHabilidade():Array<ItemJogo>{
    return this.jogosJogo;
  }

  private sortearOrdem(jogos:Array<CategoriaJogo>):Array<CategoriaJogo>{
    var currentIndex = jogos.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = jogos[currentIndex];
      jogos[currentIndex] = jogos[randomIndex];
      jogos[randomIndex] = temporaryValue;
    }

    return jogos;
  }
}
