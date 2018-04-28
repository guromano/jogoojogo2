import { Component, OnInit, Inject } from '@angular/core';
import { slideInOutAnimation,listaDeAnimacoes } from '../../_animations';
import { PersonagensService } from '../../_services/Personagens/personagens.service';
import { Personagem } from '../../_models/personagem';
import * as $ from "jquery";

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  constructor(@Inject(PersonagensService) private _personagensService :PersonagensService) { 
    
   }

  public personagens:Array<Personagem>;
  public lista_animacoes:Array<string>;
  ngOnInit() {
    this.personagens = this._personagensService.getPersonagens();
    this.lista_animacoes = listaDeAnimacoes;
  }

  apresentar_personagem(personagem:Personagem,$event){
    setTimeout(() => {
    $('#apresentacao h1').removeClass();
    $('#apresentacao img').removeClass();
    $('#apresentacao h1').text(personagem.Nome);
    $('#apresentacao h1').addClass("bounceInDown animated");
    $('#apresentacao img').attr("src",personagem.Imagem);
    console.log(this.lista_animacoes[this.Random(0,this.lista_animacoes.length)]);
    $('#apresentacao img').addClass(this.lista_animacoes[this.Random(0,this.lista_animacoes.length)] + " animated")
    },100);
  }
  limpar_apresentacao(){
    $('#apresentacao h1').text("");
    $('#apresentacao h1').removeClass();
    $('#apresentacao img').attr("src","");
    $('#apresentacao img').removeClass();
  }

  Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

}
