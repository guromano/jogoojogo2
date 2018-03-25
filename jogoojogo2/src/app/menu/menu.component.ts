import { Component, OnInit, Inject } from '@angular/core';
import { FalasService } from '../../_services/Falas/falas.service';
import * as anime from 'animejs';
import * as $ from "jquery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(@Inject(FalasService) private _falasService :FalasService,private router: Router) { }

  ngOnInit() {
    setTimeout(() => { this.logoAnimaton() },100);
  }

  logoAnimaton():void{
    var Timeline = anime.timeline();
   
      Timeline.add({
        targets: '#l1',
        left:0,
        duration: 2000,
       }).add({
        targets: '#l2',
        top:0,
        rotate:'360deg',
        duration: 2000,
        offset: '-=1500'
       }).add({
        targets: '#l3',
        top:0,
        rotate:'-360deg',
        duration: 2000,
        offset: '-=2000'
       }).add({
        targets: '#l4',
        right:0,
        rotate:'-360deg',
        duration: 2000,
        offset: '-=2500'
       })
       .add({
        targets: '#l5',
        opacity:[0,1],
        scale: [20,1],
        offset: '-=1000'
       })
       .add({
        targets: '#l6',
        opacity:[0,1],
        scale: [20,1],
        offset: '-=500'
       })
       .add({
        targets: '#l7',
        opacity:[0,1],
        scale: [20,1],
        offset: '-=500'
       })
       .add({
        targets: '#l8',
        opacity:[0,1],
        scale: [20,1],
        offset: '-=500'
       })
       .add({
        targets: '#l9',
        opacity:[0,1],
        scale: [20,1],
        offset: '-=500'
       });
       Timeline.complete = function() { $('.logo').addClass('tada animated'); };
  }
}
