import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public views: string[] = ['List', 'Grid'];
  
  // Business logic =>  Always initi in List view
  public selectedView: string = environment.initView;

  constructor(private _menuService: MenuService) { }

  ngOnInit(): void {
  }

  // Event
  onChangeMenu(value: any): void {
    this._menuService.setChangeMenuView(value);
  }
}
