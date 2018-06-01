import { Injectable } from '@angular/core';

@Injectable()
export class FalasService {

  constructor() { 
    this.falasBox = document.getElementById('falas') as HTMLDivElement;
  }

  falasBox: HTMLDivElement;

  gerarFala(personagem:string,texto:string,callback:any = null):void{
     this.showBox();
    var letras = texto.split("");
    var tempokill = letras.length * 50;
    this.falasBox.innerHTML = personagem+": ";
    //animacao de aparecer letras
    var i = 0
    var numletras = letras.length;
    var interval = setInterval(()=>{
      if(letras[i])
        this.falasBox.innerHTML += letras[i];
      i++;
      if(i == numletras){
        setTimeout(()=>{
          this.hideBox();
          if(callback != null){
            callback();
          }
        },tempokill);
        clearInterval(interval);
      }
    },50);

  }
  
  showBox():void{
    this.falasBox.style.display = "block";
  }

  hideBox():void{
    this.falasBox.style.display = "none";
  }

}
