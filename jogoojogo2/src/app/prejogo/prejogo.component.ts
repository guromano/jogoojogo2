import { Component, OnInit, Inject } from '@angular/core';
import { BarradevidaService } from '../../_services/BarraDeVida/barradevida.service';
import { PersonagensService } from '../../_services/Personagens/personagens.service';
import { Router } from '@angular/router';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { OrdemJogador } from '../../_models/ordemJogadore';
import { slideInOutAnimation } from '../../_animations';
import { JogadorPlacar } from '../../_models/jogador-placar';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';

@Component({
  selector: 'app-prejogo',
  templateUrl: './prejogo.component.html',
  styleUrls: ['./prejogo.component.css'],
  animations: [slideInOutAnimation],
})
export class PrejogoComponent implements OnInit {

  public ordemJogadores:Array<OrdemJogador>;
  public ordemJogadoresListar:Array<OrdemJogador>;
  public jogadorApresentado:OrdemJogador;

  constructor(
  @Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
  @Inject(PersonagensService) private _personagensService :PersonagensService,
  @Inject(ControledevezService) private _controledevezService :ControledevezService,
  @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
  private router: Router) { 
    this.ordemJogadoresListar = new Array<OrdemJogador>();
    this.ordemJogadores = _controledevezService.getOrdemJogadores();
  }

  ngOnInit() {
    setTimeout(() => {
      this.exibirProximo(0);
    },500);
  }

  exibirProximo(index:number){
    this.jogadorApresentado = this.ordemJogadores[index];
    var boxJogadorApresentado = document.querySelector(".apresentacao .jogApresentado") as HTMLElement;
    boxJogadorApresentado.classList.remove("desaparecer");
    boxJogadorApresentado.classList.add("aparecer");
    setTimeout(() => {
      boxJogadorApresentado.classList.remove("aparecer");
      boxJogadorApresentado.classList.add("desaparecer");
    },1500);
    if(index < this.ordemJogadores.length - 1){
      setTimeout(() => {
        this.exibirProximo(index+1);
        this.ordemJogadoresListar.push(this.ordemJogadores[index]);
      },1900);
    }else{
      setTimeout(() => {
        this.ordemJogadoresListar.push(this.ordemJogadores[index]);
        boxJogadorApresentado.style.display = "none";
        var button = document.querySelector(".apresentacao .button") as HTMLElement;
        button.style.display = "inline-block";
      },1900);
    }
  }

  iniciarjogo(){
    var pontuacaoJogadores = new Array<JogadorPlacar>();
    this.ordemJogadores.forEach(oj => {
      pontuacaoJogadores.push(new JogadorPlacar(oj.jogador));
    });
    this._controlepontosService.saveNewGame(pontuacaoJogadores);
    this.router.navigate(["/vez"])
  }
}
