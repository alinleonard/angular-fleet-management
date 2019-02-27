import { Tracker } from './tracker.model';
import { Subject } from 'rxjs';

export class TrackerService {
    selectedTracker = new Subject<Tracker>();
    trackerChanged = new Subject<Tracker[]>();

    private trackers: Tracker[] = [
        new Tracker(0, '1234', '0770000000'),
        {
            id: 1,
            sn: '0001',
            phone: '0773944978',
            positions: [
            {
                lat: 51.205,
                lon: -1.09,
                alt: 400,
                speed: 50,
                date_posted: new Date()
            },
            {
                lat: 51.505,
                lon: -0.09,
                alt: 400,
                speed: 55,
                date_posted: new Date()
            },
            {
                lat: 51.605,
                lon: -0.39,
                alt: 400,
                speed: 55,
                date_posted: new Date()
            },
            {
                lat: 51.805,
                lon: -1.39,
                alt: 400,
                speed: 55,
                date_posted: new Date()
            }
            ]
        },
        {
            id: 2,
            sn: '11111',
            phone: '072233123',
            vehicleId: 0,
            positions: [
            {
                lat: 47.340276778729226,
                lon: 23.743600845336914,
                alt: 400,
                speed: 51,
                date_posted: new Date()
            },
            {
                lat: 47.3410619673879,
                lon: 23.746347427368164,
                alt: 400,
                speed: 52,
                date_posted: new Date()
            },
            {
                lat: 47.34234150907007,
                lon: 23.748836517333984,
                alt: 400,
                speed: 55,
                date_posted: new Date()
            },
            {
                lat: 47.34347562236255,
                lon: 23.75119686126709,
                alt: 400,
                speed: 35,
                date_posted: new Date()
            },
            {
                lat: 47.344377079651046,
                lon: 23.753600120544434,
                alt: 400,
                speed: 15,
                date_posted: new Date()
            }
            ]
        }
    ];

    getTrackers() {
        return this.trackers.slice();
    }

    getTracker(id: number): Tracker {
        return this.trackers.filter((tracker) => tracker.id === id)[0];
    }

    getUnassinedTrackers() {
        return this.trackers.filter((tracker) => tracker.vehicleId === undefined || tracker.vehicleId === null).slice();
    }

    getAssignedTrackers() {
        return this.trackers.filter((tracker) => tracker.vehicleId !== undefined && tracker.vehicleId !== null).slice();
    }

    addTracker(tracker: Tracker) {
        /**@todo Id increment should be deleted in production on real database */
        const id = this.trackers[this.trackers.length - 1].id;
        tracker.id = id + 1;
        this.trackers.push(tracker);
        this.trackerChanged.next(this.trackers.slice());
    }

    deleteTracker(id: number) {
        const index: number = this.trackers.findIndex(s => s.id === id);
        this.trackers.splice(index, 1);
        this.trackerChanged.next(this.trackers.slice());
    }
}
