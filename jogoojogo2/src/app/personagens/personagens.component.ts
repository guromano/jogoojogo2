import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../_animations';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
