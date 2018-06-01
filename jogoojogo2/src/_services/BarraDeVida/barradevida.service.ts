import { Injectable } from '@angular/core';

@Injectable()
export class BarradevidaService {

  private valorBarra:HTMLDivElement;
  private Barra:HTMLDivElement;

  constructor() { 
    this.valorBarra = document.querySelector('#barradevidabar .barra_valor');
    this.Barra = document.querySelector('#barradevidabar');
  }

  public vida:number;

  public atualizarVida(novoValor:number):void{
    if(novoValor < 0)
      novoValor = 0;
    if(novoValor > 100)
      novoValor = 100;
    if(novoValor <= 20)
      this.valorBarra.classList.add('acabando');
    else
      this.valorBarra.classList.remove('acabando');
    this.valorBarra.style.width = novoValor+"%";
  }

  public mostrarBarraDeVida():void{
    this.Barra.style.display = "block";
  }

  public esconderBarraDeVida():void{
    this.Barra.style.display = "none";
  }

}
