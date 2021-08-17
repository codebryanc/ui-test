import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

import { CelebrityService } from 'src/app/services/celebrity.service';
import { ToolsService } from 'src/app/services/tools.service';
import { MenuService } from 'src/app/services/menu.service';

const TOTAL_VOTES_DONT_SHOW_CHANGES: number = 500;

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  // Component view options
  public cardListView: string = 'List';
  public cardGridView: string = 'Grid';
  
  // Component data
  @Input() celebrity: ICelebrityMap;
  @Input() rectangleHeight: number;
  @Input() currentView: string;

  private _totalVotes: number = 0;

  public isUpScore: boolean = true;
  public scoreUp: string;
  public scoreDown: string;
  
  constructor(private _toolsService: ToolsService,
    private _celebrityService: CelebrityService,
    private _menuService: MenuService) {
      this.currentView = environment.initView;
    }

  ngOnInit(): void {
    this.initCompoent();
  }

  // Methods
  initCompoent() : void {
    this.evaluateScoreForThisCelebrity();

    // subscribe to changes
    this.refreshScoreSubscribe();
  }
    
  evaluateScoreForThisCelebrity() : void {
    this._totalVotes = this.celebrity.votes.negative + this.celebrity.votes.positive;

    this.setMainScore();
    this.getPercentScore();
  }

  getPercentScore() : void {
    if(this.celebrity && this.celebrity.votes) {
      let decimals = 1;

      // Business logic, if total votes its upper than 500, in the score don't it's possible view any change!
      if(this._totalVotes > TOTAL_VOTES_DONT_SHOW_CHANGES) {
        decimals = 2;
      }

      this.scoreUp = this._toolsService.getPercentByVotes(this.celebrity.votes.positive, this._totalVotes).toFixed(decimals);
      this.scoreDown = this._toolsService.getPercentByVotes(this.celebrity.votes.negative, this._totalVotes).toFixed(decimals);
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

  // Subscribe
  refreshScoreSubscribe() {
    // Score has changed!
    this._celebrityService.refreshScore.subscribe(id => {
      if(this.celebrity.id === id) {
        this.celebrity = this._celebrityService.getCelebrityById(this.celebrity.id);
        this.evaluateScoreForThisCelebrity();
      }
    });
  }
}
