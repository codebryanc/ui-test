import { Component, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

import { environment } from 'src/environments/environment';

import { CelebrityService } from 'src/app/services/celebrity.service';
import { MenuService } from 'src/app/services/menu.service';
import { UiLocalStorageService } from 'src/app/services/uiLocal-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Component data
  public celebrities: ICelebrityMap[] = null;

  constructor(private _celebrityService: CelebrityService) {
    this.getCelebrities();
  }

  // Angular
  ngOnInit() {
  }

  // Methods
  getCelebrities() {
    this.celebrities = this._celebrityService.celebrities;
  }

}
