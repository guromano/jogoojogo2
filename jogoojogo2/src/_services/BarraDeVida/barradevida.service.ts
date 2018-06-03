import { Injectable } from '@angular/core';
import * as $ from "jquery";

@Injectable()
export class BarradevidaService {

  private valorBarra:HTMLElement;
  private Barra:HTMLElement;

  constructor() { 
    this.valorBarra = document.querySelector('#barradevidabar .valor-barra') as HTMLElement;
    this.Barra = document.querySelector('#barradevidabar') as HTMLElement;
  }

  public vida:number;

  public atualizarVida(novoValor:number):void{
    if(novoValor < 0)
      novoValor = 0;
    if(novoValor > 100)
      novoValor = 100;

      $(this.valorBarra).css("width",novoValor+"%");
  }

  public mostrarBarraDeVida():void{
    $(this.Barra).slideDown();
  }

  public esconderBarraDeVida():void{
    $(this.Barra).slideUp();
  }

}
