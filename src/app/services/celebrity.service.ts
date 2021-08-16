import { EventEmitter, Injectable, Output, SkipSelf } from '@angular/core';
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
    
    // Used for update score component
    @Output() refreshScore: EventEmitter<number> = new EventEmitter();

    constructor(private _uiLocalStorageService: UiLocalStorageService) {
      this.initService();
    }

    private initService() : void {
      this.verifyDefaultDataInLocalStorage();
    }

    // Methods
    private setDefaulDataInService() : void {
      var json = JSON.stringify(celebrities);
      this._defaultCelebrities = JSON.parse(json).data;

      if(this._defaultCelebrities) {
        this.celebrities = this._defaultCelebrities;
      }
    }

    private verifyDefaultDataInLocalStorage() : void {
      // First get local data
      let allData = this._uiLocalStorageService.getDataInLocalStorage(KEY_CELEBRITIES_LOCAL);

      if(!allData) {
        
        // Default data
        this.setDefaulDataInService();
        
        if(this._defaultCelebrities) {
          // Ups!! it's the first time here!
          this._uiLocalStorageService.setDataInLocalStorage(KEY_CELEBRITIES_LOCAL, this._defaultCelebrities);
        }
      }
      else {
        this.celebrities = allData;
      }
    }

    public updateCelebrity(celebrity: ICelebrityMap) : boolean {
      let result = false;

      if(celebrity) {
        
        // First found the celebrity
        let celebrityFound = this.getCelebrityById(celebrity.id);

        // Update the celebrity in Array
        this.updateCelebrityInList(celebrity);

        // Save in local storage
        result = this._uiLocalStorageService.setDataInLocalStorage(KEY_CELEBRITIES_LOCAL, this.celebrities);
      }


      return result;
    }

    // Functions
    public getCelebrityById(id: number) : ICelebrityMap {
      let celebrityFound = null;

      if(this.celebrities && id > 0) {
        celebrityFound = this.celebrities.find(celebrity => celebrity.id === id);
      }

      return celebrityFound;
    }

    private updateCelebrityInList(celebrity: ICelebrityMap): ICelebrityMap[] {
      let result: ICelebrityMap[] = [];

      if(this.celebrities) {
        this.celebrities.forEach(oneCelebrity => {
          if(oneCelebrity.id === celebrity.id) {
            result.push(celebrity)
          }
          else {
            result.push(oneCelebrity);
          }
        });
      }

      return result;
    }

    // Event
    refreshScoreComponent(id: number): void {
      this.refreshScore.emit(id);
    }
}