import { Component, OnInit, Inject } from '@angular/core';
import { JogadorPlacar } from '../../_models/jogador-placar';
import { Jogador } from '../../_models/jogadores';
import { BarradevidaService } from '../../_services/BarraDeVida/barradevida.service';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vez',
  templateUrl: './vez.component.html',
  styleUrls: ['./vez.component.css']
})
export class VezComponent implements OnInit {

  public jogadorPlacarDaVez:JogadorPlacar;
  public jogadorVez:Jogador;
  public posicao:number;

  constructor(@Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
  @Inject(ControledevezService) private _controledevezService :ControledevezService,
  @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
  private router: Router) {
    this.jogadorVez = this._controledevezService.jogadorVez();
    this.jogadorPlacarDaVez = this._controlepontosService.getPlacarJogador(this.jogadorVez.id);
    this.posicao = this._controlepontosService.getPosJogador(this.jogadorVez.id) + 1;
  }

  ngOnInit() {
    setTimeout(()=>{
      this._barradevidaService.mostrarBarraDeVida();
      setTimeout(() => {this._barradevidaService.atualizarVida(this.jogadorPlacarDaVez.nivelBar)},300);     
    },800)
  }

}
