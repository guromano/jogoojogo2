import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import * as anime from 'animejs';
@Component({
  selector: 'app-initscene',
  templateUrl: './initscene.component.html',
  styleUrls: ['./initscene.component.css'],
})
export class InitsceneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var Timeline = anime.timeline();
    Timeline.add({
      targets: '.personagem1',
      translateY: [{value:100},{value:0},{value:100},{value:0},{value:100},{value:0},{value:100}],
      direction: 'alternate',
      left:'700px',
      duration: 5000,
      easing: 'easeInOutQuad'
    })
  }

}
