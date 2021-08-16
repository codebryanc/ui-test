import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

const THUMBS_UP = 'thumbsUp';
const THUMBS_DOWN = 'thumbsDown';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  // Component data
  @Input() celebrity: ICelebrityMap;

  public actionText: string = 'Vote Now';
  public action: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  // Methods
  setAction(isUp: boolean) : void {
    if(isUp) {
      this.action = THUMBS_UP;
    }
    else {
      this.action = THUMBS_DOWN;
    }
  }
}
