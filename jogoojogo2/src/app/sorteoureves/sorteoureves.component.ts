import { Component, OnInit, Inject } from '@angular/core';
import { slideInOutAnimation } from '../../_animations';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { Jogador } from '../../_models/jogador/jogadores';
import { ControleJogosService } from '../../_services/ControleJogos/controle-jogos.service';
import { ItemSorteOuReves } from '../../_models/roleta/SorteOuReves/item-sorteoureves';
import * as $ from "jquery";
import { EventService } from '../../_services/Event/event.service';
import { TipoEvento } from '../../_models/evento/tipo-evento';
import { TipoSorteOuReves } from '../../_models/roleta/SorteOuReves/tipo-sorte-ou-reves';
import { JogadorPlacar } from '../../_models/jogador/jogador-placar';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-sorteoureves',
  templateUrl: './sorteoureves.component.html',
  styleUrls: ['./sorteoureves.component.css'],
  animations: [slideInOutAnimation],
})
export class SorteourevesComponent implements OnInit {

  public jogadorVez:Jogador;
  public sorteOuRevesGame:ItemSorteOuReves;
  public nomeJogo:HTMLDivElement;
  public textoJogo:HTMLDivElement;
  public jogadoresPlacar:Array<JogadorPlacar>;
  constructor(
    @Inject(ControledevezService) private _controledevezService :ControledevezService,
    @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
    @Inject(ControleJogosService) private _controlejogosService :ControleJogosService,
    @Inject(EventService) private _eventService :EventService,
    private router: Router
  ) {
    this.jogadorVez = _controledevezService.jogadorVez();
    this.sorteOuRevesGame = _controlejogosService.getRandomSorteOuReves();
    this.nomeJogo = document.querySelector("#nomejogo") as HTMLDivElement;
    this.textoJogo = document.querySelector("#textjogo") as HTMLDivElement;
   }

  ngOnInit() {
    var letras = this.sorteOuRevesGame.texto.split("");
    this.showText(letras).then(() =>{
      this.nomeJogo = document.querySelector("#nomejogo") as HTMLDivElement;
      var continuar = document.querySelector(".continuar") as HTMLDivElement;
      $(this.nomeJogo).show();
      $(this.nomeJogo).addClass("bounceInDown animated");
      setTimeout(() =>{
        $(this.nomeJogo).removeClass("bounceInDown animated");
        $("#sorteoureves").removeClass("neutra");
        if(this.sorteOuRevesGame.tipoItem == TipoSorteOuReves.Sorte){
          $("#sorteoureves").addClass("verde");  
        }else if(this.sorteOuRevesGame.tipoItem == TipoSorteOuReves.Reves){
          $("#sorteoureves").addClass("preto");
        }
        $(this.nomeJogo).addClass("tada animated");
        continuar.style.display = "flex";
        $(continuar).addClass("bounceInUp animated");
      },500);
    });
  }

  continuar(){
    if(this.sorteOuRevesGame.transferenciaPontos){
      this.jogadoresPlacar = this._controlepontosService.getPlacarJogadores();
      $(".lista-jogadores").slideDown();
      $(".continuar").hide();
    }else{
      this.executarPontuacaoSorteOuReves().then(() =>{
        this.router.navigate(['/placar']);
      });
    }
  }
  continuar2(jogador:JogadorPlacar){
    this.executarPontuacaoSorteOuRevesComJogadorTransf(jogador).then(() =>{
      this.router.navigate(['/placar']);
      });
  }

  async executarPontuacaoSorteOuRevesComJogadorTransf(jogador:JogadorPlacar):Promise<void>{
    var tasksInputs = this.criarListaDeInputs();
    if(this.sorteOuRevesGame.pontosGeral != 0){
      tasksInputs.push({
        jogador:jogador as Jogador,
        tipo:TipoEvento.PontoLitrao,
        pontos:this.sorteOuRevesGame.pontosGeral*-1
      });
      this._controlepontosService.AlterarPontosBarra(jogador.id,this.sorteOuRevesGame.pontosGeral*-1);
    }
    await this.executarTaskList(tasksInputs);
  }

  async executarPontuacaoSorteOuReves():Promise<void>{
    var tasksInputs = this.criarListaDeInputs();
    await this.executarTaskList(tasksInputs);
  }

  private criarListaDeInputs():Array<any>{
    var tasksInputs = new Array<any>();
    if(this.sorteOuRevesGame.pontosBar != 0){
      tasksInputs.push({
        jogador:this.jogadorVez,
        tipo:TipoEvento.PontoBarraBar,
        pontos:this.sorteOuRevesGame.pontosBar
      });
      this._controlepontosService.AlterarPontosBarra(this.jogadorVez.id,this.sorteOuRevesGame.pontosBar);
    }
    if(this.sorteOuRevesGame.pontosTrabalho != 0){
      tasksInputs.push({
        jogador:this.jogadorVez,
        tipo:TipoEvento.PontoBarraEmprego,
        pontos:this.sorteOuRevesGame.pontosTrabalho
      });
      this._controlepontosService.AlterarPontosBarra(this.jogadorVez.id,this.sorteOuRevesGame.pontosTrabalho * -1);
    }
    if(this.sorteOuRevesGame.pontosGeral != 0){
      tasksInputs.push({
        jogador:this.jogadorVez,
        tipo:TipoEvento.PontoLitrao,
        pontos:this.sorteOuRevesGame.pontosGeral
      });
      this._controlepontosService.AlterarPontosGeral(this.jogadorVez.id,this.sorteOuRevesGame.pontosGeral);

    }
    return tasksInputs
  }

  async executarTaskList(tasklist:Array<any>):Promise<void>{
    for (let job of tasklist.map(x => () => this._eventService.emitirEvento(x.jogador,x.tipo,x.pontos))){
        await job()
    }
  }
  showText(letras:Array<string>):Promise<void>{
    return new Promise((resolve,reject) =>{
      var textoJogo = document.querySelector("#textjogo") as HTMLDivElement;
      var i = 0;
      var numletras = letras.length;
      var interval = setInterval(()=>{
        if(letras[i])
          textoJogo.innerHTML += letras[i];
        i++;
        if(i == numletras){
          clearInterval(interval);
          resolve();
        }
      },75);
    });
  }
}
