import { Tracker } from './tracker.model';
import { Subject } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TrackerService {
    private baseApiUrl = 'https://fleet-management-api.firebaseio.com';

    selectedTracker = new Subject<Tracker>();
    trackerChanged = new Subject<Tracker[]>();

    private trackers: Tracker[] = [];

    constructor(private http: Http, private authService: AuthService) {
    }

    setTrackers(trackers: Tracker[]) {
        this.trackers = trackers;
        this.trackerChanged.next(this.trackers.slice());
    }

    getTrackers() {
        return this.trackers.slice();
    }

    getTracker(index: number): Tracker {
        return this.trackers[index];
    }

    addTracker(tracker: Tracker) {
        this.trackers.push(tracker);
        this.trackerChanged.next(this.trackers.slice());
    }

    updateTracker(newTracker: Tracker, index: number) {
        this.trackers[index] = newTracker;
        this.trackerChanged.next(this.trackers.slice());
    }

    deleteTracker(index: number) {
        this.trackers.splice(index, 1);
        this.trackerChanged.next(this.trackers.slice());
    }

    getTrackersFromServer() {
        const token = this.authService.getToken();
        this.http.get(this.baseApiUrl + '/trackers.json?auth=' + token)
            .pipe(
                map((response: Response) => {
                    let trackers: Tracker[] = response.json();

                    if (trackers) {
                        for (const tracker of trackers) {
                            if (!tracker['positions']) {
                                tracker['positions'] = [];
                            }
                        }
                    } else {
                        trackers = [];
                    }
                    return  trackers;
                })
            ).subscribe((trackers: Tracker[]) => {
                this.setTrackers(trackers);
            });
    }

    storeTrackersToServer() {
        const token = this.authService.getToken();
        return this.http.put(this.baseApiUrl + '/trackers.json?auth=' + token, this.getTrackers());
    }
}
