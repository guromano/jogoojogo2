import { Component, OnInit, Inject } from '@angular/core';
import { slideInOutAnimation } from '../../_animations';
import { PersonagensService } from '../../_services/Personagens/personagens.service';
import { Personagem } from '../../_models/personagem';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  constructor(@Inject(PersonagensService) private _personagensService :PersonagensService) { 
    
   }

  public personagens:Array<Personagem>;

  ngOnInit() {
    this.personagens = this._personagensService.getPersonagens();
  }

}
