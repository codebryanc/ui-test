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

  private _totalVotes: number = 0;

  public isUpScore: boolean = true;
  public scoreUp: string;
  public scoreDown: string;

  constructor(private _toolsService: ToolsService) {}

  ngOnInit(): void {
    this.initCompoent();
  }

  // Methods
  initCompoent() : void {
    this._totalVotes = this.celebrity.votes.negative + this.celebrity.votes.positive;

    this.setMainScore();
    this.getPercentScore();
  }
    
  getPercentScore() : void {
    if(this.celebrity && this.celebrity.votes) {
      this.scoreUp = this._toolsService.getPercentByVotes(this.celebrity.votes.positive, this._totalVotes).toFixed(1);
      this.scoreDown = this._toolsService.getPercentByVotes(this.celebrity.votes.negative, this._totalVotes).toFixed(1);
    }
  }

  setMainScore() : void {
    // Business logic, if the votes are equal, take positive vote!
    this.isUpScore = this.celebrity.votes.positive >= this.celebrity.votes.negative;
  }

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
