import { EventEmitter, Output } from '@angular/core';
import { Vehicle } from './vehicle.model';

export class VehicleService {
    @Output() onSelectedVehicle = new EventEmitter<Vehicle>();
    @Output() onVehicleChanged = new EventEmitter<Vehicle[]>();

    private vehicles: Vehicle[] = [
        { name: "alin", manufacturer: "bmw", model: "serial 3", year: 1999 },
        { name: "busila", manufacturer: "audi", model: "serial 4", year: 1999 }
    ];
      
    getVehicles() {
        return this.vehicles.slice();
    }

    addVehicleItem(vehicle: Vehicle) {
        this.vehicles.push(vehicle);
        this.onVehicleChanged.emit(this.vehicles.slice());
    }
}