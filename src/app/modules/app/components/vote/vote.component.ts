import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  // Component data
  @Input() celebrity: ICelebrityMap;

  public action: string = 'Vote Now';
  
  constructor() { }

  ngOnInit(): void {
  }

}
