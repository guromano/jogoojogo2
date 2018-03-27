import { Injectable } from '@angular/core';
import { Personagem } from '../../_models/personagem';

@Injectable()
export class PersonagensService {

  constructor() { }


  getPersonagens():Array<Personagem>{
    var listaPersonagens = new Array<Personagem>();
    
    listaPersonagens.push(new Personagem("Teste","/assets/images/krober.png"));
    listaPersonagens.push(new Personagem("Teste2","/assets/images/caveira.png"));
    listaPersonagens.push(new Personagem("Teste3","/assets/images/beer.png"));
    listaPersonagens.push(new Personagem("Teste4","/assets/images/espada.png"));
    listaPersonagens.push(new Personagem("Teste5","/assets/images/lata.png"));
    listaPersonagens.push(new Personagem("Teste6","/assets/images/pizza8bit.jpg"));
    
    return listaPersonagens;
  }
}
