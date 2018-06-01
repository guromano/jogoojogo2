import { Component, OnInit, Inject } from '@angular/core';
import { slideInOutAnimation,listaDeAnimacoes } from '../../_animations';
import { PersonagensService } from '../../_services/Personagens/personagens.service';
import * as anime from 'animejs';
import { Personagem } from '../../_models/personagem';
import * as $ from "jquery";
import { Jogador } from '../../_models/jogadores';
import { debug } from 'util';
import { Router } from '@angular/router';
import { BarradevidaService } from '../../_services/BarraDeVida/barradevida.service';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  constructor(
  @Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
  @Inject(PersonagensService) private _personagensService :PersonagensService,
  private router: Router) { 
    
  }

  
  public personagens:Array<Personagem>;
  public lista_animacoes:Array<string>;
  public total_jogadores:number;
  public id_jogadores_increment:number;
  public jogadores:Array<Jogador>;


  ngOnInit() {
    this._barradevidaService.esconderBarraDeVida();
    this.id_jogadores_increment = 0;
    //TODO metodo de pegar jogadores salvos
    this.jogadores = new Array<Jogador>();
    this.personagens = this._personagensService.getPersonagens();
    this.lista_animacoes = listaDeAnimacoes;
  }

  apresentar_personagem(personagem:Personagem,event){
    var box_personagem = $(event.currentTarget);
    if(!box_personagem.hasClass("escolhido")){
      setTimeout(() => {
        $('#apresentacao h1').removeClass();
        $('#apresentacao img').removeClass();
        $('#apresentacao h1').text(personagem.nome);
        $('#apresentacao h1').addClass("bounceInDown animated");
        $('#apresentacao img').attr("src",personagem.imagem);
        $('#apresentacao img').addClass(this.lista_animacoes[this.Random(0,this.lista_animacoes.length)] + " animated")
      },100);
    }
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

  adicionarjogador(personagem:Personagem,event){
    setTimeout(()=>{
      var players = document.querySelector("#players");
      players.scrollTo(0,players.scrollHeight);
    },100)
    
    this.id_jogadores_increment++;
    var box_personagem = $(event.currentTarget);
    if(!box_personagem.hasClass("escolhido")){
      box_personagem.addClass("escolhido");
      var novo_jogador = new Jogador(this.id_jogadores_increment,"",personagem);
      this.jogadores.push(novo_jogador);
    }
  }
  removerjogador(jogador:Jogador,event){
    var box_personagem = document.querySelector('#p'+jogador.personagem.id) as HTMLElement;
    box_personagem.classList.remove("escolhido");
    this.jogadores = this.jogadores.filter(x => x.id != jogador.id);
  }

  iniciar(){
    if(this.jogadores.length < 3){
      return;
    }
    if(this.jogadores.filter(x => x.nome == "").length > 0){
      //TODO alerta de erro sem nome
      alert("Digite todos os nome");
      return 
    }
    window.localStorage.setItem("jogadores",JSON.stringify(this.jogadores));
    this.router.navigate(['/iniciojogo']);
  }
}
