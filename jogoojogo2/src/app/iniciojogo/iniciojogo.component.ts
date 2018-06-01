import { Component, OnInit, Inject } from '@angular/core';
import { FalasService } from '../../_services/Falas/falas.service';
import * as anime from 'animejs';
import { Router } from '@angular/router';
import { BarradevidaService } from '../../_services/BarraDeVida/barradevida.service';

@Component({
  selector: 'app-iniciojogo',
  templateUrl: './iniciojogo.component.html',
  styleUrls: ['./iniciojogo.component.css']
})
export class IniciojogoComponent implements OnInit {

  constructor(
  @Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
  @Inject(FalasService) private _falasService :FalasService,
  private router: Router) { }

  ngOnInit() {
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
        this._falasService.gerarFala("Krobrer","Aqui teremos que fazer uma historinha para comecar o jogo",() => {this.router.navigate(['/menu']);});
      },3000);
    },100);  
  }

}
