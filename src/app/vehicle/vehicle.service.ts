import { Vehicle } from './vehicle.model';
import { Subject, throwError } from 'rxjs';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleService {
    private vehicles: Vehicle[] = [];
    vehicleChanged = new Subject<Vehicle[]>();

    private baseApiUrl = 'https://fleet-management-api.firebaseio.com';

    constructor(private http: Http, private authService: AuthService) { }

    getVehicles() {
        const token = this.authService.getToken();
        return this.http.get(this.baseApiUrl + '/vehicles.json?auth=' + token)
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
                    this.setVehicles(vehicles);
                    return vehicles;
                }
            ));
    }

    setVehicles(vehicles: Vehicle[]) {
        this.vehicles = vehicles;
    }

    getVehicle(index: number) {
        return this.vehicles[index];
    }

    addVehicle(vehicle: Vehicle) {
        const token = this.authService.getToken();
        const tempVehicles: Vehicle[] = [vehicle];
        this.http.put(this.baseApiUrl + '/vehicles.json?auth=' + token, tempVehicles).subscribe((res) => {
            console.log(res);
            this.vehicles.push(vehicle);
            this.vehicleChanged.next(this.vehicles.slice());
        }, (error) => {
            console.log(error);
        });
    }

    updateVehicle(index: number, newVehicle: Vehicle) {
        const token = this.authService.getToken();
        this.http.put(this.baseApiUrl + '/vehicles/' + index + '.json?auth=' + token, newVehicle)
            .subscribe((res) => {
                this.vehicles[index] = newVehicle;
                this.vehicleChanged.next(this.vehicles.slice());
            }, (err) => {
                console.log(err);
            });
    }

    deleteVehicle(index: number) {
        const token = this.authService.getToken();
        this.http.delete(this.baseApiUrl + '/vehicles/' + index + '.json?auth=' + token)
            .subscribe((res) => {
                this.vehicles.splice(index, 1);
                this.vehicleChanged.next(this.vehicles.slice());
            }, (err) => {
                console.log(err);
            }
            );
    }
}
