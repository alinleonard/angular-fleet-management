import { Vehicle } from './vehicle.model';
import { Subject } from 'rxjs';

export class VehicleService {
    vehicleChanged = new Subject<Vehicle[]>();

    private vehicles: Vehicle[] = [
        new Vehicle(
            'My Blue Car',
            'BMW',
            'X5',
            1999),
        new Vehicle('Wife Car', 'Audi', 'A4', 2005)
    ];

    getVehicles() {
        return this.vehicles.slice();
    }

    getVehicle(index: number) {
        return this.vehicles[index];
    }

    addVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle);
        this.vehicleChanged.next(this.vehicles.slice());
    }

    updateVehicle(index: number, newVehicle: Vehicle) {
        this.vehicles[index] = newVehicle;
        this.vehicleChanged.next(this.vehicles.slice());
    }

    deleteVehicle(index: number) {
        this.vehicles.splice(index, 1);
        this.vehicleChanged.next(this.vehicles.slice());
    }
}
