import { Component, OnInit, Inject } from '@angular/core';
import * as $ from "jquery";
import * as anime from 'animejs';
import { FalasService } from '../../_services/Falas/falas.service';
import { Router } from '@angular/router';
import { slideInOutAnimation } from '../../_animations';
import { BarradevidaService } from '../../_services/BarraDeVida/barradevida.service';
@Component({
  selector: 'app-initscene',
  templateUrl: './initscene.component.html',
  styleUrls: ['./initscene.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
})
export class InitsceneComponent implements OnInit {

constructor(
  @Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
  @Inject(FalasService) private _falasService :FalasService,
  private router: Router) { }

  ngOnInit() {
    //CENA DE APRESENTACAO DO JOGO
    this._barradevidaService.esconderBarraDeVida();
    localStorage.setItem("apresentacao","true");
    setTimeout(() => {
      var Timeline = anime.timeline();
      Timeline.add({
        targets: '.personagem1',
        translateY: [{value:100},{value:0},{value:100},{value:0},{value:100},{value:0},{value:100}],
        direction: 'alternate',
        left:'700px',
        duration: 3000,
        easing: 'easeInOutQuad'
      })
      setTimeout(()=>{
        this._falasService.gerarFala("Kobrer","BLA BLA BLA BLA BLA BLA BLA",() => {this.router.navigate(['/menu']);});
      },3000);
    },100);  
  }

}
