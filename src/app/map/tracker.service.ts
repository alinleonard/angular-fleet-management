import { Tracker } from './tracker.model';

export class TrackerService {
    private trackers: Tracker[] = [
        { id: 0, vehicleId: 0, imei: '1234', phone: '0773944978' },
        { id: 1, imei: '0001', phone: '0773944978' }
    ];

    getTrackers() {
        return this.trackers.slice();
    }

    getUnassinedTrackers() {
        return this.trackers.filter((tracker) => tracker.vehicleId === undefined).slice();
    }

    getAssignedTrackers() {
        return this.trackers.filter((tracker) => tracker.vehicleId !== undefined).slice();
    }
}
