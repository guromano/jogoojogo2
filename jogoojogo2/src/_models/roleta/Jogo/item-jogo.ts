import { ItemRoleta } from "../item-roleta";


export class ItemJogo extends ItemRoleta{
    
    constructor(){    
        super();
    }

    public pontosGeral:number;
    public sorteioPlacas:boolean;
    public sorteioAdversario:boolean;
    public sorteioTime:boolean;
}