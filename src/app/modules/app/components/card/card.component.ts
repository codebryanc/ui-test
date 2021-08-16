import { Component, Input, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

import { environment } from 'src/environments/environment';

import { ToolsService } from 'src/app/services/tools.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public rectangleHeight: number = 1100;

  // Component data
  @Input() celebrity: ICelebrityMap;
  
  // Business logic =>  Always initi in List view
  public currentView: string = environment.initView;

  constructor(private _toolsService: ToolsService,
    private _menuService: MenuService) {
    console.log(this.currentView);
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

  // Subscribe
  refreshViewSubsCribe() {
    // View has changed!
    this._menuService.changeMenuView.subscribe(changed => {
      if(changed) {
        console.log('cambio esta monda');
      }
    });
  }
}
