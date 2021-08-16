import { Component, OnInit } from '@angular/core';

import { ICelebrityMap } from 'src/app/models/celebrityInterface';

import { CelebrityService } from 'src/app/services/celebrity.service';
import { UiLocalStorageService } from 'src/app/services/uiLocal-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Component data
  public celebrities: ICelebrityMap[] = null;

  constructor(private _celebrityService: CelebrityService,
    private _uiTestLocalStorageService: UiLocalStorageService) {
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
