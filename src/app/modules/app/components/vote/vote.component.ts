import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';
import { CelebrityService } from 'src/app/services/celebrity.service';
import { ToolsService } from 'src/app/services/tools.service';

const ACTION_THUMBS_UP = 'thumbsUp';
const ACTION_THUMBS_DOWN = 'thumbsDown';
const ACTION_VOTE_NEW = 'voteAgain';
const ACTION_VOTE_AGAIN = 'voteAgain';

const ACTION_TEXT_START = 'Vote Now';
const ACTION_TEXT_VOTED = 'Vote Again';

const THANK_FOR_YOUR_VOTE = 'Thak you for your vote!';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  // Component data
  @Input() celebrity: ICelebrityMap;

  public actionText: string = ACTION_TEXT_START;
  public action: string = '';
  public isButtonEnabled: boolean = true;
  
  constructor(private _toolsService: ToolsService,
    private _celebrityService: CelebrityService) { }

  ngOnInit(): void {
  }

  // Methods
  setAction(isUp: boolean) : void {
    if(isUp) {
      this.action = ACTION_THUMBS_UP;
    }
    else {
      this.action = ACTION_THUMBS_DOWN;
    }
  }

  vote() : void {
    // Show the message
    if(this.celebrity) {
      // apply the vote
      this.performAction();

      // Update last update data and message
      this.celebrity.lastUpdated = new Date();

      if(this._celebrityService.updateCelebrity(this.celebrity)) {
        
        // For this component <Show result>
        this.celebrity.lastUpdatedMessage = THANK_FOR_YOUR_VOTE;

        // Update Score
        this._celebrityService.refreshScoreComponent(this.celebrity.id);
      }
      else {
        console.log('Ups! Error in localstorage, when update celebrity.');
      }
    }

    // Disable the actions
    this.isButtonEnabled = false;

    // Business rule
    this.actionText = ACTION_TEXT_VOTED;

    // Change the action
    this.action = '';
  }

  voteAgain() : void{
    // Show the message
    if(this.celebrity) {
      this.celebrity.lastUpdatedMessage = this._toolsService.getDateMessageForEyebrowText(this.celebrity.lastUpdated);
    }

    // Enabled the actions
    this.isButtonEnabled = true;

    // Business rule
    this.actionText = ACTION_TEXT_START;

    // Change the action
    this.action = ACTION_VOTE_AGAIN;
  }

  // Events
  choseVoteOption(): void {
    // First vote
    if(this.isButtonEnabled === true) {      
      this.vote();
    }
    // Vote again
    else {
      this.voteAgain();
    }
  }

  // Function
  isActionEnable() : boolean {
    let result = false;

    if(this.action === '' && this.actionText === ACTION_TEXT_VOTED) {
      result = true;
    }
    else if(this.action === ACTION_THUMBS_UP || this.action === ACTION_THUMBS_DOWN) {
      result = true;
    }

    return result;
  }

  performAction() : void{
    if(this.action === ACTION_THUMBS_UP) {
      if(this.celebrity && this.celebrity.votes)  {
        this.celebrity.votes.positive = this.celebrity.votes.positive + 1;
      }
    }
    else if(this.action === ACTION_THUMBS_DOWN) {
      if(this.celebrity && this.celebrity.votes)  {
        this.celebrity.votes.negative = this.celebrity.votes.negative + 1;
      }
    }
  }
}
