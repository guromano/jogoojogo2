import { Component, OnInit, Inject } from '@angular/core';
import { ControledevezService } from '../../_services/ControleDeVez/controledevez.service';
import { ControlePontosService } from '../../_services/ContolePontos/controle-pontos.service';
import { ControleJogosService } from '../../_services/ControleJogos/controle-jogos.service';
import { EventService } from '../../_services/Event/event.service';
import { JogadorPlacar } from '../../_models/jogador/jogador-placar';
import * as $ from "jquery";
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-placar-geral',
  templateUrl: './placar-geral.component.html',
  styleUrls: ['./placar-geral.component.css']
})
export class PlacarGeralComponent implements OnInit {

  constructor(
    @Inject(ControledevezService) private _controledevezService :ControledevezService,
    @Inject(ControlePontosService) private _controlepontosService :ControlePontosService,
    @Inject(ControleJogosService) private _controlejogosService :ControleJogosService,
    @Inject(EventService) private _eventService :EventService,
    private router: Router
  ) { 
    this.jogadores = this._controlepontosService.getRanking();
    this.index = this.jogadores.length - 1;
  }

  public jogadores:Array<JogadorPlacar>;
  public index:number;
  public vencedor:JogadorPlacar
  
  ngOnInit() {
    this.animacaoTr().then(()=>{

    })
  }

  animacaoTr():Promise<number>{
    return new Promise((resolve) => {
      $(".head").fadeIn("slow");
      setTimeout(() =>{
        resolve(this.animarLinha(this.index));
      },1000);
    });
  }

  animarLinha(index):Promise<number>{
    return new Promise((resolve) => {
      if(index == -1){
        resolve(0);
      }else{
        $("#tr"+index).fadeIn("slow");
        setTimeout(() =>{
          resolve(this.animarLinha(index - 1));
        },1000);
      }
    });
  }

  continuar(){
    if(this.jogadores[0].litrao >= 20){
      $("#placargeralzao").hide();
      this.vencedor = this.jogadores[0];
      $("#vencedor").show();
    }else{
      this._controledevezService.PassarVez();
      this.router.navigate(['/vez']);
    }
  }
}
