import { Component, OnInit, Inject } from '@angular/core';
import { FalasService } from '../../_services/Falas/falas.service';
import * as anime from 'animejs';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { debug } from 'util';
import { slideInOutAnimation } from '../../_animations';
import { BarradevidaService } from '../../_services/BarraDeVida/barradevida.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    @Inject(BarradevidaService) private _barradevidaService :BarradevidaService,
    @Inject(FalasService) private _falasService :FalasService,
    private router: Router) { }

  ngOnInit() {
    this._barradevidaService.esconderBarraDeVida();
    if(localStorage.getItem("apresentacao") == "true" || !localStorage.getItem("apresentacao"))
      setTimeout(() => { this.logoAnimaton() },1000);
    else{
      $('#l1').css('left','0');
      $('#l2').css('top','0');
      $('#l3').css('top','0');
      $('#l4').css('right','0');
      $('#l5').css('opacity','1');
      $('#l6').css('opacity','1');
      $('#l7').css('opacity','1');
      $('#l8').css('opacity','1');
      $('#l9').css('opacity','1');
      $('#lata1').css('left','20vw');
      $('#lata2').css('right','20vw');
      $('.botao').css('opacity','1');
    }
  }

  logoAnimaton():void{
    var Timeline = anime.timeline();
      Timeline.add({
        targets: '#l1',
        left:['-90vw',0],
        duration: 2000,
       }).add({
        targets: '#l2',
        top:['-50vh',0],
        rotate:'360deg',
        duration: 2000,
        offset: '-=1500'
       }).add({
        targets: '#l3',
        top:['100vh',0],
        rotate:'-360deg',
        duration: 2000,
        offset: '-=2000'
       }).add({
        targets: '#l4',
        right:['-90vw',0],
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
       Timeline.complete = () => {  
         var timelinemenu = anime.timeline();
         timelinemenu.add({
           targets:'#lata1',
           left:[{value:['-50vw','46vw'],duration:1500},{value:'20vw',duration:800}],
           easing: 'easeInOutQuad',
         })
         timelinemenu.add({
          targets:'#lata2',
          right:[
          {value:['-50vw','46vw'],duration:1500},
          {value:'20vw',duration:800},
        ],
        update: (anim) => {
          if(anim.currentTime >= 1400 && anim.currentTime < 1700){
            this.explode();
          }
        },
          easing: 'easeInOutQuad',
          offset: '-=2300'
        }).add({
          targets: '.botao',
          opacity:1,
          scale:[0,1],
          offset: '-=500',
          duration:1500
        })
        $('.logo').addClass('tada animated');
        localStorage.setItem("apresentacao","false");
        };
  }
  
  explode():void {
    var particles = 35,
      explosion = $('<div class="explosion"></div>');
  
    $('.body').append(explosion);
  
    explosion.css('left', ($(window).width() / 2) - 250);
    explosion.css('top', '43vh');
  
    for (var i = 0; i < particles; i++) {
      var x = (explosion.width() / 2) + this.rand(80, 150) * Math.cos(2 * Math.PI * i / this.rand(particles - 10, particles + 10)),
        y = (explosion.height() / 2) + this.rand(80, 150) * Math.sin(2 * Math.PI * i / this.rand(particles - 10, particles + 10)),
        color = this.rand(0, 255) + ', ' + this.rand(0, 255) + ', ' + this.rand(0, 255), // randomize the color rgb
        elm = $('<div class="particle" style="' +
          'background-color: rgb(' + color + ') ;' +
          'top: ' + y + 'px; ' +
          'left: ' + x + 'px"></div>');
  
      if (i == 0) { 
        elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
          explosion.remove(); 
        });
      }
      explosion.append(elm);
    }
  }
  
  rand(min, max):number {
    return Math.floor(Math.random() * (max + 1)) + min;
  }

  goto(url):void{
    this.router.navigate(["/"+url]);
  }
}
