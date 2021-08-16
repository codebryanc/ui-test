import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  // Component data
  @Input() celebrity: ICelebrityMap;
  @Input() rectangleHeight: number;

  constructor(private _toolsService: ToolsService) {}

  ngOnInit(): void {
    console.log(this.rectangleHeight);
  }

  // Methods

  // Function
  getSizeArea(isDownArea: boolean): string {
    let result = '';

    if(this.celebrity && this.celebrity.votes) {
      let totalVotes = this.celebrity.votes.negative + this.celebrity.votes.positive;
 
      if(isDownArea) {
        result = `${this._toolsService.getSizeArea(this.celebrity.votes.negative, totalVotes, this.rectangleHeight)}px`;
      }
      else {
        result = `${this._toolsService.getSizeArea(this.celebrity.votes.positive, totalVotes, this.rectangleHeight)}px`;
      }
    }
    return result;
  }
}
