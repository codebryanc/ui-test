import { Component, OnInit } from '@angular/core';

import { CelebrityService } from 'src/app/services/celebrity.service';
import { UiLocalStorageService } from 'src/app/services/uiLocal-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _celebrityService: CelebrityService,
    private _uiTestLocalStorageService: UiLocalStorageService) {
  }

  ngOnInit() {

  }
}
