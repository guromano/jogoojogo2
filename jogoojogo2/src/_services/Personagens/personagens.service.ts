import { Injectable } from '@angular/core';
import { Personagem } from '../../_models/personagem/personagem';
import { HttpClient } from '@angular/common/http';
import * as personagens from '_repository/personagens.json';
import 'rxjs/Rx';

@Injectable()
export class PersonagensService {
  public listaPersonagens:Array<Personagem>;

  constructor(private http:HttpClient) { 
    this.listaPersonagens = new Array<Personagem>();
    this.listaPersonagens = <any>personagens;
  }

 

  getPersonagens():Array<Personagem>{
    return this.listaPersonagens;
  }

  getPersonagemId(id:number):Personagem{
    return this.listaPersonagens.find(x => x.id === id);
  }
}

