import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Component data
  @Input() celebrity: ICelebrityMap;

  constructor() { }

  ngOnInit(): void {
  }

}
