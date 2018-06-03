import { Jogador } from "./jogadores";

export class JogadorPlacar extends Jogador {
    
    constructor(jogador:Jogador){
        super(jogador.id,jogador.nome,jogador.personagem);
        this.nivelBar = 50;
        this.nivelTrabalho = 50;
        this.pontosBar = 0;
        this.pontosTrabalho = 0;
        this.litrao = 0;
        this.cartaNemFudendo = false;    
    }
    
    public nivelBar:number;
    public nivelTrabalho:number;
    public pontosBar:number;
    public pontosTrabalho:number;
    public litrao:number;
    public cartaNemFudendo:boolean;
}