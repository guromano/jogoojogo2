import { Injectable } from '@angular/core';
import { Personagem } from '../../_models/personagem';

@Injectable()
export class PersonagensService {

  constructor() { }


  getPersonagens():Array<Personagem>{
    var listaPersonagens = new Array<Personagem>();
    
    listaPersonagens.push(new Personagem(1,"Teste","/assets/images/krober.png"));
    listaPersonagens.push(new Personagem(2,"Teste2","/assets/images/caveira.png"));
    listaPersonagens.push(new Personagem(3,"Teste3","/assets/images/beer.png"));
    listaPersonagens.push(new Personagem(4,"Teste4","/assets/images/espada.png"));
    listaPersonagens.push(new Personagem(5,"Teste5","/assets/images/lata.png"));
    
    return listaPersonagens;
  }
}
