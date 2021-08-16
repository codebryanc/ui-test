import { Injectable } from '@angular/core';
import celebrities from '../../assets/data.json';
import { ICelebrityMap } from '../models/celebrityInterface';
import { UiLocalStorageService } from './uiLocal-storage.service';

// Const for this service
const KEY_CELEBRITIES_LOCAL = 'CELEBRITIES';

@Injectable({
  providedIn: 'root'
})
export class CelebrityService {

    // Public data
    public celebrities: ICelebrityMap[] = null;

    // Private data
    private _defaultCelebrities: ICelebrityMap[]
    
    constructor(private _uiLocalStorageService: UiLocalStorageService) {
      this.setDefaulDataInService();
      this.verifyDefaultDataInLocalStorage();
    }

    // Methods
    setDefaulDataInService() : void {
      var json = JSON.stringify(celebrities);
      this._defaultCelebrities = JSON.parse(json).data;

      if(this._defaultCelebrities) {
        this.celebrities = this._defaultCelebrities;
      }
    }

    verifyDefaultDataInLocalStorage() : void {
      // First get local data
      let allData = this._uiLocalStorageService.getDataInLocalStorage(KEY_CELEBRITIES_LOCAL);

      if(!allData && this._defaultCelebrities) {
        // Ups!! it's the first time here!

        this._uiLocalStorageService.setDataInLocalStorage(KEY_CELEBRITIES_LOCAL, this._defaultCelebrities);
      }
    }

    // Functions
}