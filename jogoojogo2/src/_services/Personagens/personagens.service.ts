import { Injectable } from '@angular/core';
import { Personagem } from '../../_models/personagem';

@Injectable()
export class PersonagensService {
  public listaPersonagens:Array<Personagem>;

  constructor() { 
    this.listaPersonagens = new Array<Personagem>();
    this.listaPersonagens.push(new Personagem(1,"Teste","/assets/images/krober.png"));
    this.listaPersonagens.push(new Personagem(2,"Teste2","/assets/images/caveira.png"));
    this.listaPersonagens.push(new Personagem(3,"Teste3","/assets/images/beer.png"));
    this.listaPersonagens.push(new Personagem(4,"Teste4","/assets/images/espada.png"));
    this.listaPersonagens.push(new Personagem(5,"Teste5","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(6,"Teste6","/assets/images/krober.png"));
    this.listaPersonagens.push(new Personagem(7,"Teste7","/assets/images/caveira.png"));
    this.listaPersonagens.push(new Personagem(8,"Teste8","/assets/images/beer.png"));
    this.listaPersonagens.push(new Personagem(9,"Teste9","/assets/images/espada.png"));
    this.listaPersonagens.push(new Personagem(10,"Teste10","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(11,"Teste11","/assets/images/krober.png"));
    this.listaPersonagens.push(new Personagem(12,"Teste12","/assets/images/caveira.png"));
    this.listaPersonagens.push(new Personagem(13,"Teste13","/assets/images/beer.png"));
    this.listaPersonagens.push(new Personagem(14,"Teste14","/assets/images/espada.png"));
    this.listaPersonagens.push(new Personagem(15,"Teste15","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(16,"Teste16","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(17,"Teste17","/assets/images/krober.png"));
    this.listaPersonagens.push(new Personagem(18,"Teste18","/assets/images/caveira.png"));
    this.listaPersonagens.push(new Personagem(19,"Teste19","/assets/images/beer.png"));
    this.listaPersonagens.push(new Personagem(20,"Teste20","/assets/images/espada.png"));
    this.listaPersonagens.push(new Personagem(21,"Teste21","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(22,"Teste22","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(23,"Teste23","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(24,"Teste24","/assets/images/krober.png"));
    this.listaPersonagens.push(new Personagem(25,"Teste25","/assets/images/caveira.png"));
    this.listaPersonagens.push(new Personagem(26,"Teste26","/assets/images/beer.png"));
    this.listaPersonagens.push(new Personagem(27,"Teste27","/assets/images/espada.png"));
    this.listaPersonagens.push(new Personagem(28,"Teste28","/assets/images/lata.png"))
    this.listaPersonagens.push(new Personagem(29,"Teste29","/assets/images/lata.png"));
    this.listaPersonagens.push(new Personagem(30,"Teste30","/assets/images/krober.png"));
    this.listaPersonagens.push(new Personagem(31,"Teste31","/assets/images/caveira.png"));
    this.listaPersonagens.push(new Personagem(32,"Teste32","/assets/images/beer.png"));
    this.listaPersonagens.push(new Personagem(33,"Teste33","/assets/images/espada.png"));
    this.listaPersonagens.push(new Personagem(34,"Teste34","/assets/images/lata.png"));
  }

 

  getPersonagens():Array<Personagem>{
    return this.listaPersonagens;
  }

  getPersonagemId(id:number):Personagem{
    return this.listaPersonagens.find(x => x.id === id);
  }
}

