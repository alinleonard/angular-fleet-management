import { Vehicle } from './vehicle.model';
import { Reminder } from '../shared/reminder.module';
import { Subject } from 'rxjs';

export class VehicleService {
    vehicleChanged = new Subject<Vehicle[]>();

    private vehicles: Vehicle[] = [
        {
            _id: 0,
            name: 'My Blue Car',
            manufacturer: 'BMW',
            model: 'X5',
            year: 1999,
            reminders: [
               {
                  reminder: new Reminder('Asigurare RCA'),
                  trigger: {
                      date: new Date()
                  },
                  created: new Date()
               }
            ]
        },
        { _id: 1, name: 'Wife Car', manufacturer: 'Audi', model: 'A4', year: 2005 }
    ];

    getVehicles() {
        return this.vehicles.slice();
    }

    getVehicle(id: number) {
        return this.vehicles.find(v => v._id === id);
    }

    addVehicleItem(vehicle: Vehicle) {
        vehicle._id = this.vehicles.length + 1;
        this.vehicles.push(vehicle);
        this.vehicleChanged.next(this.vehicles.slice());
    }
}
