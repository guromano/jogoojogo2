import { Injectable } from '@angular/core';
import * as $ from "jquery";
import { AnimarValores } from '../../_animations/animejs/animar-valores';

@Injectable()
export class BarradevidaService {

  private valorBarra:HTMLElement;
  private Barra:HTMLElement;
  private Label:HTMLElement;
  private LabelDiferencaValores:HTMLElement;
  private BoxDiferencaValores:HTMLElement;
  private _animarValores:AnimarValores;
  private eventBarraBox:HTMLElement;

  constructor() { 
    this.valorBarra = document.querySelector('#barradevidabar .valor-barra') as HTMLElement;
    this.Barra = document.querySelector('#barradevidabar') as HTMLElement;
    this.Label = document.querySelector("#barradevidabar .label") as HTMLElement;
    this.LabelDiferencaValores = document.querySelector("#valorDiferencaBarra") as HTMLElement;
    this.BoxDiferencaValores = document.querySelector("#boxDiferencaBarra") as HTMLElement;
    this.eventBarraBox = document.querySelector("#eventBarraBox") as HTMLElement;
    this._animarValores = new AnimarValores();
  }

  public vida:number;

  public atualizarVida(novoValor:number):void{
    if(novoValor < 0)
      novoValor = 0;
    if(novoValor > 100)
      novoValor = 100;

      $(this.valorBarra).css("width",novoValor+"%");
  }


  public atualizarVidaAnimado(valorAtual:number, sum:number):void{
    var novoValor = valorAtual + sum;
    this.BoxDiferencaValores.classList.remove("bar-color");
    this.BoxDiferencaValores.classList.remove("emprego-color");
    
    if(sum < 0){
      this.BoxDiferencaValores.classList.add("emprego-color");
    }else if(sum > 0){
      this.BoxDiferencaValores.classList.add("bar-color");
    }

    $(this.eventBarraBox).slideDown();

    setTimeout(() => this._animarValores.AnimarValor([sum],[this.LabelDiferencaValores.id]),300);
    
    if(novoValor < 0)
      novoValor = 0;
    if(novoValor > 100)
      novoValor = 100;

    setTimeout(() => $(this.valorBarra).css("width",novoValor+"%"),1200);
    setTimeout(() => $(this.eventBarraBox).slideUp(),2000);
  }


  public mostrarBarraDeVida():void{
    $(this.Barra).slideDown();
  }

  public mostrarBarraDeVidaAlterandoLabel(nome:string):void{
    this.Label.innerHTML = nome;
    this.mostrarBarraDeVida();
  }

  public esconderBarraDeVida():void{
    $(this.Barra).slideUp();
  }

}
