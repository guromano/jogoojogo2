export class Personagem {

    constructor(id:number,nome:string,imagem:string) { 
        this.Id = id;
        this.Nome = nome;
        this.Imagem = imagem;
    }

    public Id:number;
    public Nome:string;
    public Imagem:string;
}