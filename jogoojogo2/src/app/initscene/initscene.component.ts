import { Component, OnInit, Inject } from '@angular/core';
import * as $ from "jquery";
import * as anime from 'animejs';
import { FalasService } from '../../_services/falas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-initscene',
  templateUrl: './initscene.component.html',
  styleUrls: ['./initscene.component.css'],
})
export class InitsceneComponent implements OnInit {

  constructor(@Inject(FalasService) private _falasService :FalasService,private router: Router) { }

  ngOnInit() {
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
  }

}
