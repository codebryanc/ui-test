import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
    
    @Output() changeMenuView = new EventEmitter<string>();

    constructor() {
    }

    // Function
    setChangeMenuView(value: string): void {
        this.changeMenuView.emit(value);
    }
}