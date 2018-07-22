import { ItemRoleta } from "../item-roleta";
import { TipoSorteOuReves } from "./tipo-sorte-ou-reves";

export class ItemSorteOuReves extends ItemRoleta{
    
    constructor(){    
        super();
    }

    public tipoItem:TipoSorteOuReves;
    public pontosGeral:number;
    public pontosBar:number;
    public pontosTrabalho:number;
    public texto:string;
    public transferenciaPontos:boolean;
    
    
}