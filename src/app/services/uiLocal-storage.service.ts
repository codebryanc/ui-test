import { Injectable } from '@angular/core';

import { Data } from '@angular/router';

import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UiLocalStorageService {
    
    constructor(private _localStorageService: LocalStorageService) {
    }

    // Methods

        // :: Get ::
        public getDataInLocalStorage(key: string) : any {
            let localData = this._localStorageService.get(key);

            if(localData) {
                return JSON.parse(localData);
            }
            else {
                return null;
            }
        }

        // :: Set ::
        public setDataInLocalStorage(key: string, data: Data) {
            let result = false;

            let info = JSON.stringify(data);
            if(info) {
                this._localStorageService.set(key, info);
                result = true;
            }

            return result;
        }

        // :: Delete::
        public deleteDataInLocalStorage(key: string) : void {
            let localData = this.getDataInLocalStorage(key);
            
            if(localData) {
                this.setDataInLocalStorage(key, null);
            }
        }
}