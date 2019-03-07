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

    private baseApiUrl = 'https://fleet-management-api.firebaseio.com/vehicles.json';

    constructor(private http: Http, private authService: AuthService) { }

    private fetchVehiclesFromDatabase() {
        const token = this.authService.getToken();
        this.http.get(this.baseApiUrl + '?auth=' + token)
            .pipe(map(
                (response: Response) => {
                    const vehicles: Vehicle[] = response.json();
                    for (const vehicle of vehicles) {
                        if (!vehicle['reminders']) {
                            vehicle['reminders'] = [];
                        }
                        if (!vehicle['fuel']) {
                            vehicle['fuel'] = [];
                        }
                    }
                    return vehicles;
                }
            ))
            .subscribe((vehicles: Vehicle[]) => {
                this.vehicles = vehicles;
                this.vehicleChanged.next(this.vehicles.slice());
            });
    }

    private postVehiclesToDatabase(vehicle: Vehicle) {
        const token = this.authService.getToken();
        return this.http.post(this.baseApiUrl + '?auth=' + token, vehicle);
    }

    getVehicles() {
        const token = this.authService.getToken();
        return this.http.get(this.baseApiUrl + '?auth=' + token)
            .pipe(map(
                (response: Response) => {
                    const vehicles: Vehicle[] = response.json();
                    for (const vehicle of vehicles) {
                        if (!vehicle['reminders']) {
                            vehicle['reminders'] = [];
                        }
                        if (!vehicle['fuel']) {
                            vehicle['fuel'] = [];
                        }
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
        this.http.put(this.baseApiUrl + '?auth=' + token, tempVehicles).subscribe((res) => {
            console.log(res);
            this.vehicles.push(vehicle);
            this.vehicleChanged.next(this.vehicles.slice());
        }, (error) => {
            console.log(error);
        });
    }

    updateVehicle(index: number, newVehicle: Vehicle) {
        this.vehicles[index] = newVehicle;
        this.vehicleChanged.next(this.vehicles.slice());
    }

    deleteVehicle(index: number) {
        const token = this.authService.getToken();
        this.http.delete('https://fleet-management-api.firebaseio.com/vehicles/' + index + '.json?auth=' + token)
            .subscribe((res) => {
                this.vehicles.splice(index, 1);
                this.vehicleChanged.next(this.vehicles.slice());
            }, (err) => {
                console.log(err);
            }
            );
    }
}
