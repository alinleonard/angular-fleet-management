import { Vehicle } from './vehicle.model';
import { Subject, throwError } from 'rxjs';
import { Http, Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleService {
    private vehicles: Vehicle[] = [];
    vehicleChanged = new Subject<Vehicle[]>();

    private baseApiUrl = 'https://fleet-management-api.firebaseio.com';

    constructor(private http: Http, private authService: AuthService) { }

    setVehicles(vehicles: Vehicle[]) {
        this.vehicles = vehicles;
        this.vehicleChanged.next(this.vehicles.slice());
    }

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

    /**
     * HTTP
     */

     getVehiclesFromServer() {
        const token = this.authService.getToken();
        this.http.get(this.baseApiUrl + '/vehicles.json?auth=' + token)
            .pipe(map(
                (response: Response) => {
                    let vehicles: Vehicle[] = response.json();
                    if (vehicles) {
                        for (const vehicle of vehicles) {
                            if (!vehicle['reminders']) {
                                vehicle['reminders'] = [];
                            }
                            if (!vehicle['fuel']) {
                                vehicle['fuel'] = [];
                            }
                        }
                    } else {
                        vehicles = [];
                    }
                    return vehicles;
                }
            ))
            .subscribe((vehicles: Vehicle[]) => {
                this.setVehicles(vehicles);
            });
     }

     storeVehicleToServer() {
        const token = this.authService.getToken();
        return this.http.put(this.baseApiUrl + '/vehicles.json?auth=' + token, this.getVehicles());
    }
}
