import { Component, OnInit } from '@angular/core';

import { CelebrityService } from 'src/app/services/celebrity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _celebrityService: CelebrityService) {
  }

  ngOnInit() {

  }
}
