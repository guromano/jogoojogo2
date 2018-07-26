import * as anime from 'animejs';

export class AnimarValores {

    AnimarValor(valores:Array<number>, ids:Array<string>){
       var animate = new Array();
        for(let i = 0; i < valores.length; i++){
            animate[i] = anime({
                targets: {value:0},
                autoplay:true,
                easing:'linear',
                round:2,
                value:valores[i],
                update: function() {
                    var posicao = document.querySelector('#'+ids[i]);
                    posicao.innerHTML = animate[i].animations[0].currentValue.toFixed(0);
                }
            });
        }
    }

    AnimarValorASync(valor:number, id:string):Promise<void>{
        return new Promise((resolve) => {
            var animate = anime({
                targets: {value:0},
                autoplay:true,
                easing:'linear',
                round:2,
                value:valor,
                update: function() {
                    var posicao = document.querySelector('#'+id);
                    posicao.innerHTML = animate.animations[0].currentValue.toFixed(0);
                },
                complete: resolve()
            });
        });
     }
    
}