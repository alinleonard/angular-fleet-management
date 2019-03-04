import { Vehicle } from './vehicle.model';
import { Subject } from 'rxjs';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

export class VehicleService {
    private vehicles: Vehicle[] = [];
    vehicleChanged = new Subject<Vehicle[]>();

    private baseApiUrl = 'url/vehicles.json';

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
        this.fetchVehiclesFromDatabase();
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
