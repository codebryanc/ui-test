import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public rectangleHeight: number = 1100;

  // Component data
  @Input() celebrity: ICelebrityMap;

  constructor(private _toolsService: ToolsService) {
  }

  ngOnInit(): void {
    this.setTheCorrectlyUpdateMessage();
  }

  // Methods
  setTheCorrectlyUpdateMessage() : void {
    if(this.celebrity) {
      this.celebrity.lastUpdatedMessage = this._toolsService.getDateMessageForEyebrowText(this.celebrity.lastUpdated);
    }
  }

  // Function
  getHeightRectangle() : string {
    return `${this.rectangleHeight}px`;
  }
}
