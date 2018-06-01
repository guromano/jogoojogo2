import { Personagem } from "./personagem";

export class Jogador {

    constructor(id:number,nome:string,personagem:Personagem) { 
        this.id = id;
        this.nome = nome;
        this.personagem = personagem;
    }

    public id:number;
    public nome:string;
    public personagem:Personagem;
}