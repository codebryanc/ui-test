import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

import { environment } from 'src/environments/environment';

import { ToolsService } from 'src/app/services/tools.service';
import { MenuService } from 'src/app/services/menu.service';

const MAX_NAME : number = 21;
const MAX_DESCRIPTION : number = 74;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Component view options
  public cardListView: string = 'List';
  public cardGridView: string = 'Grid';

  public rectangleHeight: number = 1100;
  public gridHeight: number = 348;

  // Component data
  @Input() celebrity: ICelebrityMap;
  
  // Business logic =>  Always initi in List view
  public currentView: string = environment.initView;

  constructor(private _toolsService: ToolsService,
    private _menuService: MenuService) {
  }

  ngOnInit(): void {
    this.setTheCorrectlyUpdateMessage();

    // subscribe to changes in view
    this.refreshViewSubsCribe();
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

  substringName(value: string): string {
    if(value && value.length > MAX_NAME) {
      return `${value.substring(0, MAX_NAME)}...`;
    }
    else {
      return value;
    }
  }

  substringDescription(value: string): string {
    if(value && value.length > MAX_DESCRIPTION) {
      return `${value.substring(0, MAX_DESCRIPTION)}...`;
    }
    else {
      return value;
    }
  }

  // Subscribe
  refreshViewSubsCribe() {
    // View has changed!
    this._menuService.changeMenuView.subscribe(view => {
      if(view) {
        this.currentView = view;
      }
    });
  }
}
