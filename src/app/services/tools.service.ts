import { Injectable } from '@angular/core';

// DATE

const SECONDS: number = 1000;
const MINUTES: number = 60 * SECONDS;
const HOURS: number = 60 * MINUTES;
const DAYS: number = 24 * HOURS;
const MONTHS: number = 30 * DAYS;
const YEARS: number = 12 * MONTHS;

// MATH
const ALL_PERCENT: number = 100;

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
    
    constructor() {}

    // Functions
    getDateMessageForEyebrowText(datetime: Date) : string {
        let result = '';

        if(datetime) {
            let today: number = new Date().getTime();
            let time: number = new Date(datetime).getTime();
            let timeForEvaluate: number = (today - time);

            // For correct performance, i start verify first the big value year ... to less value seconds ...
            
            // :: YEARS ::
            if(timeForEvaluate > YEARS) {
                result = `${Math.round(timeForEvaluate / YEARS)} year ago`;
            }
            // :: MONTHS ::
            else if(timeForEvaluate > MONTHS) {
                result = `${Math.round(timeForEvaluate / MONTHS)} months ago`;
            }
            // :: DAYS ::
            else if(timeForEvaluate > DAYS) {
                result = `${Math.round(timeForEvaluate / DAYS)} days ago`;
            }
            // :: HOURS ::
            else if(timeForEvaluate > HOURS) {
                result = `${Math.round(timeForEvaluate / HOURS)} hours ago`;
            }
            // :: MINUTES ::
            else if(timeForEvaluate > MINUTES) {
                result = `${Math.round(timeForEvaluate / MINUTES)} minutes ago`;
            }
            // :: SECONDS ::
            else if(timeForEvaluate > SECONDS) {
                result = `${Math.round(timeForEvaluate / SECONDS)} seconds ago`;
            }
            else if(timeForEvaluate <= SECONDS) {
                result = `Wow really fast, moment ago`;
            }
        }

        return result;
    }

    getPercentByVotes(votes: number, totalVotes: number): number {
        return  votes * ALL_PERCENT / totalVotes;
    }

    getSizeArea(votes: number, totalVotes: number, area: number): number {
        let result = 0;

        if(votes && totalVotes && area) {
            let percent = this.getPercentByVotes(votes, totalVotes);
            result = area * percent / ALL_PERCENT;
        }

        return result;
    }
}