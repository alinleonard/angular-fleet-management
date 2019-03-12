import { PipeTransform, Pipe } from '@angular/core';
import { Tracker } from '../tracker/tracker.model';

@Pipe({
    name: 'vehicleAssigned',
    pure: false
})
export class VehicleAssignedPipe implements PipeTransform {
    transform(value: Tracker[]) {
        const filtered: Tracker[] = [];
        let index = 0;
        for (const tracker of value) {
            if (tracker.vehicleId) {
                tracker['_id'] = index;
                filtered.push(tracker);
            }
            index++ ;
        }
        return filtered;
    }
}
