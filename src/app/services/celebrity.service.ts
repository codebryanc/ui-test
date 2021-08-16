import { Injectable } from '@angular/core';
import celebrities from '../../assets/data.json';
import { ICelebrityMap } from '../models/celebrityInterface';

@Injectable({
  providedIn: 'root'
})
export class CelebrityService {

    // Public data
    public celebrities: ICelebrityMap[] = null;

    // Private data
    private _defaultCelebrities: ICelebrityMap[]
    
    constructor() {
      this.setDefaulData();
    }

    // Methods
    setDefaulData() : void {
      var json = JSON.stringify(celebrities);
      this._defaultCelebrities = JSON.parse(json).data;

      if(this._defaultCelebrities) {
        this.celebrities = this._defaultCelebrities;
      }
    }

    // Functions
}